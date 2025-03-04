<script lang="ts">
  import { T } from '@threlte/core';
  import { Text3DGeometry, interactivity } from '@threlte/extras';

  interactivity();

  function handleClick() {
    console.log("length of text 3d geometry", Text3DGeometry.length);
    window.open('/resume/WilhelmAHuper_Resume.pdf', '_blank');
  }
</script>

<T.Mesh
  position={[-20, 0, -6]}
  scale={0.01}
  rotation={[0, -Math.PI / 2, 0]}
  onclick={handleClick}
>
  <Text3DGeometry
    text="click me for resume"
  />
  <T.MeshStandardMaterial color="#FD3F00" />
</T.Mesh>
