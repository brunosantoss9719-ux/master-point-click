# Estado do projeto

## LAST VERIFIED STATE
Jogo com três arcos principais e um bônus, somando 17 cenas e 15 puzzles narrativos. O bônus **Punhal Verde e Amarelo / Copa 2022** é selecionável no título e acompanha cinco fases: preparação e reunião atribuída pela acusação, ativação das seis linhas, mês de monitoramento, equipes em campo em 15/12 e ordem de abortar às 20h59. O jogador controla um FE ficcional; os seis codinomes publicados aparecem, mas identidades não confirmadas continuam marcadas como lacuna.

Todo o bônus acontece no exterior, em ruas de Brasília. A arte inclui seis FEs compostos, rua residencial, eixo cívico e ponto de retorno. Não há TV, futebol, sala inventada, endereço legível nem rota operacional.

Daniel usa o retrato aprovado em `assets/daniel-vorcaro.webp` (blob `4c192cf6fbc292ddadffb502f52fb266a99986a5`) no jogo atual. O CSS aponta explicitamente para esse asset, inclusive no layout móvel.

O jogo permanece uma PWA instalável em tela cheia e landscape preferencial, com fallback jogável em retrato. **Não há música, baixo, batida nem ambiência contínua.** O Web Audio atual mantém apenas efeitos procedurais curtos: interface, interação de cenário, avanço de fala, digitação, item, erro e solução. O controle se chama `Efeitos`.

Para eliminar código antigo servido por cache, o shell offline foi elevado para `master-shell-v12` e `app.js`/`styles.css` usam a revisão `copa-street-2`. O retrato do Daniel também é pré-carregado no HTML.

Preview fixo verificado:
https://raw.githack.com/brunosantoss9719-ux/master-point-click/da79e360f03e49f073c65d8a00698c1606c68d3e/index.html

## LAST TEST
2026-09-20: GitHub Actions QA run 34 (`35488149588`) passou no commit `da79e360f03e49f073c65d8a00698c1606c68d3e`. A etapa de validação funcional passou, o servidor estático iniciou corretamente e o smoke visual móvel passou. A versão testada contém 17 cenas, 15 puzzles, os três arcos principais, o bônus Copa 2022, save/Continuar, PWA, efeitos sonoros discretos sem música e o retrato aprovado de Daniel.

## LAST COMMIT
`da79e360f03e49f073c65d8a00698c1606c68d3e` — cache do build mais recente invalidado e retrato aprovado de Daniel garantido no projeto atual.

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido. A experiência instalada em um aparelho Android físico ainda precisa de conferência manual.

## NEXT REAL
Prosseguir a partir deste checkpoint. Para novas alterações visuais do Daniel, usar `assets/daniel-vorcaro.webp` como referência mestra. Manter música/ambiência contínua fora do jogo e preservar apenas efeitos pontuais.
