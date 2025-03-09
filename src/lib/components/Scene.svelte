<script lang="ts">
  import { 
    T, 
    useTask, 
    useThrelte 
  } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import CameraControls from './CameraControls'
  import type CC from 'camera-controls'
  import MarchingCubes from './MarchingCubes.svelte'
  import TestTube from './TestTube.svelte'
  import Office from './Office.svelte'
  import ProjectShowcase from './ProjectShowcase.svelte';
  import Resume from './Resume.svelte'
	import { PerspectiveCamera, Vector3 } from 'three';
  import { browser } from '$app/environment'
  import { onDestroy, onMount } from 'svelte'
  import { Spring } from 'svelte/motion'
  
  const { dom, invalidate } = useThrelte()
  const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000)
  let controls: CC;

  let cameraDist = 40;
  let cameraHeight = 5;

  onMount(() => {
    if (browser) {
      controls = new CameraControls(dom, camera)
      controls.enabled = false 
    }
  })

  useTask((delta) => {
    if (controls.update(delta)) {
      invalidate()
    }
  })

  let { currentPage } = $props<{
    currentPage: string
  }>();

  // Camera Controls
  $effect(() => {
    if (dom && !controls) {
      controls = new CameraControls(dom, camera);
      controls.setLookAt(50, 20, 50, 0, 0, 0, false);
    }
  });

  // Camera position
  $effect(() => { 
    if (controls && currentPage) {
      let angle = 0;
      switch(currentPage){
        case "About":
          angle = 0;
          break;
        case "Projects":
          angle = Math.PI / 2;
          break;
        case "Contact":
          angle = Math.PI;
          break;
        case "Resume":
          angle = -Math.PI / 2;
          break;
      }
      
      const x = Math.sin(angle) * cameraDist;
      const z = Math.cos(angle) * cameraDist;
      
      controls.setLookAt(
        x,
        cameraHeight,
        z,
        0, 0, 0,
        true
      );
    }
  });
 

  // Cleanup
  $effect(() => {
    return () => {
      controls?.dispose();
    }
  });

</script>

<!-- Camera setup -->
<T 
  is={camera} 
  makeDefault
/>

<!-- Lighting -->
<T.AmbientLight intensity={.1} />
<T.DirectionalLight
  position={[-10, 5, -10]}
  intensity={.5}
/>
<T.DirectionalLight
  position={[10, 5, 10]}
  intensity={.5}
/>


<Grid
  cellColor="#000000"
  sectionColor="#000000"
  sectionThickness={1.5}
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

<!-- Resume Cube -->
<Resume />