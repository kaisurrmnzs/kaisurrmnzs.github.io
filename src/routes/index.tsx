import { createFileRoute } from "@tanstack/react-router";
import { Room } from "@/components/emo-room/Room";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EMO ROOM — quarto pixel art e música" },
      { name: "description", content: "Entre em um quarto emo vivo em pixel art, acompanhado por um gato preto, música e chuva na janela." },
      { property: "og:title", content: "EMO ROOM — quarto pixel art e música" },
      { property: "og:description", content: "Um quarto emo interativo em pixel art com gato preto, Spotify e Audio Lab." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Room,
});
