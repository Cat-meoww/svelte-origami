<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
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

	const refList: THREE.Mesh[] = [];

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
					x: `-=${Math.PI * 2}`,
					duration: 1.5,
					stagger: {
						each: 0.15
					}
				}
			);
	});

	const setRefs = ({ ref }: { ref: THREE.Mesh }) => {
		if (ref && !refList.includes(ref)) {
			refList.push(ref);
		}
	};
</script>

<T.Group rotation={[0, 0, 0]}>
	{#each Array.from({ length: 4 }) as _, index}
		<T.Mesh on:create={setRefs}>
			<T.TorusGeometry args={[(index + 1) * 0.5, 0.1]} />
			<Material />
		</T.Mesh>
	{/each}
</T.Group>


<!-- <T.Mesh
	rotation.y={rotation}
	position.y={0}
	scale={$scale}
	on:pointerenter={() => scale.set(1.5)}
	on:pointerleave={() => scale.set(1)}
>
	
	<T.TorusGeometry args={[0.3, 0.1]} />-->
<!-- <T.BoxGeometry args={[1, 2, 1]} /> -->
<!-- <T.SphereGeometry args={[2, 32, 32]} /> -->
<!-- <T.MeshMatcapMaterial matcap={$texture} />
</T.Mesh> -->
