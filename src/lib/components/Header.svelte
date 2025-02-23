<script lang="ts">
  export let currentPage: string;
</script>

<div class="flex flex-row gap-4 p-2">
  <button 
    on:click={() => currentPage = "About"}
  >
    About
  </button>
  <button 
    on:click={() => currentPage = "Projects"}
  >
    Projects
  </button>
  <button 
    on:click={() => currentPage = "Contact"}
  >
    Contact
  </button>
  <button 
    on:click={() => currentPage = "Resume"}
  >
    Resume
  </button>
</div>
