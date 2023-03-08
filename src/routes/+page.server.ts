import type { Actions, PageServerLoad } from './$types';

interface TarotReading {
  id: string;
  question: string;
  answer: string;
  numberCards: number;
  cards?: unknown[];
}

const tarotReadings: TarotReading[] = [];

export const load = (async () => {
  return { tarotReadings };
}) satisfies PageServerLoad;

export const actions = {
  reading: async ({ request }) => {
    const formData = await request.formData();

    const id = crypto.randomUUID();
    const question = String(formData.get('question') || '');
    const answer = question;
    let numberCards = formData.get('numberCards') || 1;

    numberCards = Math.min(7, Math.max(1, Number(numberCards)));

    const tarotReading: TarotReading = {
      id,
      question,
      answer,
      numberCards
    };

    tarotReadings.push(tarotReading);
    return { question, numberCards };
  }
} satisfies Actions;
