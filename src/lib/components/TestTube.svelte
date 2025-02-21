<script lang="ts">
    import * as THREE from 'three';
    import { T, useTask } from '@threlte/core';

		let rotation = 0;

		let time = 0;
		const frequency = 1.5;
		const amplitude = .75; 
		let positionY = 6;

		useTask((delta) => {
			rotation += delta * .5;
		})

		useTask((delta) => {
			time += delta;
			positionY = Math.sin(time * frequency) * amplitude + 4.5;
		})

		export let positionX = 5;
		export let positionZ = 15;
		export let scale = 1;


</script>

<!-- Tube Top -->
<T.Mesh
	position={[positionX, 8, positionZ]}
	scale={[scale, scale, scale]}
>
	<T.CylinderGeometry
		args={[4, 4, 1, 32]}
	/>
	<T.MeshStandardMaterial
		color="#353535"
	/>
</T.Mesh>

<!-- Tube Bottom -->
<T.Mesh
	position={[positionX, .5, positionZ]}
	scale={[scale, scale, scale]}
>
	<T.CylinderGeometry
		args={[4, 4, 1, 32]}
	/>
	<T.MeshStandardMaterial
		color="#353535"
	/>
</T.Mesh>

<!-- Tube Middle -->
<T.Mesh
	position={[positionX, 4, positionZ]}
	scale={[scale, scale, scale]}
>
	<T.CylinderGeometry
		args={[3, 3, 7, 32]}
	/>
	<T.MeshStandardMaterial
		color="#b4cdd9"
		opacity={0.5}
		transparent
	/>
</T.Mesh>

<!-- Object Inside -->
<T.Mesh
	position={[positionX, positionY, positionZ]}
	scale={[scale, scale, scale]}
	rotation.y={rotation}
>
	<T.BoxGeometry
		args={[3, 3, 3]}
	/>
	<T.MeshStandardMaterial
		color="#b4cdd9"
	/>
</T.Mesh>

