<script lang="ts">
  import { T } from '@threlte/core';
  import { Text3DGeometry, interactivity } from '@threlte/extras';
	import { onMount } from 'svelte';

  let smallDevice = false;
  const breakpoint = 1024;
  let position: [number, number, number] = [20, 0, -6];
  onMount(() => {
    if (window.innerWidth <= breakpoint) {
      smallDevice = true;
    } else {
      smallDevice = false;
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= breakpoint) {
        smallDevice = true;
      } else {
        smallDevice = false;
      }
    });

    if (smallDevice) {
      position = [-15, 0, -6];
    } else {
      position = [-20, 0, -6];
    }
  })

  interactivity();

  function handleClick() {
    window.open('/resume/WilhelmAHuper_Resume.pdf', '_blank');
  }
</script>

<T.Mesh
  position={position}
  scale={0.01}
  rotation={[0, -Math.PI / 2, 0]}
  onclick={handleClick}
>
  <Text3DGeometry
    text="click me for resume"
  />
  <T.MeshStandardMaterial color="#FD3F00" />
</T.Mesh>
