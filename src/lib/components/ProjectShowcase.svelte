<script lang="ts">
  import { T } from '@threlte/core'
  import { 
    interactivity, 
    InstancedMeshes, 
    useGltf,
    Outlines,
  } from '@threlte/extras'
  import { Tween } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  
  interactivity();

  const gap = 3;
  export let origin: [number, number, number] = [15, 0, -(gap + gap / 2)];

  const gltf = useGltf('/models/doric_marble_column/scene.gltf')
  const numInstances = 4
  const columnPositions = Array.from({ length: numInstances }, (_, i) => ({
    x: origin[0] + 0,
    y: origin[1] + 0,
    z: origin[2] + (i * gap),
    scale: 2
  }))

  const projectPositions = Array.from({ length: numInstances }, (_, i) => ({
    x: origin[0] + 0,
    y: origin[1] + 5,
    z: origin[2] + (i * gap),
    scale: 2
  }))

  let selectedProject: number = 0;
  let tweens = projectPositions.map(pos => 
    new Tween(pos.y, {
      duration: 300,
      easing: cubicOut
    })
  );
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
{#each projectPositions as pos, i}
  <T.Group position={[pos.x, tweens[i].current, pos.z]}>
    <T.Mesh
      onpointerenter={() => {
        selectedProject = i;
        tweens[i].set(pos.y + 0.5);
      }}
      onpointerleave={() => {
        tweens[i].set(pos.y);
      }}
    >
      <T.BoxGeometry args={[1, 1, 1]} />
      {#if selectedProject === i}
        <T.MeshStandardMaterial color="#00ff00" />
        <Outlines thickness={.5} color="blue" screenspace/>
      {:else}
        <T.MeshStandardMaterial color="#ff0000" />
      {/if}
    </T.Mesh>
  </T.Group>
{/each}
