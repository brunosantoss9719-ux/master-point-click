const SAVE_KEY = 'master-ultima-chamada-v1';
const AUDIO_PREF_KEY = 'master-ultima-chamada-audio-muted-v1';

const dossier = [
  {id:'brb',tag:'DOCUMENTADO',title:'O anúncio do BRB',text:'Em março de 2025, o BRB anunciou a aquisição de 49% das ações ordinárias e 100% das preferenciais do Master — 58% do capital total — sujeita a aprovações.',source:'Reuters, 29 abr. 2025',url:'https://www.reuters.com/business/finance/brazils-brb-close-completing-due-diligence-acquire-banco-master-2025-04-29/'},
  {id:'modelo',tag:'REPORTADO',title:'CDBs acima da média',text:'O crescimento do Master se apoiou na distribuição de títulos de alta rentabilidade e no investimento em ativos complexos ou de baixa liquidez.',source:'Reuters, 4 set. 2025',url:'https://www.reuters.com/business/finance/brb-weighs-new-bid-master-after-brazil-central-bank-blocks-deal-source-says-2025-09-04/'},
  {id:'liminar',tag:'DOCUMENTADO',title:'A primeira trava',text:'Em maio de 2025, decisão judicial impediu a assinatura definitiva até autorizações societárias e legislativas, mas permitiu atos preparatórios.',source:'Reuters, 7 mai. 2025',url:'https://www.reuters.com/markets/deals/brazil-judge-blocks-lender-brb-signing-purchase-banco-master-2025-05-07/'},
  {id:'veto',tag:'DOCUMENTADO',title:'Banco Central rejeita o negócio',text:'Em setembro de 2025, o Banco Central rejeitou a operação. O BRB ainda considerou apresentar uma estrutura diferente.',source:'Reuters, 4 set. 2025',url:'https://www.reuters.com/business/finance/brb-weighs-new-bid-master-after-brazil-central-bank-blocks-deal-source-says-2025-09-04/'},
  {id:'ativos',tag:'REPORTADO',title:'O que ficaria de fora',text:'Durante a negociação, o perímetro encolheu: o BRB pretendia selecionar ativos e excluir dezenas de bilhões que não se enquadravam em seu perfil de risco.',source:'Reuters, 10 abr. 2025',url:'https://www.reuters.com/markets/deals/brazilian-lender-brb-expects-lower-banco-master-price-with-deal-adjustment-ceo-2025-04-10/'},
  {id:'fictor',tag:'REPORTADO',title:'Uma saída anunciada na última hora',text:'A defesa afirmou que a viagem aos Emirados estava ligada à assinatura de venda para o Grupo Fictor e investidores estrangeiros. Investigadores suspeitaram de fuga; a defesa negou.',source:'Folha, 25 nov. 2025',url:'https://www1.folha.uol.com.br/mercado/2025/11/defesa-de-daniel-vorcaro-diz-a-justica-que-banco-central-sabia-de-viagem-a-dubai.shtml'},
  {id:'operacao',tag:'DOCUMENTADO',title:'Operação Compliance Zero',text:'Vorcaro foi preso no aeroporto de Guarulhos na noite de 17 de novembro de 2025. A operação investigava emissão de títulos de crédito falsos e outros crimes financeiros.',source:'CNN Brasil, 18 nov. 2025',url:'https://www.cnnbrasil.com.br/economia/money/macroeconomia/dono-do-banco-master-estava-a-caminho-de-dubai-e-foi-preso-em-guarulhos/'},
  {id:'liquidacao',tag:'DOCUMENTADO',title:'Liquidação',text:'Em 18 de novembro de 2025, o Banco Central decretou a liquidação extrajudicial do Banco Master e de empresas do conglomerado.',source:'Banco Master — comunicado da liquidação',url:'https://www.bancomaster.com.br/'},
  {id:'carteiras',tag:'ALEGADO',title:'Carteiras sob suspeita',text:'As investigações apontaram supostas carteiras de consignado forjadas vendidas ao BRB. As defesas contestaram a fraude e alegaram substituição de ativos.',source:'Folha, 25 nov. 2025',url:'https://www1.folha.uol.com.br/mercado/2025/11/defesa-de-daniel-vorcaro-diz-a-justica-que-banco-central-sabia-de-viagem-a-dubai.shtml'}
];

