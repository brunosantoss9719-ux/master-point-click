# Estado do projeto

## LAST VERIFIED STATE
Jogo na `main` com três arcos, 12 cenas e 10 puzzles narrativos: Daniel Vorcaro, Toffolinho e André Mendonça. O arco III começa na redistribuição, passa pela devolução do fluxo pericial à PF, pelo relatório sobre autoridades, pelo afastamento e retorno de Andrei Rodrigues e termina em 19/09/2026, quando Mendonça pede ajuda técnica à própria PF para acessar a cópia criptografada de cerca de 500 GB. O Dossiê tem 17 entradas, há 3 finais do primeiro arco e os encerramentos `A CHAVE MUDA DE MÃO` e `A CHAVE SEM SENHA`. Erros nos puzzles aumentam a pressão sem bloquear a história; soluções limpas melhoram a confiança.

Direção visual em pixel art/cartum detalhado. André Mendonça usa o retrato transparente original `assets/andre-mendonca.webp`; o novo `assets/pf-lab.webp` representa o laboratório forense. Toffolinho mantém `assets/toffoli.webp`, Daniel usa `assets/daniel-vorcaro.webp` e os personagens compostos permanecem em `assets/characters.webp`. Referências registradas em `ART_BIBLE.md`; todos os assets integram o shell offline `master-shell-v8`.

O jogo permanece uma PWA instalável com `display: fullscreen`, orientação landscape preferencial, tentativa de Fullscreen API + lock de orientação no primeiro toque e fallback jogável em retrato sem tela bloqueadora. O viewport acompanha a área visual real do navegador e respeita safe areas. A instalação agora usa ícones PNG 192/512 além dos SVGs e o botão `Instalar app` permanece acessível fora do modo instalado, com instrução curta quando o navegador interno não expõe o prompt nativo. Áudio original procedural: cama lo-fi noturna, ambiência filtrada, beat discreto, blips de diálogo por personagem e controle de mudo; a mixagem foi reforçada para alto-falantes de celular e retoma o contexto de áudio ao voltar ao jogo.

Preview do código integrado: https://raw.githack.com/brunosantoss9719-ux/master-point-click/5ad806e24dd8f15364af711c8db6db51687a8cde/index.html

## LAST TEST
2026-09-19: QA run 31 (`35475071187`) passou no commit `5ad806e24dd8f15364af711c8db6db51687a8cde`. `npm test` resolveu os 10 puzzles pelas regras reais, percorreu 3 rotas Vorcaro e os arcos Toffolinho e Mendonça completos, preservando 5 encerramentos, 17 entradas de Dossiê, inventário e save/Continuar. O Chrome headless validou landscape 915×412, retrato 412×915, service worker, retratos de Daniel/Toffoli/Mendonça e o puzzle do novo arco. Capturas revisadas sem cortes, sobreposição ou perda de legibilidade.

## LAST COMMIT
5ad806e24dd8f15364af711c8db6db51687a8cde (arco André Mendonça × PF, 4 cenas, 4 puzzles, retrato, laboratório forense e novo final).

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido no código. Preview Vercel continua dependendo de autenticação/conexão do projeto; a experiência instalada em um aparelho Android físico ainda não foi verificada nesta sessão.

## NEXT REAL
Prosseguir apenas a partir de acontecimentos posteriores a 19/09/2026. Manter o princípio de que cada puzzle nasce de decisão, documento ou cadeia de evidências da história, nunca de minigame solto.
