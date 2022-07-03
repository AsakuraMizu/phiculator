<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast';
  import { InfoBar } from 'fluent-svelte';

  export let toastId: number;

  export let title: string;
  export let message: string;
  export let severity: 'information' | 'success' | 'caution' | 'critical' | 'attention';
  export let closable = true;

  const close = () => {
    if (closable) toast.pop(toastId);
  };
</script>

<div>
  <InfoBar {title} {severity} closable={false} open on:click={close}>
    <!-- eslint-disable-next-line @ota-meshi/svelte/no-at-html-tags -->
    {@html message}
  </InfoBar>
</div>

<style>
  div {
    width: 100%;
  }
</style>
