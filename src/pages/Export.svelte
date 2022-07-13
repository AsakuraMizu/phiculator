<script lang="ts">
  import { Button } from 'fluent-svelte';
  import { data } from '../stores';

  let href = URL.createObjectURL(new Blob([$data]));
</script>

<Button {href}>Download</Button>
