<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';

	// interactivity();

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});

	let ring1Ref: THREE.Mesh;
	let ring2Ref: THREE.Mesh;
	let cone1Ref: THREE.Mesh;
	let cone2Ref: THREE.Mesh;
	let groupRef: THREE.Group;

	// $: console.log(refList);
	onMount(() => {
		console.log(ring1Ref, ring2Ref, cone1Ref, cone2Ref, groupRef);
		if (ring1Ref && ring2Ref && cone1Ref && cone2Ref && groupRef) {
			console.log('gsap');
			gsap
				.timeline({
					repeat: -1
				})
				.to(
					ring1Ref.rotation,
					{
						z: `+=${Math.PI * 2}`,
						x: `+=${Math.PI * 2}`,

						duration: 4,
						ease: 'none'
					},
					0
				)
				.to(
					ring2Ref.rotation,
					{
						z: `-=${Math.PI * 2}`,
						x: `-=${Math.PI * 2}`,

						ease: 'none',
						duration: 4
					},
					0
				)
				.to(
					groupRef.rotation,
					{
						y: Math.PI * 2,
						duration: 4,
						ease: 'none'
					},
					0
				);
		}
	});
</script>

<T.Group on:create={({ ref }) => (groupRef = ref)}>
	<T.Mesh on:create={({ ref }) => (ring1Ref = ref)}>
		<T.TorusGeometry args={[2.1, 0.1]} />
		<Material />
	</T.Mesh>
	<T.Mesh on:create={({ ref }) => (ring2Ref = ref)} rotation={[Math.PI / 2, 0, 0]}>
		<T.TorusGeometry args={[1.8, 0.1]} />
		<Material />
	</T.Mesh>
	<T.Group scale={0.8}>
		<T.Mesh position={[0, 1, 0]} rotation={[0, 0, 0]} on:create={({ ref }) => (cone1Ref = ref)}>
			<T.ConeGeometry args={[1, 1.41, 4]} />
			<Material />
		</T.Mesh>
		<T.Mesh
			position={[0, -1, 0]}
			rotation={[-Math.PI, 0, 0]}
			on:create={({ ref }) => (cone2Ref = ref)}
		>
			<T.ConeGeometry args={[1, 1.41, 4]} />
			<Material />
		</T.Mesh>
	</T.Group>
</T.Group>
