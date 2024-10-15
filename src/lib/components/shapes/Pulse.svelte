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

		refList.forEach((mesh, index) => {
			if (mesh) {
				gsap.to(mesh.scale, {
					x: 0.3,
					z: 0.3,
					delay: 0.25 * index,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut',
					duration: 1
				});
			}
		});
	});
</script>

<Align scale={0.8}>
	<T.Group rotation={[0, 0, Math.PI / 4]}>
		<T.Group rotation={[0, 0, Math.PI / 2]}>
			<InstancedMesh>
				<T.CylinderGeometry args={[1, 1, 0.2, 64]} />
				<Material side={THREE.DoubleSide} />

				{#each Array.from({ length: 10 }) as _, index}
					<T.InstancedMesh on:create={setRefs} position={[0, 0.5 * index, 2]}>
						<Instance />
					</T.InstancedMesh>
				{/each}
			</InstancedMesh>
		</T.Group>
	</T.Group>
</Align>
