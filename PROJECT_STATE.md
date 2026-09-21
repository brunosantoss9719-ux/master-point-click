# PROJECT STATE

## Estado atual

MASTER v3 é um thriller investigativo point-and-click em HTML/CSS/JavaScript. A arte aprovada foi preservada. O bloqueio “inspecione tudo → abra um minigame” e as oito mecânicas descartáveis foram removidos.

O núcleo agora é um grafo de 41 diligências com quatro verbos persistentes:

- **RASTREAR:** seguir nome, data, entidade ou identificador;
- **VERIFICAR:** pedir confirmação à fonte adequada;
- **CONFRONTAR:** pressionar uma afirmação e decidir o que revelar;
- **FORMALIZAR:** registrar uma conclusão estreita e sua consequência.

Objetos de cenário são opcionais e dão contexto. Diligências surgem pelo conhecimento já adquirido. Linhas fracas geram correção, resistência ou limite probatório; não existe “ERRADO”. A Turma e Os Meninos funcionam nas duas ordens e convergem.

## Conteúdo e voz

- 9 cenas, 27 evidências e 41 diligências.
- Mara, Lia, Bia e Jo têm sintaxe, tamanho médio de fala e objetivo distintos.
- A oitiva aceita preparação por data ou função, exige confronto documental e inclui apresentação inadequada com fail forward.
- Prólogo curto e operacional; aeroporto recontextualizado depois.
- Autoridades reais aparecem somente por atos públicos.
- Final mantém Pet 16662 e destino da cópia como PENDENTE.
- Bônus Copa 2022 preservado fora do fluxo principal.

## Estado e persistência

Chave `master-investigation-v3`. O save representa cena, evidências, inspeções, conclusões, flags de confronto, conhecimento, ordem das linhas, beats, diligências concluídas, log de ações, recontextualizações, dicas e fontes abertas. Saves v2 são ignorados porque o modelo de jogo mudou.

## Áudio

Web Audio procedural, desbloqueado no primeiro gesto e nunca bloqueante. Paleta principal em 73–147 Hz, passa-baixa de 260–340 Hz, volumes maiores que na v2, ataque macio e caudas curtas. Há sinais distintos para papel, diligência, limite, conclusão e fala. Sem música/ambiência contínua, conforme o cânone; nenhum efeito foi copiado.

## Validação

`npm test` valida schema, fontes, PWA, ausência do motor antigo, quatro verbos, resumo de evidências, 41 diligências e quatro playthroughs completos: dois caminhos iniciais × duas ordens de leads. As rotas incluem escolhas ruins, confronto inadequado e conclusão digital exagerada.

O navegador automatizado local não está disponível nesta execução (`google-chrome` e `agent-browser` ausentes). O navegador remoto não alcança `localhost`. Portanto, este arquivo não registra falso PASS visual antes da publicação; a checagem pública deve ocorrer depois do push/deploy.

## LAST VERIFIED STATE

21/09/2026 — v3 implementada no worktree canônico; quatro rotas lógicas completas e save schema v3 validados. Visual preservado por CSS incremental. Verificação pública pós-deploy ainda pendente neste checkpoint.

## LAST TEST

`npm test` — PASS: 9 cenas, 27 evidências, 41 diligências, 4 verbos, firewall, PWA, caminhos alternativos, fail forward e duas ordens de leads.

## LAST COMMIT

`2bcad150ba9d11e4feb05fc50b8a305c7d225b10` — base canônica anterior; o próximo commit é o checkpoint da reformulação v3.

## CURRENT BLOCKERS

- Verificação visual pública em 915×412, landscape menor e retrato após deploy.
- Playtest humano cego continua necessário para medir diversão e dificuldade; automação não prova isso.
- CLI Vercel e vínculo `.vercel` não existem neste ambiente; publicação depende da integração GitHub já configurada ou de acesso posterior ao projeto.

## NEXT REAL

Publicar o checkpoint, abrir o deploy em navegador real, percorrer pelo menos uma rota com reload/Continuar e ajustar apenas problemas observados. Depois, realizar playtest humano cego.
