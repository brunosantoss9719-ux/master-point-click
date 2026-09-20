# Direção de arte — Linha de Custódia

- Linguagem própria: pixel art/cartum detalhado, noturno, contornos legíveis, azul-marinho, carvão, âmbar e ciano. Coffee Talk é referência somente de enquadramento, conforto e atmosfera.
- A campanha deve parecer jogo: cenário ocupa a tela; etiquetas apontam objetos no ambiente; diálogo e Dossiê se sobrepõem como peças diegéticas, sem sidebar, métricas ou grade SaaS.
- Câmera 16:9 com fallback retrato. Safe areas e `100dvh`; toque mínimo de 44 px.

## Referência mestra da protagonista

O quarto retrato de `assets/characters.webp` é a referência mestra da Investigadora: mulher brasileira, cabelo escuro preso, jaqueta preta, postura contida, humor seco. Manter formato do rosto, cabelo, proporções, roupa e recorte ciano/âmbar. Ela é ficcional e composita; não copiar agente real.

Personagens recorrentes compartilham `assets/characters.webp`:

- Coordenadora/delegada: presença sóbria, foco procedimental.
- Perita digital: precisão visual e gestual; nunca “hacker”.
- Analista financeira: leitura de documentos, não aula expositiva.

## Cenários e variedade

- `hangar.webp`: cold open e retorno recontextualizado.
- `office.webp`: sala operacional/arquivo, usado com hotspots diferentes.
- `interview.webp`: oitiva e confronto.
- `stf-office.webp`: efeito institucional das decisões, sem conversa privada de ministro.
- `pf-lab.webp`: perícia, linha digital e final da mídia forense.

Pessoas reais não aparecem como avatares controláveis na campanha. Assets antigos de Vorcaro, Toffoli e Mendonça permanecem preservados, mas fora do fluxo principal.

## Interface e áudio

- Dossiê: papel escuro, etiquetas pequenas e metadados; não interpreta automaticamente conexões.
- Hipótese: seleção por toque de evidência A/B/C; nunca drag obrigatório.
- Áudio: Web Audio procedural curto, grave e acolhedor. Senoides e triângulos filtrados em low-pass, ataques macios e caudas curtas para gesto inicial, diálogo, evidência, contradição e conclusão. A referência é a sensação confortável de um café noturno, sem copiar efeitos de `Coffee Talk`. Sem música/ambiência contínua; falha de áudio nunca bloqueia o jogo.

## Interação v2

- Não usar anéis, círculos ou “+” flutuantes.
- Objeto examinável recebe etiqueta retangular, filete lateral e linha física.
- Estado visitado reduz contraste e troca EXAMINAR por REVER; não depende só de cor.
- Mesa do Caso usa papel, pasta, carimbo, transcrição e mídia, não dashboard.
- Toque A → toque B substitui drag-and-drop.
- Som principal entre 92–196 Hz; fala usa blips baixos por personagem.