const inventoryCatalog = {
  pasta:{icon:'▤',name:'Pasta BRB',desc:'Minutas, perímetro e perguntas sem resposta.'},
  nota:{icon:'◫',name:'Nota ao mercado',desc:'Curta o bastante para caber em qualquer interpretação.'},
  passagem:{icon:'✈',name:'Rota para Dubai',desc:'Uma viagem pode ser agenda, saída ou manchete.'},
  celular:{icon:'▣',name:'Celular',desc:'Tudo chega aqui. Algumas coisas ficam.'},
  cracha:{icon:'◇',name:'Crachá recolhido',desc:'Um retângulo de plástico já sem porta para abrir.'}
};

const scenes = [
  {
    chapter:'CAPÍTULO I · A PONTE', date:'28 MAR 2025 · SÃO PAULO', bg:'assets/office.webp', tint:'rgba(22,10,52,.18)',
    intro:[
      ['NARRADOR','A chuva transforma São Paulo num balanço ilegível. Dentro do escritório, o futuro tem assinatura e cláusula suspensiva.'],
      ['CAIO','O BRB anunciou. Cinquenta e oito por cento do capital total. A imprensa já chama de salvamento.'],
      ['DANIEL','Aquisição. “Salvamento” é palavra de quem não cobra assessoria.'],
      ['HELENA','Também é palavra de quem leu os CDBs, Daniel.'],
      ['DANIEL','Então vamos dar a eles outra palavra.'],
      ['NARRADOR','Examine a sala. O telefone dourado encerra a cena quando você estiver pronto.']
    ],
    hotspots:[
      {id:'tv',label:'Televisão',x:8,y:24,dossier:'brb',lines:[['REPÓRTER NA TV','O acordo depende de autorizações e ainda passará pelo Banco Central.'],['DANIEL','Na televisão, toda condição parece uma sentença.']]},
      {id:'pasta',label:'Pasta do negócio',x:70,y:49,item:'pasta',dossier:'ativos',lines:[['HELENA','O perímetro muda a cada versão. O que eles compram fica saudável por definição. O resto fica conosco.'],['DANIEL','Definições são ativos líquidos.']],choices:[
        {text:'Mostrar tudo ao conselho.',effects:{trust:2,exposure:1},flag:'abriu_pasta',reply:[['DANIEL','Sem surpresa interna. Se doer, dói na mesa.'],['HELENA','Vou registrar que foi sua decisão.']]},
        {text:'Circular só o resumo executivo.',effects:{trust:-1,pressure:-1},flag:'resumo',reply:[['DANIEL','Menos páginas, menos interpretações.'],['HELENA','Ou menos testemunhas.']]}
      ]},
      {id:'janela',label:'A cidade',x:48,y:31,lines:[['DANIEL','Lá embaixo, cada janela acesa acredita que o banco é uma coisa sólida.'],['CAIO','E aqui em cima?'],['DANIEL','Aqui a iluminação é melhor.']]},
      {id:'telefone',label:'Telefone dourado',x:79,y:55,required:true,dossier:'modelo',lines:[['OTÁVIO','Daniel. Antes de falar com o mercado, decida: vendemos tranquilidade ou compramos silêncio?']],choices:[
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
      ['DANIEL','Rejeitou esta compra. Há diferença.'],
      ['HELENA','A diferença pode caber numa nova proposta. O problema é o que não cabe mais no tempo.'],
      ['OTÁVIO','O mercado abre em menos de doze horas. E ele não lê nota de rodapé.']
    ],
    hotspots:[
      {id:'relogio',label:'Relógio',x:82,y:14,lines:[['NARRADOR','22h17. No mercado financeiro, o tempo não passa: vence.'],['DANIEL','Ainda temos uma noite inteira.'],['HELENA','Essa frase nunca melhora uma noite.']]},
      {id:'agua',label:'Copo d’água',x:66,y:69,lines:[['OTÁVIO','Você não tocou na água.'],['DANIEL','Ela não vai a lugar nenhum.'],['OTÁVIO','Exatamente.']]},
      {id:'xandao_tv',label:'Xandão na TV',x:91,y:26,dossier:'veto',lines:[['CAIO','A ação do BRB caiu. A notícia correu antes da explicação.'],['NARRADOR','Na TV sem som, Alexandre de Moraes encara o plenário — e, por tabela, a sala.'],['CAIO','O Xandão está olhando para cá ou é impressão?'],['DANIEL','Em Brasília, até a televisão participa da reunião.'],['NARRADOR','Participação satírica. Nenhuma fala foi atribuída a Moraes nesta cena.']]},
      {id:'envelope',label:'Decisão do BC',x:49,y:77,required:true,dossier:'liminar',lines:[['HELENA','A decisão não veio com espaço para otimismo.'],['OTÁVIO','Mas veio sem proibir uma solução diferente.']],choices:[
        {text:'Divulgar uma nota neutra e procurar outro comprador.',effects:{trust:1,pressure:1},flag:'nota_neutra',reply:[['DANIEL','Sem ataque. Sem rendição. Digam que avaliamos alternativas.'],['CAIO','Uma frase que parece calma e soa como alarme.']]},
        {text:'Questionar publicamente o veto.',effects:{exposure:2,pressure:1,trust:-1},flag:'atacou_veto',reply:[['DANIEL','Se fecharam a porta, o público merece ouvir o estrondo.'],['HELENA','E quem ainda estava no corredor vai embora.']]},
        {text:'Abrir os dados e pedir tempo ao regulador.',effects:{trust:2,pressure:2,exposure:1},flag:'abriu_dados',reply:[['DANIEL','Mandem os dados. Todos.'],['OTÁVIO','Isso compra credibilidade.'],['HELENA','E vende privacidade.']]}
      ],advance:true}
    ]
  },
  {
    chapter:'CAPÍTULO III · SEGUNDA-FEIRA', date:'17 NOV 2025 · SÃO PAULO', bg:'assets/office.webp', tint:'rgba(90,0,12,.22)',
    intro:[
      ['NARRADOR','Setenta e cinco dias. O escritório é o mesmo; os verbos mudaram: negociar, substituir, explicar, sobreviver.'],
      ['CAIO','O Grupo Fictor quer anunciar hoje. Investidores de fora entrariam no bloco.'],
      ['HELENA','“Entrariam” é uma palavra fazendo o trabalho de um contrato.'],
      ['OTÁVIO','Há outra coisa. Gente perguntando sobre operação da Polícia Federal.'],
      ['DANIEL','Perguntar não é saber.'],
      ['CAIO','Seu voo está pronto para Guarulhos.'],
      ['NARRADOR','O celular recebeu mensagens. A rota para Dubai foi adicionada ao inventário.']
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
      ['CAIO','A tripulação pergunta se embarca a bagagem.'],
      ['OTÁVIO','A defesa consegue sustentar que a viagem era de negócio. Sustentar não é garantir.'],
      ['DANIEL','E ficar?'],
      ['OTÁVIO','Ficar também será interpretado. A diferença é por quem.']
    ],
    hotspots:[
      {id:'cafe',label:'Café',x:13,y:42,lines:[['CAIO','Quer um café?'],['DANIEL','Se eu disser sim, o avião continua no chão?'],['CAIO','Por quarenta segundos.']]},
      {id:'camera',label:'Câmera',x:22,y:11,lines:[['NARRADOR','A câmera não pisca. É o funcionário mais descansado do aeroporto.'],['DANIEL','Quem guarda essas imagens?'],['OTÁVIO','Hoje? Todo mundo.']]},
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
      ['DANIEL','Tenho várias versões. Imagino que a senhora tenha uma preferida.'],
      ['INVESTIGADORA','Prefiro documentos. Versões envelhecem rápido.'],
      ['NARRADOR','Do outro lado do vidro, o Banco Central prepara a liquidação do Master.']
    ],
    hotspots:[
      {id:'espelho',label:'Espelho',x:74,y:27,lines:[['DANIEL','Tem alguém atrás?'],['INVESTIGADORA','Sempre tem alguém atrás. Foi assim que seu banco cresceu, não foi?'],['DANIEL','Isso foi uma pergunta ou uma piada?'],['INVESTIGADORA','Ainda estou decidindo.']]},
      {id:'copo_final',label:'Copo de papel',x:61,y:59,lines:[['NARRADOR','O café tem gosto de sala onde ninguém diz as horas.'],['DANIEL','Ao menos isto não depende do Banco Central.'],['INVESTIGADORA','Depende do orçamento. É pior.']]},
      {id:'evidencia',label:'Celular apreendido',x:41,y:65,lines:[['INVESTIGADORA','Seu telefone conta uma história longa.'],['DANIEL','Telefones juntam frases que nunca estiveram na mesma conversa.'],['INVESTIGADORA','É para isso que existe contexto. E perícia.']]},
      {id:'gravador',label:'Gravador',x:51,y:55,required:true,dossier:'liquidacao',lines:[['INVESTIGADORA','Última vez: quer falar, entregar uma declaração ou exercer seu direito ao silêncio?']],choices:[
        {text:'Cooperar e contextualizar os documentos.',effects:{trust:3,exposure:1},flag:'cooperou',reply:[['DANIEL','Eu falo. Mas começamos em março, não neste aeroporto.'],['INVESTIGADORA','Então comece. O gravador tem mais tempo que o mercado.']]},
        {text:'Entregar uma declaração escrita.',effects:{trust:0,exposure:0},flag:'declaracao',reply:[['DANIEL','Meu advogado entrega a declaração. Não vou improvisar patrimônio.'],['INVESTIGADORA','Papel também fala. Só não responde.']]},
        {text:'Permanecer em silêncio.',effects:{trust:-2,exposure:-1,pressure:1},flag:'silencio_final',reply:[['DANIEL','Vou exercer meu direito ao silêncio.'],['INVESTIGADORA','Registrado. O resto da manhã não fará o mesmo.']]}
      ],ending:true}
    ]
  }
];

const messagesByScene = [
  [{from:'Caio',time:'21:14',text:'Saiu. BRB confirmou o acordo.'},{from:'Helena',time:'21:19',text:'Não chame de operação concluída. Há aprovações pendentes.'},{mine:true,time:'21:22',text:'Reunião no escritório. Agora.'}],
  [{from:'Caio',time:'20:03',text:'BC rejeitou.'},{from:'Otávio',time:'20:05',text:'Não responda a ninguém antes de nos vermos.'},{from:'Helena',time:'20:07',text:'A liquidez amanhã não vai esperar nosso texto.'}],
  [{from:'Caio',time:'17:46',text:'Fictor aceita anúncio conjunto hoje.'},{from:'Helena',time:'18:02',text:'Ainda não temos assinatura.'},{from:'Tripulação',time:'19:31',text:'Plano de voo confirmado. Aguardando no hangar.'},{mine:true,time:'19:44',text:'Estou online. Avisem quando todos entrarem.'}],
  [{from:'Tripulação',time:'21:54',text:'Aeronave pronta.'},{from:'Caio',time:'21:57',text:'Tem movimento estranho na entrada.'},{from:'Otávio',time:'21:59',text:'Não tome nenhuma decisão sem me ouvir.'}],
  [{from:'Sistema',time:'06:12',text:'Aparelho recolhido para perícia.'}]
];

function freshState(){return {scene:0,seen:{},flags:{},metrics:{pressure:0,exposure:0,trust:0},inventory:[],dossier:['brb'],selected:null,started:false,unread:0,finished:false,playStarted:Date.now()}}
let state=freshState(), queue=[], afterDialogue=null, typing=false, typeTimer=null, currentFullText='';

const $=s=>document.querySelector(s), start=$('#start-screen'), game=$('#game-screen'), dialogue=$('#dialogue'), lineEl=$('#line'), speakerEl=$('#speaker'), choicesEl=$('#choices'), character=$('#character');

function readMutedPreference(){
  try{return localStorage.getItem(AUDIO_PREF_KEY)==='1'}catch{return false}
}

const audio=(()=>{
  let ctx=null,master=null,musicGain=null,fxGain=null,ambienceGain=null,musicTimer=null,chordIndex=0,started=false,muted=readMutedPreference();
  const progression=[
    [60,64,67,71],
    [57,60,64,67],
    [62,65,69,72],
    [55,59,62,65]
  ];
  const speakerPitch={DANIEL:168,HELENA:214,'OTÁVIO':148,CAIO:244,INVESTIGADORA:184,NARRADOR:126};

  function ensure(){
    if(ctx)return true;
    const AudioCtor=globalThis.AudioContext||globalThis.webkitAudioContext;
    if(!AudioCtor)return false;
    ctx=new AudioCtor();
    master=ctx.createGain();musicGain=ctx.createGain();fxGain=ctx.createGain();ambienceGain=ctx.createGain();
    // Mix pensado para o alto-falante pequeno do celular, sem estourar fones.
    master.gain.value=muted?0:.82;musicGain.gain.value=.62;fxGain.gain.value=.92;ambienceGain.gain.value=.28;
    musicGain.connect(master);fxGain.connect(master);ambienceGain.connect(master);master.connect(ctx.destination);
    return true;
  }

  function midi(note){return 440*Math.pow(2,(note-69)/12)}

  function softNote(note,when,duration,gainValue,type='triangle',destination=musicGain){
    const osc=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();
    osc.type=type;osc.frequency.setValueAtTime(midi(note),when);osc.detune.setValueAtTime(((note%5)-2)*2,when);
    filter.type='lowpass';filter.frequency.setValueAtTime(1450,when);filter.Q.value=.4;
    gain.gain.setValueAtTime(.0001,when);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002,gainValue),when+.22);
    gain.gain.setValueAtTime(Math.max(.0002,gainValue*.86),when+Math.max(.3,duration-.55));
    gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
    osc.connect(filter);filter.connect(gain);gain.connect(destination);
    osc.start(when);osc.stop(when+duration+.04);
  }

  function softKick(when,level=.022){
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sine';osc.frequency.setValueAtTime(72,when);osc.frequency.exponentialRampToValueAtTime(43,when+.16);
    gain.gain.setValueAtTime(level,when);gain.gain.exponentialRampToValueAtTime(.0001,when+.18);
    osc.connect(gain);gain.connect(musicGain);osc.start(when);osc.stop(when+.2);
  }

  function softBrush(when,level=.006){
    const length=Math.max(80,Math.floor(ctx.sampleRate*.045)),buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);
    for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
    const noise=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
    noise.buffer=buffer;filter.type='highpass';filter.frequency.value=2800;gain.gain.value=level;
    noise.connect(filter);filter.connect(gain);gain.connect(musicGain);noise.start(when);
  }

  function scheduleChord(){
    if(!ctx||muted)return;
    const when=ctx.currentTime+.035,chord=progression[chordIndex++%progression.length],duration=4.05;
    chord.forEach((note,i)=>softNote(note,when,duration,.021-(i*.0015)));
    softNote(chord[0]-12,when+.05,2.7,.032,'sine');
    softNote(chord[1]-12,when+2.03,1.65,.021,'sine');
    softNote(chord[2]+12,when+.48,.62,.012,'sine');
    softKick(when+.04,.038);softKick(when+2.04,.029);
    [0.55,1.55,2.55,3.55].forEach(offset=>softBrush(when+offset,.011));
  }

  function startAmbience(){
    const seconds=1.8,length=Math.floor(ctx.sampleRate*seconds),buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);
    for(let i=0;i<length;i++){
      const drift=Math.sin(i/1900)*.07;
      data[i]=(Math.random()*2-1)*(.38+drift);
    }
    const noise=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
    noise.buffer=buffer;noise.loop=true;filter.type='lowpass';filter.frequency.value=1150;filter.Q.value=.2;gain.gain.value=.052;
    noise.connect(filter);filter.connect(gain);gain.connect(ambienceGain);noise.start();
  }

  function start(){
    if(!ensure())return;
    ctx.resume?.().catch?.(()=>{});
    if(started)return;
    started=true;startAmbience();scheduleChord();
    musicTimer=setInterval(scheduleChord,3950);
  }

  function blip(speaker,charCode=0){
    if(!ctx||muted||ctx.state==='suspended')return;
    const now=ctx.currentTime,osc=ctx.createOscillator(),gain=ctx.createGain(),base=speakerPitch[speaker]||198;
    osc.type='triangle';osc.frequency.setValueAtTime(base+(charCode%7)*3,now);
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.043,now+.004);gain.gain.exponentialRampToValueAtTime(.0001,now+.032);
    osc.connect(gain);gain.connect(fxGain);osc.start(now);osc.stop(now+.032);
  }

  function toggle(){
    muted=!muted;
    try{localStorage.setItem(AUDIO_PREF_KEY,muted?'1':'0')}catch{}
    if(master){
      const now=ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(muted?0:.82,now,.025);
      if(!muted&&!started)start();
      if(!muted&&started)scheduleChord();
    }
    return muted;
  }

  function resume(){if(ctx&&!muted)ctx.resume?.().catch?.(()=>{})}
  function isMuted(){return muted}
  return {start,blip,toggle,resume,isMuted};
})();

