<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Environment, Grid } from '@threlte/extras'
  import MarchingCubes from './MarchingCubes.svelte'
  import TestTube from './TestTube.svelte'
  import Office from './Office.svelte'
  import ProjectShowcase from './ProjectShowcase.svelte';
  
  // Camera props
  export let cameraPosition: [number, number, number] = [50, 20, 50]; 
</script>

<!-- Camera setup -->
<T.PerspectiveCamera
  makeDefault
  position={cameraPosition}
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


<Grid
  cellColor="#000000"
  sectionColor="#000000"
  sectionThickness={1}
  gridSize={100}
/>

<!-- Marching Cubes -->
<MarchingCubes />

<!-- Test Tube -->
<TestTube />

<!-- Office -->
<Office />

<!-- Column -->
<ProjectShowcase />