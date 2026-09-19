# Estado do projeto

## LAST VERIFIED STATE
Jogo na `main` com dois arcos, 8 cenas e 6 puzzles narrativos: 5 cenas de Daniel Vorcaro e 3 cenas jogáveis de Toffolinho, celular, inventário, Dossiê com 13 entradas, escolhas, consequências atrasadas, 3 finais do primeiro arco, encerramento `A CHAVE MUDA DE MÃO` e autosave/Continuar. No arco Vorcaro, o jogador separa condições do acordo, reconstrói a cronologia e cruza versões com vestígios. No arco Toffolinho, ordena níveis de sigilo, monta a cadeia de custódia e liga as relações reportadas do Tayayá. Erros aumentam a pressão sem bloquear a história; soluções limpas melhoram a confiança.

Direção visual em pixel art/cartum detalhado. Toffolinho usa o retrato transparente original `assets/toffoli.webp` sobre o novo gabinete noturno `assets/stf-office.webp`; Daniel mantém `assets/daniel-vorcaro.webp` e Helena, Otávio, Caio e Investigadora continuam em `assets/characters.webp`. As referências foram registradas em `ART_BIBLE.md`; puzzles e assets integram o shell offline `master-shell-v7`.

O jogo permanece uma PWA instalável com `display: fullscreen`, orientação landscape preferencial, tentativa de Fullscreen API + lock de orientação no primeiro toque e fallback jogável em retrato sem tela bloqueadora. O viewport acompanha a área visual real do navegador e respeita safe areas. A instalação agora usa ícones PNG 192/512 além dos SVGs e o botão `Instalar app` permanece acessível fora do modo instalado, com instrução curta quando o navegador interno não expõe o prompt nativo. Áudio original procedural: cama lo-fi noturna, ambiência filtrada, beat discreto, blips de diálogo por personagem e controle de mudo; a mixagem foi reforçada para alto-falantes de celular e retoma o contexto de áudio ao voltar ao jogo.

Preview do código integrado: https://raw.githack.com/brunosantoss9719-ux/master-point-click/f790b519d0b59c5242c7d5833df3d24e6abb72a4/index.html

## LAST TEST
2026-09-19: QA run 30 (`35472970597`) passou no commit `f790b519d0b59c5242c7d5833df3d24e6abb72a4`. `npm test` resolveu pelas regras reais os 6 puzzles, percorreu 3 rotas Vorcaro e o arco Toffolinho completo, preservando os 4 desfechos, 13 entradas de Dossiê e save/Continuar; `node --check app.js` e `git diff --check` passaram. O Chrome headless validou landscape 915×412, retrato 412×915, PWA offline e a abertura do puzzle. As capturas foram revisadas: cartões, sequência, botões e textos permanecem legíveis e sem cortes nas duas orientações.

## LAST COMMIT
f790b519d0b59c5242c7d5833df3d24e6abb72a4 (6 puzzles narrativos integrados aos dois arcos, consequências e interface mobile).

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido no código. Preview Vercel continua dependendo de autenticação/conexão do projeto; a experiência instalada em um aparelho Android físico ainda não foi verificada nesta sessão.

## NEXT REAL
Se o próximo arco for solicitado, começar exatamente no recebimento do processo por André Mendonça e manter o mesmo princípio: cada puzzle deve nascer de uma decisão ou documento da história, nunca de um minigame solto.
