<script lang="ts">
	import { T } from '@threlte/core';
	import { useStore } from '$lib/store/storage';
	import { TextureLoader } from 'three';
	import { useLoader } from '@threlte/core';
	


	$: texture = useLoader(TextureLoader).load($useStore.texture);
	
</script>

{#if $texture}
	<T.MeshMatcapMaterial matcap={$texture}  {...$$restProps} />
{:else}
	<T.MeshBasicMaterial {...$$restProps} />
{/if}