function updateAudioButton(){
  const button=$('#audio-btn');if(!button)return;
  const muted=audio.isMuted();
  button.classList[muted?'add':'remove']('muted');
  button.setAttribute('aria-pressed',muted?'true':'false');
  button.setAttribute('aria-label',muted?'Ligar som':'Desligar som');
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
  try{audio.start()}catch{}
  try{enterImmersive()}catch{}
  action();
  updateAudioButton();
}

document.addEventListener('visibilitychange',()=>{if(!document.hidden)audio.resume()});

function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(state)); updateBadges()}
function load(){try{return JSON.parse(localStorage.getItem(SAVE_KEY))}catch{return null}}
function reset(){state=freshState(); localStorage.removeItem(SAVE_KEY); begin()}
function begin(){state.started=true; start.classList.remove('active'); game.classList.add('active'); enterScene(state.scene,true); save()}
function addItem(id){if(!state.inventory.includes(id))state.inventory.push(id)}
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
  const key=state.scene+'_'+h.id, first=!state.seen[key];state.seen[key]=true;
  if(first&&h.item){addItem(h.item);toast(inventoryCatalog[h.item].name+' adicionado')}
  if(first&&h.dossier)addDossier(h.dossier);
  renderHotspots();
  const finish=()=>{
    if(h.advance||h.ending){
      if(h.ending)return showEnding();
      setTimeout(()=>enterScene(Math.min(state.scene+1,scenes.length-1)),500)
    }
    save()
  };
  if(h.choices&&!state.flags['choice_'+key]) play(h.lines,()=>showChoices(h,key,finish));
  else play(first?h.lines:[['DANIEL','Já vi o que precisava aqui.']],finish)
}

