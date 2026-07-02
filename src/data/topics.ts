import type { LanguageCode } from '../types';

export interface TopicCategory {
  easy: string[];
  medium: string[];
  hard: string[];
}

export interface LanguageTopics {
  casual: TopicCategory;
  work: TopicCategory;
}

export const TOPICS: Record<LanguageCode, LanguageTopics> = {
  en: {
    casual: {
      easy: [
        "Talk about a food you think is overrated.",
        "Describe your ideal Sunday.",
        "Convince us that taking a nap is productive.",
        "What is a minor inconvenience that ruins your entire day?",
        "Explain why your favorite movie deserves an Oscar, even if it's trash.",
        "If you had to survive a zombie apocalypse with only the items in your current room, what's your strategy?"
      ],
      medium: [
        "Defend the idea that pigeons are underrated city planners.",
        "Explain your personality using a supermarket aisle.",
        "Pitch a holiday for people who hate relaxing.",
        "Make a passionate case for why Comic Sans is actually a great font.",
        "If you were a ghost, who would you haunt first and what's your signature move?",
        "Explain the plot of a famous fairy tale as if it were a true crime podcast."
      ],
      hard: [
        "Explain capitalism using a cucumber, a group chat, and a broken printer.",
        "Give a TED Talk on why elevators need emotional support music.",
        "Defend the business case for wearing sunglasses indoors.",
        "Explain the internet to a medieval peasant who just got hit by a cart.",
        "Pitch a startup that sells customized excuses for running late.",
        "Convince a jury that you didn't steal the cookie, it was a victim of quantum teleportation."
      ]
    },
    work: {
      easy: [
        "Introduce yourself in 60 seconds.",
        "Explain what you do to someone outside your industry.",
        "Tell us about a project you are proud of.",
        "Describe your communication style in three words.",
        "How do you define success in your current role?",
        "What is one professional skill you are actively working to improve?"
      ],
      medium: [
        "Tell me about a time you handled uncertainty.",
        "Pitch your current project to a potential collaborator.",
        "Explain a difficult decision you made and what you learned.",
        "How do you deliver constructive feedback to someone who gets defensive?",
        "Describe a time you had to align a team with conflicting goals.",
        "Tell me about a time a project failed despite your best efforts. What was the post-mortem?"
      ],
      hard: [
        "An investor says your market is too small. Respond clearly.",
        "Defend a strategic decision that failed.",
        "Give a structured answer to: should this company expand internationally?",
        "Your co-founder wants to pivot the business completely, but you disagree. How do you resolve this?",
        "Explain how you would navigate a sudden 50% cut to your project budget.",
        "Pitch a traditional, outdated industry to a modern venture capitalist."
      ]
    }
  },
  cn: {
    casual: {
      easy: [
        "谈谈你认为被高估的一种食物。",
        "描述你心目中完美的一个周日。",
        "说服我们：午睡也是有生产力的。",
        "分享一件让你抓狂的无伤大雅的小事。",
        "为什么你应该多买书而少看书？",
        "如果只能带三样东西去荒岛，你会带什么，为什么？"
      ],
      medium: [
        "论证一下：鸽子其实是被低估的城市规划师。",
        "用超市里的某一个货架来描述你的个性。",
        "为那些讨厌放松的人设计一个假期。",
        "为‘表情包’写一首赞美诗，说明它如何拯救了人类的沟通成本。",
        "如果你的宠物能开口说话，它对你的第一句评价会是什么？",
        "用悬疑侦探片的语气，讲述一次你找钥匙或者找手机的经历。"
      ],
      hard: [
        "试用一根黄瓜、一个微信群和一台坏掉的打印机来解释资本主义。",
        "发表一场TED演讲：为什么电梯需要提供情绪价值的背景音乐。",
        "如何从商业逻辑上，论证在室内戴墨镜的合理性。",
        "向一位刚从宋代穿越过来的文人解释什么是‘双十一’或‘朋友圈’。",
        "如果要把‘拖延症’包装成一个高端的健康生活方式，你会怎么向大众推销？",
        "在法庭上为自己辩护：你没有偷吃冰箱里最后一块蛋糕，它是被量子力学消融了。"
      ]
    },
    work: {
      easy: [
        "进行一个60秒的自我介绍。",
        "用最通俗的话向行业外的人解释你的工作。",
        "分享一个让你感到自豪的项目经历。",
        "用三个词形容你的沟通与协作风格。",
        "你是如何定义自己在工作中的价值的？",
        "分享一个你最近正在学习或提升的职业技能。"
      ],
      medium: [
        "分享一次你面对不确定性（或危机）时的应对经历。",
        "向一位潜在的合作伙伴推介你目前正在做的项目。",
        "分享你做过的一个艰难决定，以及你从中收获了什么。",
        "面对容易防备和敏感的下属或同事，你如何给出建设性的反馈？",
        "描述一次你协调团队内部利益冲突、达成共识的经历。",
        "分享一次项目失败的经历，并说明你的复盘结论是什么。"
      ],
      hard: [
        "投资人质疑你的市场规模太小，你该如何有力且清晰地回应？",
        "为你主导但最终失败的一项战略决策进行合理辩护。",
        "请条理清晰地回答：我们公司现在是否应该启动国际化战略？",
        "如果你的合伙人坚持要对业务进行大转型，而你强烈反对，你会如何推动决策？",
        "如果你的项目预算突然被砍掉了一半，你将如何重新规划以确保核心目标达成？",
        "如何将一个传统的‘夕阳行业’包装出高成长性，并成功说服风险投资人？"
      ]
    }
  },
  fr: {
    casual: {
      easy: [
        "Parlez d'un plat que vous trouvez particulièrement surcoté.",
        "Décrivez votre dimanche idéal.",
        "Convainquez-nous que faire la sieste est un acte de productivité.",
        "Quel est le petit désagrément du quotidien qui peut gâcher toute votre journée ?",
        "Pourquoi devrions-nous tous arrêter de culpabiliser de ne rien faire ?",
        "Si vous deviez survivre à une apocalypse zombie avec seulement les objets dans cette pièce, quelle serait votre stratégie ?"
      ],
      medium: [
        "Défendez l'idée que les pigeons sont des urbanistes sous-estimés.",
        "Expliquez votre personnalité en utilisant un rayon de supermarché.",
        "Proposez un concept de vacances pour les personnes qui détestent se détendre.",
        "Faites un plaidoyer passionné pour prouver que la police 'Comic Sans' est géniale.",
        "Si vous étiez un fantôme, qui hanteriez-vous en premier et quelle serait votre signature ?",
        "Racontez l'histoire du Petit Chaperon Rouge comme s'il s'agissait d'un podcast d'affaires criminelles."
      ],
      hard: [
        "Expliquez le capitalisme en utilisant un concombre, un groupe de discussion et une imprimante en panne.",
        "Donnez une conférence TED sur l'importance d'installer des musiques de soutien émotionnel dans les ascenseurs.",
        "Défendez l'intérêt commercial et stratégique de porter des lunettes de soleil en intérieur.",
        "Expliquez le concept d'Internet à un paysan du Moyen Âge qui vient de se faire renverser par une charrette.",
        "Pitcher une startup qui vend des excuses sur-mesure pour justifier vos retards.",
        "Convainquez un jury que vous n'avez pas volé ce cookie : il s'agit d'une disparition due à la téléportation quantique."
      ]
    },
    work: {
      easy: [
        "Présentez-vous en 60 secondes.",
        "Expliquez votre métier à quelqu'un qui n'y connaît absolument rien.",
        "Parlez d'un projet ou d'une réalisation dont vous êtes particulièrement fier.",
        "Décrivez votre style de communication professionnelle en trois mots.",
        "Comment définissez-vous la réussite dans votre poste actuel ?",
        "Quelle est la compétence professionnelle que vous cherchez activement à améliorer en ce moment ?"
      ],
      medium: [
        "Racontez une situation où vous avez dû gérer une forte incertitude.",
        "Pitcher votre projet actuel à un collaborateur potentiel pour le convaincre de vous rejoindre.",
        "Expliquez une décision difficile que vous avez prise et la leçon que vous en avez tirée.",
        "Comment donnez-vous un feedback constructif à un collègue qui a tendance à se mettre sur la défensive ?",
        "Décrivez comment vous avez réussi à aligner des membres d'une équipe aux objectifs contradictoires.",
        "Parlez d'un projet qui a échoué malgré vos efforts. Quel a été votre retour d'expérience (post-mortem) ?"
      ],
      hard: [
        "Un investisseur affirme que votre marché est trop petit. Répondez de manière percutante.",
        "Défendez une décision stratégique qui s'est soldée par un échec.",
        "Répondez de manière structurée : cette entreprise doit-elle s'étendre à l'international ?",
        "Votre associé souhaite pivoter complètement l'activité, mais vous n'êtes pas d'accord. Comment gérez-vous ce conflit ?",
        "Comment réagiriez-vous face à une réduction soudaine de 50 % du budget de votre projet ?",
        "Présentez une industrie traditionnelle et vieillissante à un fonds de capital-risque moderne."
      ]
    }
  },
  es: {
    casual: {
      easy: [
        "Habla sobre una comida que creas que está muy sobrevalorada.",
        "Describe tu domingo ideal.",
        "Convéncenos de que tomar una siesta es una actividad productiva.",
        "Menciona un pequeño inconveniente diario que arruine por completo tu humor.",
        "Defiende tu derecho a tener un pasatiempo absurdo o inútil.",
        "Si tuvieras que sobrevivir a un apocalipsis zombie con lo que tienes en esta habitación, ¿cuál es tu plan?"
      ],
      medium: [
        "Defiende la idea de que las palomas son planificadoras urbanas incomprendidas.",
        "Explica tu personalidad usando un pasillo de supermercado.",
        "Diseña unas vacaciones perfectas para personas que odian relajarse.",
        "Haz una defensa apasionada de por qué la tipografía 'Comic Sans' es arte puro.",
        "Si fueras un fantasma, ¿a quién asustarías primero y cuál sería tu truco estrella?",
        "Cuenta el argumento de un cuento infantil clásico como si fuera un reportaje policial de suspenso."
      ],
      hard: [
        "Explica el capitalismo usando un pepino, un grupo de WhatsApp y una impresora rota.",
        "Da una charla TED sobre por qué los ascensores necesitan música de apoyo emocional.",
        "Defiende la viabilidad comercial de llevar gafas de sol en interiores.",
        "Explícale qué es el Wi-Fi o las redes sociales a un campesino del siglo XII que acaba de caerse de su carreta.",
        "Presenta una startup que venda excusas creativas y personalizadas para llegar tarde.",
        "Convence a un jurado de que no te comiste la última rebanada de pastel: fue un caso de teleportación cuántica espontánea."
      ]
    },
    work: {
      easy: [
        "Preséntate en 60 segundos.",
        "Explica a qué te dedicas como si se lo contaras a un niño de 8 años.",
        "Háblanos de un proyecto profesional del que te sientas especialmente orgulloso.",
        "Describe tu estilo de comunicación en el trabajo usando tres palabras.",
        "¿Cómo mides el éxito en tu rol profesional actual?",
        "¿Qué habilidad profesional estás intentando desarrollar o mejorar este trimestre?"
      ],
      medium: [
        "Cuéntanos una experiencia en la que hayas tenido que gestionar una gran incertidumbre.",
        "Presenta tu proyecto actual a un posible colaborador para convencerle de unirse.",
        "Explica una decisión difícil que hayas tomado en tu carrera y qué aprendiste de ella.",
        "¿Cómo le das feedback constructivo a un compañero de equipo que suele ponerse a la defensiva?",
        "Describe una ocasión en la que tuviste que alinear a un equipo con objetivos o intereses en conflicto.",
        "Cuéntanos sobre un proyecto que fracasó a pesar de tus esfuerzos. ¿Cuál fue el análisis posterior (post-mortem)?"
      ],
      hard: [
        "Un inversor te dice que tu mercado potencial es demasiado pequeño. Responde de forma clara y contundente.",
        "Defiende una decisión estratégica propia que resultó en un fracaso comercial.",
        "Responde de forma estructurada: ¿debería nuestra empresa expandirse internacionalmente en este momento?",
        "Tu socio fundador quiere pivotar todo el modelo de negocio, pero tú no estás de acuerdo. ¿Cómo resuelves la situación?",
        "¿Cómo gestionarías una reducción repentina del 50 % en el presupuesto de tu proyecto principal?",
        "Presenta una propuesta para digitalizar y modernizar una industria tradicional ante un grupo de capital de riesgo de tecnología."
      ]
    }
  }
};
