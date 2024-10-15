<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { InstancedMesh, Instance, Align } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';

	let refList: THREE.Mesh[] = [];
	const setRefs = ({ ref }: { ref: THREE.Mesh }) => {
		if (ref && !refList.includes(ref)) {
			refList.push(ref);
		}
	};

	onMount(() => {
		if (refList.length === 0) return;

		gsap
			.timeline({
				repeat: -1,

				repeatDelay: 0.5
			})

			.to(
				refList.map((item) => item.position),
				{
					x: (index) => {
						return `+=${Math.sin((index / 4) * 2 * Math.PI) * 0.5}`;
					},
					z: (index) => {
						return `+=${Math.cos((index / 4) * 2 * Math.PI) * 0.5}`;
					},
					duration: 1.5,
					ease: 'power1.out'
				}
			)
			.to(
				refList.map((item) => item.rotation),
				{
					z: `+=${Math.PI}`,
					duration: 2
				},
				0
			)
			.to(
				refList.map((item) => item.position),
				{
					x: 0,
					z: 0,
					duration: 1.5
				},
				1
			);
	});

	const geometry = () => {
		const shape = new THREE.Shape();

		// Outer arc
		shape.absarc(0, 0, 1, 0, Math.PI / 2, false);
		shape.lineTo(Math.cos(Math.PI / 2) * 0.5, Math.sin(Math.PI / 2) * 0.5);

		// Inner arc
		shape.absarc(0, 0, 0.2, Math.PI / 2, 0, true);
		shape.lineTo(1, 0);

		const extrudeSettings = {
			steps: 1,
			depth: 0.3,
			bevelEnabled: false
		};
		console.log(new THREE.ExtrudeGeometry(shape, extrudeSettings));

		return new THREE.ExtrudeGeometry(shape, extrudeSettings);
	};
	const piegro = geometry();
</script>

<Align scale={1.6}>
	<T.Group rotation={[Math.PI / 2, 0, 0]}>
		<T.Group>
			<InstancedMesh geometry={piegro}>
				<Material side={THREE.DoubleSide} />

				{#each Array.from({ length: 4 }) as _, index}
					<T.InstancedMesh on:create={setRefs} rotation={[0, (index * Math.PI) / 2, 0]}>
						<Instance rotation={[Math.PI / 2, 0, 0]} />
					</T.InstancedMesh>
				{/each}
			</InstancedMesh>
		</T.Group>
	</T.Group>
</Align>
