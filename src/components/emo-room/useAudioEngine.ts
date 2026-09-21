import { useCallback, useEffect, useRef, useState } from "react";
import { EQ_FREQUENCIES } from "./audio-presets";
import type { AudioSettings } from "./types";

type EngineNodes = {
  context: AudioContext;
  source: MediaElementAudioSourceNode;
  filters: BiquadFilterNode[];
  bass: BiquadFilterNode;
  mid: BiquadFilterNode;
  treble: BiquadFilterNode;
  compressor: DynamicsCompressorNode;
  delay: DelayNode;
  echoGain: GainNode;
  feedbackGain: GainNode;
  convolver: ConvolverNode;
  wetGain: GainNode;
  dryGain: GainNode;
  widthGains: [GainNode, GainNode, GainNode, GainNode];
  panner: StereoPannerNode;
  gain: GainNode;
  analyser: AnalyserNode;
};

function createImpulse(context: AudioContext) {
  const length = context.sampleRate * 1.2;
  const impulse = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.6);
  }
  return impulse;
}

export function useAudioEngine(settings: AudioSettings) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const nodesRef = useRef<EngineNodes | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const ensureEngine = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return null;
    if (nodesRef.current) return nodesRef.current;
    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);
    const filters = EQ_FREQUENCIES.map((frequency) => {
      const filter = context.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = frequency;
      filter.Q.value = 1;
      return filter;
    });
    const bass = context.createBiquadFilter(); bass.type = "lowshelf"; bass.frequency.value = 180;
    const mid = context.createBiquadFilter(); mid.type = "peaking"; mid.frequency.value = 1200; mid.Q.value = 0.7;
    const treble = context.createBiquadFilter(); treble.type = "highshelf"; treble.frequency.value = 4500;
    const compressor = context.createDynamicsCompressor();
    const delay = context.createDelay(1); delay.delayTime.value = 0.24;
    const echoGain = context.createGain(); echoGain.gain.value = 0;
    const feedbackGain = context.createGain(); feedbackGain.gain.value = 0;
    const convolver = context.createConvolver(); convolver.buffer = createImpulse(context);
    const wetGain = context.createGain(); wetGain.gain.value = 0;
    const dryGain = context.createGain(); dryGain.gain.value = 1;
    const splitter = context.createChannelSplitter(2);
    const merger = context.createChannelMerger(2);
    const widthGains: [GainNode, GainNode, GainNode, GainNode] = [context.createGain(), context.createGain(), context.createGain(), context.createGain()];
    const panner = context.createStereoPanner();
    const gain = context.createGain();
    const analyserNode = context.createAnalyser(); analyserNode.fftSize = 128;
    let previous: AudioNode = source;
    for (const filter of filters) { previous.connect(filter); previous = filter; }
    previous.connect(bass); bass.connect(mid); mid.connect(treble); treble.connect(compressor);
    compressor.connect(dryGain);
    compressor.connect(delay);
    delay.connect(echoGain);
    delay.connect(feedbackGain);
    feedbackGain.connect(delay);
    compressor.connect(convolver); convolver.connect(wetGain);
    dryGain.connect(splitter); wetGain.connect(splitter);
    splitter.connect(widthGains[0], 0); widthGains[0].connect(merger, 0, 0);
    splitter.connect(widthGains[1], 1); widthGains[1].connect(merger, 0, 0);
    splitter.connect(widthGains[2], 0); widthGains[2].connect(merger, 0, 1);
    splitter.connect(widthGains[3], 1); widthGains[3].connect(merger, 0, 1);
    merger.connect(panner); panner.connect(gain); gain.connect(analyserNode); analyserNode.connect(context.destination);
    nodesRef.current = { context, source, filters, bass, mid, treble, compressor, delay, echoGain, feedbackGain, convolver, wetGain, dryGain, widthGains, panner, gain, analyser: analyserNode };
    setAnalyser(analyserNode);
    return nodesRef.current;
  }, []);

  useEffect(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    nodes.filters.forEach((filter, index) => { filter.gain.value = settings.bands[index] ?? 0; });
    nodes.bass.gain.value = settings.bass;
    nodes.mid.gain.value = settings.mid;
    nodes.treble.gain.value = settings.treble;
    nodes.gain.gain.value = settings.gain;
    nodes.panner.pan.value = settings.balance;
    nodes.compressor.threshold.value = settings.compressor ? -30 : 0;
    nodes.compressor.ratio.value = settings.compressor ? 8 : 1;
    nodes.wetGain.gain.value = settings.reverb;
    nodes.echoGain.gain.value = Math.min(0.65, settings.echo);
    nodes.feedbackGain.gain.value = Math.min(0.35, settings.echo * 0.45);
    const direct = (1 + settings.width) / 2;
    const cross = (1 - settings.width) / 2;
    nodes.widthGains[0].gain.value = direct;
    nodes.widthGains[1].gain.value = cross;
    nodes.widthGains[2].gain.value = cross;
    nodes.widthGains[3].gain.value = direct;
    if (audioRef.current) audioRef.current.playbackRate = settings.speed;
  }, [settings]);

  const loadFile = (file: File) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = URL.createObjectURL(file);
    if (audioRef.current) audioRef.current.src = objectUrlRef.current;
    setFileName(file.name);
    setIsPlaying(false);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    const nodes = ensureEngine();
    if (!nodes) return;
    if (nodes.context.state === "suspended") await nodes.context.resume();
    if (audio.paused) await audio.play(); else audio.pause();
  };

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    void nodesRef.current?.context.close();
  }, []);

  return { audioRef, analyser, fileName, isPlaying, loadFile, togglePlayback, setIsPlaying };
}