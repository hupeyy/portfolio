<script lang="ts">
  import { GLTF, useTexture } from '@threlte/extras'
  
  const screenTexture = useTexture('textures/github-mark/github-mark.png');
  
  export let scale = 3;
  export let position: [number, number, number] = [0, 0, -35];
  
  function onLoaded(gltf) {
    // Find the monitor screen mesh
    gltf.scene.traverse((node) => {
      if (node.name === 'monitor_screen') {
        screenTexture.then(texture => {
          // Configure texture settings
          texture.flipY = false;
          texture.colorSpace = 'srgb'; 
          
          // Apply texture to the material
          node.material.map = texture;
          node.material.needsUpdate = true;
        });
      }
    });
  }
</script>

<GLTF 
  url="/models/office_desk/scene.gltf"
  scale={scale}
  rotation={[0, -Math.PI / 2, 0]}
  position={position}
  on:loaded={onLoaded}
/>
