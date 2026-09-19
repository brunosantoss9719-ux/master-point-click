# Estado do projeto

## LAST VERIFIED STATE
MVP jogável na `main`: 5 cenas, 20 hotspots, celular, inventário, Dossiê com 9 entradas, escolhas, consequências atrasadas, 3 finais e autosave/Continuar. Direção visual refeita em pixel art 32-bit caricatural; Alexandre de Moraes aparece como cameo satírico mudo na TV da cena 2. Preview verificada: https://raw.githack.com/brunosantoss9719-ux/master-point-click/0280cc6101d779c4f21704d3e6e42ba201d7fac9/index.html

## LAST TEST
2026-09-19: `npm test` passou (3 rotas completas/3 finais e save); `node --check app.js` e `git diff --check` passaram. No navegador landscape, título, fundo, retratos, interface pixelada, cena 2 e hotspot **Xandão na TV** foram verificados; nenhum erro de console originado pelo jogo.

## LAST COMMIT
0280cc6101d779c4f21704d3e6e42ba201d7fac9 (código, arte e cameo verificados).

## CURRENT BLOCKERS
Preview Vercel depende de autenticação: conector indisponível e CLI sem sessão. A GitHub App também não tem permissão para habilitar Pages; o preview público de contingência acima está funcional.

## NEXT REAL
Adicionar duas expressões alternativas aos personagens principais e alterná-las nos diálogos mais tensos.
