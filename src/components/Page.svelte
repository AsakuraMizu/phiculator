<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div in:fly={{ x: 800 }} out:fly={{ x: -800 }}>
  <slot />
</div>

<style>
  div {
    position: fixed;
    background-color: hsla(0, 0%, 100%, 70%);
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0px 8px 16px hsla(0, 0%, 0%, 14%);
    min-inline-size: 400px;
    min-block-size: 400px;
  }
</style>
