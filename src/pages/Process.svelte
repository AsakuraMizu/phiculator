<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { Button, TextBlock } from 'fluent-svelte';
  import { inflate } from 'pako';
  import { XMLParser } from 'fast-xml-parser';
  import Pagination from '../components/Pagination.svelte';
  import TarReader from '../utils/untar';
  import des2 from '../utils/des2';
  import { sendError } from '../utils/toast';
  import { data, playerID, records, type PlayRecord } from '../stores';

  const process = () => {
    const source = get(data);
    if (!source) return;
    try {
      const compressed = source.subarray(24);
      const plain = inflate(compressed);
      const tr = new TarReader(plain.buffer);
      const binary = tr.getFileBinary(
        'apps/com.PigeonGames.Phigros/sp/com.PigeonGames.Phigros.v2.playerprefs.xml'
      );
      const td = new TextDecoder();
      const text = td.decode(binary);
      const xp = new XMLParser({
        ignoreAttributes: false,
      });
      const xml = xp.parse(text, true);
      const result: Record<string, PlayRecord> = {};
      xml.map.string.forEach((e: Record<string, string>) => {
        try {
          if (e['@_name'] === 'playerID') playerID.set(e['#text']);
          else {
            e['@_name'] = des2(decodeURIComponent(e['@_name']));
            e['#text'] = des2(decodeURIComponent(e['#text']));
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

  onMount(process);
</script>

<div class="root">
  <br />
  <TextBlock variant="bodyLarge">
    已获取 {$records ? Object.keys($records).length : 0} 条存档数据
  </TextBlock>
  <br />
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
