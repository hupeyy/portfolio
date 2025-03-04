<script lang="ts">
  import { 
    T, 
    useTask, 
    useThrelte 
  } from '@threlte/core'
  import { 
    OrbitControls,
    Environment, 
    Grid,
  } from '@threlte/extras'
  import CameraControls from './CameraControls'
  import type CC from 'camera-controls'
  import MarchingCubes from './MarchingCubes.svelte'
  import TestTube from './TestTube.svelte'
  import Office from './Office.svelte'
  import ProjectShowcase from './ProjectShowcase.svelte';
  import Resume from './Resume.svelte'
	import { PerspectiveCamera } from 'three';
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  
  const { dom, invalidate } = useThrelte()
  const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000)
  let controls: CC;

  onMount(() => {
    if (browser) {
      controls = new CameraControls(dom, camera) 
    }

    // controls.addEventListener('update', () => {
    //   console.log(camera.position)
    // })
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

  let cameraDist = 40;
  let cameraHeight = 5;
  // Camera position
  $effect(() => { 
      if (controls && currentPage) {
        switch(currentPage){
          case "About":
            controls.setLookAt(0, cameraHeight, cameraDist, 0, 0, 0, true);
            break;
          case "Projects":
            controls.setLookAt(cameraDist, cameraHeight, 0, 0, 0, 0, true);
            break;
          case "Contact":
            controls.setLookAt(0, cameraHeight, -cameraDist, 0, 0, 0, true);
            break;
          case "Resume":
            controls.setLookAt(-cameraDist, cameraHeight, 0, 0, 0, 0, true);
            break;
        }
      }
  });

  useTask((delta) => {
    if (controls?.update(delta)) {
      invalidate();
    }
  }, { autoInvalidate: false });

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
<T.AmbientLight 
  intensity={.1}
/>
<T.DirectionalLight
  position={[-20, 10, 0]}
  intensity={1}
  
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