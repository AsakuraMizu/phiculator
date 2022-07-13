<script lang="ts">
  import { Button, TextBlock } from 'fluent-svelte';
  import { writestream } from '../utils/stream';
  import { data, device } from '../stores';
  import { sendError } from '../utils/toast';

  const restore = async () => {
    try {
      const shell = await $device.subprocess.spawn('bu restore');
      await writestream(shell.stdin, $data);
    } catch (e) {
      sendError(e);
    }
  };
</script>

<div class="root">
  <TextBlock variant="title">警告：请关闭此页面！</TextBlock>
  <Button download="data.ab" variant="accent" on:click={restore}>恢复</Button>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
</style>
