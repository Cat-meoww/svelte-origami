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

	function rotate(a: number) {
		const s = Math.sin(a);
		const c = Math.cos(a);
		return new THREE.Matrix3().set(c, -s, 0, s, c, 0, 0, 0, 1);
	}
	const clock = {
		frames: 0
	};
	useTask((delta) => {
		clock.frames += 0.01;
		if (refList.length === 0) return;

		const time = clock.frames;


		const angle = Math.sin(time * 4);
		const angle1 = Math.min(0, angle * 0.5);
		const angle5 = Math.max(0, angle * 0.5);

		const positions = [
			{
				sphere: refList[0],
				vector: new THREE.Vector3(-4, -4, 0),
				angle: angle1
			},
			{
				sphere: refList[1],
				vector: new THREE.Vector3(-2, -4, 0),
				angle: (angle + angle1) * 0.05
			},
			{
				sphere: refList[2],
				vector: new THREE.Vector3(0, -4, 0),
				angle: angle5 * 0.05
			},
			{
				sphere: refList[3],
				vector: new THREE.Vector3(2, -4, 0),
				angle: (angle + angle5) * 0.05
			},
			{
				sphere: refList[4],
				vector: new THREE.Vector3(4, -4, 0),
				angle: angle5
			}
		];

		positions.forEach(({ sphere, vector, angle }) => {
			const rang = rotate(angle);
			const newPosition = vector.applyMatrix3(rang);
			newPosition.y += 3;
			sphere.position.copy(newPosition);
		});
	});
	// onMount(() => {});
</script>

<Align scale={0.44}>
	<InstancedMesh>
		<T.SphereGeometry args={[1, 32, 32]}></T.SphereGeometry>
		<Material side={THREE.DoubleSide} />

		{#each Array.from({ length: 5 }) as _, index}
			<T.InstancedMesh on:create={setRefs} position={[(index - 2) * 2, 0, 0]}>
				<Instance />
			</T.InstancedMesh>
		{/each}
	</InstancedMesh>
</Align>
