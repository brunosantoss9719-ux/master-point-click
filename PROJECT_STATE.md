# Estado do projeto

## LAST VERIFIED STATE
MVP jogável na `main`: 5 cenas, 20 hotspots, celular, inventário, Dossiê com 9 entradas, escolhas, consequências atrasadas, 3 finais e autosave/Continuar. Direção visual em pixel art/cartum detalhado; Alexandre de Moraes aparece como cameo satírico mudo na TV da cena 2. Daniel agora usa o retrato transparente dedicado `assets/daniel-vorcaro.webp`, aprovado em 19/09/2026 e registrado como sua referência mestra em `ART_BIBLE.md`; Helena, Otávio, Caio e Investigadora continuam usando `assets/characters.webp`. O retrato do Daniel também integra o shell offline da PWA em `master-shell-v5`.

O jogo permanece uma PWA instalável com `display: fullscreen`, orientação landscape preferencial, tentativa de Fullscreen API + lock de orientação no primeiro toque e fallback jogável em retrato sem tela bloqueadora. O viewport acompanha a área visual real do navegador e respeita safe areas. A instalação agora usa ícones PNG 192/512 além dos SVGs e o botão `Instalar app` permanece acessível fora do modo instalado, com instrução curta quando o navegador interno não expõe o prompt nativo. Áudio original procedural: cama lo-fi noturna, ambiência filtrada, beat discreto, blips de diálogo por personagem e controle de mudo; a mixagem foi reforçada para alto-falantes de celular e retoma o contexto de áudio ao voltar ao jogo.

Preview do código integrado: https://raw.githack.com/brunosantoss9719-ux/master-point-click/e81f8db71ff7279b395e007c84e6f272487f7bd7/index.html

## LAST TEST
2026-09-19: QA run 28 (`35470576918`) passou no commit `e81f8db71ff7279b395e007c84e6f272487f7bd7`. `npm test` confirmou 3 playthroughs completos, 5 cenas, 3 finais, Dossiê e save/Continuar; `node --check app.js`, JSON dos manifestos e `git diff --check` passaram. O smoke real em Chrome headless validou os ícones PWA PNG, 915×412 landscape, 412×915 retrato, service worker ativo e ausência de tela bloqueadora de orientação. As duas capturas foram revisadas visualmente: viewport preenchido, diálogo legível, controles livres e retrato do Daniel sem corte.

## LAST COMMIT
e81f8db71ff7279b395e007c84e6f272487f7bd7 (PWA móvel endurecida, instalação com PNGs confiáveis e áudio reforçado para celular).

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido no código. Preview Vercel continua dependendo de autenticação/conexão do projeto; a experiência instalada em um aparelho Android físico ainda não foi verificada nesta sessão.

## NEXT REAL
Gerar duas expressões alternativas do Daniel a partir de `assets/daniel-vorcaro.webp` e alterná-las nos diálogos mais tensos; depois aplicar o mesmo processo aos demais personagens sem alterar a lógica do motor.
