# Estado do projeto

## LAST VERIFIED STATE
MVP jogável na `main`: 5 cenas, 20 hotspots, celular, inventário, Dossiê com 9 entradas, escolhas, consequências atrasadas, 3 finais e autosave/Continuar. Direção visual em pixel art/cartum detalhado; Alexandre de Moraes aparece como cameo satírico mudo na TV da cena 2. Daniel agora usa o retrato transparente dedicado `assets/daniel-vorcaro.webp`, aprovado em 19/09/2026 e registrado como sua referência mestra em `ART_BIBLE.md`; Helena, Otávio, Caio e Investigadora continuam usando `assets/characters.webp`. O retrato do Daniel também integra o shell offline da PWA em `master-shell-v4`.

O jogo permanece uma PWA instalável com `display: fullscreen`, orientação landscape preferencial, tentativa de Fullscreen API + lock de orientação no primeiro toque e fallback jogável em retrato sem tela bloqueadora. O viewport acompanha a área visual real do navegador e respeita safe areas. Áudio original procedural: cama lo-fi noturna, ambiência filtrada, beat discreto, blips de diálogo por personagem e controle de mudo.

Preview do código integrado: https://raw.githack.com/brunosantoss9719-ux/master-point-click/d3de03b1468ca779c440ae5fbe3bc64aee96dd3f/index.html

## LAST TEST
2026-09-19: QA run 27 (`35460558618`) passou. `npm test` confirmou 3 playthroughs completos, 5 cenas, 3 finais, Dossiê e save/Continuar; `node --check app.js` passou. O smoke real em Chrome headless validou 915×412 landscape e 412×915 retrato, service worker ativo e confirmou durante uma fala do Daniel que o CSS carregava `assets/daniel-vorcaro.webp`. As capturas `mobile-landscape.png` e `mobile-portrait-fallback.png` foram revisadas visualmente: rosto sem corte, retrato bem enquadrado, caixa de diálogo legível e nenhuma obstrução funcional detectada.

## LAST COMMIT
d3de03b1468ca779c440ae5fbe3bc64aee96dd3f (novo retrato do Daniel integrado e smoke móvel tornado determinístico com verificação explícita do asset).

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido no código. Preview Vercel continua dependendo de autenticação/conexão do projeto; a experiência instalada em um aparelho Android físico ainda não foi verificada nesta sessão.

## NEXT REAL
Gerar duas expressões alternativas do Daniel a partir de `assets/daniel-vorcaro.webp` e alterná-las nos diálogos mais tensos; depois aplicar o mesmo processo aos demais personagens sem alterar a lógica do motor.
