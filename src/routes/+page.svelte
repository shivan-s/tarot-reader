<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Loading from '../components/loading.svelte';
	import TarotCard from '../components/tarotCard.svelte';
	import type { PageServerData, ActionData } from './$types';
	import type { TarotReading } from '../types';
	/* import { goto } from '$app/navigation'; */

	const params = $page.url.searchParams;

	export let data: PageServerData;

	export let form: ActionData;

	let loading = false;

	let tarotReading: TarotReading | undefined;
	let base64String: string | undefined;

	$: {
		base64String = data.base64String;
		tarotReading = data.tarotReading;
		if (tarotReading && base64String) {
			params.set('read', base64String);
			/* TODO: fix the redirect */
			/* goto(`?${params.toString()}`); */
		}
	}

	if (params.has('read')) {
		const previousReadString = params.get('read') || '[]';
		try {
			tarotReading = JSON.parse(atob(previousReadString));
		} catch {
			console.error('Read is wrong format');
			tarotReading = undefined;
		}
	}
</script>

<h1 class="pt-6 text-center">Tarot Card Reader</h1>
<form
	class="flex flex-col gap-2"
	method="POST"
	action="?/reading"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<label class="flex flex-col label w-full">
		What would you like to ask the cards?
		<textarea
			class={`textarea textarea-bordered w-full ${form?.errors?.question ? 'textarea-error' : ''}`}
			rows="2"
			value={form?.question ?? ''}
			name="question"
			placeholder="e.g. What is the future of my love life?"
		/>
		{#if form?.errors?.question}
			<span class="text-sm text-red-500">{form?.errors?.question}</span>
		{/if}
	</label>
	<label class="flex flex-col label">
		How many cards to draw?
		<select class="select select-bordered" value={form?.numberCards ?? '1'} name="numberCards">
			<option selected value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
		</select>
		{#if form?.errors?.numberCards}
			<span class="text-sm text-red-500">{form?.errors?.numberCards}</span>
		{/if}
	</label>
	<button class="btn">Submit</button>
</form>

<div class="divider" />

{#if loading}
	<div class="flex flex-col items-center justify-center">
		<p>Asking the cards for a reading to your question...</p>
		<Loading />
		<p>* knock knock *</p>
	</div>
{/if}

{#if tarotReading}
	<div class="flex flex-col gap-2">
		<h3>Recent Reading</h3>
		<div class="flex flex-col gap-1">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				{#each tarotReading.selectedCards as card}
					<TarotCard {card} />
				{/each}
			</div>
			<div class="flex flex-col">
				<p>
					<strong>Question:</strong>
					{tarotReading.question}
				</p>
				<p>
					<strong>Answer:</strong>
					{tarotReading.answer}
				</p>
				<div class="divider" />
				<p>Copy the URL to share your read.</p>
			</div>
		</div>
	</div>
{/if}
