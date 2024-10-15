<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';

	let ref1: THREE.Mesh;
	let ref2: THREE.Mesh;
	let groupRef: THREE.Group;
	useTask(() => {});
	onMount(() => {
		if (!ref1 || !ref2 || !groupRef) return;

		gsap
			.timeline({
				defaults: {
					ease: 'elastic',
					repeat: -1
				}
			})
			.to(ref1.position, {
				keyframes: [
					{
						x: -1.5,
						duration: 2
					},
					{
						x: 1.5,
						duration: 2
					}
				],
				repeat: -1
			})
			.to(
				ref2.position,
				{
					keyframes: [
						{
							x: 1.5,
							duration: 2
						},
						{
							x: -1.5,
							duration: 2
						}
					],
					repeat: -1
				},

				0
			)
			.to(
				groupRef.rotation,
				{
					z: `${Math.PI}`,
					duration: 4
				},
				0
			);
	});
</script>

<T.Group on:create={({ ref }) => (groupRef = ref)}>
	<T.Mesh
		position={[1.5, 1, 0]}
		rotation={[Math.PI / 2, 0, 0]}
		on:create={({ ref }) => (ref1 = ref)}
	>
		<T.CylinderGeometry args={[0.5, 0.5]}></T.CylinderGeometry>
		<Material />
	</T.Mesh>

	<T.Mesh>
		<T.BoxGeometry args={[4, 0.4, 1]}></T.BoxGeometry>
		<Material />
	</T.Mesh>

	<T.Mesh
		position={[-1.5, -1, 0]}
		rotation={[Math.PI / 2, 0, 0]}
		on:create={({ ref }) => (ref2 = ref)}
	>
		<T.CylinderGeometry args={[0.5, 0.5]}></T.CylinderGeometry>
		<Material />
	</T.Mesh>
</T.Group>
