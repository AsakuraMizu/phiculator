<script lang="ts" context="module">
  import { writable } from 'svelte/store';

  export let total = writable(0);
  export let done = writable(0);

  export function clear() {
    total.set(0);
    done.set(0);
  }
</script>

<script lang="ts">
  export let songsId: string;

  $: src = `https://cdn.rushia.icu/static/apps/phigros/Tracks/${songsId}/IllustrationBlur.png`;

  const preload = async () => {
    return new Promise<void>((resolve, reject) => {
      total.update((n) => n + 1);
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        done.update((n) => n + 1);
        resolve();
      };
      img.src = src;
    });
  };
</script>

{#await preload() then}
  <img {src} alt={songsId} />
{/await}

<style>
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.3;
    z-index: -1;
    user-select: none;
  }
</style>
