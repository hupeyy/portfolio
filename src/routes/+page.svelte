<script lang="ts">
  import Typewriter from 'svelte-typewriter';
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/components/Scene.svelte';

  const messages = ["web developer", "sudoku solver", "baker"];
  let ballCount = $state(10)
  let isolation = $state(25)
  let resolution = $state(100)
  let floor = $state(true)
  let wallx = $state(true)
  let wallz = $state(true)
  let speed = $state(0.25)
</script>

<div class="text-xl">
    About me
</div>
<div class="flex flex-row text-lg gap-1"> 
    <Typewriter
        mode={'loop'}
        delay={100}
        interval={100}
        unwriteInterval={100}
    >
        {#each messages as message}
            <div>{message}</div>
        {/each}
    </Typewriter>
</div>
<div class="h-screen">
    <Canvas>
        <Scene 
          numBlobs={ballCount}
          resolution={resolution}
          isolation={isolation}
          materialType="shiny"
          floor={floor}
          wallx={wallx}
          wallz={wallz}
          speed={speed}
        /> 
    </Canvas>
</div>
