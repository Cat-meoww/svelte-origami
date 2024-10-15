<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { InstancedMesh, Instance, Align } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';

	let refList: THREE.Mesh[] = [];
	let groupRef: THREE.Group;
	const setRefs = ({ ref }: { ref: THREE.Mesh }) => {
		if (ref && !refList.includes(ref)) {
			refList.push(ref);
		}
	};

	const arrow = () => {
		const shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(1, 1);
		shape.lineTo(0.5, 1);
		shape.lineTo(0.5, 2);
		shape.lineTo(-0.5, 2);
		shape.lineTo(-0.5, 1);
		shape.lineTo(-1, 1);
		shape.lineTo(0, 0);

		const extrudeSettings = {
			depth: 0.5,
			bevelEnabled: false
		};

		return new THREE.ExtrudeGeometry(shape, extrudeSettings);
	};

	const arrows = [
		{ position: [0, 2, -0.25], rotation: [0, 0, 0] },
		{ position: [2, 0, -0.25], rotation: [0, 0, -Math.PI / 2] },
		{ position: [0, -2, -0.25], rotation: [0, 0, -Math.PI] },
		{ position: [-2, 0, -0.25], rotation: [0, 0, Math.PI / 2] }
	];

	onMount(() => {
		if (refList.length === 0 || !groupRef) return;

		gsap
			.timeline({})
			.from(
				refList.map((item) => item.rotation),
				{
					x: (index) => {
						return index === 1 ? Math.PI * 2 : index === 3 ? -Math.PI * 2 : 0;
					},
					y: (index) => {
						return index === 0 ? Math.PI * 2 : index === 2 ? -Math.PI * 2 : 0;
					},
					duration: 5,
					repeat: -1,
					ease: 'none'
				}
			)
			.to(
				groupRef.rotation,
				{
					z: Math.PI * 2,
					duration: 10,
					repeat: -1,
					ease: 'none'
				},
				0
			);
	});
</script>

<Align scale={0.7} on:create={({ ref }) => (groupRef = ref)}>
	<T.Mesh>
		<T.BoxGeometry></T.BoxGeometry>
		<Material />
	</T.Mesh>
	<InstancedMesh geometry={arrow()}>
		<Material />

		{#each arrows as item, index}
			<T.InstancedMesh
				on:create={setRefs}
				position={[item.position[0], item.position[1], item.position[2]]}
				rotation={[item.rotation[0], item.rotation[1], item.rotation[2]]}
			>
				<Instance />
			</T.InstancedMesh>
		{/each}
	</InstancedMesh>
</Align>
