<script lang="ts">
  import Typewriter from 'svelte-typewriter';
  import Header from '$lib/components/Header.svelte';
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/components/Scene.svelte';

  let currentPage: string = "Contact";
  const names = ["Alex Huper", "Hupey"]; 
</script>

<div class="relative h-screen">
  <Header 
    bind:currentPage
  />
  <Canvas>
    <Scene 
      {currentPage}
    />
  </Canvas>
  
  {#if currentPage === "About"}
    <div class="absolute bottom-0 w-full h-48 bg-white z-10 p-4"> 
      <div>
        <Typewriter
          mode={"scramble"}
          delay={1000}
        >
          <div> Test Subject: </div>
        </Typewriter>
        <Typewriter
          mode={"loop"}
          delay={5000}
          unwriteInterval={100}
          interval={100}
        >
          {#each names as name}
            <div>{name}</div>
          {/each}
        </Typewriter>
      </div>
    </div>
  {:else if currentPage === "Projects"}
    <div class="absolute bottom-0 w-full h-48 bg-white z-10 p-4"> 
      projects
    </div>
  {:else if currentPage === "Contact"}
    <div class="absolute bottom-52 left-4 bg-[#d1b92e] z-10 p-2"> 
      contact me
    </div>
  {:else if currentPage === "Resume"}
    <div class="absolute bottom-0 w-full h-48 bg-white z-10 p-4"> 
      resume
    </div>
  {/if}

</div>
