# MASTER — Linha de Custódia

Campanha principal: thriller investigativo point-and-click. A protagonista é uma investigadora ficcional e composita da Polícia Federal. O jogador descobre relações por inspeção, cruzamento, hipótese e confronto. Pessoas reais não recebem pensamentos privados inventados.

## Regras de conhecimento

Cada evidência jogável mantém `eventDate`, `documentDate`, `knownToPFDate`, `publishedDate`, status e fonte em `content/master-case.js`. A interface só oferece evidência descoberta. Conhecimento posterior não entra em diálogo anterior. Estados de conclusão: `INCOMPLETE`, `SUPPORTED`, `CONTRADICTED`, `CONTESTED` e `PENDING`.

## SCENE cold — 22H04

- DATA: 17/11/2025.
- PERGUNTA: o que os registros permitem afirmar sobre a viagem?
- ENTRADA: a equipe conhece o mandado e confirma o embarque; não conhece intenção subjetiva como fato.
- PERSONAGENS/OBJETIVOS: investigadora quer delimitar o que prova; coordenadora quer executar sem extrapolar.
- EVIDÊNCIAS: mandado, registro de embarque, versão posterior da defesa.
- INFERÊNCIA: viagem programada é fato; finalidade permanece disputada.
- THOUGHT PATH: voo + mandado ou voo + defesa. “Viagem = fuga” é interpretação excessiva.
- CONSEQUÊNCIA: prisão executada; corte para a origem da apuração.
- SAÍDA: como a investigação chegou ao aeroporto?
- FONTES: prisao1, defesa_viagem.
- STATUS: DOCUMENTADO / REPORTADO / DRAMATIZAÇÃO.

## SCENE mau — O mau cheiro

- DATA: 2024.
- PERGUNTA: dois registros descrevem a mesma carteira da mesma forma?
- ENTRADA: a origem da apuração é institucional; a protagonista recebe um recorte.
- PERSONAGENS/OBJETIVOS: analista quer reconciliar registros; investigadora quer formular uma divergência testável.
- EVIDÊNCIAS: planilha de cessão, arquivo de origem, comunicação institucional.
- INFERÊNCIA: identificador coincide; origem e cronologia divergem.
- THOUGHT PATH: lote A + lote B; o ofício é caminho redundante. O valor alto é misdirection insuficiente.
- CONSEQUÊNCIA: abre linha sobre origem documental.
- SAÍDA: quem podia afirmar a origem na data da cessão?
- FONTE: bc_comunicacao.
- STATUS: DOCUMENTADO / DRAMATIZAÇÃO.

## SCENE fantasma — A carteira fantasma

- DATA: 30/12/2025.
- PERGUNTA: qual contradição deve ser levada à oitiva?
- ENTRADA: a equipe conhece os registros; o jogador ainda precisa cruzá-los.
- PERSONAGENS/OBJETIVOS: investigadora quer origem; coordenadora quer pergunta auditável; depoente dramatizado contesta premissas amplas.
- EVIDÊNCIAS: documento Tirreno, cessão ao BRB, trecho da oitiva.
- INFERÊNCIA: a origem declarada não fecha com a sequência documental.
- THOUGHT PATH: Tirreno + BRB ou arquivo anterior + BRB.
- CONFRONTO: pressionar a contestação de premissa e apresentar um registro de origem. Evidência inadequada gera resistência e permite continuar.
- CONSEQUÊNCIA: divergência permanece registrada, sem converter depoimento em confissão.
- SAÍDA: o que o aeroporto significa depois de conhecer a cadeia documental?
- FONTE: oitiva1.
- STATUS: DOCUMENTADO / CONTESTADO / DRAMATIZAÇÃO.

## SCENE retorno — 22H04, pela segunda vez

