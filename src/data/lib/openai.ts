import { OPENAI_KEY, OPENAI_MODEL } from '$env/static/private';

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/completions';

export default async function openaiCompletion(prompt: string): Promise<string | undefined> {
  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: 1024,
      prompt
    })
  });
  const data = JSON.parse(await response.text());
  return data.choices[0].text;
}
