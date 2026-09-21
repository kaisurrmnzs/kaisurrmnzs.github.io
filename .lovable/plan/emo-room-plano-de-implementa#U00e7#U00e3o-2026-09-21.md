# EMO ROOM — plano de implementação

## Objetivo

Construir uma experiência mobile-first em que o quarto emo em pixel art ocupa a tela principal, com o gato preto animado integrado ao cenário, música no computador, controles ambientais e um Audio Lab para arquivos locais autorizados.

## Experiência principal

- Criar um quarto noturno detalhado e responsivo, com cama desarrumada, mesa, computador, janela, luminária, fones, caixas de som, CDs, livros, pôsteres, plantas, cabos e objetos pessoais.
- Usar uma composição de pixel art moderna em camadas, com escala por pixels, sombras duras e iluminação localizada em roxo escuro, vinho e vermelho sutil.
- Transformar os objetos do próprio cenário em pontos interativos, sem aparência de dashboard.
- Abrir painéis compactos sobre o quarto para música, áudio e informações; no celular, preservar a visão do ambiente e fechar facilmente os painéis.

## Assets enviados

- Integrar `Black-Idle.png` como sprite sheet de 12 quadros de 48×48 px.
- Integrar `Black-Run.png` como sprite sheet de 6 quadros de 48×48 px.
- Animar o gato com recorte real dos quadros, movimento horizontal, direção, pausas em idle e reação ao toque/clique.
- Integrar `pet12.png` como sprite sheet de 4 colunas × 11 linhas, com quadros de 128×128 px, usando animações úteis como detalhe secundário do quarto sem substituir o gato preto principal.
- Hospedar os três assets no fluxo de mídia do projeto e manter renderização sem suavização.

## Interações do quarto

- Gato: reação curta ao clique e mudança de comportamento.
- Computador: abrir/fechar o player Spotify.
- Fones: abrir/fechar configurações e Audio Lab.
- Janela: alternar Normal, Chuva, Noite e Tempestade; chuva concentrada no vidro e relâmpago discreto.
- Luminária: ligar/desligar e alterar a iluminação local.
- Cama: pequena animação visual.
- CDs e pôsteres: mostrar detalhes breves e animações contextualizadas.
- Oferecer identificação acessível dos objetos por foco, toque e teclado, sem rótulos permanentes poluindo o cenário.

## Música e Spotify

- Criar um painel musical integrado ao monitor/aparelho de som.
- Preparar um ponto único de configuração para inserir depois o link/URI da playlist.
- Usar somente Spotify Embed oficial e a IFrame API oficial para estado e controles disponíveis: reproduzir/pausar, anterior, próxima, faixa, artista e capa.
- Exibir um estado claro de “playlist ainda não configurada” até o link real ser fornecido, sem simular faixas.
- Manter o volume somente quando a API oficial permitir; não tentar acessar ou processar o áudio do Spotify.

## Audio Lab

- Permitir selecionar um arquivo de áudio local/autorizado, sem envio para servidor.
- Montar uma cadeia Web Audio API com equalizador de 7 bandas, Bass, Mid, Treble, Gain, Balance, Compressor, Reverb, Echo, Stereo Width, Speed e Pitch quando suportado.
- Implementar presets Normal, Bass Boost, Night, Vocal, Soft, Rock, Emo, Lo-Fi e Custom.
- Incluir Reset, salvar preset e carregar preset no navegador.
- Preparar tipos/estrutura para futuras faixas Vocal, Instrumental, Drums, Bass e Other, sem fingir separação de stems.
- Criar visualizador pixelado compacto no monitor, reagindo apenas ao arquivo local.

## Estrutura técnica

- Separar o cenário, objetos interativos, gato/sprites, player Spotify, Audio Lab, equalizador, visualizador, ambiente e dados/configurações em componentes próprios.
- Centralizar estado compartilhado da experiência sem misturar processamento de áudio com a apresentação do quarto.
- Definir toda a paleta, tipografia, sombras, animações e tamanhos no sistema visual global, usando tokens sem cores soltas nos componentes.
- Adicionar metadados próprios de EMO ROOM à página inicial.

## Verificação

