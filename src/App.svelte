<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { Route, router } from 'tinro';

  import Page from './components/Page.svelte';
  import Navbar from './components/Navbar.svelte';
  import Hello from './pages/Hello.svelte';
  import Prepare from './pages/Prepare.svelte';
  import Connect from './pages/Connect.svelte';
  import Backup from './pages/Backup.svelte';
  import Process from './pages/Process.svelte';
  import ImportXML from './pages/ImportXML.svelte';
  import ImportPlist from './pages/ImportPlist.svelte';
  import Report from './pages/Report.svelte';
  import Import from './pages/Import.svelte';
  import Export from './pages/Export.svelte';
  import Restore from './pages/Restore.svelte';

  import bgLight from './assets/bloom-mica-light.png';
  import bgDark from './assets/bloom-mica-dark.png';

  router.mode.hash();
</script>

<SvelteToast />

<Navbar />

<main>
  <section
    style={`--bgLight: url(${bgLight}) 50%/170% no-repeat; --bgDark: url(${bgDark}) 50%/170% no-repeat`}
  >
    <Route path="/">
      <Page><Hello /></Page>
    </Route>
    <Route path="/prepare">
      <Page><Prepare /></Page>
    </Route>
    <Route path="/connect">
      <Page><Connect /></Page>
    </Route>
    <Route path="/backup">
      <Page><Backup /></Page>
    </Route>
    <Route path="/process">
      <Page><Process /></Page>
    </Route>
    <Route path="/importxml">
      <Page><ImportXML /></Page>
    </Route>
    <Route path="/importplist">
      <Page><ImportPlist /></Page>
    </Route>
    <Route path="/report">
      <Page><Report /></Page>
    </Route>
    <!-- hidden pages -->
    <Route path="/import">
      <Page><Import /></Page>
    </Route>
    <Route path="/export">
      <Page><Export /></Page>
    </Route>
    <Route path="/restore">
      <Page><Restore /></Page>
    </Route>
  </section>
</main>

<style>
  section {
    position: relative;
    background: var(--bgLight);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    min-block-size: 100vh;
  }

  @media (prefers-color-scheme: dark) {
    section {
      background: var(--bgDark);
    }
  }
</style>