function showChoices(h,key,finish){
  dialogue.classList.remove('hidden'); choicesEl.innerHTML=''; $('#dialogue-hint').textContent='escolha';
  h.choices.forEach(c=>{
    const b=document.createElement('button');b.className='choice';b.textContent=c.text;b.onclick=e=>{
      e.stopPropagation();state.flags['choice_'+key]=true;state.flags[c.flag]=true;
      Object.entries(c.effects||{}).forEach(([k,v])=>state.metrics[k]+=v);choicesEl.innerHTML='';save();play(c.reply,finish)
    };choicesEl.appendChild(b)
  })
}

function play(lines,done){queue=[...lines];afterDialogue=done;dialogue.classList.remove('hidden');nextLine()}
function nextLine(){
  if(typing){finishTyping();return}
  const item=queue.shift();
  if(!item){dialogue.classList.add('hidden');choicesEl.innerHTML='';hideCharacter();const cb=afterDialogue;afterDialogue=null;if(cb)cb();return}
  const [speaker,text]=item; speakerEl.textContent=speaker;showCharacter(speaker);typeText(text)
}
function typeText(text){clearInterval(typeTimer);typing=true;currentFullText=text;lineEl.textContent='';choicesEl.innerHTML='';$('#dialogue-hint').textContent='toque para continuar';let i=0;const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;if(reduced){finishTyping();return}typeTimer=setInterval(()=>{lineEl.textContent=text.slice(0,++i);const char=text[i-1];if(i%3===0&&char&&/\S/.test(char))audio.blip(speakerEl.textContent,char.charCodeAt(0));if(i>=text.length)finishTyping()},15)}
function finishTyping(){clearInterval(typeTimer);lineEl.textContent=currentFullText;typing=false}
function showCharacter(speaker){const map={DANIEL:'daniel',HELENA:'helena',OTÁVIO:'otavio',CAIO:'caio',INVESTIGADORA:'investigadora'};const person=map[speaker];if(!person){hideCharacter();return}character.dataset.person=person;character.className='show '+(person==='daniel'?'':'right')}
function hideCharacter(){character.className='';}

