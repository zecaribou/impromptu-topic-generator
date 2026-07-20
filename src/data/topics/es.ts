import { enTopics } from './en';

// Copy enTopics and override with existing translated topics
export const esTopics = JSON.parse(JSON.stringify(enTopics));

// Everyday - Easy overrides
esTopics.everyday.easy[0] = { text: "Habla sobre una comida que creas que está muy sobrevalorada.", type: "Opinions" };
esTopics.everyday.easy[1] = { text: "Describe tu domingo ideal.", type: "Conversation" };
esTopics.everyday.easy[2] = { text: "Convéncenos de que tomar una siesta es una actividad productiva.", type: "Explain It Simply" };
esTopics.everyday.easy[3] = { text: "Menciona un pequeño inconveniente diario que arruine por completo tu humor.", type: "Personal Stories" };
esTopics.everyday.easy[4] = { text: "Defiende tu derecho a tener un pasatiempo absurdo o inútil.", type: "Opinions" };
esTopics.everyday.easy[5] = { text: "Si tuvieras que sobrevivir a un apocalipsis zombie con lo que tienes en esta habitación, ¿cuál es tu plan?", type: "Conversation" };

// Everyday - Medium overrides
esTopics.everyday.medium[0] = { text: "Defiende la idea de que las palomas son planificadoras urbanas incomprendidas.", type: "Defend a Bad Idea" };
esTopics.everyday.medium[1] = { text: "Explica tu personalidad usando un pasillo de supermercado.", type: "Creative Scenario" };
esTopics.everyday.medium[2] = { text: "Diseña unas vacaciones perfectas para personas que odian relajarse.", type: "Creative Scenario" };
esTopics.everyday.medium[3] = { text: "Haz una defensa apasionada de por qué la tipografía 'Comic Sans' es arte puro.", type: "Explain It Simply" };
esTopics.everyday.medium[4] = { text: "Si fueras un fantasma, ¿a quién asustarías primero y cuál sería tu truco estrella?", type: "Personal Stories" };
esTopics.everyday.medium[5] = { text: "Cuenta el argumento de un cuento infantil clásico como si fuera un reportaje policial de suspenso.", type: "Personal Stories" };

// Everyday - Hard overrides
esTopics.everyday.hard[0] = { text: "Explica el capitalismo usando un pepino, un grupo de WhatsApp y una impresora rota.", type: "Explain It Simply" };
esTopics.everyday.hard[1] = { text: "Da una charla TED sobre por qué los ascensores necesitan música de apoyo emocional.", type: "Defend a Bad Idea" };
esTopics.everyday.hard[2] = { text: "Defiende la viabilidad comercial de llevar gafas de sol en interiores.", type: "Defend a Bad Idea" };
esTopics.everyday.hard[3] = { text: "Explícale qué es el Wi-Fi o las redes sociales a un campesino del siglo XII que acaba de caerse de su carreta.", type: "Explain It Simply" };
esTopics.everyday.hard[4] = { text: "Presenta una startup que venda excusas creativas y personalizadas para llegar tarde.", type: "Persuade" };
esTopics.everyday.hard[5] = { text: "Convence a un jurado de que no te comiste la última rebanada de pastel: fue un caso de teleportación cuántica espontánea.", type: "Creative Scenario" };

// Work - Easy overrides
esTopics.work.easy[0] = { text: "Preséntate en 60 segundos.", type: "Interview" };
esTopics.work.easy[1] = { text: "Explica a qué te dedicas como si se lo contaras a un niño de 8 años.", type: "Interview" };
esTopics.work.easy[2] = { text: "Háblanos de un proyecto profesional del que te sientas especialmente orgulloso.", type: "Interview" };
esTopics.work.easy[3] = { text: "Describe tu estilo de comunicación en el trabajo usando tres palabras.", type: "Interview" };
esTopics.work.easy[4] = { text: "¿Cómo mides el éxito en tu rol profesional actual?", type: "Interview" };
esTopics.work.easy[5] = { text: "¿Qué habilidad profesional estás intentando desarrollar o mejorar este trimestre?", type: "Interview" };

// Work - Medium overrides
esTopics.work.medium[0] = { text: "Cuéntanos una experiencia en la que hayas tenido que gestionar una gran incertidumbre.", type: "Interview" };
esTopics.work.medium[1] = { text: "Presenta tu proyecto actual a un posible colaborador para convencerle de unirse.", type: "Pitching" };
esTopics.work.medium[2] = { text: "Explica una decisión difícil que hayas tomado en tu carrera y qué aprendiste de ella.", type: "Interview" };
esTopics.work.medium[3] = { text: "¿Cómo le das feedback constructivo a un compañero de equipo que suele ponerse a la defensiva?", type: "Leadership" };
esTopics.work.medium[4] = { text: "Describe una ocasión en la que tuviste que alinear a un equipo con objetivos o intereses en conflicto.", type: "Meetings" };
esTopics.work.medium[5] = { text: "Cuéntanos sobre un proyecto que fracasó a pesar de tus esfuerzos. ¿Cuál fue el análisis posterior (post-mortem)?", type: "Interview" };

// Work - Hard overrides
esTopics.work.hard[0] = { text: "Un inversor te dice que tu mercado potencial es demasiado pequeño. Responde de forma clara y contundente.", type: "Pitching" };
esTopics.work.hard[1] = { text: "Defiende una decisión estratégica propia que resultó en un fracaso comercial.", type: "Leadership" };
esTopics.work.hard[2] = { text: "Responde de forma estructurada: ¿debería nuestra empresa expandirse internacionalmente en este momento?", type: "Presentations" };
esTopics.work.hard[3] = { text: "Tu socio fundador quiere pivotar todo el modelo de negocio, pero tú no estás de acuerdo. ¿Cómo resuelves la situación?", type: "Leadership" };
esTopics.work.hard[4] = { text: "¿Cómo gestionarías una reducción repentina del 50 % en el presupuesto de tu proyecto principal?", type: "Leadership" };
esTopics.work.hard[5] = { text: "Presenta una propuesta para digitalizar y modernizar una industria tradicional ante un grupo de capital de riesgo de tecnología.", type: "Pitching" };
