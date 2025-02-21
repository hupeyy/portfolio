<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMeshes, useGltf } from '@threlte/extras'
  
  export let origin: [number, number, number] = [15, 0, -5]

  const gltf = useGltf('/models/doric_marble_column/scene.gltf')
  const numInstances = 4
  const columnPositions = Array.from({ length: numInstances }, (_, i) => ({
    x: origin[0] + 0,
    y: origin[1] + 0,
    z: origin[2] + (i * 3),
    scale: 2
  }))

  const projectPositions = Array.from({ length: numInstances }, (_, i) => ({
    x: origin[0] + 0,
    y: origin[1] + 5,
    z: origin[2] + (i * 3),
    scale: 2
  }))

</script>

<!-- Columns -->
{#if $gltf}
  <InstancedMeshes 
    meshes={$gltf.nodes}
    frustumCulled={false}
  >
    {#snippet children({ components })}
      {#each columnPositions as pos}
        <T.Group 
          position={[pos.x, pos.y, pos.z]}
          scale={pos.scale}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {#each Object.values(components) as Component}
            <Component />
          {/each}
        </T.Group>
      {/each}
    {/snippet}
  </InstancedMeshes>
{/if}


<!-- Objects on Columns -->
{#each projectPositions as pos}
  <T.Group 
    position={[pos.x, pos.y, pos.z]}
  >
    <T.Mesh>
      <T.BoxGeometry args={[1, 1, 1]} />
      <T.MeshStandardMaterial color="#ff0000" />
    </T.Mesh>
  </T.Group>

{/each}



