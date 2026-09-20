# Estado do projeto

## LAST VERIFIED STATE
Jogo com três arcos principais e um bônus, somando 17 cenas e 15 puzzles narrativos. O bônus **Punhal Verde e Amarelo / Copa 2022** é selecionável no título e acompanha cinco fases: preparação e reunião atribuída pela acusação, ativação das seis linhas, mês de monitoramento, equipes em campo em 15/12 e ordem de abortar às 20h59. O jogador controla um FE ficcional; os seis codinomes publicados aparecem, mas identidades não confirmadas continuam marcadas como lacuna.

Todo o bônus acontece no exterior, em ruas de Brasília. A arte nova inclui seis FEs compostos, rua residencial, eixo cívico e ponto de retorno. Não há TV, futebol, sala inventada, endereço legível nem rota operacional. O shell offline foi atualizado para `master-shell-v11`.

O jogo permanece uma PWA instalável em tela cheia e landscape preferencial, com fallback jogável em retrato. A música, o baixo, a batida e o ruído contínuo foram removidos. Restaram somente efeitos procedurais discretos de interface, cenário, avanço de fala, digitação espaçada, item, erro e solução; o controle agora se chama `Efeitos`.

O preview fixo será atualizado após a publicação deste checkpoint.

## LAST TEST
2026-09-20: `npm test` local passou com 17 cenas, 15 puzzles multietapa, 3 rotas Vorcaro, arcos Toffolinho e Mendonça e os cinco capítulos do bônus completos. O teste verificou 9 entradas específicas do Dossiê Copa 2022, final próprio, inventário e save/Continuar. QA visual móvel do checkpoint ainda será executado pelo GitHub Actions.

## LAST COMMIT
Checkpoint local aguardando publicação: bônus Punhal Verde e Amarelo em cinco capítulos externos, arte dos seis FEs e shell PWA v11.

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido. A experiência instalada em um aparelho Android físico ainda precisa de conferência manual.

## NEXT REAL
Depois do QA móvel, prosseguir apenas a partir de acontecimentos posteriores a 19/09/2026 ou aprofundar o bônus somente com novas fontes públicas. Manter endereços, rotas e procedimentos operacionais fora do jogo.
