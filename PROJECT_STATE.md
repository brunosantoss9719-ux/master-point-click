# Estado do projeto

## LAST VERIFIED STATE
MVP jogável na `main`: 5 cenas, 20 hotspots, celular, inventário, Dossiê com 9 entradas, escolhas, consequências atrasadas, 3 finais e autosave/Continuar. Direção visual em pixel art 32-bit caricatural; Alexandre de Moraes aparece como cameo satírico mudo na TV da cena 2. O jogo agora é uma PWA instalável com `display: fullscreen`, orientação landscape preferencial, tentativa de Fullscreen API + lock de orientação no primeiro toque e fallback jogável em retrato sem tela bloqueadora. O viewport acompanha a área visual real do navegador e respeita safe areas. Há service worker para shell offline. Áudio original procedural: cama lo-fi noturna, ambiência filtrada, beat discreto, blips de diálogo por personagem e controle de mudo.

Preview do código integrado: https://raw.githack.com/brunosantoss9719-ux/master-point-click/cf32a6ea8d2d7f1333c22ddcd7331bfa6715a2ed/index.html

## LAST TEST
2026-09-19: PR #1 / QA run 23 passou. `npm test` confirmou 3 playthroughs completos, 5 cenas, 3 finais, Dossiê e save/Continuar; `node --check app.js` passou. Smoke real em Chrome headless móvel validou 915×412 landscape e 412×915 retrato, ausência do antigo overlay de rotação, altura do app igual ao viewport e service worker ativo. Screenshots dos dois viewports foram revisados visualmente após compactação do HUD; sem corte ou bloqueio de interação detectado.

## LAST COMMIT
cf32a6ea8d2d7f1333c22ddcd7331bfa6715a2ed (PWA imersiva, viewport móvel, offline e áudio original integrados por squash do PR #1).

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido no código. Preview Vercel continua dependendo de autenticação/conexão do projeto; a experiência instalada em um aparelho Android físico ainda não foi verificada nesta sessão.

## NEXT REAL
Adicionar duas expressões alternativas aos personagens principais e alterná-las nos diálogos mais tensos, preservando a referência mestra de `assets/characters.webp`.
