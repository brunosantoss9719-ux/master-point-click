const SAVE_KEY = 'master-ultima-chamada-v2';
const AUDIO_PREF_KEY = 'master-ultima-chamada-audio-muted-v4';

const dossier = [
  {id:'brb',tag:'DOCUMENTADO',title:'O anúncio do BRB',text:'Em março de 2025, o BRB anunciou a aquisição de 49% das ações ordinárias e 100% das preferenciais do Master — 58% do capital total — sujeita a aprovações.',source:'Reuters, 29 abr. 2025',url:'https://www.reuters.com/business/finance/brazils-brb-close-completing-due-diligence-acquire-banco-master-2025-04-29/'},
  {id:'modelo',tag:'REPORTADO',title:'CDBs acima da média',text:'O crescimento do Master se apoiou na distribuição de títulos de alta rentabilidade e no investimento em ativos complexos ou de baixa liquidez.',source:'Reuters, 4 set. 2025',url:'https://www.reuters.com/business/finance/brb-weighs-new-bid-master-after-brazil-central-bank-blocks-deal-source-says-2025-09-04/'},
  {id:'liminar',tag:'DOCUMENTADO',title:'A primeira trava',text:'Em maio de 2025, decisão judicial impediu a assinatura definitiva até autorizações societárias e legislativas, mas permitiu atos preparatórios.',source:'Reuters, 7 mai. 2025',url:'https://www.reuters.com/markets/deals/brazil-judge-blocks-lender-brb-signing-purchase-banco-master-2025-05-07/'},
  {id:'veto',tag:'DOCUMENTADO',title:'Banco Central rejeita o negócio',text:'Em setembro de 2025, o Banco Central rejeitou a operação. O BRB ainda considerou apresentar uma estrutura diferente.',source:'Reuters, 4 set. 2025',url:'https://www.reuters.com/business/finance/brb-weighs-new-bid-master-after-brazil-central-bank-blocks-deal-source-says-2025-09-04/'},
  {id:'ativos',tag:'REPORTADO',title:'O que ficaria de fora',text:'Durante a negociação, o perímetro encolheu: o BRB pretendia selecionar ativos e excluir dezenas de bilhões que não se enquadravam em seu perfil de risco.',source:'Reuters, 10 abr. 2025',url:'https://www.reuters.com/markets/deals/brazilian-lender-brb-expects-lower-banco-master-price-with-deal-adjustment-ceo-2025-04-10/'},
  {id:'fictor',tag:'REPORTADO',title:'Uma saída anunciada na última hora',text:'A defesa afirmou que a viagem aos Emirados estava ligada à assinatura de venda para o Grupo Fictor e investidores estrangeiros. Investigadores suspeitaram de fuga; a defesa negou.',source:'Folha, 25 nov. 2025',url:'https://www1.folha.uol.com.br/mercado/2025/11/defesa-de-daniel-vorcaro-diz-a-justica-que-banco-central-sabia-de-viagem-a-dubai.shtml'},
  {id:'operacao',tag:'DOCUMENTADO',title:'Operação Compliance Zero',text:'Vorcaro foi preso no aeroporto de Guarulhos na noite de 17 de novembro de 2025. A operação investigava emissão de títulos de crédito falsos e outros crimes financeiros.',source:'CNN Brasil, 18 nov. 2025',url:'https://www.cnnbrasil.com.br/economia/money/macroeconomia/dono-do-banco-master-estava-a-caminho-de-dubai-e-foi-preso-em-guarulhos/'},
  {id:'liquidacao',tag:'DOCUMENTADO',title:'Liquidação',text:'Em 18 de novembro de 2025, o Banco Central decretou a liquidação extrajudicial do Banco Master e de empresas do conglomerado.',source:'Banco Master — comunicado da liquidação',url:'https://www.bancomaster.com.br/'},
  {id:'carteiras',tag:'ALEGADO',title:'Carteiras sob suspeita',text:'As investigações apontaram supostas carteiras de consignado forjadas vendidas ao BRB. As defesas contestaram a fraude e alegaram substituição de ativos.',source:'Folha, 25 nov. 2025',url:'https://www1.folha.uol.com.br/mercado/2025/11/defesa-de-daniel-vorcaro-diz-a-justica-que-banco-central-sabia-de-viagem-a-dubai.shtml'},
  {id:'sigilo_stf',arc:'toffoli',tag:'REPORTADO',title:'O processo sob sigilo máximo',text:'Ao assumir o caso no fim de 2025, Dias Toffoli impôs ao processo o nível mais alto de sigilo usado no STF. A condução e o acesso aos autos passaram a ser alvo de críticas públicas.',source:'CartaCapital, 13 fev. 2026',url:'https://www.cartacapital.com.br/politica/a-dimensao-do-sigilo-sob-o-qual-andre-mendonca-assume-o-caso-master/'},
  {id:'provas_lacradas',arc:'toffoli',tag:'DOCUMENTADO',title:'A caixa lacrada',text:'Na segunda fase da Compliance Zero, autorizada por Toffoli, materiais apreendidos foram enviados lacrados ao STF antes de sua análise pericial. A ordem virou símbolo da disputa sobre quem controlaria as provas.',source:'STF — Petição 15.556',url:'https://digital.stf.jus.br/'},
  {id:'tayaya',arc:'toffoli',tag:'REPORTADO',title:'O resort entrou nos autos',text:'Reportagens revelaram que empresa ligada à família Toffoli teve participação no resort Tayayá e que um fundo ligado ao cunhado de Vorcaro entrou no empreendimento. Toffoli negou favorecimento e irregularidade.',source:'Folha, 12 mar. 2026',url:'https://www1.folha.uol.com.br/mercado/2026/03/toffoli-deve-se-afastar-de-todos-os-julgamentos-do-caso-master.shtml'},
  {id:'redistribuicao',arc:'toffoli',tag:'DOCUMENTADO',title:'Livre redistribuição',text:'Em 12 de fevereiro de 2026, após reunião dos ministros, Toffoli pediu o envio dos feitos à Presidência do STF. Os atos anteriores foram declarados válidos e o sorteio eletrônico levou o caso a André Mendonça.',source:'Nota do STF reproduzida pelo PlatôBR, 12 fev. 2026',url:'https://platobr.com.br/em-reuniao-dos-ministros-do-stf-toffoli-deixa-relatoria-do-processo-sobre-o-master'},
  {id:'fluxo_pf',arc:'mendonca',tag:'DOCUMENTADO',title:'Fluxo ordinário, porta controlada',text:'Em 19 de fevereiro, Mendonça reduziu o sigilo, liberou à PF a perícia de cerca de 100 aparelhos pelo fluxo ordinário e restringiu o acesso aos agentes diretamente envolvidos. Novas investigações continuaram dependentes de autorização prévia do relator.',source:'CartaCapital, 19 fev. 2026',url:'https://www.cartacapital.com.br/justica/mendonca-reduz-sigilo-e-da-mais-autonomia-a-pf-no-caso-master/'},
  {id:'relatorio_pf',arc:'mendonca',tag:'REPORTADO',title:'A pergunta virou relatório',text:'Mendonça afirmou ter recebido material da PF em agosto e ordenado providências porque mensagens mencionavam o diretor-geral Andrei Rodrigues e o procurador-geral Paulo Gonet. O relatório também identificou Alexandre de Moraes como interlocutor de Vorcaro; os citados contestaram suspeitas e irregularidades.',source:'Folha, 15 set. 2026',url:'https://www1.folha.uol.com.br/poder/2026/09/mendonca-reage-a-moraes-e-diz-que-nao-ha-irregularidade-em-relatorio-da-pf.shtml'},
  {id:'afastamento_pf',arc:'mendonca',tag:'DOCUMENTADO',title:'A chefia afastada — e restabelecida',text:'Em 8 de setembro, Mendonça determinou o afastamento de Andrei Rodrigues da direção-geral da PF. No dia seguinte, o presidente do STF, Edson Fachin, suspendeu a decisão e autorizou seu retorno. A medida provocou forte reação dentro do tribunal.',source:'UOL, 15 set. 2026',url:'https://noticias.uol.com.br/politica/ultimas-noticias/2026/09/15/gilmar-critica-afastamento-de-chefe-da-pf-como-afastar-diretor-da-nasa.htm'},
  {id:'copia_500gb',arc:'mendonca',tag:'REPORTADO',title:'A cópia que não abriu',text:'Em 19 de setembro, Mendonça e Luiz Fux informaram à PF que seus gabinetes não conseguiram acessar a cópia criptografada, de cerca de 500 GB, do celular de Vorcaro. A PF disse manter seguros o aparelho e a extração originais; Mendonça afirmou guardar sua cópia lacrada como contraprova.',source:'UOL, 19 set. 2026',url:'https://noticias.uol.com.br/politica/ultimas-noticias/2026/09/19/mendonca-e-fux-pedem-ajuda-a-pf-para-acessar-copia-de-celular-de-vorcaro.ghtm'},
  {id:'punhal_impresso',arc:'copa',tag:'ALEGADO',title:'O documento impresso no Planalto',text:'Segundo relatório da Polícia Federal, o plano chamado “Punhal Verde e Amarelo” foi impresso no Palácio do Planalto em 9 de novembro de 2022. As defesas contestaram acusações e interpretações da investigação.',source:'CNN Brasil, 26 nov. 2024',url:'https://www.cnnbrasil.com.br/politica/plano-do-punhal-verde-e-amarelo-para-golpe-foi-impresso-no-palacio-do-planalto-diz-pf/'},
  {id:'reuniao_doze',arc:'copa',tag:'ALEGADO',title:'A reunião de 12 de novembro',text:'A acusação situou em 12 de novembro de 2022 uma reunião na residência funcional de Braga Netto para discutir ações que depois seriam reunidas sob o nome “Copa 2022”. Defesas contestaram essa caracterização.',source:'MPF — sustentação oral do Núcleo 3, AP 2696',url:'https://www.mpf.mp.br/'},
  {id:'copa_signal',arc:'copa',tag:'ALEGADO',title:'O grupo “Copa 2022”',text:'A PF afirmou que integrantes usaram um grupo no Signal chamado “Copa 2022” durante a mobilização de dezembro. A narrativa jogável não reproduz conversas privadas como transcrição literal.',source:'Congresso em Foco, 19 nov. 2024',url:'https://www.congressoemfoco.com.br/noticia/5730/operacao-contragolpe-veja-as-mensagens-de-militares-no-grupo-copa-2022'},
  {id:'seis_paises',arc:'copa',tag:'REPORTADO',title:'Seis aparelhos, seis países',text:'A investigação associou seis aparelhos aos codinomes Alemanha, Argentina, Áustria, Brasil, Gana e Japão. Nem toda correspondência individual foi divulgada ou confirmada; por isso os personagens do bônus são composições ficcionais.',source:'SBT News, 24 nov. 2024',url:'https://sbtnews.sbt.com.br/noticia/brasil/pf-mapeou-movimentacao-de-kids-pretos-em-brasilia-em-missao-contra-moraes'},
  {id:'mes_em_campo',arc:'copa',tag:'ALEGADO',title:'Um mês de monitoramento',text:'A PF afirmou que os registros de 15 de dezembro vieram após aproximadamente um mês de monitoramento dos alvos, reconstruído com mensagens, sinais de celulares, mapas e diligências posteriores.',source:'SBT News, 30 nov. 2024',url:'https://sbtnews.sbt.com.br/noticia/brasil/pf-mapeou-movimentacao-de-kids-pretos-em-brasilia-em-missao-contra-moraes'},
  {id:'campo_quinze',arc:'copa',tag:'ALEGADO',title:'Equipes em campo em 15 de dezembro',text:'Segundo a PF, na noite de 15 de dezembro um integrante estava perto do STF, outro em deslocamento e outro na região onde Moraes morava. A operação foi abortada durante a execução.',source:'SBT News, 30 nov. 2024',url:'https://sbtnews.sbt.com.br/noticia/brasil/pf-mapeou-movimentacao-de-kids-pretos-em-brasilia-em-missao-contra-moraes'},
  {id:'jogo_cancelado',arc:'copa',tag:'ALEGADO',title:'“Cancelamento do jogo”',text:'Mensagens citadas pela PF registraram o cancelamento da ação em 15 de dezembro de 2022. O jogo mantém locais e procedimentos deliberadamente abstratos.',source:'Congresso em Foco, 19 nov. 2024',url:'https://www.congressoemfoco.com.br/noticia/5730/operacao-contragolpe-veja-as-mensagens-de-militares-no-grupo-copa-2022'},
  {id:'contragolpe',arc:'copa',tag:'DOCUMENTADO',title:'Operação Contragolpe',text:'Em 19 de novembro de 2024, a PF deflagrou a Operação Contragolpe. A decisão do STF tornou públicos elementos da investigação, preservadas as garantias de defesa.',source:'Decisão do STF reunida pelo Poder360, 19 nov. 2024',url:'https://www.poder360.com.br/poder-justica/leia-a-integra-da-decisao-de-moraes-sobre-operacao-contragolpe-da-pf/'},
  {id:'nucleo_tres',arc:'copa',tag:'DOCUMENTADO',title:'O julgamento do Núcleo 3',text:'Em 18 de novembro de 2025, a Primeira Turma do STF condenou nove dos dez réus do Núcleo 3 e absolveu um. As penas e os enquadramentos variaram entre os acusados.',source:'STF, 18 nov. 2025',url:'https://noticias.stf.jus.br/postsnoticias/ap-2696-penas-do-nucleo-3-variam-de-um-ano-e-11-meses-a-24-anos-de-prisao/'}
];

const inventoryCatalog = {
  pasta:{icon:'▤',name:'Pasta BRB',desc:'Minutas, perímetro e perguntas sem resposta.'},
  nota:{icon:'◫',name:'Nota ao mercado',desc:'Curta o bastante para caber em qualquer interpretação.'},
  passagem:{icon:'✈',name:'Rota para Dubai',desc:'Uma viagem pode ser agenda, saída ou manchete.'},
  celular:{icon:'▣',name:'Celular',desc:'Tudo chega aqui. Algumas coisas ficam.'},
  cracha:{icon:'◇',name:'Crachá recolhido',desc:'Um retângulo de plástico já sem porta para abrir.'},
  drive:{icon:'▥',name:'Cópia criptografada',desc:'Quinhentos gigabytes. Uma chave ausente.'},
  seis_telefones:{icon:'▦',name:'Seis aparelhos',desc:'Países como codinomes. Rastros que sobreviveram à noite.'},
  folha_carbono:{icon:'▧',name:'Folha de carbono',desc:'Uma impressão de 9 de novembro deixou marcas no verso.'},
  matriz_sinais:{icon:'⌘',name:'Matriz de sinais',desc:'Seis aparelhos, uma janela curta de uso e duas identidades em aberto.'},
  acetato_zonas:{icon:'◇',name:'Acetato de zonas',desc:'Camadas de sinais convertidas apenas em áreas amplas.'},
  fita_2057:{icon:'▥',name:'Fita de 20h57',desc:'A pergunta que antecede a ordem de abortar.'}
};

