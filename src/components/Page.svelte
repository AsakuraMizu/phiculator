<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div in:fly={{ x: 800 }} out:fly={{ x: -800 }}>
  <slot />
</div>

<style>
  div {
    position: fixed;
    background-color: var(--fds-card-background-default);
    border-radius: 8px;
    padding: 12px;
    box-shadow: var(--fds-card-shadow);
    min-inline-size: 400px;
    min-block-size: 400px;
  }
</style>
