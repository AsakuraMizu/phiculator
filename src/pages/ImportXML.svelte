<script lang="ts">
  import { Button, IconButton, TextBlock, TextBox } from 'fluent-svelte';
  import { XMLParser } from 'fast-xml-parser';
  import Pagination from '../components/Pagination.svelte';
  import decrypt from '../utils/des';
  import { sendError } from '../utils/toast';
  import { readtext } from '../utils/readfile';
  import { playerID, records, type PlayRecord } from '../stores';

  let input: HTMLInputElement;
  let fileList: FileList;

  const process = async () => {
    const text = await readtext(fileList);
    try {
      const xp = new XMLParser({
        ignoreAttributes: false,
      });
      const xml = xp.parse(text, true);
      const result: Record<string, PlayRecord> = {};
      xml.map.string.forEach((e: Record<string, string>) => {
        try {
          if (e['@_name'] === 'playerID') playerID.set(e['#text']);
          else {
            e['@_name'] = decrypt(decodeURIComponent(e['@_name']));
            e['#text'] = decrypt(decodeURIComponent(e['#text']));
            if (/.*\.Record\..*/.test(e['@_name'])) result[e['@_name']] = JSON.parse(e['#text']);
          }
        } catch (e) {
          /***/
        }
      });
      records.set(result);
    } catch (e) {
      sendError(e);
    }
  };
</script>

<div class="root">
  <input
    bind:this={input}
    type="file"
    accept=".xml"
    bind:files={fileList}
    hidden
    on:change={process}
  />
  <TextBox
    placeholder="上传文件..."
    value={fileList?.[0]?.name}
    readonly
    on:click={() => input?.click()}
  >
    <div slot="buttons">
      <IconButton on:click={() => input?.click()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M5 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5.414a1.5 1.5 0 0 0-.44-1.06L9.647 1.439A1.5 1.5 0 0 0 8.586 1H5ZM4 3a1 1 0 0 1 1-1h3v2.5A1.5 1.5 0 0 0 9.5 6H12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3Zm7.793 2H9.5a.5.5 0 0 1-.5-.5V2.207L11.793 5Z"
          />
        </svg>
      </IconButton>
    </div>
  </TextBox>
  <TextBlock variant="bodyLarge">
    已获取 {$records ? Object.keys($records).length : 0} 条存档数据
  </TextBlock>
  <Button variant="accent" on:click={process}>重试</Button>
  <Pagination next="/" nextText="完成" disabled={!$records} />
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
</style>
