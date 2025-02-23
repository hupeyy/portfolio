<script lang="ts">
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  // Store automatically loads the model
  const gltf = useGltf('/models/office_desk/scene.gltf')
  
  export let scale = 3;
  export let position: [number, number, number] = [0, 0, -35];
</script>

{#if $gltf}
  <T 
    is={$gltf.scene} 
    scale={scale}
    rotation={[0, -Math.PI / 2, 0]}
    position={position}
  />
{/if}
