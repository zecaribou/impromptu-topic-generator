import { enTopics } from './en';

// Copy enTopics and override with existing translated topics
export const frTopics = JSON.parse(JSON.stringify(enTopics));

// Everyday - Easy overrides
frTopics.everyday.easy[0] = { text: "Parlez d'un plat que vous trouvez particulièrement surcoté.", type: "Opinions" };
frTopics.everyday.easy[1] = { text: "Décrivez votre dimanche idéal.", type: "Conversation" };
frTopics.everyday.easy[2] = { text: "Convainquez-nous que faire la sieste est un acte de productivité.", type: "Explain It Simply" };
frTopics.everyday.easy[3] = { text: "Quel est le petit désagrément du quotidien qui peut gâcher toute votre journée ?", type: "Personal Stories" };
frTopics.everyday.easy[4] = { text: "Pourquoi devrions-nous tous arrêter de culpabiliser de ne rien faire ?", type: "Opinions" };
frTopics.everyday.easy[5] = { text: "Si vous deviez survivre à une apocalypse zombie avec seulement les objets dans cette pièce, quelle serait votre stratégie ?", type: "Conversation" };

// Everyday - Medium overrides
frTopics.everyday.medium[0] = { text: "Défendez l'idée que les pigeons sont des urbanistes sous-estimés.", type: "Defend a Bad Idea" };
frTopics.everyday.medium[1] = { text: "Expliquez votre personnalité en utilisant un rayon de supermarché.", type: "Creative Scenario" };
frTopics.everyday.medium[2] = { text: "Proposez un concept de vacances pour les personnes qui détestent se détendre.", type: "Creative Scenario" };
frTopics.everyday.medium[3] = { text: "Faites un plaidoyer passionné pour prouver que la police 'Comic Sans' est géniale.", type: "Explain It Simply" };
frTopics.everyday.medium[4] = { text: "Si vous étiez un fantôme, qui hanteriez-vous en premier et quelle serait votre signature ?", type: "Personal Stories" };
frTopics.everyday.medium[5] = { text: "Racontez l'histoire du Petit Chaperon Rouge comme s'il s'agissait d'un podcast d'affaires criminelles.", type: "Personal Stories" };

// Everyday - Hard overrides
frTopics.everyday.hard[0] = { text: "Expliquez le capitalisme en utilisant un concombre, un groupe de discussion et une imprimante en panne.", type: "Explain It Simply" };
frTopics.everyday.hard[1] = { text: "Donnez une conférence TED sur l'importance d'installer des musiques de soutien émotionnel dans les ascenseurs.", type: "Defend a Bad Idea" };
frTopics.everyday.hard[2] = { text: "Défendez l'intérêt commercial et stratégique de porter des lunettes de soleil en intérieur.", type: "Defend a Bad Idea" };
frTopics.everyday.hard[3] = { text: "Expliquez le concept d'Internet à un paysan du Moyen Âge qui vient de se faire renverser par une charrette.", type: "Explain It Simply" };
frTopics.everyday.hard[4] = { text: "Pitcher une startup qui vend des excuses sur-mesure pour justifier vos retards.", type: "Persuade" };
frTopics.everyday.hard[5] = { text: "Convainquez un jury que vous n'avez pas volé ce cookie : il s'agit d'une disparition due à la téléportation quantique.", type: "Creative Scenario" };

// Work - Easy overrides
frTopics.work.easy[0] = { text: "Présentez-vous en 60 secondes.", type: "Interview" };
frTopics.work.easy[1] = { text: "Expliquez votre métier à quelqu'un qui n'y connaît absolument rien.", type: "Interview" };
frTopics.work.easy[2] = { text: "Parlez d'un projet ou d'une réalisation dont vous êtes particulièrement fier.", type: "Interview" };
frTopics.work.easy[3] = { text: "Décrivez votre style de communication professionnelle en trois mots.", type: "Interview" };
frTopics.work.easy[4] = { text: "Comment définissez-vous la réussite dans votre poste actuel ?", type: "Interview" };
frTopics.work.easy[5] = { text: "Quelle est la compétence professionnelle que vous cherchez activement à améliorer en ce moment ?", type: "Interview" };

// Work - Medium overrides
frTopics.work.medium[0] = { text: "Racontez une situation où vous avez dû gérer une forte incertitude.", type: "Interview" };
frTopics.work.medium[1] = { text: "Pitcher votre projet actuel à un collaborateur potentiel pour le convaincre de vous rejoindre.", type: "Pitching" };
frTopics.work.medium[2] = { text: "Expliquez une décision difficile que vous avez prise et la leçon que vous en avez tirée.", type: "Interview" };
frTopics.work.medium[3] = { text: "Comment donnez-vous un feedback constructif à un collègue qui a tendance à se mettre sur la défensive ?", type: "Leadership" };
frTopics.work.medium[4] = { text: "Décrivez comment vous avez réussi à aligner des membres d'une équipe aux objectifs contradictoires.", type: "Leadership" };
frTopics.work.medium[5] = { text: "Parlez d'un projet qui a échoué malgré vos efforts. Quel a été votre retour d'expérience (post-mortem) ?", type: "Interview" };

// Work - Hard overrides
frTopics.work.hard[0] = { text: "Un investisseur affirme que votre marché est trop petit. Répondez de manière percutante.", type: "Pitching" };
frTopics.work.hard[1] = { text: "Défendez une décision stratégique qui s'est soldée par un échec.", type: "Leadership" };
frTopics.work.hard[2] = { text: "Répondez de manière structurée : cette entreprise doit-elle s'étendre à l'international ?", type: "Presentations" };
frTopics.work.hard[3] = { text: "Votre associé souhaite pivoter complètement l'activité, mais vous n'êtes pas d'accord. Comment gérez-vous ce conflit ?", type: "Leadership" };
frTopics.work.hard[4] = { text: "Comment réagiriez-vous face à une réduction soudaine de 50 % du budget de votre projet ?", type: "Leadership" };
frTopics.work.hard[5] = { text: "Présentez une industrie traditionnelle et vieillissante à un fonds de capital-risque moderne.", type: "Pitching" };
