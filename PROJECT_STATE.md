# Estado do projeto

## LAST VERIFIED STATE

Campanha principal reestruturada como **MASTER — Linha de Custódia**, thriller investigativo point-and-click com protagonista ficcional e composita da PF. O jogador percorre 9 cenas, encontra 21 evidências com datas e proveniência, seleciona conjuntos aceitos, formula hipóteses, confronta uma afirmação em oitiva e escolhe a ordem de **A Turma** / **Os Meninos** antes da convergência.

O fluxo anterior controlado por Vorcaro, Toffoli e Mendonça foi removido da campanha principal. As decisões de ministros aparecem pelos efeitos institucionais. Os 15 puzzles mecânicos foram substituídos por investigação de cena, cruzamento, hipótese e confronto. O bônus Copa 2022 e seus assets foram preservados fora do fluxo principal enquanto aguarda adaptação ao novo motor.

Arquitetura simples: `app.js` contém o motor e UI; `content/master-case.js` contém cenas/evidências; `content/sources.js` contém o ledger usado pela interface. Save em `localStorage` (`master-investigation-v1`), PWA fullscreen/landscape e áudio procedural após gesto permanecem.

## LAST TEST

2026-09-20: `node --check` passou em motor e conteúdo. `npm test` passou: 9 cenas, 21 evidências temporais, fontes, PWA, DOM, rota principal, duas ordens de leads, caminhos alternativos e fail forward. No preview público, o navegador confirmou carregamento, abertura do jogo, descoberta de evidências, hipótese `SUPPORTED`, avanço de cena, persistência após reload e botão Continuar. A captura desktop foi revisada. O teste automatizado nos viewports móveis exatos ficou bloqueado porque o executor local não possui Chrome/Chromium e o navegador conectado não expõe mudança de viewport; não está marcado como PASS mobile.

## LAST COMMIT

`3d06bfa` — correção de hotspots por delegação de eventos sobre o checkpoint `8d38fdd` da campanha investigativa.

## CURRENT BLOCKERS

- QA visual em navegador real ainda precisa ser concluído em 915×412, landscape menor e retrato; a captura desktop já foi revisada.
- Playtest humano cego de dificuldade ainda não foi realizado; testes automatizados comprovam lógica, não diversão.
- O bônus Copa 2022 está preservado, mas temporariamente fora do fluxo jogável principal até adaptação ao novo motor.

## NEXT REAL

1. Publicar preview da campanha nova e executar QA visual real nos três viewports.
2. Fazer playtest humano cego, observando se cada AHA nasce do cruzamento e se as dicas não entregam a resposta.
3. Adaptar o bônus Copa 2022 ao motor investigativo sem reintroduzir puzzles abstratos.
