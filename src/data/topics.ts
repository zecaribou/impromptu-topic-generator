import type { LanguageCode } from '../types';
import { enTopics } from './topics/en';
import { cnTopics } from './topics/cn';
import { esTopics } from './topics/es';
import { frTopics } from './topics/fr';

export interface Topic {
  text: string;
  type: string;
}

export interface TopicCategory {
  easy: Topic[];
  medium: Topic[];
  hard: Topic[];
}

export interface LanguageTopics {
  everyday: TopicCategory;
  work: TopicCategory;
  challenge: TopicCategory;
}

export const TOPICS: Record<LanguageCode, LanguageTopics> = {
  en: enTopics,
  cn: cnTopics,
  es: esTopics,
  fr: frTopics
};
