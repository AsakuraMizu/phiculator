<script lang="ts">
  import PreloadIllustrationBlur from '../components/PreloadIllustrationBlur.svelte';
  import type { Entry } from '../utils/rks';

  import Phi from '../assets/ranks/Phi.png';
  import VFC from '../assets/ranks/VFC.png';
  import V from '../assets/ranks/V.png';
  import S from '../assets/ranks/S.png';
  import A from '../assets/ranks/A.png';
  import B from '../assets/ranks/B.png';
  import C from '../assets/ranks/C.png';
  import F from '../assets/ranks/F.png';

  export let e: Entry;
  let type: 'Phi' | 'VFC' | 'V' | 'S' | 'A' | 'B' | 'C' | 'F';

  $: if (e.acc === 100) type = 'Phi';
  else if (e.combo === 1) type = 'VFC';
  else if (e.score >= 960000) type = 'V';
  else if (e.score >= 920000) type = 'S';
  else if (e.score >= 880000) type = 'A';
  else if (e.score >= 820000) type = 'B';
  else if (e.score >= 700000) type = 'C';
  else type = 'F';
</script>

<div class="entry exo">
  <PreloadIllustrationBlur songsId={e.songsId} />
  <div class="first">
    <div class="title">{e.songsName}</div>
    <div
      style:--color={{ EZ: 'green', HD: 'blue', IN: 'red', AT: 'black' }[e.level]}
      style="color: var(--color);"
    >
      &nbsp;{e.level}&nbsp;{e.difficulty}
    </div>
  </div>
  <div class="second">
    <img src={{ Phi, VFC, V, S, A, B, C, F }[type]} alt={type} />
    <div class="space" />
    <div class="text">{e.score} {e.acc.toFixed(2)}% {e.rks.toFixed(2)}</div>
  </div>
</div>

<style>
  .entry {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    width: 256px;
    height: 135px;
    overflow: hidden;
    margin: 3px 3px;
    padding: 15px 15px;
    text-align: left;
    font-weight: 700;
  }

  .first {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }

  .title {
    display: inline-block;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .second {
    display: flex;
    align-items: center;
  }

  img {
    object-fit: contain;
    width: 28px;
    height: 28px;
  }

  .space {
    flex-grow: 1;
  }
</style>
