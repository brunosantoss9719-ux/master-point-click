# Estado do projeto

## LAST VERIFIED STATE
MVP jogável na `main`: 5 cenas, 20 hotspots, celular, inventário, Dossiê com 9 entradas, escolhas, consequências atrasadas, 3 finais e autosave/Continuar. Preview público de contingência: https://raw.githack.com/brunosantoss9719-ux/master-point-click/main/index.html

## LAST TEST
2026-09-19: `npm test` passou (3 rotas completas/3 finais e save); `node --check app.js`, `git diff --check` e smoke HTTP dos assets passaram. Playthrough real completo no navegador landscape percorreu os 20 hotspots até **A PASTA ABERTA**; celular, inventário, Dossiê e reload/Continuar foram verificados, sem erro de console originado pelo jogo.

## LAST COMMIT
2f8811ae2bd58b87f36cae775780334bae090f5e (código e conteúdo verificados; este arquivo será atualizado no commit final de handoff).

## CURRENT BLOCKERS
Preview Vercel depende de autenticação: conector indisponível e CLI sem sessão. A GitHub App também não tem permissão para habilitar Pages; o preview público de contingência acima está funcional.

## NEXT REAL
Autenticar a Vercel, importar o repositório e fazer um sanity check em Chrome Android físico (915×412).
