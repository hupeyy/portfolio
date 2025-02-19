<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Environment } from '@threlte/extras'
  import MarchingCubes from './MarchingCubes.svelte'
  import { onMount } from 'svelte';
  
  // Your reactive props
  export let materialType = 'shiny';
  export let numBlobs = 10;
  export let resolution = 28;
  export let isolation = 80;
  export let floor = true;
  export let wallx = true;
  export let wallz = true;
  export let speed = 1;
</script>

<!-- Camera setup -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 1000]}
  aspect={window.innerWidth / window.innerHeight}
  fov={45}
  near={1}
  far={10000}
>
  <OrbitControls />
</T.PerspectiveCamera>

<!-- Lighting -->
<T.AmbientLight intensity={3} color="#323232" />
<T.DirectionalLight intensity={3} position={[0.5, 0.5, 1]} />
<T.PointLight intensity={3} position={[0, 0, 100]} color="#ff7c00" />

<!-- Marching Cubes -->
<MarchingCubes
  {materialType}
  {numBlobs}
  {resolution}
  {isolation}
  {floor}
  {wallx}
  {wallz}
  {speed}
/>