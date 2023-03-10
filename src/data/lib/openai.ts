import { OPENAI_KEY, OPENAI_ORGANISATION, OPENAI_MODEL } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: OPENAI_KEY,
	organization: OPENAI_ORGANISATION
});

const openai = new OpenAIApi(configuration);

export default async function openaiCompletion(prompt: string): Promise<string | undefined> {
	const completion = await openai.createCompletion({
		model: OPENAI_MODEL || 'text-curie-001',
		max_tokens: 1024,
		prompt
	});
	try {
		const result = completion.data.choices[0].text;
		return result || '';
	} catch (err) {
		if (err.response) {
			console.error(err.response.status);
			console.error(err.response.data);
		} else {
			console.log(err.message);
		}
	}
}
