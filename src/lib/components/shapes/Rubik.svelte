<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { InstancedMesh, Instance } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';

	// interactivity();
	const scale = spring(1);
	let groupRef: THREE.Group;

	let firstLayerRef: THREE.Group;
	let secondLayerRef: THREE.Group;
	let thirdLayerRef: THREE.Group;

	let blockSize = 1;
	let gap = 0.1;
	let distance = blockSize + gap;

	$: layers = derivedLayers(distance);

	function derivedLayers(distance: number) {
		const layer1 = [];
		const layer2 = [];
		const layer3 = [];

		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				for (let z = -1; z <= 1; z++) {
					if (z === -1) {
						layer1.push(new THREE.Vector3(x * distance, y * distance, z * distance));
					} else if (z === 0) {
						layer2.push(new THREE.Vector3(x * distance, y * distance, z * distance));
					} else {
						layer3.push(new THREE.Vector3(x * distance, y * distance, z * distance));
					}
				}
			}
		}

		return [layer1, layer2, layer3];
	}

	// useTask((delta) => {
	// 	if (groupRef) {
	// 		groupRef.rotation.z -= 0.01;
	// 	}
	// });

	onMount(() => {
		if (firstLayerRef && secondLayerRef && thirdLayerRef && groupRef) {
			gsap
				.timeline({
					repeat: -1
				})
				.to(firstLayerRef.rotation, {
					z: Math.PI,
					duration: 1.5
				})
				.to(
					secondLayerRef.rotation,
					{
						z: Math.PI,
						duration: 1.5,
						delay: 0.15
					},
					'<'
				)
				.to(
					thirdLayerRef.rotation,
					{
						z: Math.PI,
						duration: 1.5,
						delay: 0.25
					},
					'<'
				)
				.to(
					groupRef.rotation,
					{
						y: Math.PI * 2,
						duration: 1.75
					},
					0
				);
		}
	});
</script>

<T.Group>
	<T.Group rotation={[0, 0, Math.PI / 8]} scale={1.2}>
		<T.Group rotation={[0, Math.PI / 2, 0]} scale={0.6} on:create={({ ref }) => (groupRef = ref)}>
			<InstancedMesh>
				<T.BoxGeometry args={[1, 1, 1]} />
				<Material />
				<T.Group on:create={({ ref }) => (firstLayerRef = ref)}>
					{#each layers[0] as item}
						<Instance position.x={item.x} position.y={item.y} position.z={item.z} />
					{/each}
				</T.Group>
				<T.Group on:create={({ ref }) => (secondLayerRef = ref)}>
					{#each layers[1] as item}
						<Instance position.x={item.x} position.y={item.y} position.z={item.z} />
					{/each}
				</T.Group>
				<T.Group on:create={({ ref }) => (thirdLayerRef = ref)}>
					{#each layers[2] as item}
						<Instance position.x={item.x} position.y={item.y} position.z={item.z} />
					{/each}
				</T.Group>
			</InstancedMesh>
		</T.Group>
	</T.Group>
</T.Group>
