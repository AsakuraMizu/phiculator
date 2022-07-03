<script lang="ts">
  import { Button, TextBlock, Tooltip } from 'fluent-svelte';
  import { playerID, records, rks } from '../stores';
</script>

<div class="root">
  {#if $records}
    <TextBlock variant="bodyLarge">已导入的数据:</TextBlock>
    <TextBlock variant="title" class="exo">
      {$playerID}
      {$rks.toFixed(2)}
    </TextBlock>
    <Button variant="hyperlink" href="/report">查看报表</Button>
  {:else}
    <br />
    <TextBlock variant="title">没有数据!</TextBlock>
  {/if}
  <br />
  <TextBlock variant="bodyLarge">您可以选择:</TextBlock>
  <Button variant="accent" href="/prepare">从 Android 设备导入</Button>
  <Button variant="hyperlink" href="/importxml">从 playerprefs(xml) 文件导入</Button>
  <Tooltip text="尚未支持">
    <Button variant="hyperlink" href="/importplist" disabled>从 playerprefs(plist) 文件导入</Button>
  </Tooltip>
</div>

<style>
  .root {
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
</style>
