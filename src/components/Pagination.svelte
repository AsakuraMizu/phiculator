<script lang="ts">
  import { Button } from 'fluent-svelte';

  export let next: string;
  export let nextText = '下一步';

  export let disabled = false;
</script>

<div class="button-group">
  <div class="button">
    <Button on:click={() => history.back()} variant="hyperlink">返回</Button>
  </div>
  {#if next}
    <div class="button"><Button href={next} variant="hyperlink" {disabled}>{nextText}</Button></div>
  {/if}
</div>

<style>
  div.button-group {
    width: 100%;
    display: flex;
  }

  div.button {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>