- DATA: 17–18/11/2025.
- PERGUNTA: como registrar prisão, viagem e liquidação sem fabricar causalidade?
- EVIDÊNCIAS: as mesmas do prólogo, agora recontextualizadas.
- INFERÊNCIA: prisão, viagem e liquidação são fatos distintos; versões e receios devem ser atribuídos.
- CONSEQUÊNCIA: payoff do cold open; abre a mudança de foro e custódia.
- STATUS: DOCUMENTADO / REPORTADO.

## SCENE vidro — A caixa de vidro

- DATA: 28/11/2025 a 19/02/2026.
- PERGUNTA: o que mudou operacionalmente em 19/02?
- ENTRADA: Toffoli foi relator; atos anteriores são preservados; ocorre livre redistribuição.
- PERSONAGENS/OBJETIVOS: perita quer regra operacional; coordenadora quer respeitar autorização e sigilo.
- EVIDÊNCIAS: nota dos dez ministros, despacho de 19/02.
- INFERÊNCIA: perícia segue fluxo ordinário; outras frentes permanecem submetidas às regras processuais.
- CONSEQUÊNCIA: cerca de cem dispositivos voltam a andar.
- STATUS: DOCUMENTADO / REPORTADO / DRAMATIZAÇÃO.

## SCENE genero — O caso muda de gênero

- DATA: 04/03/2026.
- PERGUNTA: por que a segunda prisão não repete a primeira?
- EVIDÊNCIAS: representação dos quatro núcleos; nova ordem preventiva.
- INFERÊNCIA: nova fase amplia o objeto para além do crime financeiro.
- MISDIRECTION: tratar a prisão como mera repetição.
- CONSEQUÊNCIA: escolha de ordem entre A Turma e Os Meninos.
- STATUS: DOCUMENTADO / ALEGADO / DRAMATIZAÇÃO.

## SCENE turma — A Turma

- DATA: maio de 2026.
- PERGUNTA: o que conecta legitimamente os rastros?
- EVIDÊNCIAS: mensagens sobre pagamentos alegados, registro de visitante, codinome Sicário.
- INFERÊNCIA: nome, contexto, datas e registros convergem; funções criminosas continuam alegação da PF.
- CAMINHOS: pagamentos + visita; codinome + visita; pagamentos + codinome.
- CONSEQUÊNCIA: nó presencial/informacional pronto para convergir com a linha digital.
- STATUS: DOCUMENTADO / ALEGADO.

## SCENE meninos — Os Meninos

- DATA: maio de 2026.
- PERGUNTA: qual conclusão digital é precisa?
- EVIDÊNCIAS: captura, metadados, resposta institucional sobre a interface.
- INFERÊNCIA: material sugere acesso a informação relacionada; não demonstra automaticamente invasão direta da Interpol.
- MISDIRECTION JUSTA: identidade visual convincente.
- CAMINHOS: captura + resposta; captura + metadados + resposta.
- CONSEQUÊNCIA: linha digital converge sem exagerar a prova.
- STATUS: DOCUMENTADO / ALEGADO / CONTESTADO.

## SCENE final — O relatório vira o caso

- DATA: 15–19/09/2026.
- PERGUNTA: qual estado institucional está demonstrado?
- EVIDÊNCIAS: questão de ordem na Pet 16662; cópia de aproximadamente 500 GB.
- INFERÊNCIA: tramitação e tratamento permanecem em disputa; houve vista, não mérito final.
- CONSEQUÊNCIA: estado `PENDING`. Última imagem: mídia forense, cursor e campo de destino vazio.
- STATUS: DOCUMENTADO / REPORTADO / PENDENTE.

## Voz de Vorcaro — análise de corpus

As oitivas públicas de 30/12/2025 e 28/08/2026 foram usadas apenas para padrões gerais: respostas binárias por vezes curtas, respostas contextuais longas, memória declaradamente incompleta, autocorreção, contestação de premissa, distinção entre atuação macro e execução e retorno da PF à pergunta. As falas no jogo são dramatizadas e não imitam fraseologia distintiva.
