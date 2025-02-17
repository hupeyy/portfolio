<script>
    import Typewriter from 'svelte-typewriter';
    const messages = ["web developer", "sudoku solver", "baker"];
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
