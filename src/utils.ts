import type { TCards } from './types';

/**
 * @param cards - Shuffle deck of cards
 */
export function shuffleCards(cards: TCards) {
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}
}
