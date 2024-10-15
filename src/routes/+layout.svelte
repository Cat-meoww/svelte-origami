<script>
	import '../app.css';
	import Hero from '$lib/components/Hero.svelte';
</script>

<div class="min-h-screen text-white bg-[#0c0c0c] select-none background">
	<div class="container p-5 pb-20 mx-auto">
		<Hero></Hero>
		<slot />
	</div>
</div>
