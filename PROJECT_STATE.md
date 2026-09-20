# Estado do projeto

## LAST VERIFIED STATE
Jogo com três arcos principais e o bônus **Punhal Verde e Amarelo / Copa 2022**, somando 17 cenas e 15 puzzles. A antiga bancada repetida de selecionar ferramenta e alvo não é mais renderizada. Os desafios agora usam seis mecanismos: mosaico de fragmentos, documento deslizante, anéis/cilindros, circuito rotativo, matriz lógica de luzes e decodificador.

No bônus, envelope, folha de carbono, matriz de sinais, acetato de zonas e fita de rádio atravessam os cinco capítulos como uma cadeia de inventário. O roteiro acontece na rua por cenário, voz, reflexos e objetos. Não há retratos sobrepostos, TV, futebol, sala inventada, endereço legível nem rota operacional.

Daniel continua usando o retrato aprovado em `assets/daniel-vorcaro.webp` (blob `4c192cf6fbc292ddadffb502f52fb266a99986a5`), pré-carregado no HTML e referenciado explicitamente pelo CSS.

A PWA permanece em tela cheia e landscape preferencial, com fallback jogável em retrato. Não há música nem ambiência contínua. O Web Audio espera o `AudioContext` entrar em execução após o primeiro toque, toca dois tons de confirmação e mantém efeitos procedurais audíveis para interface, diálogo, mecanismos, item, erro e conclusão. O shell offline é `master-shell-v15`; JS e CSS usam a revisão `mechanisms-3`.

Preview fixo verificado:
https://raw.githack.com/brunosantoss9719-ux/master-point-click/72d79954a3e11c94f5fb72d8ae50b5551cccdc40/index.html

## LAST TEST
2026-09-20: GitHub Actions QA run 37 (`35490743848`) passou no commit `72d79954a3e11c94f5fb72d8ae50b5551cccdc40`. O teste percorreu as rotas e resolveu os 15 puzzles em seis mecânicas, verificou a cadeia de itens do bônus, save/Continuar, PWA e service worker. No Chrome móvel 915×412, um gesto real deixou o áudio em estado `running` e disparou a confirmação sonora. As capturas de landscape, retrato, bônus, mosaico e circuito foram revisadas; o circuito cabe inteiro e o bônus abre sem retrato ou fala herdada de outro arco.

## LAST COMMIT
`72d79954a3e11c94f5fb72d8ae50b5551cccdc40` — puzzles visuais ligados à história, roteiro ambiental do bônus, áudio móvel desbloqueável e shell PWA v15.

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido. A audição em um aparelho Android físico ainda depende do volume de mídia e da configuração silenciosa do próprio aparelho.

## NEXT REAL
Prosseguir deste checkpoint. Preservar o retrato aprovado de Daniel, manter música/ambiência contínua fora do jogo e não reintroduzir bancadas de associação entre listas. Novos puzzles devem alterar visualmente um mecanismo ou o cenário e nascer de documento, objeto ou conflito da história.
