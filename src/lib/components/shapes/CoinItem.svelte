<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { Instance } from '@threlte/extras';
    
	export let count = 8;

	let groupRef: THREE.Group;

	useTask((delta) => {
		if (groupRef) {
			groupRef.rotation.x += 0.01;
			groupRef.rotation.y += 0.01;
			groupRef.rotation.z += 0.01;
		}
	});
</script>

<T.Group {...$$restProps}>
	<T.Group on:create={({ ref }) => (groupRef = ref)} rotation={[0, Math.PI / count, Math.PI / 2]}>
		<Instance />
	</T.Group>
</T.Group>
