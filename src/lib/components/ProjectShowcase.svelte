<script lang="ts">
  import { T } from '@threlte/core'
  import { 
    interactivity, 
    InstancedMeshes, 
    useGltf,
    GLTF
  } from '@threlte/extras'
	import { onMount } from 'svelte';
  
  interactivity();

  let smallDevice = false;
  let gap: number = $state<number>(0);
  let origin: [number, number, number] = $state<[number, number, number]>([0, 0, 0]);
  const breakPoint = 1024;

  onMount(() => {
    if (window.innerWidth <= breakPoint) {
      smallDevice = true;
      gap = 1.2 + window.innerWidth / breakPoint;
      origin = [25, .2, (gap + gap / 2)];
    } else {
      smallDevice = false;
      gap = 2.3;
      origin = [30, .2, (gap + gap / 2)];
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= breakPoint) {
        smallDevice = true;
        gap = 1.55 + window.innerWidth / breakPoint;
        origin = [20, .2, (gap + gap / 2)];
      } else {
        smallDevice = false;
        gap = 2.3;
        origin = [30, .2, (gap + gap / 2)];
      }
    });
  });

  const columnGLTF = useGltf('/models/doric_marble_column/scene.gltf')
  const numInstances = 4
  let columnPositions = $derived(Array.from({ length: numInstances }, (_, i) => ({
    x: origin[0],
    y: origin[1], 
    z: origin[2] - (i * gap),
    scale: 2
  })))

  // Define project data with URLs
  const projectData = [
    { 
      // Connect 4 AI
      url: '/models/connect_4/scene.gltf',
      link: "https://github.com/hupeyy/AI-Connect4",
      scale: .125, 
      yOffset: .45, 
      rotateY: Math.PI / 2
    },
    { 
      // Telegram Bot
      url: '/models/vintage_robot_toy/scene.gltf', 
      link: "https://github.com/hupeyy/ecabot",
      scale: .25, 
      yOffset: .5,
      rotateY: Math.PI / 2
    },
    { 
      // ColorStack UF Website
      url: '/models/retro_computer/scene.gltf',
      link: "https://uf.colorstack.org",
      scale: .0125,
      yOffset: .43, 
      rotateY: Math.PI / 2
    },
    { 
      // AIDE 
      url: '/models/first_aid_kit/scene.gltf',
      link: "https://aide.zy-j.com/",
      scale: .25,
      yOffset: -.03,
      rotateY: 0
    },
  ]

  // Create position data for projects
  let projectPositions = $derived(Array.from({ length: Math.min(numInstances, projectData.length) }, (_, i) => ({
    x: origin[0],
    y: origin[1] + 5 - projectData[i].yOffset,
    z: origin[2] - (i * gap),
    rotateY: projectData[i].rotateY,
    scale: projectData[i].scale,
    hovering: false
  })))

  // Create tweened stores for each project's Y position
  // let projectTweens = projectPositions.map(pos => 
  //   new Tween(pos.y, {
  //     duration: 300,
  //     easing: cubicOut
  //   })
  // );
</script>

<!-- Columns -->
{#if $columnGLTF}
  <InstancedMeshes 
    meshes={$columnGLTF.nodes}
    frustumCulled={false}
  >
    {#snippet children({ components })}
      {#each columnPositions as pos, i}
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

{#each projectData as proj, i}
  <T.Group>
    <GLTF
      url={proj.url}
      scale={projectPositions[i].scale}
      position={[projectPositions[i].x, projectPositions[i].y, projectPositions[i].z]}
      rotation={[0, projectPositions[i].rotateY, 0]}
      interactive
      onclick={() => window.open(proj.link, "_blank")}
    />  
  </T.Group>
{/each}