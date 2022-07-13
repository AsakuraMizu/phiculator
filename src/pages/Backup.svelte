<script lang="ts">
  import byteSize from 'byte-size';
  import { Button, InfoBar, TextBlock } from 'fluent-svelte';
  import { readstream } from '../utils/stream';
  import { sendError } from '../utils/toast';
  import { data, device } from '../stores';
  import Pagination from '../components/Pagination.svelte';

  const backup = async () => {
    try {
      const shell = await $device.subprocess.spawn(
        'bu backup -noshared -noapk -nosystem com.PigeonGames.Phigros'
      );
      data.set(await readstream(shell.stdout));
    } catch (e) {
      sendError(e);
    }
  };
</script>

<div class="root">
  <h1>Step 3. 获取存档数据</h1>
  <div class="bar">
    <InfoBar message="请确保您已打开 Phigros!" severity="caution" closable={false} />
    <InfoBar severity="information" closable={false}>
      通过备份您的 Phigros 应用数据的方式获取存档数据,<br />
      请在您的 Android 设备上点击 <b>备份我的数据</b>.<br />
      请不要设置密码, Phiculator 暂不支持.<br />
      (您没有加密的必要, 您的存档不会被上传至任何服务器)
    </InfoBar>
  </div>
  <Button variant="accent" on:click={backup}>开始备份</Button>
  {#if $data}
    <TextBlock variant="bodyLarge">已读取存档数据大小:</TextBlock>
    <TextBlock variant="title">{byteSize($data.length)}</TextBlock>
  {/if}
  <Pagination next="/process" disabled={!$data} />
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .bar {
    text-align: left;
  }
</style>
