<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { Button, TextBlock } from 'fluent-svelte';
  import { inflate } from 'pako';
  import { XMLParser } from 'fast-xml-parser';
  import Pagination from '../components/Pagination.svelte';
  import TarReader from '../utils/untar';
  import decrypt from '../utils/des';
  import { sendError } from '../utils/toast';
  import { challengeModeRank, data, playerID, records, type PlayRecord } from '../stores';

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
        let name = e['@_name'],
          text = e['#text'];
        try {
          name = decrypt(decodeURIComponent(e['@_name']));
          text = decrypt(decodeURIComponent(e['#text']));
        } catch (e) {
          /***/
        }
        if (name === 'playerID') playerID.set(text);
        else if (name === 'ChallengeModeRank') challengeModeRank.set(Number.parseInt(text));
        else if (/.*\.Record\..*/.test(name)) result[name] = JSON.parse(text);
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
