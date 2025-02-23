<script lang="ts">
  import Typewriter from 'svelte-typewriter';
  import Header from '$lib/components/Header.svelte';
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/components/Scene.svelte';

  let currentPage: string = "About";
  const messages = ["187196", "Alex Huper"]; 
</script>

<div class="relative h-[97vh]">
  <Header 
    bind:currentPage
  />
  <Canvas>
    <Scene 
      {currentPage}
    />
  </Canvas>
    
  <div class="absolute z-10 p-4"> 
    hello
  </div>
</div>
