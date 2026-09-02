export interface TechniqueItem {
  id: string;
  position: number;
  japanese: string;
  namePt: string;
  category: 'Te-waza' | 'Koshi-waza' | 'Ashi-waza' | 'Ma-sutemi-waza' | 'Yoko-sutemi-waza' | 'Osaekomi-waza' | 'Shime-waza' | 'Kansetsu-waza' | 'Comparativos' | 'Apresentação';
  group: 'Nage-waza' | 'Katame-waza' | 'Comparativo' | 'Geral';
  gokyoGroup?: string;
  videoId: string;
  videoUrl: string;
  description?: string;
}

export const ALL_TECHNIQUES: TechniqueItem[] = [
  {
    id: "PV_000",
    position: 0,
    japanese: "KODOKAN JUDO 100 Techniques PV",
    namePt: "Apresentação Oficial das 100 Técnicas do Kodokan",
    category: "Apresentação",
    group: "Geral",
    videoId: "_GxcFx8LZRk",
    videoUrl: "https://www.youtube.com/watch?v=_GxcFx8LZRk",
    description: "Vídeo oficial de apresentação da série de técnicas do Kodokan Judo em parceria com a IJF Academy."
  },
  {
    id: "TE_001",
    position: 2,
    japanese: "背負投 / Seoi-nage",
    namePt: "Projeção por cima do ombro (Seoi-nage)",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "zIq0xI0ogxk",
    videoUrl: "https://www.youtube.com/watch?v=zIq0xI0ogxk",
    description: "Projeção por cima do ombro com as duas mãos na pegada (gola e manga)."
  },
  {
    id: "TE_002",
    position: 3,
    japanese: "一本背負投 / Ippon-seoi-nage",
    namePt: "Projeção por cima do ombro com um braço",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "FQnOlCxo4oI",
    videoUrl: "https://www.youtube.com/watch?v=FQnOlCxo4oI",
    description: "Projeção encaixando o braço no bíceps/axila do oponente para alavanca."
  },
  {
    id: "TE_003",
    position: 4,
    japanese: "背負落 / Seoi-otoshi",
    namePt: "Derrubo por cima do ombro (Seoi-otoshi)",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "vu1TMVNnq34",
    videoUrl: "https://www.youtube.com/watch?v=vu1TMVNnq34",
    description: "Queda por cima do ombro ajoelhando um ou dois joelhos para baixar o centro de gravidade."
  },
  {
    id: "TE_004",
    position: 5,
    japanese: "体落 / Tai-otoshi",
    namePt: "Queda do corpo / Inversão do corpo",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "4x6S3Q-Ktv8",
    videoUrl: "https://www.youtube.com/watch?v=4x6S3Q-Ktv8",
    description: "Derrubo do corpo cruzando a perna para bloqueio e tracionando com os braços."
  },
  {
    id: "TE_005",
    position: 6,
    japanese: "肩車 / Kata-guruma",
    namePt: "Roda de ombros",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "cnHRhSy8yi4",
    videoUrl: "https://www.youtube.com/watch?v=cnHRhSy8yi4",
    description: "Projeção carregando o adversário transversalmente sobre os dois ombros."
  },
  {
    id: "TE_006",
    position: 7,
    japanese: "掬投 / Sukui-nage",
    namePt: "Projeção em colher",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "vU6aJ2kFxoI",
    videoUrl: "https://www.youtube.com/watch?v=vU6aJ2kFxoI",
    description: "Abraçando as pernas ou coxas do oponente por trás para erguê-lo em colher."
  },
  {
    id: "TE_007",
    position: 8,
    japanese: "帯落 / Obi-otoshi",
    namePt: "Derrubo pela faixa",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "ff8U2TVZIYI",
    videoUrl: "https://www.youtube.com/watch?v=ff8U2TVZIYI",
    description: "Pegando na frente e atrás da faixa para erguer e derrubar para trás."
  },
  {
    id: "TE_008",
    position: 9,
    japanese: "浮落 / Uki-otoshi",
    namePt: "Queda flutuante / Vendaval",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "6H5tmncOY4Q",
    videoUrl: "https://www.youtube.com/watch?v=6H5tmncOY4Q",
    description: "Desequilíbrio circular ajoelhando sem contato com o corpo (pura ação dos braços)."
  },
  {
    id: "TE_009",
    position: 10,
    japanese: "隅落 / Sumi-otoshi",
    namePt: "Queda no canto / ângulo",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "lLU9wv52ni0",
    videoUrl: "https://www.youtube.com/watch?v=lLU9wv52ni0",
    description: "Projeção no ângulo diagonal traseiro empurrando com as mãos."
  },
  {
    id: "TE_010",
    position: 11,
    japanese: "山嵐 / Yama-arashi",
    namePt: "Tempestade na montanha",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "MGlyKmSuzdc",
    videoUrl: "https://www.youtube.com/watch?v=MGlyKmSuzdc",
    description: "Combinação clássica de pegada na mesma gola com varredura potente de perna."
  },
  {
    id: "TE_011",
    position: 12,
    japanese: "帯取返 / Obi-tori-gaeshi",
    namePt: "Contra-ataque agarrando a faixa",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "bpc82SrunUU",
    videoUrl: "https://www.youtube.com/watch?v=bpc82SrunUU"
  },
  {
    id: "TE_012",
    position: 13,
    japanese: "双手刈 / Morote-gari",
    namePt: "Ceifada com as duas mãos (Baiana)",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "BHLQS4K85bs",
    videoUrl: "https://www.youtube.com/watch?v=BHLQS4K85bs"
  },
  {
    id: "TE_013",
    position: 14,
    japanese: "朽木倒 / Kuchiki-taoshi",
    namePt: "Derrubo da árvore morta",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "ZNL47q1aJNY",
    videoUrl: "https://www.youtube.com/watch?v=ZNL47q1aJNY"
  },
  {
    id: "TE_014",
    position: 15,
    japanese: "踵返 / Kibisu-gaeshi",
    namePt: "Contra-ataque pelo calcanhar",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "tJylJYfBliA",
    videoUrl: "https://www.youtube.com/watch?v=tJylJYfBliA"
  },
  {
    id: "TE_015",
    position: 16,
    japanese: "内股すかし / Uchi-mata-sukashi",
    namePt: "Esquiva da perna por dentro",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "V-RS3uhtVWM",
    videoUrl: "https://www.youtube.com/watch?v=V-RS3uhtVWM"
  },
  {
    id: "TE_016",
    position: 17,
    japanese: "小内返 / Ko-uchi-gaeshi",
    namePt: "Contra-ataque da pequena ceifada interna",
    category: "Te-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "_MWAdYi_LC4",
    videoUrl: "https://www.youtube.com/watch?v=_MWAdYi_LC4"
  },

  // KOSHI-WAZA
  {
    id: "KO_001",
    position: 19,
    japanese: "浮腰 / Uki-goshi",
    namePt: "Quadril flutuante (Uki-goshi)",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "bPKwtB4lyOQ",
    videoUrl: "https://www.youtube.com/watch?v=bPKwtB4lyOQ"
  },
  {
    id: "KO_002",
    position: 20,
    japanese: "大腰 / O-goshi",
    namePt: "Grande projeção de quadril",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "yhu1mfy2vJ4",
    videoUrl: "https://www.youtube.com/watch?v=yhu1mfy2vJ4"
  },
  {
    id: "KO_003",
    position: 21,
    japanese: "腰車 / Koshi-guruma",
    namePt: "Roda de quadril / Enrolamento",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "SU7Id6uVJ44",
    videoUrl: "https://www.youtube.com/watch?v=SU7Id6uVJ44"
  },
  {
    id: "KO_004",
    position: 22,
    japanese: "釣込腰 / Tsurikomi-goshi",
    namePt: "Projeção de quadril puxando e levantando",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "McfzA0yRVt4",
    videoUrl: "https://www.youtube.com/watch?v=McfzA0yRVt4"
  },
  {
    id: "KO_005",
    position: 23,
    japanese: "袖釣込腰 / Sode-tsurikomi-goshi",
    namePt: "Projeção de quadril puxando pela manga",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "QsmAxpmYLOI",
    videoUrl: "https://www.youtube.com/watch?v=QsmAxpmYLOI"
  },
  {
    id: "KO_006",
    position: 24,
    japanese: "払腰 / Harai-goshi",
    namePt: "Varredura de quadril (Harai-goshi)",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "qTo8HlAAkOo",
    videoUrl: "https://www.youtube.com/watch?v=qTo8HlAAkOo"
  },
  {
    id: "KO_007",
    position: 25,
    japanese: "釣腰 / Tsuri-goshi",
    namePt: "Projeção de quadril levantando pela faixa",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "51Htlp7xEvE",
    videoUrl: "https://www.youtube.com/watch?v=51Htlp7xEvE"
  },
  {
    id: "KO_008",
    position: 26,
    japanese: "跳腰 / Hane-goshi",
    namePt: "Quadril saltado (Hane-goshi)",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "M9_7De6A1kk",
    videoUrl: "https://www.youtube.com/watch?v=M9_7De6A1kk"
  },
  {
    id: "KO_009",
    position: 27,
    japanese: "移腰 / Utsuri-goshi",
    namePt: "Mudança / Deslocamento de quadril",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "4pQd_bEnlf0",
    videoUrl: "https://www.youtube.com/watch?v=4pQd_bEnlf0"
  },
  {
    id: "KO_010",
    position: 28,
    japanese: "後腰 / Ushiro-goshi",
    namePt: "Arremesso de quadril por trás",
    category: "Koshi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "ORIYstuxYT8",
    videoUrl: "https://www.youtube.com/watch?v=ORIYstuxYT8"
  },

  // ASHI-WAZA
  {
    id: "AS_001",
    position: 30,
    japanese: "出足払 / De-ashi-harai",
    namePt: "Varredura do pé avançado",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "4BUUvqxi_Kk",
    videoUrl: "https://www.youtube.com/watch?v=4BUUvqxi_Kk"
  },
  {
    id: "AS_002",
    position: 31,
    japanese: "膝車 / Hiza-guruma",
    namePt: "Roda pelo joelho",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "JPJx9-oAVns",
    videoUrl: "https://www.youtube.com/watch?v=JPJx9-oAVns"
  },
  {
    id: "AS_003",
    position: 32,
    japanese: "支釣込足 / Sasae-tsurikomi-ashi",
    namePt: "Bloqueio do pé levantando e puxando",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "699i--pvYmE",
    videoUrl: "https://www.youtube.com/watch?v=699i--pvYmE"
  },
  {
    id: "AS_004",
    position: 33,
    japanese: "大外刈 / O-soto-gari",
    namePt: "Grande ceifada externa",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "c-A_nP7mKAc",
    videoUrl: "https://www.youtube.com/watch?v=c-A_nP7mKAc"
  },
  {
    id: "AS_005",
    position: 34,
    japanese: "大内刈 / O-uchi-gari",
    namePt: "Grande ceifada interna",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Ikkyo (1º Grupo)",
    videoId: "0itJFhV9pDQ",
    videoUrl: "https://www.youtube.com/watch?v=0itJFhV9pDQ"
  },
  {
    id: "AS_006",
    position: 35,
    japanese: "小外刈 / Ko-soto-gari",
    namePt: "Pequena ceifada externa",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "jeQ541ScLB4",
    videoUrl: "https://www.youtube.com/watch?v=jeQ541ScLB4"
  },
  {
    id: "AS_007",
    position: 36,
    japanese: "小内刈 / Ko-uchi-gari",
    namePt: "Pequena ceifada interna",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "3Jb3tZvr9Ng",
    videoUrl: "https://www.youtube.com/watch?v=3Jb3tZvr9Ng"
  },
  {
    id: "AS_008",
    position: 37,
    japanese: "送足払 / Okuri-ashi-harai",
    namePt: "Varredura dos dois pés em movimento",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "nw1ZdRjrdRI",
    videoUrl: "https://www.youtube.com/watch?v=nw1ZdRjrdRI"
  },
  {
    id: "AS_009",
    position: 38,
    japanese: "内股 / Uchi-mata",
    namePt: "Ceifada interna pela coxa",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Nikyo (2º Grupo)",
    videoId: "iUpSu5J-bgw",
    videoUrl: "https://www.youtube.com/watch?v=iUpSu5J-bgw"
  },
  {
    id: "AS_010",
    position: 39,
    japanese: "小外掛 / Ko-soto-gake",
    namePt: "Pequeno gancho externo",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "8b6kY4s4zH4",
    videoUrl: "https://www.youtube.com/watch?v=8b6kY4s4zH4"
  },
  {
    id: "AS_011",
    position: 40,
    japanese: "足車 / Ashi-guruma",
    namePt: "Roda pela perna",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "ROeayhvom9U",
    videoUrl: "https://www.youtube.com/watch?v=ROeayhvom9U"
  },
  {
    id: "AS_012",
    position: 41,
    japanese: "払釣込足 / Harai-tsurikomi-ashi",
    namePt: "Varredura do pé puxando e levantando",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "gGPXvWL8VbE",
    videoUrl: "https://www.youtube.com/watch?v=gGPXvWL8VbE"
  },
  {
    id: "AS_013",
    position: 42,
    japanese: "大車 / O-guruma",
    namePt: "Grande roda",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "SnZciTAY9vc",
    videoUrl: "https://www.youtube.com/watch?v=SnZciTAY9vc"
  },
  {
    id: "AS_014",
    position: 43,
    japanese: "大外車 / O-soto-guruma",
    namePt: "Grande roda externa",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "92KbCm6pQeI",
    videoUrl: "https://www.youtube.com/watch?v=92KbCm6pQeI"
  },
  {
    id: "AS_015",
    position: 44,
    japanese: "大外落 / O-soto-otoshi",
    namePt: "Grande derrubo externo",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "2DsVvDw7b8g",
    videoUrl: "https://www.youtube.com/watch?v=2DsVvDw7b8g"
  },
  {
    id: "AS_016",
    position: 45,
    japanese: "燕返 / Tsubame-gaeshi",
    namePt: "Contra-ataque da andorinha",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "GwweWqqFB5g",
    videoUrl: "https://www.youtube.com/watch?v=GwweWqqFB5g"
  },
  {
    id: "AS_017",
    position: 46,
    japanese: "大外返 / O-soto-gaeshi",
    namePt: "Contra-ataque da grande ceifada externa",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "8ZjM3X_EANo",
    videoUrl: "https://www.youtube.com/watch?v=8ZjM3X_EANo"
  },
  {
    id: "AS_018",
    position: 47,
    japanese: "大内返 / O-uchi-gaeshi",
    namePt: "Contra-ataque da grande ceifada interna",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "dCyZTXyjIXE",
    videoUrl: "https://www.youtube.com/watch?v=dCyZTXyjIXE"
  },
  {
    id: "AS_019",
    position: 48,
    japanese: "跳腰返 / Hane-goshi-gaeshi",
    namePt: "Contra-ataque do quadril saltado",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "9bZAZSBtnGs",
    videoUrl: "https://www.youtube.com/watch?v=9bZAZSBtnGs"
  },
  {
    id: "AS_020",
    position: 49,
    japanese: "払腰返 / Harai-goshi-gaeshi",
    namePt: "Contra-ataque da varredura de quadril",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "4U3It-7PPsc",
    videoUrl: "https://www.youtube.com/watch?v=4U3It-7PPsc"
  },
  {
    id: "AS_021",
    position: 50,
    japanese: "内股返 / Uchi-mata-gaeshi",
    namePt: "Contra-ataque da ceifada interna",
    category: "Ashi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "Sy6sLWxkWYw",
    videoUrl: "https://www.youtube.com/watch?v=Sy6sLWxkWYw"
  },

  // SUTEMI-WAZA (MA-SUTEMI & YOKO-SUTEMI)
  {
    id: "SU_001",
    position: 52,
    japanese: "巴投 / Tomoe-nage",
    namePt: "Projeção em círculo frontal",
    category: "Ma-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "880WbHvHv6A",
    videoUrl: "https://www.youtube.com/watch?v=880WbHvHv6A"
  },
  {
    id: "SU_002",
    position: 53,
    japanese: "隅返 / Sumi-gaeshi",
    namePt: "Contra-ataque pelo canto",
    category: "Ma-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "5VhduA5xkbA",
    videoUrl: "https://www.youtube.com/watch?v=5VhduA5xkbA"
  },
  {
    id: "SU_003",
    position: 54,
    japanese: "引込返 / Hikikomi-gaeshi",
    namePt: "Derrubo agarrando o cinto e puxando",
    category: "Ma-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "92zUYWBp5N8",
    videoUrl: "https://www.youtube.com/watch?v=92zUYWBp5N8"
  },
  {
    id: "SU_004",
    position: 55,
    japanese: "俵返 / Tawara-gaeshi",
    namePt: "Lançamento em saco de arroz",
    category: "Ma-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "TmTWgrmViZc",
    videoUrl: "https://www.youtube.com/watch?v=TmTWgrmViZc"
  },
  {
    id: "SU_005",
    position: 56,
    japanese: "裏投 / Ura-nage",
    namePt: "Projeção em reversão para trás (Suplex)",
    category: "Ma-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "Fgi9b8DJ5sQ",
    videoUrl: "https://www.youtube.com/watch?v=Fgi9b8DJ5sQ"
  },
  {
    id: "SU_006",
    position: 57,
    japanese: "横落 / Yoko-otoshi",
    namePt: "Queda lateral",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Sankyo (3º Grupo)",
    videoId: "MnNG67pF_a0",
    videoUrl: "https://www.youtube.com/watch?v=MnNG67pF_a0"
  },
  {
    id: "SU_007",
    position: 58,
    japanese: "谷落 / Tani-otoshi",
    namePt: "Derrubo no vale",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "3b9Me3Fohpk",
    videoUrl: "https://www.youtube.com/watch?v=3b9Me3Fohpk"
  },
  {
    id: "SU_008",
    position: 59,
    japanese: "跳巻込 / Hane-makikomi",
    namePt: "Quadril saltado enrolando",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "6CRBGLGz9j8",
    videoUrl: "https://www.youtube.com/watch?v=6CRBGLGz9j8"
  },
  {
    id: "SU_009",
    position: 60,
    japanese: "外巻込 / Soto-makikomi",
    namePt: "Enrolamento externo",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Yonkyo (4º Grupo)",
    videoId: "bWG9O1BVKtQ",
    videoUrl: "https://www.youtube.com/watch?v=bWG9O1BVKtQ"
  },
  {
    id: "SU_010",
    position: 61,
    japanese: "内巻込 / Uchi-makikomi",
    namePt: "Enrolamento interno",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "5BowcjduxVc",
    videoUrl: "https://www.youtube.com/watch?v=5BowcjduxVc"
  },
  {
    id: "SU_011",
    position: 63,
    japanese: "浮技 / Uki-waza",
    namePt: "Técnica flutuante",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "weVOpJ63gII",
    videoUrl: "https://www.youtube.com/watch?v=weVOpJ63gII"
  },
  {
    id: "SU_012",
    position: 64,
    japanese: "横分 / Yoko-wakare",
    namePt: "Separação lateral",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "bp1tscHlePI",
    videoUrl: "https://www.youtube.com/watch?v=bp1tscHlePI"
  },
  {
    id: "SU_013",
    position: 65,
    japanese: "横車 / Yoko-guruma",
    namePt: "Roda lateral",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "MehP6I5cY2c",
    videoUrl: "https://www.youtube.com/watch?v=MehP6I5cY2c"
  },
  {
    id: "SU_014",
    position: 66,
    japanese: "横掛 / Yoko-gake",
    namePt: "Enganche lateral",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Dai Gokyo (5º Grupo)",
    videoId: "tP1Sj1uDfSo",
    videoUrl: "https://www.youtube.com/watch?v=tP1Sj1uDfSo"
  },
  {
    id: "SU_015",
    position: 67,
    japanese: "抱分 / Daki-wakare",
    namePt: "Abraçando na separação",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Habukareta Waza",
    videoId: "Hr0cOMGBDYo",
    videoUrl: "https://www.youtube.com/watch?v=Hr0cOMGBDYo"
  },
  {
    id: "SU_016",
    position: 68,
    japanese: "大外巻込 / O-soto-makikomi",
    namePt: "Grande enrolamento externo",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "DGDv2oMwmas",
    videoUrl: "https://www.youtube.com/watch?v=DGDv2oMwmas"
  },
  {
    id: "SU_017",
    position: 69,
    japanese: "内股巻込 / Uchi-mata-makikomi",
    namePt: "Enrolamento pela coxa interna",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "jZXENTLpJCI",
    videoUrl: "https://www.youtube.com/watch?v=jZXENTLpJCI"
  },
  {
    id: "SU_018",
    position: 70,
    japanese: "払巻込 / Harai-makikomi",
    namePt: "Enrolamento varrendo com quadril",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "VBaHzKaCXss",
    videoUrl: "https://www.youtube.com/watch?v=VBaHzKaCXss"
  },
  {
    id: "SU_019",
    position: 71,
    japanese: "小内巻込 / Ko-uchi-makikomi",
    namePt: "Pequeno enrolamento interno",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Shinmeisho-No-Waza",
    videoId: "_1eygIXLD_w",
    videoUrl: "https://www.youtube.com/watch?v=_1eygIXLD_w"
  },
  {
    id: "SU_020",
    position: 72,
    japanese: "蟹挟 / Kani-basami",
    namePt: "Tesoura nas pernas (Proibida)",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Kinshi-waza (Proibida)",
    videoId: "OR-HGHnarYc",
    videoUrl: "https://www.youtube.com/watch?v=OR-HGHnarYc"
  },
  {
    id: "SU_021",
    position: 73,
    japanese: "河津掛 / Kawazu-gake",
    namePt: "Enganche na perna (Proibida)",
    category: "Yoko-sutemi-waza",
    group: "Nage-waza",
    gokyoGroup: "Kinshi-waza (Proibida)",
    videoId: "w6G57bWACi0",
    videoUrl: "https://www.youtube.com/watch?v=w6G57bWACi0"
  },

  // OSAEKOMI-WAZA
  {
    id: "OS_001",
    position: 75,
    japanese: "袈裟固 / Kesa-gatame",
    namePt: "Controle em lenço (Kesa-gatame)",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "NDaQuJOFBYk",
    videoUrl: "https://www.youtube.com/watch?v=NDaQuJOFBYk"
  },
  {
    id: "OS_002",
    position: 76,
    japanese: "袈裟固の逃れ方 / Kesa-gatame Escapes",
    namePt: "Escapadas do Kesa-gatame (Nogare-kata)",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "5_TS0YHdxcQ",
    videoUrl: "https://www.youtube.com/watch?v=5_TS0YHdxcQ"
  },
  {
    id: "OS_003",
    position: 77,
    japanese: "崩袈裟固 / Kuzure-kesa-gatame",
    namePt: "Variante do controle de lenço",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "Q2fb9jaoUFQ",
    videoUrl: "https://www.youtube.com/watch?v=Q2fb9jaoUFQ"
  },
  {
    id: "OS_004",
    position: 78,
    japanese: "崩袈裟固の逃れ方 / Kuzure-kesa-gatame Escapes",
    namePt: "Escapadas do Kuzure-kesa-gatame",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "-zFQ6h4yKT4",
    videoUrl: "https://www.youtube.com/watch?v=-zFQ6h4yKT4"
  },
  {
    id: "OS_005",
    position: 79,
    japanese: "後袈裟固 / Ushiro-kesa-gatame",
    namePt: "Controle de lenço por trás",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "SBapox2M2dE",
    videoUrl: "https://www.youtube.com/watch?v=SBapox2M2dE"
  },
  {
    id: "OS_006",
    position: 80,
    japanese: "後袈裟固の逃れ方 / Ushiro-kesa-gatame Escapes",
    namePt: "Escapadas do Ushiro-kesa-gatame",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "4QuzAAucQsA",
    videoUrl: "https://www.youtube.com/watch?v=4QuzAAucQsA"
  },
  {
    id: "OS_007",
    position: 81,
    japanese: "肩固 / Kata-gatame",
    namePt: "Controle pelo ombro (Kata-gatame)",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "zQR3IOXxO_Q",
    videoUrl: "https://www.youtube.com/watch?v=zQR3IOXxO_Q"
  },
  {
    id: "OS_008",
    position: 82,
    japanese: "肩固の逃れ方 / Kata-gatame Escapes",
    namePt: "Escapadas do Kata-gatame",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "7hP1-W2yovk",
    videoUrl: "https://www.youtube.com/watch?v=7hP1-W2yovk"
  },
  {
    id: "OS_009",
    position: 83,
    japanese: "上四方固 / Kami-shiho-gatame",
    namePt: "Controle por cima dos 4 cantos (Norte-Sul)",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "HFuMjOv0WN8",
    videoUrl: "https://www.youtube.com/watch?v=HFuMjOv0WN8"
  },
  {
    id: "OS_010",
    position: 84,
    japanese: "上四方固の逃れ方 / Kami-shiho-gatame Escapes",
    namePt: "Escapadas do Kami-shiho-gatame",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "seGsXy9I4G8",
    videoUrl: "https://www.youtube.com/watch?v=seGsXy9I4G8"
  },
  {
    id: "OS_011",
    position: 85,
    japanese: "崩上四方固 / Kuzure-kami-shiho-gatame",
    namePt: "Variante do controle dos 4 cantos por cima",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "YUrogQWdwiY",
    videoUrl: "https://www.youtube.com/watch?v=YUrogQWdwiY"
  },
  {
    id: "OS_012",
    position: 86,
    japanese: "崩上四方固の逃れ方 / Kuzure-kami-shiho-gatame Escapes",
    namePt: "Escapadas do Kuzure-kami-shiho-gatame",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "PPe7E_7d7UI",
    videoUrl: "https://www.youtube.com/watch?v=PPe7E_7d7UI"
  },
  {
    id: "OS_013",
    position: 87,
    japanese: "横四方固 / Yoko-shiho-gatame",
    namePt: "Controle lateral dos 4 cantos (100 kg)",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "TT7XJVSEQxA",
    videoUrl: "https://www.youtube.com/watch?v=TT7XJVSEQxA"
  },
  {
    id: "OS_014",
    position: 88,
    japanese: "横四方固の逃れ方 / Yoko-shiho-gatame Escapes",
    namePt: "Escapadas do Yoko-shiho-gatame",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "yK_GSamSPko",
    videoUrl: "https://www.youtube.com/watch?v=yK_GSamSPko"
  },
  {
    id: "OS_015",
    position: 89,
    japanese: "縦四方固 / Tate-shiho-gatame",
    namePt: "Controle longitudinal dos 4 cantos (Montada)",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "55-rFmBx53g",
    videoUrl: "https://www.youtube.com/watch?v=55-rFmBx53g"
  },
  {
    id: "OS_016",
    position: 90,
    japanese: "縦四方固の逃れ方 / Tate-shiho-gatame Escapes",
    namePt: "Escapadas do Tate-shiho-gatame",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "JMJBjnst_DA",
    videoUrl: "https://www.youtube.com/watch?v=JMJBjnst_DA"
  },
  {
    id: "OS_017",
    position: 91,
    japanese: "浮固 / Uki-gatame",
    namePt: "Imobilização flutuante",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "e_lAjik1SUM",
    videoUrl: "https://www.youtube.com/watch?v=e_lAjik1SUM"
  },
  {
    id: "OS_018",
    position: 92,
    japanese: "浮固の逃れ方 / Uki-gatame Escapes",
    namePt: "Escapadas da imobilização flutuante",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "AMHWDFR4ryo",
    videoUrl: "https://www.youtube.com/watch?v=AMHWDFR4ryo"
  },
  {
    id: "OS_019",
    position: 93,
    japanese: "裏固 / Ura-gatame",
    namePt: "Imobilização pelas costas",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "eeAHZB0v3XY",
    videoUrl: "https://www.youtube.com/watch?v=eeAHZB0v3XY"
  },
  {
    id: "OS_020",
    position: 94,
    japanese: "裏固の逃れ方 / Ura-gatame Escapes",
    namePt: "Escapadas da imobilização pelas costas",
    category: "Osaekomi-waza",
    group: "Katame-waza",
    videoId: "0aY2Tmchzs8",
    videoUrl: "https://www.youtube.com/watch?v=0aY2Tmchzs8"
  },

  // SHIME-WAZA
  {
    id: "SH_001",
    position: 96,
    japanese: "並十字絞 / Nami-juji-jime",
    namePt: "Estrangulamento cruzado normal",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "k2cHry9HByQ",
    videoUrl: "https://www.youtube.com/watch?v=k2cHry9HByQ"
  },
  {
    id: "SH_002",
    position: 97,
    japanese: "逆十字絞 / Gyaku-juji-jime",
    namePt: "Estrangulamento cruzado invertido",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "t3tQriIPdlI",
    videoUrl: "https://www.youtube.com/watch?v=t3tQriIPdlI"
  },
  {
    id: "SH_003",
    position: 98,
    japanese: "片十字絞 / Kata-juji-jime",
    namePt: "Estrangulamento cruzado unilateral",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "3VZVUAmiMD8",
    videoUrl: "https://www.youtube.com/watch?v=3VZVUAmiMD8"
  },
  {
    id: "SH_004",
    position: 99,
    japanese: "裸絞 / Hadaka-jime",
    namePt: "Estrangulamento nu / Mata-leão",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "9f0n8jez7iA",
    videoUrl: "https://www.youtube.com/watch?v=9f0n8jez7iA"
  },
  {
    id: "SH_005",
    position: 100,
    japanese: "送襟絞 / Okuri-eri-jime",
    namePt: "Estrangulamento deslizando a gola",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "EiqyoVcIAi8",
    videoUrl: "https://www.youtube.com/watch?v=EiqyoVcIAi8"
  },
  {
    id: "SH_006",
    position: 101,
    japanese: "片羽絞 / Kataha-jime",
    namePt: "Estrangulamento bloqueando a asa",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "yaTGgRjnwB8",
    videoUrl: "https://www.youtube.com/watch?v=yaTGgRjnwB8"
  },
  {
    id: "SH_007",
    position: 102,
    japanese: "片手絞 / Katate-jime",
    namePt: "Estrangulamento com uma mão",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "cHeIs-fSqwE",
    videoUrl: "https://www.youtube.com/watch?v=cHeIs-fSqwE"
  },
  {
    id: "SH_008",
    position: 103,
    japanese: "両手絞 / Ryote-jime",
    namePt: "Estrangulamento com duas mãos",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "-RHC4V7TQiY",
    videoUrl: "https://www.youtube.com/watch?v=-RHC4V7TQiY"
  },
  {
    id: "SH_009",
    position: 104,
    japanese: "袖車絞 / Sode-guruma-jime",
    namePt: "Estrangulamento na manga (Ezequiel)",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "E3nvQzClcAU",
    videoUrl: "https://www.youtube.com/watch?v=E3nvQzClcAU"
  },
  {
    id: "SH_010",
    position: 105,
    japanese: "突込絞 / Tsukkomi-jime",
    namePt: "Estrangulamento empurrando",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "dKKpnD3eLcY",
    videoUrl: "https://www.youtube.com/watch?v=dKKpnD3eLcY"
  },
  {
    id: "SH_011",
    position: 106,
    japanese: "三角絞 / Sankaku-jime",
    namePt: "Estrangulamento em triângulo",
    category: "Shime-waza",
    group: "Katame-waza",
    videoId: "lq1CUBRAm7s",
    videoUrl: "https://www.youtube.com/watch?v=lq1CUBRAm7s"
  },
  {
    id: "SH_012",
    position: 107,
    japanese: "胴絞 / Do-jime",
    namePt: "Tesoura no tronco (Proibida)",
    category: "Shime-waza",
    group: "Katame-waza",
    gokyoGroup: "Kinshi-waza (Proibida)",
    videoId: "D_0fFcoIbvY",
    videoUrl: "https://www.youtube.com/watch?v=D_0fFcoIbvY"
  },

  // KANSETSU-WAZA
  {
    id: "KA_001",
    position: 109,
    japanese: "腕緘 / Ude-garami",
    namePt: "Chave de braço dobrado (Americana/Kimura)",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "AIlTvZb4RlE",
    videoUrl: "https://www.youtube.com/watch?v=AIlTvZb4RlE"
  },
  {
    id: "KA_002",
    position: 110,
    japanese: "腕挫十字固 / Ude-hishigi-juji-gatame",
    namePt: "Chave de braço em cruz (Arm-lock)",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "OWgSOlCuMXw",
    videoUrl: "https://www.youtube.com/watch?v=OWgSOlCuMXw"
  },
  {
    id: "KA_003",
    position: 111,
    japanese: "腕挫腕固 / Ude-hishigi-ude-gatame",
    namePt: "Chave de braço estendido",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "SBf0aTma1VI",
    videoUrl: "https://www.youtube.com/watch?v=SBf0aTma1VI"
  },
  {
    id: "KA_004",
    position: 112,
    japanese: "腕挫膝固 / Ude-hishigi-hiza-gatame",
    namePt: "Chave de braço com o joelho",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "H2HtAJdiJcE",
    videoUrl: "https://www.youtube.com/watch?v=H2HtAJdiJcE"
  },
  {
    id: "KA_005",
    position: 113,
    japanese: "腕挫腋固 / Ude-hishigi-waki-gatame",
    namePt: "Chave de braço com a axila",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "8F5p1zuJRG0",
    videoUrl: "https://www.youtube.com/watch?v=8F5p1zuJRG0"
  },
  {
    id: "KA_006",
    position: 114,
    japanese: "腕挫腹固 / Ude-hishigi-hara-gatame",
    namePt: "Chave de braço com o abdômen",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "ZzEycg8R_9M",
    videoUrl: "https://www.youtube.com/watch?v=ZzEycg8R_9M"
  },
  {
    id: "KA_007",
    position: 115,
    japanese: "腕挫脚固 / Ude-hishigi-ashi-gatame",
    namePt: "Chave de braço com a perna",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "ClY7g_pX-4s",
    videoUrl: "https://www.youtube.com/watch?v=ClY7g_pX-4s"
  },
  {
    id: "KA_008",
    position: 116,
    japanese: "腕挫手固 / Ude-hishigi-te-gatame",
    namePt: "Chave de braço com a mão",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "6DnvhY0tQVM",
    videoUrl: "https://www.youtube.com/watch?v=6DnvhY0tQVM"
  },
  {
    id: "KA_009",
    position: 117,
    japanese: "腕挫三角固 / Ude-hishigi-sankaku-gatame",
    namePt: "Chave de braço em triângulo",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    videoId: "WefAmW4azhk",
    videoUrl: "https://www.youtube.com/watch?v=WefAmW4azhk"
  },
  {
    id: "KA_010",
    position: 118,
    japanese: "足緘 / Ashi-garami",
    namePt: "Chave de perna enrolada (Proibida)",
    category: "Kansetsu-waza",
    group: "Katame-waza",
    gokyoGroup: "Kinshi-waza (Proibida)",
    videoId: "BWWb0GoAtZw",
    videoUrl: "https://www.youtube.com/watch?v=BWWb0GoAtZw"
  },

  // ESTUDOS COMPARATIVOS
  {
    id: "CP_001",
    position: 120,
    japanese: "浮落 & 隅落 / Uki-otoshi & Sumi-otoshi",
    namePt: "Diferenças: Queda flutuante & Queda no canto",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "gl51XpJyit8",
    videoUrl: "https://www.youtube.com/watch?v=gl51XpJyit8"
  },
  {
    id: "CP_002",
    position: 121,
    japanese: "掬投 & 帯落 / Sukui-nage & Obi-otoshi",
    namePt: "Diferenças: Projeção em colher & Derrubo pela faixa",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "B18U2SHhQ-s",
    videoUrl: "https://www.youtube.com/watch?v=B18U2SHhQ-s"
  },
  {
    id: "CP_003",
    position: 122,
    japanese: "朽木倒 & 踵返 / Kuchiki-taoshi & Kibisu-gaeshi",
    namePt: "Diferenças: Derrubo da árvore morta & Contra-ataque no calcanhar",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "wZdGRez4ZRA",
    videoUrl: "https://www.youtube.com/watch?v=wZdGRez4ZRA"
  },
  {
    id: "CP_004",
    position: 123,
    japanese: "掬投 & 朽木倒 / Sukui-nage & Kuchiki-taoshi",
    namePt: "Diferenças: Projeção em colher & Derrubo da árvore morta",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "zEmRLNpS2j8",
    videoUrl: "https://www.youtube.com/watch?v=zEmRLNpS2j8"
  },
  {
    id: "CP_005",
    position: 124,
    japanese: "浮腰 & 大腰 / Uki-goshi & O-goshi",
    namePt: "Diferenças: Quadril flutuante & Grande projeção de quadril",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "yRyLMRW14Ug",
    videoUrl: "https://www.youtube.com/watch?v=yRyLMRW14Ug"
  },
  {
    id: "CP_006",
    position: 125,
    japanese: "大腰 & 釣腰 / O-goshi & Tsuri-goshi",
    namePt: "Diferenças: Grande projeção de quadril & Levantando pela faixa",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "dyKXrAQpJx8",
    videoUrl: "https://www.youtube.com/watch?v=dyKXrAQpJx8"
  },
  {
    id: "CP_007",
    position: 126,
    japanese: "出足払 & 送足払 / De-ashi-harai & Okuri-ashi-harai",
    namePt: "Diferenças: Pé avançado & Dois pés em movimento",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "vLY_vhlLh0I",
    videoUrl: "https://www.youtube.com/watch?v=vLY_vhlLh0I"
  },
  {
    id: "CP_008",
    position: 127,
    japanese: "出足払 & 小外刈 / De-ashi-harai & Ko-soto-gari",
    namePt: "Diferenças: Varredura de pé avançado & Pequena ceifada externa",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "ZnnHko8sIQ4",
    videoUrl: "https://www.youtube.com/watch?v=ZnnHko8sIQ4"
  },
  {
    id: "CP_009",
    position: 128,
    japanese: "膝車 & 支釣込足 / Hiza-guruma & Sasae-tsurikomi-ashi",
    namePt: "Diferenças: Roda no joelho & Bloqueio no tornozelo puxando",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "d2vcFAJu_98",
    videoUrl: "https://www.youtube.com/watch?v=d2vcFAJu_98"
  },
  {
    id: "CP_010",
    position: 129,
    japanese: "支釣込足 & 払釣込足 / Sasae-tsurikomi-ashi & Harai-tsurikomi-ashi",
    namePt: "Diferenças: Bloqueio do tornozelo & Varredura do pé puxando",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "zcJg_7cLHSI",
    videoUrl: "https://www.youtube.com/watch?v=zcJg_7cLHSI"
  },
  {
    id: "CP_011",
    position: 130,
    japanese: "払釣込足 & 送足払 / Harai-tsurikomi-ashi & Okuri-ashi-harai",
    namePt: "Diferenças: Varredura puxando & Dois pés em movimento",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "IAtDLZrs_NQ",
    videoUrl: "https://www.youtube.com/watch?v=IAtDLZrs_NQ"
  },
  {
    id: "CP_012",
    position: 131,
    japanese: "小外刈 & 小外掛 / Ko-soto-gari & Ko-soto-gake",
    namePt: "Diferenças: Pequena ceifada externa & Pequeno gancho externo",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "0ldrPORA-IQ",
    videoUrl: "https://www.youtube.com/watch?v=0ldrPORA-IQ"
  },
  {
    id: "CP_013",
    position: 132,
    japanese: "大外刈 & 大外落 & 大外車 / O-soto-gari & O-soto-otoshi & O-soto-guruma",
    namePt: "Diferenças: Grande ceifada & Derrubo & Roda externa",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "g3xPwcNEt5A",
    videoUrl: "https://www.youtube.com/watch?v=g3xPwcNEt5A"
  },
  {
    id: "CP_014",
    position: 133,
    japanese: "足車 & 大車 & 払腰 / Ashi-guruma & O-guruma & Harai-goshi",
    namePt: "Diferenças: Roda pela perna & Grande roda & Varredura de quadril",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "ZObJalOB23U",
    videoUrl: "https://www.youtube.com/watch?v=ZObJalOB23U"
  },
  {
    id: "CP_015",
    position: 134,
    japanese: "隅返 & 引込返 / Sumi-gaeshi & Hikikomi-gaeshi",
    namePt: "Diferenças: Contra-ataque no canto & Pegando faixa pelas costas",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "RDIJVm-7tro",
    videoUrl: "https://www.youtube.com/watch?v=RDIJVm-7tro"
  },
  {
    id: "CP_016",
    position: 135,
    japanese: "浮技 & 横落 & 谷落 / Uki-waza & Yoko-otoshi & Tani-otoshi",
    namePt: "Diferenças: Flutuante lateral & Queda lateral & Queda no vale",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "87iWl7KvAEQ",
    videoUrl: "https://www.youtube.com/watch?v=87iWl7KvAEQ"
  },
  {
    id: "CP_017",
    position: 136,
    japanese: "浮技 & 横分 / Uki-waza & Yoko-wakare",
    namePt: "Diferenças: Técnica flutuante & Separação lateral",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "vpr8A08Eixw",
    videoUrl: "https://www.youtube.com/watch?v=vpr8A08Eixw"
  },
  {
    id: "CP_018",
    position: 137,
    japanese: "横車 & 抱分 / Yoko-guruma & Daki-wakare",
    namePt: "Diferenças: Roda lateral & Abraçando na separação",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "I8Xn3Sz-R7A",
    videoUrl: "https://www.youtube.com/watch?v=I8Xn3Sz-R7A"
  },
  {
    id: "CP_019",
    position: 138,
    japanese: "外巻込 & 内巻込 / Soto-makikomi & Uchi-makikomi",
    namePt: "Diferenças: Enrolamento externo & Enrolamento interno",
    category: "Comparativos",
    group: "Comparativo",
    videoId: "ydqHuJWp1LY",
    videoUrl: "https://www.youtube.com/watch?v=ydqHuJWp1LY"
  }
];
