<script lang="ts">
	export let name: string;
	export let element: HTMLDivElement;
</script>

<div class="relative rounded-md cursor-pointer bg-white/10 card p-[1px]" bind:this={element}>
	<div class="flex z-[2] bg-[#171717] aspect-square relative rounded-t-md">
		<slot />
	</div>

	<div
		class="relative z-20 flex items-center mt-[1px] justify-between w-full px-4 py-2 bg-[#171717] rounded-b-md"
	>
		<span class="w-1 h-1 rounded-full bg-white/20"></span>
		<span class="">{name}</span>
		<span class="w-1 h-1 rounded-full bg-white/20"></span>
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md opacity-0 group-hover:opacity-100 z-1"
		style:background={`radial-gradient(400px circle at var(--mouse-x) var(--mouse-y),rgba(255, 255, 255, 0.3),transparent 40%)`}
	></div>
</div>
