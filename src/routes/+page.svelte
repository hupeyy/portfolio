<script lang="ts">
  import type { MarchingPlaneAxis } from '$lib/helpers/types'
  import Typewriter from 'svelte-typewriter';
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/components/Scene.svelte';

  const messages = ["web developer", "sudoku solver", "baker"];
  let ballCount = $state(5)
  let isolation = $state(80)
  let planeAxis: MarchingPlaneAxis =  $state('y')
  let resolution = $state(35)
</script>

<div class="text-xl">
    About me
</div>
<div class="flex flex-row text-lg gap-1"> 
    <Typewriter
        keepCursorOnFinish={true}
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
            {ballCount}
            {planeAxis}
            {resolution}
            {isolation}
        /> 
    </Canvas>
</div>
