<script lang="ts">
	import '../app.css';
</script>

<div class="flex flex-col justify-around min-h-screen w-full">
	<div class="container prose mx-auto flex flex-col flex-grow">
		<slot />
	</div>
	<div class="footer footer-center p-4 bg-base-300 text-neutral-content">
		<div>Made by <a class="link link-accent" href="https://shivan.xyz">Shivan Sivakumaran</a></div>
		<div class="grid grid-flow-col gap-2">
			<a class="link" href="https://twitter.com/ShivSivakumaran">Twitter</a>
			<a class="link" href="https://github.com/shivan-s/tarotcard-reader">Source code</a>
		</div>
	</div>
</div>
