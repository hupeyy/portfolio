<script lang="ts">
  import Typewriter from 'svelte-typewriter';
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/components/Scene.svelte';

  const messages = ["187196", "Alex Huper"]; 
  let ballCount = $state(10)
  let isolation = $state(25)
  let resolution = $state(100)
  let floor = $state(true)
  let wallx = $state(false)
  let wallz = $state(false)
  let speed = $state(0.25)

</script>

<div class="text-xl">
  Test Subject: 
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
        <Scene /> 
    </Canvas>
</div>