function updateBadges(){
  $('#phone-badge').textContent=state.unread||'';$('#phone-badge').style.display=state.unread?'inline-grid':'none';
  $('#dossier-count').textContent=state.dossier.length||''
}

function openModal(title,kicker,html){$('#modal-title').textContent=title;$('#modal-kicker').textContent=kicker;$('#modal-body').innerHTML=html;$('#modal').classList.remove('hidden')}
function closeModal(){$('#modal').classList.add('hidden')}
function openPhone(){state.unread=0;save();const msgs=messagesByScene[state.scene]||[];openModal('Celular','MENSAGENS',`<div class="messages">${msgs.map(m=>`<div class="entry ${m.mine?'mine':'theirs'}"><span class="message-time">${m.from||'Você'} · ${m.time}</span><p>${m.text}</p></div>`).join('')}</div>`)}
function openInventory(){const html=state.inventory.length?`<div class="inventory-grid">${state.inventory.map(id=>{const i=inventoryCatalog[id];return `<button class="item ${state.selected===id?'selected':''}" data-item="${id}"><span class="item-icon">${i.icon}</span><strong>${i.name}</strong><small>${i.desc}</small></button>`}).join('')}</div><p class="fact-note">Selecione um item. Alguns objetos reagem a ele; o jogo nunca exige adivinhação para avançar.</p>`:'<p>O bolso ainda está vazio.</p>';openModal('Inventário','O QUE FICOU',html);document.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>{state.selected=state.selected===b.dataset.item?null:b.dataset.item;save();openInventory()})}
function openDossier(){const entries=dossier.filter(d=>state.dossier.includes(d.id));openModal('Dossiê','FATOS DESBLOQUEADOS',`<p class="fact-note">As cenas e conversas privadas são dramatizadas. As etiquetas abaixo distinguem fatos, reportagem e alegações contestadas.</p>${entries.map(d=>`<article class="entry"><span class="tag ${d.tag.toLowerCase()}">${d.tag}</span><h3>${d.title}</h3><p>${d.text}</p><a href="${d.url}" target="_blank" rel="noreferrer">${d.source} ↗</a></article>`).join('')}`)}
function openAbout(){openModal('Fatos, sátira e ficção','COMO LER O JOGO',`<p class="fact-note">Este é um jogo de sátira e drama baseado em acontecimentos públicos. Daniel Vorcaro é uma pessoa real. Helena, Otávio, Caio e a investigadora são personagens compostos e fictícios. Nenhuma conversa privada é apresentada como transcrição histórica.</p><div class="entry"><h3>Etiquetas do Dossiê</h3><p><b>DOCUMENTADO</b>: anúncio, decisão ou fato confirmado por registro público. <b>REPORTADO</b>: informação de jornalismo profissional. <b>ALEGADO</b>: acusação sob disputa ou investigação. <b>DRAMATIZAÇÃO</b>: invenção narrativa.</p></div>`)}
function openMenu(){openModal('Pausa','JOGO SALVO',`<div class="menu-actions"><button id="resume">Continuar jogando</button><button id="restart">Recomeçar do início</button><button id="title">Voltar ao título</button></div><p class="credits">Autosave local após cada decisão · Arte original gerada para este jogo</p>`);$('#resume').onclick=closeModal;$('#restart').onclick=()=>{closeModal();reset()};$('#title').onclick=()=>{closeModal();game.classList.remove('active');start.classList.add('active');$('#continue-game').hidden=false}}

