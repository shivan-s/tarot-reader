<script lang="ts">
	import type { cards } from '../data/tarot-images.json';

	export let card: (typeof cards)[0];
</script>

<div class="card bg-base-200 shadow-xl hover:bg-base-300 hover:shadow-2xl hover:shadow-grey-500">
	<figure class="px-5">
		<img src={`/cards/${card.img}`} alt={card.name} />
	</figure>
	<div class="card-body">
		<h5 class="card-title">{card.name}</h5>
		<label for="my-modal-4" class="btn">Read more</label>
		<input type="checkbox" id="my-modal-4" class="modal-toggle" />
		<label for="my-modal-4" class="modal cursor-pointer">
			<label class="modal-box relative max-5xl:" for="">
				<div class="flex flex-wrap">
					<h2 class="text-lg font-bold">{card.name}</h2>
					<figure class="px-5 pt-5">
						<img src={`/cards/${card.img}`} alt={card.name} />
					</figure>
					<div class="flex flex-col">
						<p>{card['Mythical/Spiritual']}</p>
						<ul>
							<strong>Fortune telling</strong>
							{#each card.fortune_telling as fortune_telling}
								<li>{fortune_telling}</li>
							{/each}
						</ul>
						<ul>
							<strong>Questions to ask</strong>
							{#each card['Questions to Ask'] as question}
								<li>{question}</li>
							{/each}
						</ul>
					</div>
				</div>
			</label>
		</label>
	</div>
</div>
