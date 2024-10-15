<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import Material from '$lib/components/Material.svelte';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import gsap from 'gsap';
	class SemiCircleCurve extends THREE.Curve<THREE.Vector3> {
		scale: number;
		constructor(scale = 1) {
			super();
			this.scale = scale;
		}

		getPoint(t: number) {
			const radians = t * Math.PI;
			const x = Math.cos(radians) * this.scale;
			const y = Math.sin(radians) * this.scale;
			return new THREE.Vector3(x, y, 0);
		}
	}

	useTask(() => {});

	const path = new SemiCircleCurve(2);
	const path2 = new SemiCircleCurve(2.02);

	let ballRef: THREE.Mesh;
	let tubeRef: THREE.Mesh;
	let t = {
		current: 0
	};

	onMount(() => {
		if (!ballRef) return;
		if (!tubeRef) return;

		gsap
			.timeline({
				// repeat: -1
			})
			.to(t, {
				current: 2,
				duration: 1.5,
				ease: 'none',
				repeat: -1,
				onUpdate: () => {
					if (!ballRef) return;

					const point = path2.getPoint(t.current);
					ballRef.position.set(point.x, point.y, point.z);
				}
			})
			.to(
				tubeRef.rotation,
				{
					z: -Math.PI,
					ease: 'back.out',
					duration: 1.5,
					repeat: -1
				},
				0
			);
	});
</script>

<T.Group scale={0.8}>
	<T.Mesh position={[0, 2, 0]} on:create={({ ref }) => (ballRef = ref)}>
		<T.SphereGeometry args={[0.7]}></T.SphereGeometry>
		<Material />
	</T.Mesh>
	<T.Mesh rotation={[0, 0, Math.PI]} on:create={({ ref }) => (tubeRef = ref)}>
		<T.TubeGeometry args={[path, 20, 0.8, 8, false]}></T.TubeGeometry>
		<Material />
	</T.Mesh>
</T.Group>
