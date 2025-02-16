<!-- TypingCarousel.svelte -->
<script>
  export let words = ["Developer", "Designer", "Creator"];
  export let typingSpeed = 150;
  export let deletingSpeed = 75;
  export let pauseDuration = 2000;

  let text = '';
  let isDeleting = false;
  let wordIndex = 0;
  let isWaiting = false;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isWaiting) {
      setTimeout(() => {
        isWaiting = false;
        isDeleting = true;
      }, pauseDuration);
      return;
    }

    if (isDeleting) {
      text = currentWord.substring(0, text.length - 1);
      
      if (text.length === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    } else {
      text = currentWord.substring(0, text.length + 1);
      
      if (text.length === currentWord.length) {
        isWaiting = true;
      }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  // Start the typing effect when the component mounts
  onMount(() => {
    type();
  });
</script>

<div class="font-mono">
  <span>{text}</span>
  <span class="cursor" />
</div>

<style>
  .cursor {
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background-color: black;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
</style>