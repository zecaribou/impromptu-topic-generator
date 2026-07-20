import { enTopics } from './en';

// Copy enTopics and override with existing translated topics
export const cnTopics = JSON.parse(JSON.stringify(enTopics));

// Everyday - Easy overrides
cnTopics.everyday.easy[0] = { text: "谈谈你认为被高估的一种食物。", type: "Opinions" };
cnTopics.everyday.easy[1] = { text: "描述你心目中完美的一个周日。", type: "Conversation" };
cnTopics.everyday.easy[2] = { text: "说服我们：午睡也是有生产力的。", type: "Explain It Simply" };
cnTopics.everyday.easy[3] = { text: "分享一件让你抓狂的无伤大雅的小事。", type: "Personal Stories" };
cnTopics.everyday.easy[4] = { text: "为什么你应该多买书而少看书？", type: "Opinions" };
cnTopics.everyday.easy[5] = { text: "如果只能带三样东西去荒岛，你会带什么，为什么？", type: "Conversation" };

// Everyday - Medium overrides
cnTopics.everyday.medium[0] = { text: "论证一下：鸽子其实是被低估的城市规划师。", type: "Defend a Bad Idea" };
cnTopics.everyday.medium[1] = { text: "用超市里的某一个货架来描述你的个性。", type: "Creative Scenario" };
cnTopics.everyday.medium[2] = { text: "为那些讨厌放松的人设计一个假期。", type: "Creative Scenario" };
cnTopics.everyday.medium[3] = { text: "为‘表情包’写一首赞美诗，说明它如何拯救了人类的沟通成本。", type: "Explain It Simply" };
cnTopics.everyday.medium[4] = { text: "如果你的宠物能开口说话，它对你的第一句评价会是什么？", type: "Personal Stories" };
cnTopics.everyday.medium[5] = { text: "用悬疑侦探片的语气，讲述一次你找钥匙或者找手机的经历。", type: "Personal Stories" };

// Everyday - Hard overrides
cnTopics.everyday.hard[0] = { text: "试用一根黄瓜、一个微信群和一台坏掉的打印机来解释资本主义。", type: "Explain It Simply" };
cnTopics.everyday.hard[1] = { text: "发表一场TED演讲：为什么电梯需要提供情绪价值的背景音乐。", type: "Defend a Bad Idea" };
cnTopics.everyday.hard[2] = { text: "如何从商业逻辑上，论证在室内戴墨镜的合理性。", type: "Defend a Bad Idea" };
cnTopics.everyday.hard[3] = { text: "向一位刚从宋代穿越过来的文人解释什么是‘双十一’或‘朋友圈’。", type: "Explain It Simply" };
cnTopics.everyday.hard[4] = { text: "如果要把‘拖延症’包装成一个高端的健康生活方式，你会怎么向大众推销？", type: "Persuade" };
cnTopics.everyday.hard[5] = { text: "在法庭上为自己辩护：你没有偷吃冰箱里最后一块蛋糕，它是被量子力学消融了。", type: "Creative Scenario" };

// Work - Easy overrides
cnTopics.work.easy[0] = { text: "进行一个60秒的自我介绍。", type: "Interview" };
cnTopics.work.easy[1] = { text: "用最通俗的话向行业外的人解释你的工作。", type: "Interview" };
cnTopics.work.easy[2] = { text: "分享一个让你感到自豪的项目经历。", type: "Interview" };
cnTopics.work.easy[3] = { text: "用三个词形容你的沟通与协作风格。", type: "Interview" };
cnTopics.work.easy[4] = { text: "你是如何定义自己在工作中的价值的？", type: "Interview" };
cnTopics.work.easy[5] = { text: "分享一个你最近正在学习或提升的职业技能。", type: "Interview" };

// Work - Medium overrides
cnTopics.work.medium[0] = { text: "分享一次你面对不确定性（或危机）时的应对经历。", type: "Interview" };
cnTopics.work.medium[1] = { text: "向一位潜在的合作伙伴推介你目前正在做的项目。", type: "Pitching" };
cnTopics.work.medium[2] = { text: "分享你做过的一个艰难决定，以及你从中收获了什么。", type: "Interview" };
cnTopics.work.medium[3] = { text: "面对容易防备和敏感的下属或同事，你如何给出建设性的反馈？", type: "Leadership" };
cnTopics.work.medium[4] = { text: "描述一次你协调团队内部利益冲突、达成共识的经历。", type: "Meetings" };
cnTopics.work.medium[5] = { text: "分享一次项目失败的经历，并说明你的复盘结论是什么。", type: "Interview" };

// Work - Hard overrides
cnTopics.work.hard[0] = { text: "投资人质疑你的市场规模太小，你该如何有力且清晰地回应？", type: "Pitching" };
cnTopics.work.hard[1] = { text: "为你主导但最终失败的一项战略决策进行合理辩护。", type: "Leadership" };
cnTopics.work.hard[2] = { text: "请条理清晰地回答：我们公司现在是否应该启动国际化战略？", type: "Presentations" };
cnTopics.work.hard[3] = { text: "如果你的合伙人坚持要对业务进行大转型，而你强烈反对，你会如何推动决策？", type: "Leadership" };
cnTopics.work.hard[4] = { text: "如果你的项目预算突然被砍掉了一半，你将如何重新规划以确保核心目标达成？", type: "Leadership" };
cnTopics.work.hard[5] = { text: "如何将一个传统的‘夕阳行业’包装出高成长性，并成功说服风险投资人？", type: "Pitching" };
