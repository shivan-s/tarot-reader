import { cards } from '../data/tarot-images.json';

export type TCards = typeof cards;

interface TarotReading {
	id: string;
	question: string;
	answer: string;
	numberCards: number;
	selectedCards: TCards;
}
