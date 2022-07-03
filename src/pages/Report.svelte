<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, ProgressBar, TextBlock } from 'fluent-svelte';
  import ReportEntry from '../components/ReportEntry.svelte';
  import { total, done, clear } from '../components/PreloadIllustrationBlur.svelte';
  import { playerID, entries, rks } from '../stores';

  onMount(() => clear);
</script>

<div class="container">
  {#if $total !== $done}
    <ProgressBar value={$total ? ($done / $total) * 100 : 0} />
  {/if}
  <Button href="/" variant="hyperlink">返回</Button>
  <br />
  <TextBlock variant="title" class="exo">Player: {$playerID}</TextBlock>
  <br />
  <TextBlock variant="title" class="exo">RankingScore: {$rks.toFixed(2)}</TextBlock>
  <br />
  {#each $entries.slice(0, 20) as e}
    <ReportEntry {e} />
  {/each}
</div>

<style>
  .container {
    overflow-y: auto;
    height: 80vh;
    width: 95vw;
  }
</style>
