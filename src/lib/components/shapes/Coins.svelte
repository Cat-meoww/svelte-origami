<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity, InstancedMesh, Instance } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import Coinitem from './CoinItem.svelte';

	interactivity();
	const scale = spring(1);
	let groupRef: THREE.Group;
	
	useTask((delta) => {
		if (groupRef) {
			groupRef.rotation.z -= 0.01;
		}
	});

	
	onMount(() => {});

	const radius = 3;
	const count = 8;
</script>

<T.Group>
	<T.Group scale={0.6} on:create={({ ref }) => (groupRef = ref)}>
		<InstancedMesh>
			<T.CylinderGeometry args={[1, 1, 0.1, 64]} />
			<Material />
			{#each Array.from({ length: 8 }) as _, index}
				<Coinitem
					rotation={[0, 0, (index * 2 * Math.PI) / count]}
					position={[
						radius * Math.cos((index * 2 * Math.PI) / count + Math.PI / 4),
						radius * Math.sin((index * 2 * Math.PI) / count + Math.PI / 4),
						0
					]}
				></Coinitem>
			{/each}
		</InstancedMesh>
	</T.Group>
</T.Group>
