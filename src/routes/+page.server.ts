import type { Actions, PageServerLoad } from './$types';
import { cards } from '../data/tarot-images.json';
import { shuffleCards } from '../utils';
import { z } from 'zod';
import openaiCompletion from '../data/lib/openai';
import type { TarotReading } from '../types';

let tarotReading: TarotReading | undefined = undefined;

export const load = (async () => {
	return { tarotReading };
}) satisfies PageServerLoad;

const formSchema = z.object({
	question: z
		.string({ required_error: 'Please provide a question.' })
		.min(3, { message: 'Question must be greater than 3 characters.' })
		.max(500, { message: 'Question must be less than 500 characters.' })
		.trim(),
	numberCards: z.coerce
		.number({ required_error: 'Please provide a number of cards to draw.' })
		.min(1)
		.max(7)
});

export const actions = {
	reading: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = formSchema.parse(formData);
			console.log(result);
			const id = crypto.randomUUID();
			const { question } = result;
			let { numberCards } = result;

			numberCards = Math.min(7, Math.max(1, Number(numberCards)));

			shuffleCards(cards);
			const selectedCards = cards.slice(0, numberCards);

			const answer =
				(await openaiCompletion(
					`How do these tarot cards, ${selectedCards
						.map((card) => card.name)
						.join(', ')} relate to my question, "${question}"`
				)) || 'No answer.';

			tarotReading = {
				id,
				question,
				answer,
				numberCards,
				selectedCards
			};

			return { success: true, question, numberCards, errors: null };
		} catch (err) {
			console.error(err);
			const { fieldErrors: errors } = err.flatten();
			const { question, numberCards } = formData;
			return {
				success: false,
				question: String(question || ''),
				numberCard: String(numberCards || ''),
				errors
			};
		}
	}
} satisfies Actions;
