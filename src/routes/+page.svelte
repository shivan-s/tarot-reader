<script lang="ts">
	const handleSubmit = (e: Event & { currentTarget: HTMLFormElement }) => {
		const formData = new FormData(e.currentTarget);
		const data: Record<string, unknown> = {};

		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		console.log(data);
	};
</script>

<h1>Tarot Card Reader</h1>
<form on:submit|preventDefault={handleSubmit}>
	<label>
		<strong>Question</strong>
		<input type="text" id="question" />
	</label>
	<label>
		Number of cards:
		<select id="cardNumber">
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
		</select>
	</label>
	<button aria-label="submit" type="submit">Submit</button>
</form>