function showEnding(){
  state.finished=true;state.inventory.push(...(state.inventory.includes('cracha')?[]:['cracha']));
  const m=state.metrics;let e;
  if(state.flags.cooperou&&(m.trust>=m.exposure||state.flags.abriu_dados))e={title:'A PASTA ABERTA',stamp:'A versão que aceita perguntas.',text:'Você escolheu deixar rastros organizados e falar. Isso não muda a prisão nem a liquidação, mas muda a disputa pelo contexto: a defesa ganha coerência; os documentos ganham inimigos; cada resposta abre três novas perguntas.'};
  else if(state.flags.silencio_final||m.trust<0)e={title:'A FORTALEZA VAZIA',stamp:'O silêncio protege. E isola.',text:'Você reduziu as palavras disponíveis contra você. Do lado de fora, o espaço vazio foi ocupado por manchetes, fontes, relatórios e antigos aliados. A estratégia contém danos imediatos, mas ninguém sabe mais onde termina prudência e começa abandono.'};
  else e={title:'O HOMEM NO VIDRO',stamp:'Toda saída virou imagem.',text:'Você tentou controlar a narrativa com movimento: anúncio, confronto, embarque. A imagem venceu o argumento. O aeroporto se tornou o enquadramento definitivo, e tudo o que veio antes passou a ser relido como preparação para aquela noite.'};
  save();openModal(e.title,'FINAL',`<div class="ending"><div class="ending-stamp">${e.stamp}</div><div><h3>${e.title}</h3><p>${e.text}</p><p><b>18 de novembro de 2025:</b> o Banco Central decretou a liquidação extrajudicial do Banco Master. As investigações e disputas judiciais continuaram.</p><div class="menu-actions"><button id="ending-dossier">Abrir Dossiê completo</button><button id="ending-restart">Jogar outra rota</button></div></div></div>`);state.dossier=dossier.map(d=>d.id);save();$('#ending-dossier').onclick=openDossier;$('#ending-restart').onclick=()=>{closeModal();reset()}
}

dialogue.addEventListener('click',e=>{if(!e.target.closest('.choice'))nextLine()});$('#scene').addEventListener('click',()=>{if(!dialogue.classList.contains('hidden'))nextLine()});
$('#new-game').onclick=()=>launchGame(reset);$('#continue-game').onclick=()=>launchGame(()=>{const saved=load();if(saved){state={...freshState(),...saved};begin()}});$('#start-sources').onclick=openAbout;
$('#phone-btn').onclick=openPhone;$('#inventory-btn').onclick=openInventory;$('#dossier-btn').onclick=openDossier;$('#audio-btn').onclick=()=>{try{audio.start();audio.toggle()}catch{}updateAudioButton()};$('#menu-btn').onclick=openMenu;$('#modal-close').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if((e.key===' '||e.key==='Enter')&&!dialogue.classList.contains('hidden'))nextLine()});

updateAudioButton();const saved=load();if(saved?.started){$('#continue-game').hidden=false}
