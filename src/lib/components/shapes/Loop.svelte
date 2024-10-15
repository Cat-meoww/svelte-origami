<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity, InstancedMesh, Instance } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';

	interactivity();
	const scale = spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});

	let groupRef: THREE.Group;
	const refList: THREE.Group[] = [];

	// $: console.log(refList);
	onMount(() => {
		if (refList.length === 0) return;
		gsap
			.timeline({
				repeat: -1,
				repeatDelay: 0.5
			})
			.to(
				refList.map((item) => item.rotation),
				{
					y: `+=${Math.PI * 2}`,
					repeat: -1,
					duration: 6,

					ease: 'none'
				}
			)
			.to(
				groupRef.rotation,
				{
					z: Math.PI * 2,
					duration: 24,
					ease: 'none',
					repeat: -1
				},
				0
			);
	});

	const setRefs = ({ ref }: { ref: THREE.Group }) => {
		if (ref && !refList.includes(ref)) {
			refList.push(ref);
		}
	};
	const radius = 3;
</script>

<!-- <T.Group rotation={[0, 0, 0]}>
	<T.Group rotation={[0, 0, 0]} scale={0.6} on:create={({ ref }) => (groupRef = ref)}>
		{#each Array.from({ length: 20 }) as _, index}
			<T.Mesh
				on:create={setRefs}
				rotation={[0, 0, (index / 20) * 2 * Math.PI]}
				position={[
					Math.cos((index / 20) * 2 * Math.PI) * radius,
					Math.sin((index / 20) * 2 * Math.PI) * radius,
					0
				]}
			>
				<T.BoxGeometry args={[1, 0.2, 1]} />
				<Material />
			</T.Mesh>
		{/each}
	</T.Group>
</T.Group> -->
<T.Group rotation={[0, 0, 0]}>
	<T.Group rotation={[0, 0, 0]} scale={0.6} on:create={({ ref }) => (groupRef = ref)}>
		<InstancedMesh>
			<T.BoxGeometry args={[1, 0.2, 1]} />
			<Material />
			{#each Array.from({ length: 20 }) as _, index}
				<T.Group
					rotation={[0, 0, (index / 20) * 2 * Math.PI]}
					position={[
						Math.cos((index / 20) * 2 * Math.PI) * radius,
						Math.sin((index / 20) * 2 * Math.PI) * radius,
						0
					]}
				>
					<Instance on:create={setRefs} />
				</T.Group>
			{/each}
		</InstancedMesh>
	</T.Group>
</T.Group>
