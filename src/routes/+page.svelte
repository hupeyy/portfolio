<script lang="ts">
  import Typewriter from 'svelte-typewriter';
  import Header from '$lib/components/Header.svelte';
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/components/Scene.svelte';

  let currentPage: string = "About";
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
    <div class="text-[.8rem] absolute bottom-0 inset-x-0 w-full bg-white z-10 p-4"> 
      <div>
        <Typewriter
          mode={"scramble"}
          scrambleSlowdown={true}
          delay={1000}
        >
          <div> Test Subject: </div>
        </Typewriter>
        <Typewriter
          mode={"scramble"}
          scrambleSlowdown={true}
          delay={1000}
        >
          <div>Alexander Huper aka Hupey</div>
        </Typewriter>
        <Typewriter
          mode={"cascade"}
          delay={5000}
          interval={60}
        >
          <div>
            Aspiring graduate from the University of Florida, C/O Fall '24 with a degree in Computer Science and a minor in Mathematics. 
            Actively seeking opportunities as a software engineer, frontend developer, or full stack developer 
          </div>
        </Typewriter>
        
      </div>
    </div>
  {:else if currentPage === "Projects"}
    <div class="absolute bottom-0 inset-x-0 w-full bg-white z-10 p-4"> 
      My projects
      <br />
      Click on one of the pedestal objects to learn more
    </div>
  {:else if currentPage === "Contact"}
    <div class="absolute bottom-1/3 left-[5vw] bg-[#d1b92e] z-10 p-2"> 
      contact me
    </div>
  {:else if currentPage === "Resume"}
    <div class="absolute bottom-0 w-full inset-x-0 bg-white z-10 p-4"> 
      i couldn't think of anything cool for this page
    </div>
  {/if}
</div>
