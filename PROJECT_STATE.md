# Estado do projeto

## LAST VERIFIED STATE
Jogo com três arcos, 12 cenas e 10 puzzles narrativos: Daniel Vorcaro, Toffolinho e André Mendonça. Os antigos desafios de selecionar, ordenar e ligar cartões foram removidos. Cada puzzle agora é uma bancada multietapa com ferramentas, documentos, mecanismos, terminais ou evidências manipuláveis. O inventário local muda durante o desafio, pré-requisitos produzem resposta contextual e erros não alteram métricas nem bloqueiam a história. As aberturas e interações secundárias foram encurtadas para deixar exploração e ação conduzirem o ritmo.

Direção visual em pixel art/cartum detalhado. A nova bancada usa duas áreas responsivas — ferramentas e objetos de trabalho — com estados bloqueado, selecionado e concluído. Os assets existentes permanecem e integram o shell offline `master-shell-v9`.

O jogo permanece uma PWA instalável em tela cheia e landscape preferencial, com fallback jogável em retrato. A música, o baixo, a batida e o ruído contínuo foram removidos. Restaram somente efeitos procedurais discretos de interface, cenário, avanço de fala, digitação espaçada, item, erro e solução; o controle agora se chama `Efeitos`.

Preview do código integrado: será atualizado após o commit desta reformulação.

## LAST TEST
2026-09-20: `npm test` resolveu os 10 novos puzzles pelas dependências e ferramentas reais, percorreu 3 rotas Vorcaro e os arcos Toffolinho e Mendonça completos, preservando 5 encerramentos, 17 entradas de Dossiê, inventário e save/Continuar. A validação visual local aguarda o Chrome disponível no CI.

## LAST COMMIT
Pendente: reformulação de puzzles, diálogos e áudio.

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido. A experiência instalada em um aparelho Android físico ainda precisa de conferência manual.

## NEXT REAL
Prosseguir apenas a partir de acontecimentos posteriores a 19/09/2026. Manter o princípio de que cada puzzle nasce de decisão, documento ou cadeia de evidências da história, nunca de minigame solto.
