<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	export let data: PageServerData;

	export let form: ActionData;

	const { tarotReadings } = data;

	console.log(tarotReadings);
</script>

<h1>Tarot Card Reader</h1>
<form
	method="POST"
	action="?/reading"
	use:enhance={async ({ form }) => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				form.reset();
			}
			if (result.type === 'error') {
				await applyAction(result);
			}
			update();
		};
	}}
>
	<label>
		<strong>Question</strong>
		<textarea value={form?.question ?? ''} rows="3" name="question" />
	</label>
	<label>
		Number of cards:
		<select value={form?.numberCards ?? 1} name="numberCards">
			<option selected>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
			<option>6</option>
			<option>7</option>
		</select>
	</label>
	<button>Submit</button>
</form>

{#each tarotReadings as tarotReading}
	<p>{tarotReading.question}</p>
	<p>{tarotReading.numberCards}</p>
{/each}