const scenes = [
  {
    chapter:'CAPÍTULO I · A PONTE', date:'28 MAR 2025 · SÃO PAULO', bg:'assets/office.webp', tint:'rgba(22,10,52,.18)',
    intro:[
      ['NARRADOR','Chove sobre São Paulo. Na mesa, uma compra anunciada — e ainda não concluída.'],
      ['CAIO','O BRB confirmou os 58%. A imprensa chama de salvamento.'],
      ['DANIEL','Então precisamos de uma palavra melhor.']
    ],
    hotspots:[
      {id:'tv',label:'Televisão',x:8,y:24,dossier:'brb',lines:[['REPÓRTER NA TV','O acordo depende de autorizações e ainda passará pelo Banco Central.'],['DANIEL','Na televisão, toda condição parece uma sentença.']]},
      {id:'pasta',label:'Pasta do negócio',x:70,y:49,item:'pasta',dossier:'ativos',lines:[['HELENA','O perímetro muda a cada versão. O que eles compram fica saudável por definição. O resto fica conosco.'],['DANIEL','Definições são ativos líquidos.']],choices:[
        {text:'Mostrar tudo ao conselho.',effects:{trust:2,exposure:1},flag:'abriu_pasta',reply:[['DANIEL','Sem surpresa interna. Se doer, dói na mesa.'],['HELENA','Vou registrar que foi sua decisão.']]},
        {text:'Circular só o resumo executivo.',effects:{trust:-1,pressure:-1},flag:'resumo',reply:[['DANIEL','Menos páginas, menos interpretações.'],['HELENA','Ou menos testemunhas.']]}
      ]},
      {id:'janela',label:'A cidade',x:48,y:31,lines:[['CAIO','Lá embaixo, todo mundo acha que banco é uma coisa sólida.'],['DANIEL','A distância ajuda.']]},
      {id:'telefone',label:'Telefone dourado',x:79,y:55,required:true,dossier:'modelo',lines:[['OTÁVIO','A imprensa espera. Primeiro descubra o que este contrato realmente permite dizer.']],puzzle:{type:'document',title:'A cláusula suspensiva',kicker:'MESA DE CONTRATOS',prompt:'A minuta está incompleta. Abra a pasta, revele as condições e prepare a única nota que não mente sobre o estágio do negócio.',tools:[{id:'abre-carta',icon:'⌁',label:'Abre-cartas',detail:'A lâmina cabe no fecho interno.'},{id:'lente',icon:'⌕',label:'Lente de mesa',detail:'Destaca tinta e notas quase apagadas.'},{id:'carimbo',icon:'▣',label:'Carimbo “condicionado”',detail:'Marca anúncio que ainda depende de aprovação.'}],targets:[{id:'fecho',icon:'▤',label:'Fecho oculto da pasta',detail:'Há uma lingueta sob o couro.',accept:'abre-carta',result:'O fundo falso libera o anexo societário.',grants:{id:'anexo',icon:'▧',label:'Anexo societário',detail:'Lista as autorizações ainda pendentes.'}},{id:'rodape',icon:'⌕',label:'Rodapé desbotado',detail:'Uma linha foi impressa quase sem tinta.',accept:'lente',requires:['fecho'],result:'A lente revela: conclusão sujeita ao Banco Central.'},{id:'minuta',icon:'▥',label:'Encaixe da minuta',detail:'Falta a página que define as condições.',accept:'anexo',requires:['fecho'],result:'O anexo confirma as aprovações societárias e legislativas.'},{id:'nota',icon:'□',label:'Nota ao mercado',detail:'O anúncio está escrito como negócio concluído.',accept:'carimbo',requires:['rodape','minuta'],result:'A nota agora separa anúncio público de compra concluída.'}],success:'Contrato reconstruído. O anúncio existia; a conclusão ainda tinha portas pela frente.'},choices:[
        {text:'“É expansão, não resgate.”',effects:{exposure:2,trust:-1},flag:'discurso_expansao',reply:[['DANIEL','Prepara a nota. Ambição cabe melhor na manchete que urgência.'],['CAIO','E se perguntarem sobre liquidez?'],['DANIEL','Fale sobre futuro. O futuro não apresenta extrato.']]},
        {text:'Não alimentar a imprensa.',effects:{exposure:-1,pressure:1,trust:1},flag:'silencio_marco',reply:[['DANIEL','Hoje, silêncio. Amanhã, números.'],['OTÁVIO','Silêncio também publica uma versão. Só não é a nossa.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'CAPÍTULO II · PORTA FECHADA', date:'3 SET 2025 · BRASÍLIA', bg:'assets/boardroom.webp', tint:'rgba(0,45,55,.12)',
    intro:[
      ['NARRADOR','Cinco meses depois, a ponte termina numa sala vazia.'],
      ['CAIO','Chegou a decisão. O Banco Central rejeitou a compra.'],
      ['OTÁVIO','O mercado abre em doze horas.']
    ],
    hotspots:[
      {id:'relogio',label:'Relógio',x:82,y:14,lines:[['NARRADOR','22h17. O mercado abre em menos de doze horas.']]},
      {id:'agua',label:'Copo d’água',x:66,y:69,lines:[['OTÁVIO','Você não tocou na água.'],['DANIEL','Ela pode esperar.']]},
      {id:'xandao_tv',label:'Xandão na TV',x:91,y:26,dossier:'veto',lines:[['NARRADOR','Na TV sem som, Alexandre de Moraes ocupa o plenário. Participação satírica; nenhuma fala é atribuída a ele.'],['DANIEL','Em Brasília, até a televisão participa da reunião.']]},
      {id:'envelope',label:'Decisão do BC',x:49,y:77,required:true,dossier:'liminar',lines:[['HELENA','A decisão veio desmontada pelo triturador de segurança. Remonte o que ainda produz efeito.']],puzzle:{type:'reconstruction',title:'A porta fechada',kicker:'RECONSTRUÇÃO DOCUMENTAL',prompt:'Os papéis misturaram anúncio, liminar e veto. Recupere o documento que encerrou esta versão do negócio.',tools:[{id:'luz',icon:'☼',label:'Luz rasante',detail:'Revela marcas d’água e vincos coincidentes.'},{id:'fita',icon:'═',label:'Fita de arquivo',detail:'Une fragmentos sem cobrir a impressão.'},{id:'protocolo',icon:'▦',label:'Carimbo do protocolo',detail:'Registra a peça restaurada.'}],targets:[{id:'fragmentos',icon:'▱',label:'Fragmentos sobrepostos',detail:'As bordas parecem iguais; o papel, não.',accept:'luz',result:'A marca d’água separa o veto dos papéis antigos.',grants:{id:'veto-folhas',icon:'▱',label:'Folhas do veto',detail:'Três partes do documento de 3 de setembro.'}},{id:'mesa',icon:'▥',label:'Mesa de recomposição',detail:'O espaço vazio corresponde às três folhas.',accept:'veto-folhas',requires:['fragmentos'],result:'As páginas se encaixam; falta estabilizar as emendas.'},{id:'emendas',icon:'⌁',label:'Emendas abertas',detail:'O texto ainda se desfaz ao levantar.',accept:'fita',requires:['mesa'],result:'O veto volta a ser um documento legível.'},{id:'registro',icon:'▣',label:'Livro de protocolo',detail:'Sem registro, é apenas papel reconstruído.',accept:'protocolo',requires:['emendas'],result:'3 SET 2025. Operação rejeitada pelo Banco Central.'}],success:'O veto foi restaurado e protocolado. Esta estrutura da compra terminou aqui.'},choices:[
        {text:'Divulgar uma nota neutra e procurar outro comprador.',effects:{trust:1,pressure:1},flag:'nota_neutra',reply:[['DANIEL','Sem ataque. Sem rendição. Digam que avaliamos alternativas.'],['CAIO','Uma frase que parece calma e soa como alarme.']]},
        {text:'Questionar publicamente o veto.',effects:{exposure:2,pressure:1,trust:-1},flag:'atacou_veto',reply:[['DANIEL','Se fecharam a porta, o público merece ouvir o estrondo.'],['HELENA','E quem ainda estava no corredor vai embora.']]},
        {text:'Abrir os dados e pedir tempo ao regulador.',effects:{trust:2,pressure:2,exposure:1},flag:'abriu_dados',reply:[['DANIEL','Mandem os dados. Todos.'],['OTÁVIO','Isso compra credibilidade.'],['HELENA','E vende privacidade.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'CAPÍTULO III · SEGUNDA-FEIRA', date:'17 NOV 2025 · SÃO PAULO', bg:'assets/office.webp', tint:'rgba(90,0,12,.22)',
    intro:[
      ['NARRADOR','Setenta e cinco dias depois, os verbos são outros: negociar, explicar, sobreviver.'],
      ['HELENA','A Fictor quer anunciar. Ainda não assinou.'],
      ['CAIO','E seu voo para Dubai está pronto.']
    ],onEnter:(s)=>{addItem('passagem'); addItem('celular'); s.unread=3},
    hotspots:[
      {id:'celular_mesa',label:'Mensagens',x:80,y:57,dossier:'fictor',lines:[['CAIO','A equipe quer uma confirmação agora. Anuncia a venda?']],choices:[
        {text:'Anunciar antes da assinatura.',effects:{exposure:2,pressure:-1,trust:-1},flag:'anunciou_fictor',reply:[['DANIEL','Anuncia. O mercado precisa de um fato antes que fabriquem outro.'],['HELENA','Então será um fato no futuro do pretérito.']]},
        {text:'Esperar a assinatura.',effects:{pressure:2,trust:1,exposure:-1},flag:'esperou_assinatura',reply:[['DANIEL','Sem assinatura, não existe comprador.'],['CAIO','Até lá, todo mundo vai achar que não existe banco.']]},
        {text:'Convocar conselho e registrar cada passo.',effects:{trust:2,pressure:1,exposure:1},flag:'registrou_passos',reply:[['DANIEL','Conselho em vinte minutos. Tudo em ata.'],['OTÁVIO','Ata não apaga incêndio. Mas diz quem segurava o extintor.']]}
      ]},
      {id:'tv_crise',label:'Noticiário',x:8,y:24,dossier:'carteiras',lines:[['REPÓRTER NA TV','Autoridades apuram operações envolvendo carteiras de crédito negociadas entre instituições financeiras.'],['HELENA','Eles ainda não disseram nosso nome.'],['DANIEL','Pior. Deixaram o público completar.']]},
      {id:'maleta',label:'Maleta',x:72,y:60,lines:[['OTÁVIO','Leva só o necessário.'],['DANIEL','O necessário muda quando alguém diz essa frase.']],choices:[
        {text:'Levar a pasta BRB.',effects:{exposure:1,trust:1},flag:'levou_pasta',reply:[['DANIEL','Vai comigo. Se perguntarem, eu mostro o contexto.'],['OTÁVIO','Contexto pesa mais que papel.']]},
        {text:'Deixar documentos com Helena.',effects:{trust:2,pressure:1},flag:'deixou_pasta',reply:[['DANIEL','Helena, você fica com isso.'],['HELENA','E com o banco?'],['DANIEL','Com o que couber nesta sala.']]}
      ]},
      {id:'telefone_bc',label:'Linha do regulador',x:76,y:48,required:true,lines:[['OTÁVIO','Se vai viajar, o Banco Central precisa saber. Não é pedido de permissão. É registro.']],choices:[
        {text:'Informar reunião, venda e viagem.',effects:{trust:2,exposure:1},flag:'avisou_bc',reply:[['DANIEL','Marque a videoconferência. Venda, investidores, Dubai. Tudo na mesma frase.'],['OTÁVIO','Frases viram documentos quando a noite dá errado.']]},
        {text:'Informar apenas a negociação.',effects:{trust:-1,pressure:-1},flag:'omitiu_viagem',reply:[['DANIEL','Fale da venda. A agenda é minha.'],['HELENA','Até alguém transformá-la em prova.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'CAPÍTULO IV · PORTÃO', date:'17 NOV 2025 · GUARULHOS', bg:'assets/hangar.webp', tint:'rgba(25,0,30,.15)',
    intro:[
      ['NARRADOR','22h. A pista é um espelho. O jato espera atrás do vidro como uma hipótese cara.'],
      ['OTÁVIO','A viagem pode ser negócio. Também pode parecer fuga.'],
      ['DANIEL','E ficar também será interpretado.']
    ],
    hotspots:[
      {id:'cafe',label:'Café',x:13,y:42,lines:[['CAIO','Um café compra quarenta segundos.']]},
      {id:'camera',label:'Câmera',x:22,y:11,lines:[['NARRADOR','A câmera não pisca. Hoje, todo mundo guarda a imagem.']]},
      {id:'mala_hangar',label:'Bagagem',x:75,y:58,lines:[['CAIO','Uma mala pequena para uma viagem grande.'],['DANIEL','Você esperava o quê?'],['CAIO','Menos metáfora.']]},
      {id:'aviao',label:'Jato',x:53,y:47,required:true,dossier:'operacao',lines:[['OTÁVIO','Decide agora. O relógio já decidiu o resto.']],choices:[
        {text:'Embarcar. A venda exige presença.',effects:{exposure:3,pressure:2},flag:'tentou_embarcar',reply:[['DANIEL','Embarca tudo. Vamos assinar.'],['NARRADOR','As portas automáticas se abrem. Antes do ar frio, entram quatro agentes.'],['AGENTE','Daniel Vorcaro? Polícia Federal. O senhor nos acompanha.']]},
        {text:'Esperar confirmação dos investidores.',effects:{pressure:2,trust:1},flag:'esperou_hangar',reply:[['DANIEL','Ninguém decola sem o contrato final.'],['CAIO','Acabou de chegar outra mensagem—'],['NARRADOR','Ele não termina. As portas se abrem e quatro agentes ocupam o silêncio.'],['AGENTE','Daniel Vorcaro? Polícia Federal. O senhor nos acompanha.']]},
        {text:'Voltar e enfrentar o conselho.',effects:{trust:2,exposure:-1,pressure:2},flag:'voltaria',reply:[['DANIEL','Cancela o voo. Voltamos.'],['OTÁVIO','Tarde demais para a passagem. Talvez cedo para o resto.'],['NARRADOR','As portas se abrem antes que alguém alcance a mala.'],['AGENTE','Daniel Vorcaro? Polícia Federal. O senhor nos acompanha.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'CAPÍTULO V · A MANHÃ', date:'18 NOV 2025 · BRASÍLIA', bg:'assets/interview.webp', tint:'rgba(0,22,45,.1)',
    intro:[
      ['NARRADOR','Antes do amanhecer, a noite já tem nome: Operação Compliance Zero.'],
      ['INVESTIGADORA','O senhor entende por que está aqui?'],
      ['INVESTIGADORA','Eu prefiro documentos. Versões envelhecem rápido.']
    ],
    hotspots:[
      {id:'espelho',label:'Espelho',x:74,y:27,lines:[['DANIEL','Tem alguém atrás?'],['INVESTIGADORA','Sempre tem.']]},
      {id:'copo_final',label:'Copo de papel',x:61,y:59,lines:[['NARRADOR','O café tem gosto de sala sem relógio.']]},
      {id:'evidencia',label:'Celular apreendido',x:41,y:65,lines:[['INVESTIGADORA','Seu telefone conta uma história longa.'],['DANIEL','Telefones juntam frases que nunca estiveram na mesma conversa.'],['INVESTIGADORA','É para isso que existe contexto. E perícia.']]},
      {id:'gravador',label:'Gravador',x:51,y:55,required:true,dossier:'liquidacao',lines:[['INVESTIGADORA','Se quer contexto, construa um que sobreviva à perícia.']],puzzle:{type:'interrogation',title:'A versão sob perícia',kicker:'MESA DE INTERROGATÓRIO',prompt:'Abra os vestígios, extraia o que pode ser comprovado e monte uma declaração sem preencher as lacunas com conversa.',tools:[{id:'celular-evidencia',inventoryId:'celular',icon:'▣',label:'Celular apreendido',detail:'Mensagens preservadas pela perícia.'},{id:'minuta-fictor',icon:'▤',label:'Minuta Fictor',detail:'Documento recebido antes da viagem.'},{id:'plano-voo',inventoryId:'passagem',icon:'✈',label:'Plano de voo',detail:'Rota e horário registrados.'}],targets:[{id:'leitor',icon:'⌕',label:'Leitor forense',detail:'Pode recuperar a conversa das 18h02.',accept:'celular-evidencia',result:'Helena escreveu: “Ainda não temos assinatura”.',grants:{id:'captura',icon:'◫',label:'Captura autenticada',detail:'Mensagem das 18h02 com metadados.'}},{id:'mesa-luz',icon:'▥',label:'Mesa de luz',detail:'Mostra assinatura, rubrica e páginas ausentes.',accept:'minuta-fictor',result:'Não há assinatura no bloco final.',grants:{id:'laudo-minuta',icon:'□',label:'Laudo da minuta',detail:'Documento incompleto e sem assinatura.'}},{id:'mapa-rota',icon:'⌖',label:'Mapa do aeroporto',detail:'Aceita um plano registrado.',accept:'plano-voo',result:'A rota para Dubai estava definida antes da prisão.',grants:{id:'registro-rota',icon:'✈',label:'Registro da rota',detail:'Plano de voo confirmado às 19h31.'}},{id:'gravador-final',icon:'●',label:'Gravador da sala',detail:'Só grave quando os três pontos estiverem documentados.',accept:['captura','laudo-minuta','registro-rota'],requires:['leitor','mesa-luz','mapa-rota'],result:'A declaração distingue negociação, contrato e viagem sem inventar certezas.'}],success:'A versão agora tem três limites verificáveis — e nenhuma ligação feita no escuro.'},choices:[
        {text:'Cooperar e contextualizar os documentos.',effects:{trust:3,exposure:1},flag:'cooperou',reply:[['DANIEL','Eu falo. Mas começamos em março, não neste aeroporto.'],['INVESTIGADORA','Então comece. O gravador tem mais tempo que o mercado.']]},
        {text:'Entregar uma declaração escrita.',effects:{trust:0,exposure:0},flag:'declaracao',reply:[['DANIEL','Meu advogado entrega a declaração. Não vou improvisar patrimônio.'],['INVESTIGADORA','Papel também fala. Só não responde.']]},
        {text:'Permanecer em silêncio.',effects:{trust:-2,exposure:-1,pressure:1},flag:'silencio_final',reply:[['DANIEL','Vou exercer meu direito ao silêncio.'],['INVESTIGADORA','Registrado. O resto da manhã não fará o mesmo.']]}
      ],ending:true}
    ]
  },
  {
    chapter:'TOFFOLINHO I · A CHAVE', date:'FIM DE NOV 2025 · BRASÍLIA', bg:'assets/stf-office.webp', tint:'rgba(20,8,34,.18)',
    intro:[
      ['NARRADOR','Uma autoridade citada leva o caso ao Supremo. O sorteio acende uma luz no gabinete.'],
      ['TOFFOLI','Um caso grande demais para andar solto.'],
      ['NARRADOR','Você controla Toffolinho, caricatura satírica. As falas privadas são dramatização.']
    ],
    hotspots:[
      {id:'janela_stf',label:'Praça dos Três Poderes',x:45,y:19,lines:[['TOFFOLI','Brasília é bonita vista de cima. Os problemas também parecem menores.'],['ASSESSORA','Até subirem de elevador.']]},
      {id:'telefone_stf',label:'Telefone preto',x:88,y:52,lines:[['ASSESSORA','A imprensa pergunta quem pode consultar os autos.'],['TOFFOLI','A resposta está nos autos. Sob sigilo.']]},
      {id:'pasta_sigilo',label:'Pasta do Master',x:73,y:51,required:true,dossier:'sigilo_stf',lines:[['ASSESSORA','A fechadura chegou configurada para ninguém. Abra só o necessário — ou feche tudo.']],puzzle:{type:'mechanism',title:'Três voltas da chave',kicker:'MECANISMO DE ACESSO',prompt:'A pasta tem três anéis e um núcleo. Descubra o encaixe que transforma peças soltas em um regime de acesso verificável.',tools:[{id:'chave-publica',icon:'◇',label:'Chave externa',detail:'Abre o índice público dos autos.'},{id:'selo-sensivel',icon:'◆',label:'Selo de peça sensível',detail:'Isola anexos que exigem restrição.'},{id:'chave-relator',icon:'♢',label:'Chave do relator',detail:'Fecha o núcleo sob controle do gabinete.'}],targets:[{id:'anel-externo',icon:'◎',label:'Anel externo',detail:'O índice está preso junto com o conteúdo.',accept:'chave-publica',result:'O índice se abre sem expor as peças.'},{id:'anel-medio',icon:'◉',label:'Anel intermediário',detail:'Os anexos sensíveis ainda não têm separação.',accept:'selo-sensivel',requires:['anel-externo'],result:'As peças sensíveis ganham compartimento próprio.'},{id:'nucleo',icon:'●',label:'Núcleo da pasta',detail:'A última volta define quem controla o conjunto.',accept:'chave-relator',requires:['anel-medio'],result:'O núcleo fecha. O gabinete passa a controlar a chave.'}],success:'O mecanismo revela o custo de cada volta: menos acesso, mais poder concentrado.'},choices:[
        {text:'Aplicar o nível máximo de sigilo.',effects:{pressure:-1,exposure:-2,trust:-1},flag:'sigilo_maximo',reply:[['TOFFOLI','Nível três. Se todo mundo lê, ninguém controla.'],['NARRADOR','DOCUMENTADO: o caso tramitou sob o grau mais alto de sigilo do STF. A justificativa formal era proteger a investigação.']]},
        {text:'Restringir só as peças sensíveis.',effects:{pressure:1,exposure:1,trust:1},flag:'sigilo_parcial',reply:[['TOFFOLI','Segredo cirúrgico. O resto respira.'],['ASSESSORA','Isso dá mais trabalho.'],['TOFFOLI','Transparência costuma dar.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'TOFFOLINHO II · A CAIXA', date:'JAN 2026 · BRASÍLIA', bg:'assets/stf-office.webp', tint:'rgba(45,0,18,.22)',
    intro:[
      ['NARRADOR','Busca, apreensão, celulares. A pergunta chega antes do café: quem abre a caixa?'],
      ['ASSESSORA','A Polícia Federal pede perícia imediata.'],
      ['TOFFOLI','“Imediata” faz parecer que o tempo manda no tribunal.']
    ],
    hotspots:[
      {id:'tv_operacao',label:'Noticiário sem som',x:61,y:28,lines:[['NARRADOR','Na televisão, agentes carregam caixas. No gabinete, a imagem chega antes do conteúdo.'],['TOFFOLI','A operação sempre tem trilha sonora. O processo, não.']]},
      {id:'pilha_autos',label:'Pilha de autos',x:66,y:48,lines:[['ASSESSORA','PF, PGR, defesas e Congresso. Todos pedem algo.'],['TOFFOLI','Então decidir devagar parecerá equilíbrio.']]},
      {id:'caixa_lacrada',label:'Caixa de evidências',x:16,y:43,required:true,dossier:'provas_lacradas',lines:[['ASSESSORA','A caixa chegou sem história visível. Faça cada mão deixar uma marca.']],puzzle:{type:'custody',title:'A caixa sem sombra',kicker:'CADEIA DE CUSTÓDIA',prompt:'Prepare o aparelho para que qualquer abertura, transporte ou cópia possa ser auditada depois.',tools:[{id:'etiqueta',icon:'▧',label:'Etiqueta numerada',detail:'Identifica aparelho, local e responsável.'},{id:'lacre',icon:'═',label:'Lacre inviolável',detail:'Registra qualquer abertura física.'},{id:'scanner',icon:'▤',label:'Leitor de remessa',detail:'Grava origem, destino e horário.'},{id:'cabo-forense',icon:'⌁',label:'Cabo bloqueador',detail:'Permite leitura sem alterar o original.'}],targets:[{id:'aparelho',icon:'▣',label:'Celular apreendido',detail:'Ainda não possui identificação individual.',accept:'etiqueta',result:'Aparelho vinculado ao auto de apreensão.'},{id:'caixa',icon:'□',label:'Caixa de transporte',detail:'A tampa fecha, mas não denuncia abertura.',accept:'lacre',requires:['aparelho'],result:'Número do lacre registrado junto ao aparelho.'},{id:'guiche',icon:'▦',label:'Guichê de transferência',detail:'A remessa precisa de origem e destino.',accept:'scanner',requires:['caixa'],result:'Transferência para Brasília registrada com horário.'},{id:'estacao-pericia',icon:'⌘',label:'Estação pericial',detail:'O original não pode ser alterado durante a leitura.',accept:'cabo-forense',requires:['guiche'],result:'A extração pode começar preservando o aparelho.'}],success:'A caixa ganhou um rastro: identidade, lacre, transferência e leitura protegida.'},choices:[
        {text:'Mandar tudo lacrado para o STF.',effects:{pressure:2,exposure:-1,trust:-2},flag:'lacrou_provas',reply:[['TOFFOLI','Primeiro a custódia. Depois a curiosidade. Tudo lacrado para cá.'],['NARRADOR','DOCUMENTADO: o material foi remetido lacrado ao STF. A decisão e seus efeitos foram contestados no debate público.']]},
        {text:'Permitir perícia com cópia preservada.',effects:{pressure:-1,exposure:2,trust:2},flag:'pericia_controlada',reply:[['TOFFOLI','Periciem. Uma cópia fica preservada e cada acesso, registrado.'],['ASSESSORA','Menos controle direto. Mais rastreabilidade.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'TOFFOLINHO III · O ESPELHO', date:'12 FEV 2026 · BRASÍLIA', bg:'assets/stf-office.webp', tint:'rgba(70,8,0,.22)',
    intro:[
      ['NARRADOR','O processo que deveria investigar o Master começa a iluminar o próprio relator.'],
      ['ASSESSORA','Publicaram as ligações com o Tayayá. Os ministros estão esperando.'],
      ['TOFFOLI','Um relator não entra nos autos.']
    ],
    hotspots:[
      {id:'retrato_resort',label:'Fotografia do resort',x:10,y:13,dossier:'tayaya',lines:[['NARRADOR','REPORTADO: empresa da família Toffoli teve participação no resort. Um fundo ligado ao cunhado de Vorcaro entrou no negócio. Toffoli negou favorecimento.'],['TOFFOLI','Uma fotografia não conhece contrato.'],['ASSESSORA','Mas conhece manchete.']]},
      {id:'nota_colegas',label:'Nota dos ministros',x:78,y:45,lines:[['ASSESSORA','A nota preserva a validade de todos os seus atos e diz que PF e PGR tiveram seus pedidos atendidos.'],['TOFFOLI','Uma saída com firma reconhecida.']]},
      {id:'chave_final',label:'Chave da relatoria',x:86,y:58,required:true,dossier:'redistribuicao',lines:[['ASSESSORA','Os papéis contam histórias diferentes. A mesa de luz mostra onde elas se tocam.']],puzzle:{type:'overlay',title:'O espelho do resort',kicker:'MESA DE SOBREPOSIÇÃO',prompt:'Alinhe registros independentes sobre a planta iluminada. A relação só aparece quando as camadas ocupam o mesmo lugar.',tools:[{id:'planta-resort',icon:'⌑',label:'Planta do Tayayá',detail:'Mapa cadastral do empreendimento.'},{id:'contrato-familia',icon:'▤',label:'Registro societário',detail:'Empresa ligada à família Toffoli.'},{id:'folha-fundo',icon:'▧',label:'Documento do fundo',detail:'Fundo ligado ao cunhado de Vorcaro.'},{id:'nota-negativa',icon:'□',label:'Nota de Toffoli',detail:'Negativa pública de favorecimento.'}],targets:[{id:'mesa-base',icon:'▱',label:'Mesa de luz vazia',detail:'Precisa de uma referência física.',accept:'planta-resort',result:'A planta fixa os lotes e as datas.'},{id:'camada-familia',icon:'◩',label:'Primeira camada',detail:'O registro precisa coincidir com os lotes.',accept:'contrato-familia',requires:['mesa-base'],result:'A participação da empresa aparece sobre o resort.'},{id:'camada-fundo',icon:'◪',label:'Segunda camada',detail:'Falta localizar a entrada do fundo.',accept:'folha-fundo',requires:['camada-familia'],result:'O fundo se alinha ao mesmo empreendimento.'},{id:'margem',icon:'▯',label:'Margem da apuração',detail:'O quadro também precisa registrar a resposta do citado.',accept:'nota-negativa',requires:['camada-fundo'],result:'A negativa fica anexada sem apagar as relações reportadas.'}],success:'As camadas convergem no resort; a negativa permanece visível na borda do quadro.'},choices:[
        {text:'Pedir a livre redistribuição.',effects:{pressure:-2,exposure:2,trust:0},flag:'redistribuiu',reply:[['TOFFOLI','Envie tudo à Presidência. Livre redistribuição.'],['NARRADOR','12 de fevereiro de 2026. O sorteio eletrônico gira.'],['SISTEMA','Relator sorteado: André Mendonça.'],['TOFFOLI','A chave mudou de bolso. A caixa, não.']]},
        {text:'Insistir em permanecer — até a reunião decidir.',effects:{pressure:3,exposure:3,trust:-2},flag:'resistiu_saida',reply:[['TOFFOLI','Não há impedimento. Os atos são válidos.'],['NARRADOR','Os colegas concordam com a validade dos atos — e a noite termina com o envio do caso para livre redistribuição.'],['SISTEMA','Relator sorteado: André Mendonça.'],['TOFFOLI','Então chamem de decisão institucional.']]}
      ],ending:'toffoli'}
    ]
  },
  {
    chapter:'MENDONÇA I · O FLUXO', date:'19 FEV 2026 · BRASÍLIA', bg:'assets/stf-office.webp', tint:'rgba(4,35,55,.2)',
    intro:[
      ['NARRADOR','A chave chega a André Mendonça. Os atos foram preservados; as críticas também.'],
      ['CHEFE DE GABINETE','Cerca de cem aparelhos esperam perícia. A PF quer o fluxo normal de volta.'],
      ['MENDONÇA','Então devolvemos o fluxo sem perder o mapa.']
    ],
    hotspots:[
      {id:'autos_recebidos',label:'Autos redistribuídos',x:69,y:48,lines:[['CHEFE DE GABINETE','O processo veio inteiro. As responsabilidades, em caixas separadas.'],['MENDONÇA','No Supremo, uma caixa nunca chega sem corredor.']]},
      {id:'nivel_sigilo',label:'Controle de acesso',x:84,y:52,lines:[['CHEFE DE GABINETE','O sigilo máximo virou parte da crise.'],['MENDONÇA','Então reduzimos o cadeado sem abandonar a porta.']]},
      {id:'despacho_fluxo',label:'Primeiro despacho',x:53,y:55,required:true,dossier:'fluxo_pf',lines:[['CHEFE DE GABINETE','O terminal está travado entre controle e paralisia. Configure um fluxo que realmente funcione.']],puzzle:{type:'terminal',title:'A fronteira do fluxo',kicker:'CONTROLE DE PERMISSÕES',prompt:'Autorize a perícia já determinada sem abrir uma porta irrestrita para novos inquéritos ou divulgação.',tools:[{id:'token-pericia',icon:'▣',label:'Token de perícia',detail:'Libera processamento do material apreendido.'},{id:'perfil-equipe',icon:'◇',label:'Perfil “equipe direta”',detail:'Restringe acesso aos agentes envolvidos.'},{id:'clausula-autorizacao',icon:'§',label:'Cláusula de autorização',detail:'Exige decisão do relator para nova frente.'},{id:'selo-sigilo',icon:'◆',label:'Selo de sigilo',detail:'Impede exportação pública dos dados.'}],targets:[{id:'fila',icon:'⌘',label:'Fila dos cem aparelhos',detail:'O processamento está suspenso.',accept:'token-pericia',result:'A perícia volta ao fluxo ordinário.'},{id:'usuarios',icon:'♙',label:'Grupo de usuários',detail:'O acesso ainda alcança a instituição inteira.',accept:'perfil-equipe',requires:['fila'],result:'Somente agentes diretamente envolvidos podem consultar.'},{id:'novas-frentes',icon:'⌁',label:'Módulo “nova investigação”',detail:'A função não tem regra de aprovação.',accept:'clausula-autorizacao',requires:['usuarios'],result:'Toda nova frente exige pedido fundamentado ao relator.'},{id:'exportacao',icon:'⇥',label:'Saída pública',detail:'Os dados ainda podem deixar o ambiente.',accept:'selo-sigilo',requires:['novas-frentes'],result:'A exportação externa é bloqueada e registrada.'}],success:'O fluxo volta a andar com perícia liberada, acesso limitado e novas frentes sob autorização.'},choices:[
        {text:'Liberar a perícia e exigir autorização para novas frentes.',effects:{trust:2,pressure:1,exposure:1},flag:'fluxo_controlado',reply:[['MENDONÇA','Perícia no fluxo ordinário. Nova investigação, pedido fundamentado.'],['NARRADOR','DOCUMENTADO: foi essa a arquitetura do despacho de 19 de fevereiro.']]},
        {text:'Centralizar também cada etapa da perícia.',effects:{trust:-1,pressure:2,exposure:-1},flag:'centralizou_pericia',reply:[['MENDONÇA','Nada se move sem nova conferência do gabinete.'],['CHEFE DE GABINETE','Mais controle. E mais um gargalo.'],['NARRADOR','DRAMATIZAÇÃO: na decisão real, a perícia dos aparelhos voltou ao fluxo ordinário da PF.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'MENDONÇA II · A PERGUNTA', date:'24 AGO 2026 · BRASÍLIA', bg:'assets/pf-lab.webp', tint:'rgba(0,30,48,.18)',
    intro:[
      ['NARRADOR','Seis meses de perícia transformam aparelhos em nomes.'],
      ['DELEGADA','Ministro, o material menciona “Paulo” e “Andrei”. Também há diálogos atribuídos a outras autoridades.'],
      ['MENDONÇA','Quando a investigação cita quem a conduz, o organograma vira evidência.']
    ],
    hotspots:[
      {id:'monitores_pf',label:'Monitores forenses',x:62,y:37,lines:[['NARRADOR','Os dados não chegam em frases completas. Chegam em fragmentos, horários, imagens e lacunas.'],['MENDONÇA','Uma lacuna também precisa de cadeia de custódia.']]},
      {id:'armario_evidencias',label:'Armário de evidências',x:88,y:28,lines:[['DELEGADA','Originais preservados. Cópias de trabalho registradas.'],['MENDONÇA','Que cada mão deixe uma assinatura.']]},
      {id:'relatorio_nomes',label:'Relatório preliminar',x:42,y:67,required:true,dossier:'relatorio_pf',lines:[['DELEGADA','Há nomes demais e contexto de menos. Trabalhe no original antes de transformar menção em conclusão.']],puzzle:{type:'forensic',title:'O nome dentro da máquina',kicker:'ESTAÇÃO FORENSE',prompt:'Preserve a fonte, reduza o ruído e extraia somente o que o material sustenta para o relatório.',tools:[{id:'imagem-forense',icon:'▣',label:'Imagem forense',detail:'Cópia verificada do aparelho.'},{id:'filtro-tempo',icon:'⌚',label:'Filtro de horário',detail:'Recorta a janela da conversa relevante.'},{id:'busca-nomes',icon:'⌕',label:'Busca contextual',detail:'Localiza nomes com mensagens anteriores e posteriores.'},{id:'modelo-relatorio',icon:'▤',label:'Modelo de relatório',detail:'Separa transcrição, inferência e providência.'}],targets:[{id:'estacao',icon:'⌘',label:'Estação isolada',detail:'Nenhum dado foi montado ainda.',accept:'imagem-forense',result:'A cópia abre com hash preservado.'},{id:'linha-tempo',icon:'⋮',label:'Linha do tempo',detail:'Milhares de mensagens cobrem meses.',accept:'filtro-tempo',requires:['estacao'],result:'A janela da conversa é reduzida sem cortar metadados.'},{id:'conversa',icon:'◫',label:'Trecho recuperado',detail:'“Paulo” e “Andrei” aparecem sem contexto suficiente.',accept:'busca-nomes',requires:['linha-tempo'],result:'Mensagens adjacentes identificam menções e limites da interpretação.'},{id:'relatorio',icon:'▥',label:'Relatório em branco',detail:'O documento precisa distinguir achado e hipótese.',accept:'modelo-relatorio',requires:['conversa'],result:'O relatório registra citações e pede providências sem declarar culpa.'}],success:'O nome saiu da máquina com contexto, metadados e limites explícitos.'},choices:[
        {text:'Ouvir diretamente os delegados e fixar prazo de 72 horas.',effects:{pressure:2,exposure:2,trust:0},flag:'chamou_delegados',reply:[['MENDONÇA','Tragam os delegados. Compartimentação máxima. Quero o quadro em setenta e duas horas.'],['NARRADOR','REPORTADO: Mendonça afirmou ter adotado contato direto para preservar sigilo e funcionalidade.']]},
        {text:'Encaminhar tudo pela direção da PF e pela PGR.',effects:{pressure:1,exposure:-1,trust:2},flag:'via_institucional',reply:[['MENDONÇA','A cadeia institucional também é uma cadeia de custódia. Formalizem pelos canais.'],['DELEGADA','Mesmo quando os canais aparecem nas mensagens?'],['NARRADOR','DRAMATIZAÇÃO: o caminho documentado incluiu o contato direto com os delegados.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'MENDONÇA III · A CANETA', date:'8–10 SET 2026 · BRASÍLIA', bg:'assets/stf-office.webp', tint:'rgba(65,0,15,.24)',
    intro:[
      ['NARRADOR','O relatório atravessa o tribunal. A pergunta sobre a PF vira uma decisão contra a chefia da PF.'],
      ['CHEFE DE GABINETE','A minuta afasta Andrei Rodrigues. A Segunda Turma começou a votar.'],
      ['CHEFE DE GABINETE','E a Presidência quer explicações.']
    ],
    hotspots:[
      {id:'votos_turma',label:'Painel da Segunda Turma',x:62,y:28,lines:[['CHEFE DE GABINETE','Dois votos acompanharam a medida antes do pedido de vista.'],['MENDONÇA','No processo eletrônico, até o silêncio tem horário.']]},
      {id:'telefone_fachin',label:'Ligação da Presidência',x:88,y:51,lines:[['CHEFE DE GABINETE','A Presidência quer esclarecimentos. A AGU pediu o retorno imediato do diretor.'],['MENDONÇA','A caneta que pergunta é a mesma que pode suspender.']]},
      {id:'ordem_afastamento',label:'Ordem de afastamento',x:72,y:55,required:true,dossier:'afastamento_pf',lines:[['CHEFE DE GABINETE','A caneta assinou uma ordem. Agora descubra o que ainda está juridicamente de pé.']],puzzle:{type:'protocol',title:'A caneta suspensa',kicker:'MESA DE PROTOCOLO',prompt:'Faça os documentos atravessarem o circuito institucional e determine qual ato continua produzindo efeito.',tools:[{id:'relatorio-agosto',icon:'▤',label:'Relatório de agosto',detail:'Base usada para a medida cautelar.'},{id:'ordem-oito',icon:'▣',label:'Ordem de 8 de setembro',detail:'Afasta a direção-geral da PF.'},{id:'suspensao-nove',icon:'⊘',label:'Suspensão de 9 de setembro',detail:'Decisão da Presidência do STF.'},{id:'painel-turma',icon:'▦',label:'Extrato da Segunda Turma',detail:'Dois votos e um pedido de vista.'}],targets:[{id:'fundamento',icon:'□',label:'Bandeja de fundamento',detail:'A minuta ainda não possui peça de apoio.',accept:'relatorio-agosto',result:'O relatório é vinculado à ordem.'},{id:'protocolo-ordem',icon:'▣',label:'Protocolo cautelar',detail:'A medida ainda não foi formalizada.',accept:'ordem-oito',requires:['fundamento'],result:'O afastamento passa a produzir efeito.'},{id:'mesa-presidencia',icon:'⊘',label:'Mesa da Presidência',detail:'Há um ato posterior aguardando registro.',accept:'suspensao-nove',requires:['protocolo-ordem'],result:'A ordem de afastamento fica suspensa; Andrei retorna.'},{id:'placar',icon:'▦',label:'Painel do julgamento',detail:'O colegiado ainda não encerrou a disputa.',accept:'painel-turma',requires:['mesa-presidencia'],result:'O pedido de vista interrompe o julgamento. A suspensão permanece operante.'}],success:'O circuito termina sem decisão colegiada final: o afastamento está suspenso.'},choices:[
        {text:'Afastar cautelarmente a direção da PF.',effects:{pressure:3,exposure:3,trust:-2},flag:'afastou_andrei',reply:[['MENDONÇA','Assino o afastamento cautelar. A apuração não pode depender de quem aparece nela.'],['NARRADOR','DOCUMENTADO: a ordem foi dada em 8 de setembro e suspensa por Fachin no dia seguinte.']]},
        {text:'Levar a suspeita diretamente ao plenário.',effects:{pressure:2,exposure:2,trust:1},flag:'levou_plenario',reply:[['MENDONÇA','Não afasto sozinho. Remeto ao plenário com urgência.'],['CHEFE DE GABINETE','Menos impacto imediato. Mais testemunhas.'],['NARRADOR','DRAMATIZAÇÃO: Mendonça determinou o afastamento; Fachin suspendeu a medida no dia seguinte.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'MENDONÇA IV · A SENHA', date:'19 SET 2026 · BRASÍLIA', bg:'assets/pf-lab.webp', tint:'rgba(0,18,45,.25)',
    intro:[
      ['NARRADOR','Quinhentos gigabytes. Lacrados. Criptografados.'],
      ['CHEFE DE GABINETE','Não abre. O gabinete de Fux teve o mesmo problema.'],
      ['MENDONÇA','A prova está aqui. A chave, não.']
    ],onEnter:()=>addItem('drive'),
    hotspots:[
      {id:'original_pf',label:'Extração original',x:15,y:45,lines:[['DELEGADA','O aparelho e a extração original permanecem sob guarda técnica da PF.'],['MENDONÇA','O original fica onde a discussão começou.']]},
      {id:'copia_lacrada',label:'Cópia lacrada',x:79,y:70,lines:[['CHEFE DE GABINETE','O senhor disse que a manteve lacrada como contraprova.'],['MENDONÇA','Uma cópia intocada prova o que não fizemos. Não revela o que precisamos ler.']]},
      {id:'terminal_cripto',label:'Terminal criptografado',x:58,y:39,required:true,dossier:'copia_500gb',lines:[['SISTEMA','VOLUME NÃO MONTADO. Diagnóstico necessário.']],puzzle:{type:'diagnostic',title:'A chave que falta',kicker:'DIAGNÓSTICO CRIPTOGRÁFICO',prompt:'Verifique se a cópia foi corrompida, teste a credencial recebida e identifique exatamente o que o gabinete não possui.',tools:[{id:'drive-copia',inventoryId:'drive',icon:'▥',label:'Cópia de 500 GB',detail:'Volume lacrado recebido da PF.'},{id:'verificador',icon:'#',label:'Verificador de hash',detail:'Compara a cópia com o registro de origem.'},{id:'credencial',icon:'◇',label:'Credencial do gabinete',detail:'Certificado disponível no processo.'},{id:'oficio',icon:'▤',label:'Ofício técnico',detail:'Pedido formal com registro de custódia.'}],targets:[{id:'baia',icon:'⌁',label:'Baia isolada',detail:'A cópia ainda está desconectada.',accept:'drive-copia',result:'O volume é detectado, mas permanece criptografado.'},{id:'integridade',icon:'#',label:'Console de integridade',detail:'É preciso excluir dano ou cópia incompleta.',accept:'verificador',requires:['baia'],result:'Hash confere. Os dados estão íntegros.'},{id:'montagem',icon:'⌘',label:'Terminal de montagem',detail:'Acesso depende da chave correta.',accept:'credencial',requires:['integridade'],result:'Credencial válida para o gabinete, inválida para o volume. Falta a chave de descriptografia.'},{id:'protocolo-ajuda',icon:'⇥',label:'Canal técnico da PF',detail:'O diagnóstico precisa acompanhar o pedido.',accept:'oficio',requires:['montagem'],result:'O gabinete solicita acesso técnico sem romper a cadeia de custódia.'}],success:'A cópia está íntegra. O defeito não é o arquivo: é a chave que não veio.'},choices:[
        {text:'Pedir auxílio técnico formal à PF.',effects:{trust:2,pressure:-1,exposure:1},flag:'pediu_ajuda_pf',reply:[['MENDONÇA','Oficie-se. Precisamos de acesso integral, com registro de cada passo.'],['DELEGADA','A equipe técnica responde. A crise institucional fica fora da sala — se couber.']]},
        {text:'Exigir nova cópia e chave verificável.',effects:{trust:0,pressure:2,exposure:2},flag:'exigiu_nova_copia',reply:[['MENDONÇA','Nova cópia, nova chave e hash de verificação. Tudo formalizado.'],['DELEGADA','É um pedido de ajuda escrito como ordem. Ainda é ajuda.']]}
      ],ending:'mendonca'}
    ]
  },
  {
    chapter:'BÔNUS I · A REUNIÃO', date:'8–12 NOV 2022 · BRASÍLIA', bg:'assets/copa-residence-street.webp', tint:'rgba(18,30,24,.22)',
    intro:[['NARRADOR','Meia-noite. Chuva grossa numa rua residencial de Brasília. Você espera no carro sem saber se alguém vai voltar.'],['RÁDIO','Portão abriu. Não saia.'],['NARRADOR','Um envelope molhado desliza por baixo do banco. No verso, marcas de outra página.']],
    hotspots:[
      {id:'portao',label:'Portão entreaberto',x:55,y:43,dossier:'reuniao_doze',lines:[['NARRADOR','Um homem sai sem olhar para os carros. A acusação situaria a reunião naquela noite; as defesas contestariam a caracterização.']]},
      {id:'carro_reuniao',label:'Retrovisor embaçado',x:18,y:55,lines:[['NARRADOR','No reflexo, o envelope parece vazio. Contra a luz do poste, aparecem sulcos de impressão.']]},
      {id:'cronologia_reuniao',label:'Registros preparatórios',x:76,y:63,required:true,dossier:'punhal_impresso',lines:[['SISTEMA','Quatro vestígios. Reconstrua a sequência sem converter acusação em certeza.']],puzzle:{type:'chronology-bench',title:'Antes de sair a campo',kicker:'CRONOLOGIA DA ACUSAÇÃO',prompt:'Encaixe os registros públicos na cadeia preparatória que culmina na reunião de 12 de novembro.',tools:[{id:'msg-oito',icon:'▣',label:'Mensagem de 8/11',detail:'Pedido para “rascunhar alguma coisa”, citado na denúncia.'},{id:'impressao-nove',icon:'▤',label:'Impressão de 9/11',detail:'Registro atribuído ao documento Punhal Verde e Amarelo.'},{id:'agenda-dez',icon:'◇',label:'Agenda de 10–11/11',detail:'Mensagens sobre horário e visita.'},{id:'reuniao-doze',icon:'●',label:'Registro de 12/11',detail:'Data da reunião sustentada pela acusação.'}],targets:[{id:'origem',icon:'□',label:'Início documental',detail:'A cadeia começa sem o primeiro pedido registrado.',accept:'msg-oito',result:'8/11: o pedido entra na cronologia.'},{id:'documento',icon:'▤',label:'Documento',detail:'Falta o registro que liga o rascunho ao Punhal.',accept:'impressao-nove',requires:['origem'],result:'9/11: a impressão é inserida com atribuição à PF.'},{id:'convocacao',icon:'◇',label:'Convocação',detail:'A visita ainda não possui janela temporal.',accept:'agenda-dez',requires:['documento'],result:'10–11/11: mensagens situam o agendamento.'},{id:'encontro',icon:'●',label:'Reunião atribuída',detail:'A sequência ainda não alcança o encontro apontado.',accept:'reuniao-doze',requires:['convocacao'],result:'12/11: a reunião fecha a cadeia alegada.'}],success:'A fase preparatória foi reconstruída com datas, atribuição e contestação preservadas.'},choices:[{text:'Entrar sabendo que a ordem ainda não existe.',effects:{trust:2,pressure:1},flag:'copa_entrou_com_lacuna',reply:[['FE','Planejamento não é ordem. E reunião não apaga responsabilidade.']]},{text:'Tratar a reunião como ponto de partida.',effects:{exposure:2,pressure:2,trust:-1},flag:'copa_reuniao_marco',reply:[['FE','Depois desta noite, cada movimento terá um antes.']]}],advance:true}
    ]
  },
  {
    chapter:'BÔNUS II · SEIS LINHAS', date:'8–9 DEZ 2022 · RUAS DE BRASÍLIA', bg:'assets/copa-residence-street.webp', tint:'rgba(4,28,42,.28)',
    intro:[['NARRADOR','Quase um mês depois. Uma sacola preta espera no banco traseiro. Dentro, seis aparelhos iguais.'],['RÁDIO','Países no lugar dos nomes. Nada além disso.'],['NARRADOR','Quando o primeiro acende, os outros cinco vibram em sequência.']],onEnter:()=>addItem('seis_telefones'),
    hotspots:[
      {id:'seis_silhuetas',label:'Seis reflexos',x:34,y:45,dossier:'seis_paises',lines:[['NARRADOR','No vidro, seis vultos cruzam em direções diferentes. Os rostos não aparecem: parte das correspondências individuais não se tornou pública.']]},
      {id:'luzes_carros',label:'Sacola no banco',x:70,y:55,lines:[['NARRADOR','Alemanha, Argentina, Áustria, Brasil, Gana e Japão. Os nomes estão riscados na carcaça, não na agenda.']]},
      {id:'quadro_linhas',label:'Seis registros de linha',x:51,y:69,required:true,dossier:'copa_signal',lines:[['SISTEMA','Monte o quadro sem preencher as lacunas que os autos não fecharam.']],puzzle:{type:'evidence-board',title:'Seis aparelhos, seis lacunas',kicker:'QUADRO DE EVIDÊNCIAS',prompt:'Relacione quantidade, período, grupo e codinomes. Pare exatamente onde a prova pública para.',tools:[{id:'ativacoes',icon:'▦',label:'Ativações de 8–9/12',detail:'Seis linhas surgem quase simultaneamente.'},{id:'janela-uso',icon:'↔',label:'Janela de uso',detail:'Registros entre 8 e 16 de dezembro.'},{id:'grupo-signal',icon:'◈',label:'Grupo “Copa 2022”',detail:'Nome citado pela investigação.'},{id:'seis-codinomes',icon:'≡',label:'Seis codinomes',detail:'Alemanha, Argentina, Áustria, Brasil, Gana e Japão.'},{id:'limite-identidade',icon:'?',label:'Limite probatório',detail:'Nem toda correspondência individual é pública.'}],targets:[{id:'quantidade',icon:'▦',label:'Painel de aparelhos',detail:'A quantidade ainda não está demonstrada.',accept:'ativacoes',result:'Seis posições são abertas.'},{id:'periodo',icon:'↔',label:'Faixa temporal',detail:'Os registros ainda não possuem início e fim.',accept:'janela-uso',requires:['quantidade'],result:'8–16/12: a janela de uso é marcada.'},{id:'canal',icon:'◈',label:'Canal comum',detail:'Falta o vínculo entre os seis registros.',accept:'grupo-signal',requires:['periodo'],result:'O grupo “Copa 2022” conecta as linhas.'},{id:'nomes-codigo',icon:'≡',label:'Camada de codinomes',detail:'O quadro ainda não mostra os países publicados.',accept:'seis-codinomes',requires:['canal'],result:'Os seis codinomes entram no quadro.'},{id:'lacunas',icon:'?',label:'Identidades não fechadas',detail:'O sistema tenta completar o que não foi confirmado.',accept:'limite-identidade',requires:['nomes-codigo'],result:'As duas lacunas permanecem visíveis.'}],success:'O grupo foi reconstruído sem inventar os dois usuários não confirmados.'},choices:[{text:'Exigir que toda ordem apareça no canal.',effects:{exposure:3,trust:1},flag:'copa_canal_registrado',reply:[['FE','Se alguém mandar avançar, ficará registrado.']]},{text:'Recusar qualquer movimento sem comando inequívoco.',effects:{pressure:1,trust:2},flag:'copa_ordem_inequivoca',reply:[['FE','Ninguém sai da posição por interpretação.']]}],advance:true}
    ]
  },
  {
    chapter:'BÔNUS III · UM MÊS EM CAMPO', date:'NOV–14 DEZ 2022 · BRASÍLIA', bg:'assets/copa-civic-avenue.webp', tint:'rgba(10,28,44,.25)',
    intro:[['NARRADOR','A cidade muda de luz, não de desenho. O mesmo carro reaparece em avenidas diferentes.'],['NARRADOR','A matriz dos seis aparelhos pulsa no bolso. Cada pulso deixa um quadrante aceso.'],['NARRADOR','Os pontos são zonas abstratas: nenhum endereço ou trajeto real é reproduzido.']],
    hotspots:[
      {id:'eixo',label:'Eixo cívico',x:57,y:35,dossier:'mes_em_campo',lines:[['NARRADOR','Mensagens, sinais de telefonia, mapas e diligências posteriores foram cruzados pela PF.'],['FE','Separados, parecem ruído. Juntos, contam deslocamento.']]},
      {id:'veiculos',label:'Veículos na avenida',x:77,y:58,lines:[['GANA','Um carro passa. Outro espera. O tabuleiro é a cidade inteira.']]},
      {id:'rastro_urbano',label:'Rastro urbano',x:31,y:67,required:true,lines:[['SISTEMA','Reconstrua o período de campo sem revelar posições operacionais exatas.']],puzzle:{type:'trace-analysis',title:'A cidade como rastro',kicker:'ANÁLISE DE CAMPO',prompt:'Combine quatro classes de evidência para mostrar continuidade entre novembro e a véspera da ação.',tools:[{id:'mensagens-novembro',icon:'▣',label:'Mensagens de novembro',detail:'Indicam preparação e acompanhamento.'},{id:'sinais-dezembro',icon:'⌁',label:'Sinais de 8–14/12',detail:'Mostram atividade recorrente em Brasília.'},{id:'mapas-pf',icon:'◇',label:'Mapas da PF',detail:'Convertem sinais em zonas urbanas amplas.'},{id:'diligencias',icon:'⌕',label:'Diligências posteriores',detail:'Fotografias e conferências dos locais percorridos.'}],targets:[{id:'continuidade',icon:'▣',label:'Linha de continuidade',detail:'Novembro e dezembro ainda parecem episódios isolados.',accept:'mensagens-novembro',result:'A preparação começa a se ligar ao campo.'},{id:'presenca',icon:'⌁',label:'Presença em Brasília',detail:'Falta sustentar atividade na janela de dezembro.',accept:'sinais-dezembro',requires:['continuidade'],result:'Os sinais mostram recorrência antes do dia 15.'},{id:'zonas',icon:'◇',label:'Zonas abstratas',detail:'Os registros ainda não foram convertidos em áreas.',accept:'mapas-pf',requires:['presenca'],result:'As posições aparecem apenas como zonas amplas.'},{id:'checagem',icon:'⌕',label:'Checagem física',detail:'A reconstrução ainda depende só de dados digitais.',accept:'diligencias',requires:['zonas'],result:'As diligências posteriores fecham o cruzamento.'}],success:'O mês em campo aparece como continuidade — sem expor rotas nem técnicas.'},choices:[{text:'Manter a equipe parada até o dia decisivo.',effects:{pressure:2,exposure:1},flag:'copa_espera_campo',reply:[['FE','A espera também deixa rastro quando dura um mês.']]},{text:'Questionar o objetivo antes da mobilização.',effects:{trust:2,pressure:2},flag:'copa_questionou_objetivo',reply:[['FE','Monitorar não responde o que esperam que aconteça no fim.']]}],advance:true}
    ]
  },
  {
    chapter:'BÔNUS IV · 15 DE DEZEMBRO', date:'NOITE · EIXO CÍVICO', bg:'assets/copa-civic-avenue.webp', tint:'rgba(48,12,26,.3)',
    intro:[['NARRADOR','15 de dezembro. A sessão termina antes do esperado. Três faróis acendem quase ao mesmo tempo.'],['RÁDIO','Um perto do tribunal. Outro se move. O terceiro está na zona residencial.'],['NARRADOR','O painel ainda marca AGUARDAR. A cidade, porém, já mudou.']],
    hotspots:[
      {id:'predios_civicos',label:'Prédios públicos',x:70,y:30,dossier:'campo_quinze',lines:[['NARRADOR','Segundo a PF, a distribuição dos sinais mostrava integrantes em campo durante a execução.'],['FE','O mapa diz onde o aparelho estava. A acusação diz por quê.']]},
      {id:'avenida_quinze',label:'Avenida molhada',x:45,y:61,lines:[['ÁUSTRIA','Estou em deslocamento.'],['FE','Sem ordem, deslocamento não vira ação.']]},
      {id:'painel_posicoes',label:'Estados da equipe',x:83,y:63,required:true,lines:[['SISTEMA','Atualize o quadro de situação usando apenas as três posições amplas publicadas.']],puzzle:{type:'field-status',title:'Três pontos na cidade',kicker:'QUADRO DE SITUAÇÃO',prompt:'Reconstrua o estado da operação no dia 15 sem usar endereços, rotas ou detalhes de abordagem.',tools:[{id:'sessao-stf',icon:'▤',label:'Sessão encerrada',detail:'O julgamento termina antes da expectativa.'},{id:'sinal-stf',icon:'●',label:'Sinal próximo ao STF',detail:'Um aparelho aparece perto do tribunal.'},{id:'sinal-transito',icon:'→',label:'Sinal em deslocamento',detail:'Outro integrante está a caminho.'},{id:'sinal-residencial',icon:'◇',label:'Sinal em região residencial',detail:'O terceiro está numa zona ampla ligada ao alvo.'},{id:'ordem-espera',icon:'…',label:'Ordem de espera',detail:'Nenhuma autorização de avanço aparece.'}],targets:[{id:'mudanca-agenda',icon:'▤',label:'Mudança de contexto',detail:'O quadro ainda pressupõe que o julgamento continua.',accept:'sessao-stf',result:'O encerramento antecipado altera a situação.'},{id:'ponto-um',icon:'●',label:'Zona cívica',detail:'Falta o primeiro registro amplo.',accept:'sinal-stf',requires:['mudanca-agenda'],result:'Um integrante é situado perto do STF.'},{id:'ponto-dois',icon:'→',label:'Corredor de deslocamento',detail:'Falta o segundo estado publicado.',accept:'sinal-transito',requires:['ponto-um'],result:'Outro integrante aparece em deslocamento.'},{id:'ponto-tres',icon:'◇',label:'Zona residencial',detail:'Falta o terceiro estado amplo.',accept:'sinal-residencial',requires:['ponto-dois'],result:'Um integrante é situado na região residencial.'},{id:'estado-final',icon:'…',label:'Estado operacional',detail:'O quadro ainda confunde posição com autorização.',accept:'ordem-espera',requires:['ponto-tres'],result:'Estado correto: equipe em campo, sem nova ordem de avanço.'}],success:'O quadro mostra execução em campo e três estados — sem transformar posição em instrução.'},choices:[{text:'Manter todos imóveis e pedir cancelamento.',effects:{trust:2,pressure:-1},flag:'copa_pediu_cancelamento',reply:[['FE','A situação mudou. Quero a ordem de encerrar.']]},{text:'Aguardar confirmação explícita no canal.',effects:{exposure:2,pressure:2},flag:'copa_aguardou_canal',reply:[['FE','Sem confirmação, ninguém improvisa.']]}],advance:true}
    ]
  },
  {
    chapter:'BÔNUS V · 20H59', date:'15 DEZ 2022 · PONTO DE DESEMBARQUE', bg:'assets/copa-abort-road.webp', tint:'rgba(66,8,14,.28)',
    intro:[['RÁDIO','20h57. “Tô perto da posição. Vai cancelar?”'],['NARRADOR','A resposta chega cortada por estática. A fita registra quatro fragmentos.'],['RÁDIO','20h59. “Abortar. Volta para o local de desembarque.”']],
    hotspots:[
      {id:'porta_aberta',label:'Veículo no retorno',x:24,y:58,lines:[['FE','A porta está aberta. A ordem, finalmente, não deixa margem.']]},
      {id:'avenida_vazia',label:'Avenida vazia',x:68,y:48,lines:[['NARRADOR','A ação foi abortada. Os sinais continuaram existindo.']]},
      {id:'cadeia_aborto',label:'Mensagens de 20h57–20h59',x:53,y:70,required:true,dossier:'jogo_cancelado',lines:[['SISTEMA','Reconstitua os dois minutos finais e encerre todos os estados abertos.']],puzzle:{type:'signal-reconstruction',title:'Dois minutos para abortar',kicker:'RECONSTRUÇÃO FINAL',prompt:'Organize pergunta, ordem, retorno e fechamento. “Cancelamento do jogo” aparece apenas como o código reproduzido nos autos.',tools:[{id:'pergunta-2057',icon:'?',label:'Pergunta · 20h57',detail:'Áustria pergunta se a ação será cancelada.'},{id:'abortar-2059',icon:'⊘',label:'Ordem · 20h59',detail:'Alemanha manda abortar.'},{id:'retorno',icon:'↩',label:'Retorno',detail:'A mensagem determina voltar ao desembarque.'},{id:'fechamento',icon:'✓',label:'Confirmação do grupo',detail:'Os estados abertos são encerrados.'}],targets:[{id:'duvida',icon:'?',label:'Canal aberto',detail:'A primeira mensagem ainda não tem lugar na sequência.',accept:'pergunta-2057',result:'20h57: a dúvida registra que o cancelamento ainda não chegou.'},{id:'ordem',icon:'⊘',label:'Estado da operação',detail:'A operação permanece marcada como ativa.',accept:'abortar-2059',requires:['duvida'],result:'20h59: o estado muda para ABORTADA.'},{id:'recolhimento',icon:'↩',label:'Ponto de retorno',detail:'Ainda há um integrante fora do encerramento.',accept:'retorno',requires:['ordem'],result:'A ordem de retorno fecha o deslocamento.'},{id:'encerrado',icon:'✓',label:'Registro final',detail:'Falta confirmar que o grupo recebeu o novo estado.',accept:'fechamento',requires:['recolhimento'],result:'Todos os estados são encerrados; o rastro permanece.'}],success:'20h59. Operação abortada durante a execução. A rua esvazia; a evidência fica.'},choices:[{text:'Confirmar e encerrar o canal.',effects:{trust:2,pressure:-2,exposure:1},flag:'copa_confirmou_aborto',reply:[['FE','Recebido. Operação abortada.'],['NARRADOR','ALEGADO PELA PF: as mensagens e sinais permitiram reconstruir a noite.']]},{text:'Confirmar o retorno de todos antes de fechar.',effects:{trust:1,pressure:1,exposure:2},flag:'copa_confirmou_retorno',reply:[['FE','Um por um. Confirmem retorno. Depois, silêncio.']]}],ending:'copa'}
    ]
  }
];

// Os dados antigos permanecem junto às cenas como arquivo editorial, mas não
// dirigem mais a interação. Cada chave abaixo substitui a antiga bancada de
// associações por um mecanismo visual com regra própria.
const adventurePuzzles = {
  '0_telefone':{mode:'mosaic',title:'A minuta rasgada',kicker:'DOCUMENTO FÍSICO',prompt:'Recomponha a página. Bordas, carimbos e linhas precisam continuar de um fragmento para o outro.',pieces:['58% DO CAPITAL','49% DAS ORDINÁRIAS','100% DAS PREFERENCIAIS','APROVAÇÃO SOCIETÁRIA','APROVAÇÃO LEGISLATIVA','BANCO CENTRAL'],start:[3,0,5,2,1,4],success:'A página recomposta mostra que anúncio e conclusão eram coisas diferentes.'},
  '1_envelope':{mode:'slider',title:'O veto no triturador',kicker:'DOCUMENTO DESLIZANTE',prompt:'Há um espaço vazio no triturador. Deslize os oito fragmentos até o texto voltar a correr sem saltos.',pieces:['3 SET','BANCO CENTRAL','REJEITA','A OPERAÇÃO','ESTRUTURA','DO NEGÓCIO','SEM EFEITO','PROTOCOLO'],scramble:[7,6,3,4,5,2,1],success:'O veto volta a existir como documento — não como resumo de reunião.'},
  '4_gravador':{mode:'dials',title:'Três relógios, uma versão',kicker:'CONTRADIÇÃO TEMPORAL',prompt:'Ajuste os três mostradores usando o celular, a minuta e o plano de voo. A declaração só abre quando os horários não contradizem os documentos.',clue:'Mensagem “sem assinatura”: 18h02 · plano de voo: 19h31 · estado da venda: ainda sem assinatura.',wheels:[{label:'MENSAGEM',values:['17:46','18:02','18:20'],answer:'18:02'},{label:'PLANO DE VOO',values:['18:31','19:03','19:31'],answer:'19:31'},{label:'CONTRATO',values:['ASSINADO','SEM ASSINATURA','CANCELADO'],answer:'SEM ASSINATURA'}],success:'A versão agora respeita os três registros em vez de costurá-los à força.'},
  '5_pasta_sigilo':{mode:'dials',title:'A fechadura do sigilo',kicker:'TRÊS ANÉIS CONCÊNTRICOS',prompt:'Gire os anéis. O índice deve continuar visível, os anexos sensíveis ficam isolados e o núcleo permanece sob a chave do relator.',clue:'Do lado de fora para dentro: acesso público → restrição seletiva → controle do gabinete.',wheels:[{label:'ÍNDICE',values:['FECHADO','PÚBLICO','VAZIO'],answer:'PÚBLICO'},{label:'ANEXOS',values:['PÚBLICOS','DESTRUÍDOS','RESTRITOS'],answer:'RESTRITOS'},{label:'NÚCLEO',values:['PF','RELATOR','IMPRENSA'],answer:'RELATOR'}],success:'A pasta abre por camadas. O custo do mecanismo fica visível.'},
  '6_caixa_lacrada':{mode:'circuit',title:'Cadeia sem atalho',kicker:'CIRCUITO DE CUSTÓDIA',prompt:'Gire as peças até formar um único caminho contínuo entre APREENSÃO e PERÍCIA. Qualquer ramificação solta invalida o circuito.',cols:4,pieces:[['line',1,0],['corner',2,1],['corner',1,2],['line',0,1],['corner',3,0],['line',1,0],['corner',0,3],['line',0,1]],success:'Identificação, lacre, transporte e extração agora formam um rastro auditável.'},
  '7_chave_final':{mode:'mosaic',title:'O resort sob três camadas',kicker:'ACETATOS SOBREPOSTOS',prompt:'Troque as placas até planta, registro societário e documento do fundo alinharem datas e lotes. A negativa pública deve permanecer na margem.',pieces:['PLANTA · LOTE A','REGISTRO · FAMÍLIA','DATA · ENTRADA','FUNDO · VÍNCULO REPORTADO','NOTA · NEGATIVA','MARGEM · CONTESTAÇÃO'],start:[4,1,5,0,3,2],success:'A convergência aparece sem apagar a negativa pública de favorecimento.'},
  '8_despacho_fluxo':{mode:'circuit',title:'A fronteira do fluxo',kicker:'CIRCUITO DE PERMISSÕES',prompt:'Reconecte a perícia aos cem aparelhos. O caminho precisa passar por equipe direta, autorização do relator e bloqueio de exportação.',cols:4,pieces:[['line',1,0],['corner',0,1],['corner',3,2],['line',0,1],['corner',2,3],['line',1,0],['corner',1,0],['line',0,1]],success:'A perícia volta a andar sem transformar acesso técnico em porta irrestrita.'},
  '9_relatorio_nomes':{mode:'switches',title:'Ruído de contexto',kicker:'MATRIZ FORENSE',prompt:'Apague os blocos de ruído. Cada toque altera também os quatro blocos vizinhos; só restará a janela de conversa preservada.',cols:3,rows:3,seedMoves:[0,4,7],success:'O trecho relevante emerge com mensagens adjacentes, horário e metadados.'},
  '10_ordem_afastamento':{mode:'slider',title:'A ordem que perdeu efeito',kicker:'PROTOCOLO DESLIZANTE',prompt:'Reorganize o circuito documental até descobrir qual ato ainda produzia efeito após o pedido de vista.',pieces:['RELATÓRIO','ORDEM 8/9','AFASTAMENTO','SUSPENSÃO 9/9','RETORNO','2 VOTOS','PEDIDO DE VISTA','SUSPENSÃO VIGENTE'],scramble:[7,6,3,4,5,2,1],success:'O afastamento termina suspenso; o julgamento colegiado não chegou ao fim.'},
  '11_terminal_cripto':{mode:'switches',title:'O volume que não monta',kicker:'BLOCOS DE INTEGRIDADE',prompt:'Normalize os nove blocos do volume. Se todos apagarem e o arquivo continuar fechado, o defeito não está na cópia.',cols:3,rows:3,seedMoves:[1,3,5,8],success:'Hash íntegro. A cópia existe; a chave de descriptografia, não.'},
  '12_cronologia_reuniao':{mode:'mosaic',title:'O verso da folha',kicker:'IMPRESSÃO DE 9 DE NOVEMBRO',prompt:'A chuva separou a folha de carbono em seis partes. Refaça as fibras, carimbos e marcas de pressão — a cronologia aparece no verso.',pieces:['8 NOV · RASCUNHO','9 NOV · IMPRESSÃO','10 NOV · CONTATO','11 NOV · HORÁRIO','12 NOV · REUNIÃO ALEGADA','DEFESAS CONTESTAM'],start:[2,5,0,4,1,3],rewardItem:'folha_carbono',success:'O papel recomposto liga preparação, impressão e reunião sem converter acusação em fato incontroverso.'},
  '13_quadro_linhas':{mode:'circuit',title:'A caixa dos seis aparelhos',kicker:'PLACA DE ATIVAÇÃO',prompt:'A folha de carbono revela o desenho da placa. Gire os contatos para energizar seis saídas e preserve dois encaixes de identidade deliberadamente vazios.',requiresItem:'folha_carbono',cols:3,pieces:[['corner',2,1],['tee',1,0],['corner',0,3],['line',1,0],['tee',2,1],['line',0,1],['corner',3,0],['tee',0,3],['corner',1,2]],rewardItem:'matriz_sinais',success:'As seis linhas entram no mesmo circuito; as duas identidades não confirmadas continuam vazias.'},
  '14_rastro_urbano':{mode:'switches',title:'Brasília em camadas',kicker:'MAPA DE SINAIS',prompt:'A matriz dos aparelhos acende zonas conflitantes. Toque nos quadrantes até eliminar o ruído e conservar apenas a continuidade entre novembro e 14 de dezembro.',requiresItem:'matriz_sinais',cols:4,rows:3,seedMoves:[0,3,5,10],rewardItem:'acetato_zonas',success:'O acetato mostra continuidade em áreas amplas, sem revelar rotas ou endereços.'},
  '15_painel_posicoes':{mode:'dials',title:'A noite mudou de forma',kicker:'PAINEL MECÂNICO DE CAMPO',prompt:'Use o acetato para ajustar os estados publicados. Posição não é autorização: o último mostrador decide se existe ordem de avanço.',requiresItem:'acetato_zonas',clue:'Sessão encerrada · um sinal perto do STF · outro em deslocamento · outro na região residencial · nenhuma nova ordem.',wheels:[{label:'CONTEXTO',values:['SESSÃO ATIVA','SESSÃO ENCERRADA','SEM SESSÃO'],answer:'SESSÃO ENCERRADA'},{label:'PONTO A',values:['STF','AEROPORTO','PLANALTO'],answer:'STF'},{label:'PONTO B',values:['PARADO','DESLOCAMENTO','SEM SINAL'],answer:'DESLOCAMENTO'},{label:'PONTO C',values:['COMERCIAL','RESIDENCIAL','RURAL'],answer:'RESIDENCIAL'},{label:'ORDEM',values:['AVANÇAR','AGUARDAR','ENCERRAR CANAL'],answer:'AGUARDAR'}],rewardItem:'fita_2057',success:'Três posições aparecem no painel. Nenhuma delas, sozinha, vira ordem.'},
  '16_cadeia_aborto':{mode:'cipher',title:'Dois minutos no rádio',kicker:'DECODIFICADOR 20H57–20H59',prompt:'Encaixe a fita de 20h57 e gire os quatro cilindros até a mensagem final deixar de ser ruído.',requiresItem:'fita_2057',clue:'A pergunta vem às 20h57. Dois minutos depois, a ordem muda o estado e determina o retorno ao desembarque.',wheels:[{label:'ENTRADA',values:['20:55','20:57','20:59'],answer:'20:57'},{label:'RESPOSTA',values:['20:58','20:59','21:01'],answer:'20:59'},{label:'ESTADO',values:['AGUARDAR','AVANÇAR','ABORTAR'],answer:'ABORTAR'},{label:'DESTINO',values:['POSIÇÃO','DESEMBARQUE','TRIBUNAL'],answer:'DESEMBARQUE'}],success:'20h59. A ação é abortada; o rastro digital permanece.'}
};

const messagesByScene = [
  [{from:'Caio',time:'21:14',text:'Saiu. BRB confirmou o acordo.'},{from:'Helena',time:'21:19',text:'Não chame de operação concluída. Há aprovações pendentes.'},{mine:true,time:'21:22',text:'Reunião no escritório. Agora.'}],
  [{from:'Caio',time:'20:03',text:'BC rejeitou.'},{from:'Otávio',time:'20:05',text:'Não responda a ninguém antes de nos vermos.'},{from:'Helena',time:'20:07',text:'A liquidez amanhã não vai esperar nosso texto.'}],
  [{from:'Caio',time:'17:46',text:'Fictor aceita anúncio conjunto hoje.'},{from:'Helena',time:'18:02',text:'Ainda não temos assinatura.'},{from:'Tripulação',time:'19:31',text:'Plano de voo confirmado. Aguardando no hangar.'},{mine:true,time:'19:44',text:'Estou online. Avisem quando todos entrarem.'}],
  [{from:'Tripulação',time:'21:54',text:'Aeronave pronta.'},{from:'Caio',time:'21:57',text:'Tem movimento estranho na entrada.'},{from:'Otávio',time:'21:59',text:'Não tome nenhuma decisão sem me ouvir.'}],
  [{from:'Sistema',time:'06:12',text:'Aparelho recolhido para perícia.'}],
  [{from:'Secretaria',time:'18:42',text:'Distribuição concluída. Autos recebidos no gabinete.'},{from:'Assessoria',time:'19:03',text:'Imprensa solicita informação sobre o grau de sigilo.'}],
  [{from:'PF',time:'08:11',text:'Solicitada autorização para início imediato das perícias.'},{from:'Secretaria',time:'08:37',text:'Material apreendido em deslocamento para Brasília.'}],
  [{from:'Presidência',time:'18:06',text:'Reunião presencial confirmada. Todos os ministros presentes.'},{from:'Assessoria',time:'18:19',text:'Nova reportagem sobre o Tayayá publicada.'}],
  [{from:'Secretaria',time:'08:12',text:'Petição 15.556 vinculada ao gabinete.'},{from:'PF',time:'08:31',text:'Equipe aguarda definição do fluxo pericial.'},{from:'PGR',time:'09:04',text:'Ciência da redistribuição registrada.'}],
  [{from:'Equipe pericial',time:'16:18',text:'Material compartimentado. Menções a autoridades exigem definição de competência.'},{from:'Secretaria',time:'17:02',text:'Reunião reservada confirmada para hoje.'}],
  [{from:'Presidência',time:'09:11',text:'Solicitados esclarecimentos sobre a medida cautelar.'},{from:'AGU',time:'09:27',text:'Pedido de restabelecimento das funções protocolado.'},{from:'Segunda Turma',time:'10:01',text:'Julgamento suspenso após pedido de vista.'}],
  [{from:'Equipe técnica',time:'18:42',text:'Falha ao montar o volume criptografado.'},{from:'Gabinete Fux',time:'18:51',text:'Mesmo problema de acesso por aqui.'},{from:'Secretaria',time:'19:03',text:'Minuta de ofício à PF pronta.'}],
  [{from:'Registro público',time:'8 NOV',text:'Pedido de rascunho citado na acusação.'},{from:'Registro público',time:'12 NOV',text:'Reunião situada pela acusação; caracterização contestada pelas defesas.'}],
  [{from:'Brasil',time:'8 DEZ',text:'Primeiras linhas ativadas.'},{from:'Gana',time:'9 DEZ',text:'Seis registros no quadro.'},{from:'Áustria',time:'9 DEZ',text:'Identidades incompletas permanecem marcadas.'}],
  [{from:'Sistema',time:'NOV–DEZ',text:'Período de monitoramento atribuído pela PF.'},{from:'FE',time:'14 DEZ',text:'Sem rotas no quadro. Apenas continuidade e zonas amplas.'}],
  [{from:'Alemanha',time:'NOITE',text:'Equipe em campo. Aguardar.'},{from:'Áustria',time:'NOITE',text:'Em deslocamento.'},{from:'FE',time:'NOITE',text:'Mudança de contexto. Pedir confirmação.'}],
  [{from:'Áustria',time:'20:57',text:'Tô perto da posição. Vai cancelar?'},{from:'Alemanha',time:'20:59',text:'Abortar. Volta para o local de desembarque.'},{from:'Sistema',time:'20:59',text:'OPERAÇÃO ABORTADA. Expressão reportada nos autos: “cancelamento do jogo”.'}]
];

function freshState(campaign='master'){return {campaign,scene:campaign==='copa'?12:0,seen:{},flags:{},metrics:{pressure:0,exposure:0,trust:0},inventory:[],dossier:[campaign==='copa'?'punhal_impresso':'brb'],selected:null,started:false,unread:0,finished:false,playStarted:Date.now()}}
let state=freshState(), queue=[], afterDialogue=null, typing=false, typeTimer=null, currentFullText='', activePuzzle=null;

const $=s=>document.querySelector(s), start=$('#start-screen'), game=$('#game-screen'), dialogue=$('#dialogue'), lineEl=$('#line'), speakerEl=$('#speaker'), choicesEl=$('#choices'), character=$('#character');

function readMutedPreference(){
  try{return localStorage.getItem(AUDIO_PREF_KEY)==='1'}catch{return false}
}

const audio=(()=>{
  let ctx=null,master=null,fxGain=null,muted=readMutedPreference(),resumePromise=null,wakePlayed=false;
  let mediaPlays=0,mediaFailures=0,lastMediaError='';
  const mediaFiles={wake:'assets/audio/wake.mp3',ui:'assets/audio/ui.mp3',interact:'assets/audio/interact.mp3',advance:'assets/audio/advance.mp3',blip:'assets/audio/blip.mp3',success:'assets/audio/success.mp3',error:'assets/audio/error.mp3'};
  const mediaPools={};
  const speakerPitch={DANIEL:168,HELENA:214,'OTÁVIO':148,CAIO:244,INVESTIGADORA:184,TOFFOLI:142,MENDONÇA:154,ASSESSORA:206,'CHEFE DE GABINETE':198,DELEGADA:181,FE:158,GANA:142,'ÁUSTRIA':188,BRASIL:166,ARGENTINA:176,'JAPÃO':152,ALEMANHA:136,SISTEMA:118,NARRADOR:126};

  function mediaElement(name){
    if(typeof globalThis.Audio!=='function')return null;
    const pool=mediaPools[name]||(mediaPools[name]=[]);
    let element=pool.find(item=>item.paused||item.ended);
    if(!element){element=new globalThis.Audio(mediaFiles[name]);element.preload='auto';element.playsInline=true;pool.push(element)}
    return element;
  }

  function playMedia(name,volume=.72,rate=1){
    try{
      const element=mediaElement(name);
      if(!element)return Promise.resolve(false);
      element.pause();element.currentTime=0;element.volume=muted?0:volume;element.playbackRate=rate;
      const result=element.play();
      if(!result){mediaPlays++;return Promise.resolve(true)}
      return result.then(()=>{mediaPlays++;lastMediaError='';return true}).catch(error=>{mediaFailures++;lastMediaError=error?.name||String(error);console.warn('[audio] reprodução recusada',{name,error:lastMediaError});return false});
    }catch(error){mediaFailures++;lastMediaError=error?.name||String(error);console.warn('[audio] falha ao criar efeito',{name,error:lastMediaError});return Promise.resolve(false)}
  }

  function ensure(){
    if(ctx)return true;
    const AudioCtor=globalThis.AudioContext||globalThis.webkitAudioContext;
    if(!AudioCtor)return false;
    ctx=new AudioCtor({latencyHint:'interactive'});
    master=ctx.createGain();fxGain=ctx.createGain();
    master.gain.value=muted?0:.92;fxGain.gain.value=.9;
    fxGain.connect(master);master.connect(ctx.destination);
    return true;
  }

  function tone(frequency,duration=.045,level=.026,type='sine',slide=0){
    if(!ctx||muted||ctx.state==='suspended')return;
    const when=ctx.currentTime,osc=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();
    osc.type=type;osc.frequency.setValueAtTime(frequency,when);
    if(slide)osc.frequency.exponentialRampToValueAtTime(Math.max(35,frequency+slide),when+duration);
    filter.type='lowpass';filter.frequency.value=1800;
    gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(level,when+.004);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
    osc.connect(filter);filter.connect(gain);gain.connect(fxGain);osc.start(when);osc.stop(when+duration+.01);
  }

  function noise(duration=.035,level=.014,frequency=1400){
    if(!ctx||muted||ctx.state==='suspended')return;
    const length=Math.max(80,Math.floor(ctx.sampleRate*duration)),buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);
    for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
    const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
    source.buffer=buffer;filter.type='lowpass';filter.frequency.value=frequency;gain.gain.value=level;
    source.connect(filter);filter.connect(gain);gain.connect(fxGain);source.start();
  }

  function wakeSound(){
    if(wakePlayed||muted)return Promise.resolve(false);
    wakePlayed=true;
    return playMedia('wake',.82).then(ok=>{if(!ok){tone(360,.12,.11,'triangle',90);setTimeout(()=>tone(560,.16,.09,'sine',50),105)}return ok});
  }
  function start(audible=false){
    if(audible)wakeSound();
    if(!ensure())return Promise.resolve(false);
    if(ctx.state==='running')return Promise.resolve(true);
    if(!resumePromise)resumePromise=Promise.resolve(ctx.resume?.()).then(()=>{resumePromise=null;return ctx.state==='running'}).catch(()=>{resumePromise=null;return false});
    return resumePromise;
  }
  function withFallback(name,volume,fallback,rate=1){if(muted)return;playMedia(name,volume,rate).then(ok=>{if(!ok)fallback()})}
  function ui(){withFallback('ui',.62,()=>tone(330,.06,.1,'triangle',-45))}
  function interact(){withFallback('interact',.68,()=>{noise(.08,.08,1200);tone(195,.09,.08,'sine',45)})}
  function advance(){withFallback('advance',.58,()=>tone(265,.065,.075,'triangle',22))}
  function puzzleTick(){withFallback('ui',.66,()=>tone(420,.055,.09,'square',-55),1.18)}
  function item(){withFallback('success',.74,()=>{tone(350,.1,.1,'triangle',100);setTimeout(()=>tone(510,.12,.085,'sine',65),80)})}
  function success(){withFallback('success',.78,()=>{tone(310,.12,.11,'triangle',75);setTimeout(()=>tone(480,.16,.095,'sine',90),105)})}
  function error(){withFallback('error',.7,()=>tone(155,.14,.1,'sawtooth',-40))}

  function blip(speaker,charCode=0){
    if(charCode%3)return;
    withFallback('blip',.4,()=>tone((speakerPitch[speaker]||198)+(charCode%5)*4,.038,.055,'triangle',-8),.92+(charCode%5)*.035);
  }

  function toggle(){
    muted=!muted;
    try{localStorage.setItem(AUDIO_PREF_KEY,muted?'1':'0')}catch{}
    if(master){
      const now=ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(muted?0:.92,now,.02);
    }
    if(!muted){wakePlayed=false;start(true)}
    return muted;
  }

  function resume(){if(ctx&&!muted)ctx.resume?.().catch?.(()=>{})}
  function isMuted(){return muted}
  function debug(){return {supported:!!(globalThis.AudioContext||globalThis.webkitAudioContext),state:ctx?.state||'uninitialized',muted,wakePlayed,mediaPlays,mediaFailures,lastMediaError,pools:Object.fromEntries(Object.entries(mediaPools).map(([name,pool])=>[name,pool.length]))}}
  return {start,blip,ui,interact,advance,puzzleTick,item,success,error,toggle,resume,isMuted,debug};
})();

function updateAudioButton(){
  const button=$('#audio-btn');if(!button)return;
  const muted=audio.isMuted();
  button.classList[muted?'add':'remove']('muted');
  button.setAttribute('aria-pressed',muted?'true':'false');
  button.setAttribute('aria-label',muted?'Ligar efeitos':'Desligar efeitos');
  const icon=button.querySelector?.('span')||button.children?.[0];if(icon)icon.textContent=muted?'🔇':'🔊';
}

function lockLandscape(){
  const orientation=globalThis.screen?.orientation;
  if(!orientation?.lock)return;
  try{
    const result=orientation.lock('landscape');
    result?.catch?.(()=>{});
  }catch{}
}

function enterImmersive(){
  const root=document.documentElement;
  if(!root)return;
  if(!document.fullscreenElement&&root.requestFullscreen){
    try{
      const request=root.requestFullscreen({navigationUI:'hide'});
      request?.then?.(lockLandscape)?.catch?.(()=>lockLandscape());
      return;
    }catch{}
  }
  lockLandscape();
}

function syncViewport(){
  const root=document.documentElement;if(!root?.style?.setProperty)return;
  const height=globalThis.visualViewport?.height||globalThis.innerHeight;
  if(height)root.style.setProperty('--app-height',Math.round(height)+'px');
}

globalThis.visualViewport?.addEventListener?.('resize',syncViewport);
globalThis.visualViewport?.addEventListener?.('scroll',syncViewport);
globalThis.addEventListener?.('resize',syncViewport);
globalThis.addEventListener?.('orientationchange',()=>setTimeout(syncViewport,80));
syncViewport();

let deferredInstallPrompt=null;
const isInstalled=()=>globalThis.matchMedia?.('(display-mode: standalone)')?.matches||globalThis.navigator?.standalone===true;
globalThis.addEventListener?.('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
  const button=$('#install-app');if(button)button.hidden=false;
});
globalThis.addEventListener?.('appinstalled',()=>{
  deferredInstallPrompt=null;
  const button=$('#install-app');if(button)button.hidden=true;
});
const installButton=$('#install-app');
if(installButton)installButton.onclick=async()=>{
  if(deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    try{await deferredInstallPrompt.userChoice}catch{}
    deferredInstallPrompt=null;installButton.hidden=true;return;
  }
  openModal('Instalar o jogo','TELA CHEIA',`<p class="fact-note">Abra este link no Chrome. Toque em <b>⋮</b> e depois em <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>. Ao abrir pelo ícone, o jogo usa a tela inteira como um app.</p>`);
};
if(installButton&&isInstalled())installButton.hidden=true;

if(globalThis.navigator?.serviceWorker){
  globalThis.addEventListener?.('load',()=>globalThis.navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}

function launchGame(action){
  try{audio.start(true)}catch{}
  try{enterImmersive()}catch{}
  action();
  updateAudioButton();
}

document.addEventListener('visibilitychange',()=>{if(!document.hidden)audio.resume()});

function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(state)); updateBadges()}
function load(){try{return JSON.parse(localStorage.getItem(SAVE_KEY))}catch{return null}}
function reset(campaign='master'){state=freshState(campaign); localStorage.removeItem(SAVE_KEY); begin()}
function begin(){state.started=true; start.classList.remove('active'); game.classList.add('active'); enterScene(state.scene,true); save()}
function addItem(id){if(!state.inventory.includes(id)){state.inventory.push(id);audio.item()}}
function addDossier(id){if(id&&!state.dossier.includes(id)){state.dossier.push(id); toast('Nova entrada no Dossiê')};save()}
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),1800)}

function enterScene(index,fromLoad=false){
  state.scene=index; state.unread=fromLoad?state.unread:(messagesByScene[index]?.length||0);
  const s=scenes[index]; if(s.onEnter&&!state.flags['entered_'+index]){s.onEnter(state);state.flags['entered_'+index]=true}
  $('#scene-bg').src=s.bg; $('#scene-tint').style.background=s.tint||'transparent'; $('#chapter').textContent=s.chapter; $('#date').textContent=s.date;
  character.className=''; character.removeAttribute('data-person'); renderHotspots(); updateBadges(); save();
  if(!state.flags['intro_'+index]){state.flags['intro_'+index]=true; play(s.intro,()=>{toast('Explore os pontos luminosos');save()})}
}

function renderHotspots(){
  const host=$('#hotspots');host.innerHTML='';
  scenes[state.scene].hotspots.forEach(h=>{
    const b=document.createElement('button');b.className='hotspot'+(state.seen[state.scene+'_'+h.id]?' used':'')+(h.required?' required':'');b.style.left=h.x+'%';b.style.top=h.y+'%';b.setAttribute('aria-label',h.label);b.title=h.label;b.onclick=e=>{e.stopPropagation();interact(h)};host.appendChild(b)
  })
}

function interact(h){
  if(!dialogue.classList.contains('hidden'))return;
  audio.interact();
  const key=state.scene+'_'+h.id, first=!state.seen[key];state.seen[key]=true;
  if(first&&h.item){addItem(h.item);toast(inventoryCatalog[h.item].name+' adicionado')}
  if(first&&h.dossier)addDossier(h.dossier);
  renderHotspots();
  const finish=()=>{
    if(h.advance||h.ending){
      if(h.ending)return h.ending==='toffoli'?showToffoliEnding():h.ending==='mendonca'?showMendoncaEnding():h.ending==='copa'?showCopaEnding():showEnding();
      setTimeout(()=>enterScene(Math.min(state.scene+1,scenes.length-1)),500)
    }
    save()
  };
  const proceed=()=>{
    const choose=()=>h.choices&&!state.flags['choice_'+key]?showChoices(h,key,finish):finish();
    if(h.puzzle&&!state.flags['puzzle_'+key])showPuzzle(h.puzzle,key,choose);
    else choose();
  };
  const revisitSpeaker=state.scene>=12?'FE':state.scene>=8?'MENDONÇA':state.scene>=5?'TOFFOLI':'DANIEL';
  play(first?h.lines:[[revisitSpeaker,'Já vi o que precisava aqui.']],proceed)
}

function showChoices(h,key,finish){
  dialogue.classList.remove('hidden'); choicesEl.innerHTML=''; $('#dialogue-hint').textContent='escolha';
  h.choices.forEach(c=>{
    const b=document.createElement('button');b.className='choice';b.textContent=c.text;b.onclick=e=>{
      e.stopPropagation();audio.ui();state.flags['choice_'+key]=true;state.flags[c.flag]=true;
      Object.entries(c.effects||{}).forEach(([k,v])=>state.metrics[k]+=v);choicesEl.innerHTML='';save();play(c.reply,finish)
    };choicesEl.appendChild(b)
  })
}

function play(lines,done){clearInterval(typeTimer);typing=false;queue=[...lines];afterDialogue=done;dialogue.classList.remove('hidden');nextLine()}
function nextLine(){
  if(typing){finishTyping();return}
  if(queue.length)audio.advance();
  const item=queue.shift();
  if(!item){dialogue.classList.add('hidden');choicesEl.innerHTML='';hideCharacter();const cb=afterDialogue;afterDialogue=null;if(cb)cb();return}
  const [speaker,text]=item; speakerEl.textContent=speaker;showCharacter(speaker);typeText(text)
}
function typeText(text){clearInterval(typeTimer);typing=true;currentFullText=text;lineEl.textContent='';choicesEl.innerHTML='';$('#dialogue-hint').textContent='toque para continuar';let i=0;const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;if(reduced){finishTyping();return}typeTimer=setInterval(()=>{lineEl.textContent=text.slice(0,++i);const char=text[i-1];if(i%5===0&&char&&/\S/.test(char))audio.blip(speakerEl.textContent,char.charCodeAt(0));if(i>=text.length)finishTyping()},16)}
function finishTyping(){clearInterval(typeTimer);lineEl.textContent=currentFullText;typing=false}
function showCharacter(speaker){const map={DANIEL:'daniel',HELENA:'helena',OTÁVIO:'otavio',CAIO:'caio',INVESTIGADORA:'investigadora',TOFFOLI:'toffoli',MENDONÇA:'mendonca'};const person=map[speaker];if(!person){hideCharacter();return}character.dataset.person=person;character.className='show '+(['daniel','toffoli','mendonca'].includes(person)?'':'right')}
function hideCharacter(){character.className='';}

function updateBadges(){
  $('#phone-badge').textContent=state.unread||'';$('#phone-badge').style.display=state.unread?'inline-grid':'none';
  $('#dossier-count').textContent=state.dossier.length||''
}

function openModal(title,kicker,html){$('#modal-title').textContent=title;$('#modal-kicker').textContent=kicker;$('#modal-body').innerHTML=html;$('#modal').classList.remove('hidden')}
function closeModal(){activePuzzle=null;$('#modal').classList.add('hidden')}

function showPuzzle(puzzle,key,done){
  const design=adventurePuzzles[key];
  if(!design){throw new Error(`Puzzle visual ausente: ${key}`)}
  if(design.requiresItem&&!state.inventory.includes(design.requiresItem)){
    const item=inventoryCatalog[design.requiresItem];
    openModal('Ainda falta uma peça','EXPLORE O CENÁRIO',`<div class="puzzle-missing"><span>${item.icon}</span><p>Este mecanismo precisa de <b>${item.name}</b>. Ela foi obtida no capítulo anterior; volte ao ponto luminoso principal se o autosave foi interrompido.</p></div>`);
    return;
  }
  const model={};
  if(design.mode==='mosaic')model.order=[...design.start];
  if(design.mode==='slider'){
    model.order=[...design.pieces.map((_,i)=>i),null];
    for(const value of design.scramble||[]){
      const from=model.order.indexOf(value),blank=model.order.indexOf(null);
      if(sliderAdjacent(from,blank,3))[model.order[from],model.order[blank]]=[model.order[blank],model.order[from]];
    }
  }
  if(design.mode==='dials'||design.mode==='cipher')model.positions=design.wheels.map(()=>0);
  if(design.mode==='circuit')model.rotations=design.pieces.map(piece=>piece[1]);
  if(design.mode==='switches'){
    model.cells=Array(design.cols*design.rows).fill(false);
    for(const index of design.seedMoves||[])toggleLogicCell(model.cells,index,design.cols,design.rows);
  }
  activePuzzle={source:puzzle,puzzle:design,key,done,model,selected:null,moves:0,failedChecks:0,feedback:'',hint:false};
  renderPuzzle();
}

function sliderAdjacent(a,b,cols){return a>=0&&b>=0&&(Math.abs(a-b)===cols||(Math.abs(a-b)===1&&Math.floor(a/cols)===Math.floor(b/cols)))}
function toggleLogicCell(cells,index,cols,rows){
  const x=index%cols,y=Math.floor(index/cols);
  [[x,y],[x-1,y],[x+1,y],[x,y-1],[x,y+1]].forEach(([cx,cy])=>{if(cx>=0&&cx<cols&&cy>=0&&cy<rows){const i=cy*cols+cx;cells[i]=!cells[i]}})
}
function circuitGlyph(shape){return shape==='corner'?'┗':shape==='tee'?'┻':'━'}
function puzzleBody(a){
  const p=a.puzzle;
  if(p.mode==='mosaic')return `<div class="mosaic-board" style="--cols:3">${a.model.order.map((piece,cell)=>`<button class="mosaic-piece ${a.selected===cell?'selected':''}" data-puzzle-action="mosaic" data-index="${cell}"><span>${p.pieces[piece]}</span></button>`).join('')}</div><p class="mechanic-note">Toque em dois fragmentos para trocar suas posições.</p>`;
  if(p.mode==='slider')return `<div class="slider-board">${a.model.order.map((piece,cell)=>piece===null?'<span class="slider-blank"></span>':`<button class="slider-piece" data-puzzle-action="slide" data-index="${cell}"><small>${String(piece+1).padStart(2,'0')}</small><span>${p.pieces[piece]}</span></button>`).join('')}</div><p class="mechanic-note">Só o fragmento ao lado do espaço vazio pode deslizar.</p>`;
  if(p.mode==='dials'||p.mode==='cipher')return `<div class="dial-machine ${p.mode}">${p.wheels.map((wheel,i)=>`<div class="dial-column"><small>${wheel.label}</small><button data-puzzle-action="wheel" data-index="${i}"><i>▲</i><strong>${wheel.values[a.model.positions[i]]}</strong><i>▼</i></button></div>`).join('')}</div>${p.clue?`<div class="puzzle-clue">${p.clue}</div>`:''}<button class="puzzle-check" data-puzzle-action="check">TESTAR MECANISMO</button>`;
  if(p.mode==='circuit')return `<div class="circuit-shell"><span class="circuit-port in">ENTRADA</span><div class="circuit-board" style="--cols:${p.cols}">${p.pieces.map((piece,i)=>`<button data-puzzle-action="rotate" data-index="${i}" aria-label="Girar conexão ${i+1}"><span style="transform:rotate(${a.model.rotations[i]*90}deg)">${circuitGlyph(piece[0])}</span></button>`).join('')}</div><span class="circuit-port out">SAÍDA</span></div><p class="mechanic-note">Cada toque gira uma conexão em 90°. Não pode sobrar ponta aberta.</p>`;
  if(p.mode==='switches')return `<div class="logic-board" style="--cols:${p.cols}">${a.model.cells.map((on,i)=>`<button class="${on?'on':''}" data-puzzle-action="logic" data-index="${i}" aria-label="Bloco ${i+1}"><span></span></button>`).join('')}</div><p class="mechanic-note">Um toque altera o bloco e os vizinhos ortogonais. Apague toda a matriz.</p>`;
  return '';
}

function renderPuzzle(feedback=activePuzzle?.feedback||'Observe o mecanismo antes de tocar.'){
  if(!activePuzzle)return;
  const a=activePuzzle,p=a.puzzle;
  openModal(p.title,p.kicker,`<section class="puzzle mechanism" data-mode="${p.mode}"><div class="puzzle-head"><p class="puzzle-prompt">${p.prompt}</p><b>${a.moves} movimentos</b></div>${puzzleBody(a)}<p class="puzzle-feedback" aria-live="polite">${feedback}</p></section>`);
  document.querySelectorAll('[data-puzzle-action]').forEach(button=>button.onclick=()=>handlePuzzleAction(button.dataset.puzzleAction,Number(button.dataset.index)));
}

function handlePuzzleAction(action,index){
  if(!activePuzzle)return false;
  const a=activePuzzle,p=a.puzzle;a.moves++;audio.puzzleTick?.();
  if(action==='mosaic'){
    if(a.selected===null)a.selected=index;
    else if(a.selected===index)a.selected=null;
    else{[a.model.order[a.selected],a.model.order[index]]=[a.model.order[index],a.model.order[a.selected]];a.selected=null}
  }
  if(action==='slide'){
    const blank=a.model.order.indexOf(null);
    if(sliderAdjacent(index,blank,3))[a.model.order[index],a.model.order[blank]]=[a.model.order[blank],a.model.order[index]];
    else{audio.error();a.feedback='Esse fragmento não alcança o espaço vazio.'}
  }
  if(action==='wheel'){
    const wheel=p.wheels[index];a.model.positions[index]=(a.model.positions[index]+1)%wheel.values.length;
  }
  if(action==='rotate')a.model.rotations[index]=(a.model.rotations[index]+1)%4;
  if(action==='logic')toggleLogicCell(a.model.cells,index,p.cols,p.rows);
  const solved=isAdventureSolved(a);
  if(action==='check'&&!solved){a.failedChecks++;audio.error();a.feedback=p.mode==='cipher'?'Os cilindros ainda formam uma ordem impossível.':'Um dos mostradores contradiz a pista.'}
  if(solved&&(action==='check'||!['dials','cipher'].includes(p.mode))){finishActivePuzzle();return true}
  renderPuzzle(a.feedback||'O mecanismo respondeu. Continue observando o conjunto.');return true;
}

function isAdventureSolved(a){
  const p=a.puzzle,m=a.model;
  if(p.mode==='mosaic')return m.order.every((piece,i)=>piece===i);
  if(p.mode==='slider')return m.order.every((piece,i)=>i===m.order.length-1?piece===null:piece===i);
  if(p.mode==='dials'||p.mode==='cipher')return p.wheels.every((wheel,i)=>wheel.values[m.positions[i]]===wheel.answer);
  if(p.mode==='circuit')return p.pieces.every((piece,i)=>m.rotations[i]===piece[2]);
  if(p.mode==='switches')return m.cells.every(cell=>!cell);
  return false;
}

function solveAdventurePuzzle(){
  if(!activePuzzle)return false;
  const a=activePuzzle,p=a.puzzle;
  if(p.mode==='mosaic')a.model.order=p.pieces.map((_,i)=>i);
  if(p.mode==='slider')a.model.order=[...p.pieces.map((_,i)=>i),null];
  if(p.mode==='dials'||p.mode==='cipher')a.model.positions=p.wheels.map(wheel=>wheel.values.indexOf(wheel.answer));
  if(p.mode==='circuit')a.model.rotations=p.pieces.map(piece=>piece[2]);
  if(p.mode==='switches')a.model.cells.fill(false);
  return finishActivePuzzle(true);
}

function finishActivePuzzle(force=false){
  if(!activePuzzle)return false;
  const a=activePuzzle;
  state.flags['puzzle_'+a.key]=true;
  if(!a.failedChecks){state.flags['puzzle_clean_'+a.key]=true;state.metrics.trust+=1}
  if(a.puzzle.rewardItem&&!state.inventory.includes(a.puzzle.rewardItem))addItem(a.puzzle.rewardItem);
  save();const done=a.done,success=a.puzzle.success;activePuzzle=null;$('#modal').classList.add('hidden');audio.success();toast(success);done();return true;
}
function openPhone(){state.unread=0;save();const msgs=messagesByScene[state.scene]||[];openModal('Celular','MENSAGENS',`<div class="messages">${msgs.map(m=>`<div class="entry ${m.mine?'mine':'theirs'}"><span class="message-time">${m.from||'Você'} · ${m.time}</span><p>${m.text}</p></div>`).join('')}</div>`)}
function openInventory(){const html=state.inventory.length?`<div class="inventory-grid">${state.inventory.map(id=>{const i=inventoryCatalog[id];return `<button class="item ${state.selected===id?'selected':''}" data-item="${id}"><span class="item-icon">${i.icon}</span><strong>${i.name}</strong><small>${i.desc}</small></button>`}).join('')}</div><p class="fact-note">Selecione um item. Alguns objetos reagem a ele; o jogo nunca exige adivinhação para avançar.</p>`:'<p>O bolso ainda está vazio.</p>';openModal('Inventário','O QUE FICOU',html);document.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>{state.selected=state.selected===b.dataset.item?null:b.dataset.item;save();openInventory()})}
function openDossier(){const entries=dossier.filter(d=>state.dossier.includes(d.id));openModal('Dossiê','FATOS DESBLOQUEADOS',`<p class="fact-note">As cenas e conversas privadas são dramatizadas. As etiquetas abaixo distinguem fatos, reportagem e alegações contestadas.</p>${entries.map(d=>`<article class="entry"><span class="tag ${d.tag.toLowerCase()}">${d.tag}</span><h3>${d.title}</h3><p>${d.text}</p><a href="${d.url}" target="_blank" rel="noreferrer">${d.source} ↗</a></article>`).join('')}`)}
function openAbout(){openModal('Fatos, sátira e ficção','COMO LER O JOGO',`<p class="fact-note">Este é um jogo de sátira e drama baseado em acontecimentos públicos. Daniel Vorcaro é uma pessoa real. Helena, Otávio, Caio e a investigadora são personagens compostos e fictícios. No bônus Copa 2022, os seis operadores também são composições: os codinomes de países foram publicados, mas o jogo não inventa correspondências individuais. Nenhuma conversa privada é apresentada como transcrição histórica.</p><div class="entry"><h3>Etiquetas do Dossiê</h3><p><b>DOCUMENTADO</b>: anúncio, decisão ou fato confirmado por registro público. <b>REPORTADO</b>: informação de jornalismo profissional. <b>ALEGADO</b>: acusação sob disputa ou investigação. <b>DRAMATIZAÇÃO</b>: invenção narrativa.</p></div>`)}
function openMenu(){openModal('Pausa','JOGO SALVO',`<div class="menu-actions"><button id="resume">Continuar jogando</button><button id="restart">Recomeçar esta campanha</button><button id="title">Voltar ao título</button></div><p class="credits">Autosave local após cada decisão · Arte original gerada para este jogo</p>`);$('#resume').onclick=closeModal;$('#restart').onclick=()=>{const campaign=state.campaign||'master';closeModal();reset(campaign)};$('#title').onclick=()=>{closeModal();game.classList.remove('active');start.classList.add('active');$('#continue-game').hidden=false}}

function showEnding(){
  state.finished=true;state.inventory.push(...(state.inventory.includes('cracha')?[]:['cracha']));
  const m=state.metrics;let e;
  if(state.flags.cooperou&&(m.trust>=m.exposure||state.flags.abriu_dados))e={title:'A PASTA ABERTA',stamp:'A versão que aceita perguntas.',text:'Você escolheu deixar rastros organizados e falar. Isso não muda a prisão nem a liquidação, mas muda a disputa pelo contexto: a defesa ganha coerência; os documentos ganham inimigos; cada resposta abre três novas perguntas.'};
  else if(state.flags.silencio_final||m.trust<0)e={title:'A FORTALEZA VAZIA',stamp:'O silêncio protege. E isola.',text:'Você reduziu as palavras disponíveis contra você. Do lado de fora, o espaço vazio foi ocupado por manchetes, fontes, relatórios e antigos aliados. A estratégia contém danos imediatos, mas ninguém sabe mais onde termina prudência e começa abandono.'};
  else e={title:'O HOMEM NO VIDRO',stamp:'Toda saída virou imagem.',text:'Você tentou controlar a narrativa com movimento: anúncio, confronto, embarque. A imagem venceu o argumento. O aeroporto se tornou o enquadramento definitivo, e tudo o que veio antes passou a ser relido como preparação para aquela noite.'};
  state.dossier=dossier.filter(d=>!d.arc).map(d=>d.id);save();openModal(e.title,'FIM DO ARCO I',`<div class="ending"><div class="ending-stamp">${e.stamp}</div><div><h3>${e.title}</h3><p>${e.text}</p><p><b>18 de novembro de 2025:</b> o Banco Central decretou a liquidação extrajudicial do Banco Master. As investigações e disputas judiciais continuaram.</p><div class="menu-actions"><button id="ending-next">Continuar: Toffolinho</button><button id="ending-dossier">Abrir Dossiê</button><button id="ending-restart">Jogar outra rota</button></div></div></div>`);$('#ending-next').onclick=()=>{closeModal();state.finished=false;state.flags.arc_toffoli=true;enterScene(5)};$('#ending-dossier').onclick=openDossier;$('#ending-restart').onclick=()=>{closeModal();reset()}
}

function showToffoliEnding(){
  state.finished=true;state.dossier=dossier.filter(d=>d.arc!=='mendonca'&&d.arc!=='copa').map(d=>d.id);save();
  openModal('A CHAVE MUDA DE MÃO','FIM DO ARCO II',`<div class="ending"><div class="ending-stamp">O sigilo permanece. O relator, não.</div><div><h3>A CHAVE MUDA DE MÃO</h3><p>Toffolinho deixa a relatoria com os atos preservados pelo tribunal. O processo atravessa o corredor, entra novamente no sorteio e para no gabinete de André Mendonça.</p><p><b>Documentado:</b> a redistribuição ocorreu em 12 de fevereiro de 2026. A intenção de “ferrar tudo” é a lente satírica do jogo, não um fato atribuído ao ministro.</p><div class="menu-actions"><button id="ending-next">Continuar: André Mendonça</button><button id="ending-dossier">Abrir Dossiê</button><button id="ending-restart">Jogar desde o início</button></div></div></div>`);
  $('#ending-next').onclick=()=>{closeModal();state.finished=false;state.flags.arc_mendonca=true;enterScene(8)};$('#ending-dossier').onclick=openDossier;$('#ending-restart').onclick=()=>{closeModal();reset()}
}

function showMendoncaEnding(){
  state.finished=true;state.dossier=dossier.filter(d=>d.arc!=='copa').map(d=>d.id);save();
  openModal('A CHAVE SEM SENHA','FIM DO ARCO III',`<div class="ending"><div class="ending-stamp">A caneta manda. A criptografia pergunta quem executa.</div><div><h3>A CHAVE SEM SENHA</h3><p>Depois de devolver o fluxo, ordenar o relatório, afastar a chefia e ver a medida suspensa, Mendonça termina diante de uma cópia que seu gabinete não consegue abrir. Para acessar o celular que incendiou o tribunal, precisa novamente da Polícia Federal.</p><p><b>Documentado até 19 de setembro de 2026:</b> Mendonça e Fux pediram auxílio técnico à PF para acessar cerca de 500 GB de dados. O aparelho e a extração originais permaneciam sob guarda policial. A disputa seguia aberta.</p><div class="menu-actions"><button id="ending-dossier">Abrir Dossiê completo</button><button id="ending-restart">Jogar desde o início</button></div></div></div>`);
  $('#ending-dossier').onclick=openDossier;$('#ending-restart').onclick=()=>{closeModal();reset()}
}

function showCopaEnding(){
  state.finished=true;state.dossier=dossier.filter(d=>d.arc==='copa').map(d=>d.id);addDossier('contragolpe');addDossier('nucleo_tres');save();
  openModal('O RASTRO SOBREVIVE','FIM DO BÔNUS · PUNHAL VERDE E AMARELO',`<div class="ending"><div class="ending-stamp">A operação foi cancelada. O rastro, não.</div><div><h3>O RASTRO SOBREVIVE</h3><p>Os seis aparelhos se apagam na dramatização, mas documento, horários e mensagens reaparecem na investigação. O que parecia código de uma noite vira cadeia de evidências dois anos depois.</p><p><b>Documentado:</b> a Operação Contragolpe foi deflagrada em novembro de 2024. Em novembro de 2025, a Primeira Turma do STF condenou nove dos dez réus do Núcleo 3 e absolveu um. As defesas negaram crimes e contestaram elementos da acusação ao longo do processo.</p><p class="fact-note">O bônus preserva deliberadamente as lacunas: os seis personagens são composições ficcionais, e locais, meios e procedimentos operacionais não são reproduzidos.</p><div class="menu-actions"><button id="ending-dossier">Abrir Dossiê do bônus</button><button id="ending-main">Jogar campanha principal</button><button id="ending-restart">Jogar o bônus novamente</button></div></div></div>`);
  $('#ending-dossier').onclick=openDossier;$('#ending-main').onclick=()=>{closeModal();reset('master')};$('#ending-restart').onclick=()=>{closeModal();reset('copa')}
}

dialogue.addEventListener('click',e=>{if(!e.target.closest('.choice'))nextLine()});$('#scene').addEventListener('click',()=>{if(!dialogue.classList.contains('hidden'))nextLine()});
document.addEventListener('pointerdown',e=>{try{audio.start();if(e.target.closest('button')&&!e.target.closest('.hotspot,.choice,[data-puzzle-action],#audio-btn'))audio.ui()}catch{}});
$('#new-game').onclick=()=>launchGame(()=>reset('master'));$('#bonus-game').onclick=()=>launchGame(()=>reset('copa'));$('#continue-game').onclick=()=>launchGame(()=>{const saved=load();if(saved){state={...freshState(saved.campaign||'master'),...saved};begin()}});$('#start-sources').onclick=openAbout;
$('#phone-btn').onclick=openPhone;$('#inventory-btn').onclick=openInventory;$('#dossier-btn').onclick=openDossier;$('#audio-btn').onclick=()=>{try{audio.start();audio.toggle()}catch{}updateAudioButton()};$('#menu-btn').onclick=openMenu;$('#modal-close').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if((e.key===' '||e.key==='Enter')&&!dialogue.classList.contains('hidden'))nextLine()});

updateAudioButton();const saved=load();if(saved?.started){$('#continue-game').hidden=false