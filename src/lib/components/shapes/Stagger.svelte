<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import Material from '$lib/components/Material.svelte';
	import { RoundedBoxGeometry } from '@threlte/extras';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';
	useTask(() => {});
	let refList: THREE.Mesh[] = [];
	const setRefs = ({ ref }: { ref: THREE.Mesh }) => {
		if (ref && !refList.includes(ref)) {
			refList.push(ref);
		}
	};

	onMount(() => {
		if (refList.length === 0) return;

		gsap.to(
			refList.map((i) => i.rotation),
			{
				y: `+=${Math.PI / 2}`,
				repeat: -1,
				ease: 'back',
				stagger: {
					each: 0.1
				},
				duration: 1
			}
		);
	});
</script>

<T.Group scale={3} rotation={[Math.PI / 10, Math.PI / 4, 0]}>
	{#each Array.from({ length: 5 }) as _, index}
		<T.Mesh position={[0, (index - 1) * 0.1, 0]} on:create={setRefs}>
			<RoundedBoxGeometry args={[1, 0.1, 1]} radius={0.02} />
			<Material />
		</T.Mesh>
	{/each}
</T.Group>