- Confirmar recorte e cadência dos sprites Idle/Run e a presença real dos assets dos dois ZIPs.
- Testar todas as interações do quarto e os painéis.
- Testar upload, reprodução, equalização, presets e visualizador com um áudio local de teste.
- Validar desktop e celular, garantindo que o gato, o quarto e o player continuem visíveis e utilizáveis.
- Confirmar que o Spotify Embed carrega em modo oficial e que o estado sem playlist não possui conteúdo falso.

Pode executar esse plano.

&nbsp;

Antes de implementar, faça estas correções/garantias:

&nbsp;

1. ASSETS DOS ZIPs

Os ZIPs enviados são assets reais do projeto.

&nbsp;

Extraia e integre os arquivos diretamente ao projeto.

&nbsp;

Use principalmente:

&nbsp;

- Black-Idle.png

- Black-Run.png

- pet12.png

&nbsp;

Não substitua esses assets por imagens geradas ou placeholders.

&nbsp;

Para Black-Idle.png:

- tratar como sprite sheet

- 12 frames

- cada frame 48×48

&nbsp;

Para Black-Run.png:

- tratar como sprite sheet

- 6 frames

- cada frame 48×48

&nbsp;

Para pet12.png:

- NÃO assuma cegamente a quantidade de frames.

- Primeiro inspecione a imagem e confirme visualmente a grade.

- Se a grade realmente for 4×11 com frames de 128×128, implemente dessa forma.

- Se houver alguma diferença, adapte a implementação às dimensões reais do arquivo.

&nbsp;

Todos os sprites devem usar:

image-rendering: pixelated;

&nbsp;

Não suavizar, redimensionar com blur ou aplicar filtros que destruam o pixel art.

&nbsp;

2. GATO

O gato preto dos arquivos BlackCat deve ser o personagem principal.

&nbsp;

Implementar:

- Idle

- Run

- mudança de direção

- movimento pelo quarto

- pausas

- reação ao clique/toque

&nbsp;

O gato deve estar integrado ao cenário e não parecer uma imagem HTML simplesmente sobreposta.

&nbsp;

3. SPOTIFY

Usar exclusivamente:

- Spotify Embed oficial

- Spotify IFrame API oficial quando aplicável

&nbsp;

Não tentar extrair o áudio.

&nbsp;

Não baixar músicas.

&nbsp;

Não processar o áudio do Spotify com Web Audio API.

&nbsp;

Não inventar controles que o Spotify Embed não disponibiliza.

&nbsp;

Deixar uma configuração simples onde futuramente eu possa colocar o link/URI da minha playlist.

&nbsp;

Enquanto nenhuma playlist estiver configurada, mostrar:

&nbsp;

"Playlist ainda não configurada"

&nbsp;

Não inventar músicas, artistas ou capas.

&nbsp;

4. AUDIO LAB

O Audio Lab será exclusivamente para arquivos locais/autorizados.

&nbsp;

O arquivo deve ser processado no navegador através da Web Audio API.

&nbsp;

Não enviar o arquivo para um servidor.

&nbsp;

Implementar a cadeia de áudio de forma modular para que os efeitos possam ser ligados/desligados individualmente.

&nbsp;

5. VISUAL

Não transforme o projeto em dashboard.

&nbsp;

O quarto deve continuar sendo a interface principal.

&nbsp;

Menus e painéis devem aparecer como elementos integrados ao ambiente.

&nbsp;

No celular, os painéis devem ocupar o mínimo possível da tela e possuir uma forma clara de fechar.

&nbsp;

6. RESPONSIVIDADE

Priorizar celular.

&nbsp;

O cenário deve se adaptar à proporção da tela sem deformar os sprites.

&nbsp;

Preservar:

- pixel art

- proporções

- nitidez

- posição relativa dos objetos

&nbsp;

7. IMPLEMENTAÇÃO

Depois de implementar, faça uma verificação completa:

&nbsp;

- sprites carregam

- frames estão recortados corretamente

- gato anima

- gato se movimenta

- interações funcionam

- Spotify Embed funciona quando uma playlist real for configurada

- estado sem playlist funciona

- Audio Lab aceita arquivo local

- EQ funciona

- presets funcionam

- visualizer reage ao áudio local

- ambiente funciona

- layout funciona no celular

- layout funciona no desktop

&nbsp;

Se alguma funcionalidade da especificação não puder ser implementada exatamente por uma limitação técnica ou da API, não simule o funcionamento.

&nbsp;

Deixe a limitação clara no código e implemente a alternativa oficial mais próxima.

&nbsp;

Agora pode executar o plano.