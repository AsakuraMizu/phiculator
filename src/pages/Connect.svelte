<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Adb, type AdbPacketData, type AdbPacketInit } from '@yume-chan/adb';
  import { AdbWebUsbBackend, AdbWebUsbBackendWatcher } from '@yume-chan/adb-backend-webusb';
  import AdbWebCredentialStore from '@yume-chan/adb-credential-web';
  import type { ReadableStream, WritableStream } from 'web-streams-polyfill/ponyfill';
  import { Button, ComboBox, ProgressBar } from 'fluent-svelte';
  import { sendError } from '../utils/toast';
  import { device } from '../stores';
  import Pagination from '../components/Pagination.svelte';

  let connecting = false;

  let watcher: AdbWebUsbBackendWatcher;
  let backendList: AdbWebUsbBackend[] = [];
  let selected: AdbWebUsbBackend;

  const updateBackendList = async () => {
    backendList = await AdbWebUsbBackend.getDevices();
    let flag = false;
    if (selected) {
      const current = backendList.find((backend) => backend.serial === selected.serial);
      if (!current) flag = true;
    } else flag = true;
    if (flag) selected = backendList.length ? backendList[0] : undefined;
  };

  const selectViaSerial = (serial: string) =>
    (selected = backendList.find((backend) => backend.serial === serial));

  onMount(() => {
    updateBackendList();
    watcher = new AdbWebUsbBackendWatcher(async (serial?: string) => {
      await updateBackendList();
      if (serial && !selected) selectViaSerial(serial);
    });
    return () => watcher.dispose();
  });

  onDestroy(() => {
    watcher?.dispose();
  });

  const addBackend = async () => {
    const backend = await AdbWebUsbBackend.requestDevice();
    selected = backend;
    await updateBackendList();
  };

  const credentialStore = new AdbWebCredentialStore();
  const connect = async () => {
    if (!selected) return;

    connecting = true;

    let readable: ReadableStream<AdbPacketData>;
    let writable: WritableStream<AdbPacketInit>;
    try {
      ({ readable, writable } = await selected.connect());
    } catch (e) {
      sendError(e);
      connecting = false;
      return;
    }

    async function dispose() {
      try {
        await readable.cancel();
      } catch {
        /***/
      }
      try {
        await writable.close();
      } catch {
        /***/
      }
      device.set(undefined);
    }

    try {
      const _device = await Adb.authenticate({ readable, writable }, credentialStore, undefined);

      _device.disconnected
        .then(async () => {
          await dispose();
        })
        .catch(async (e) => {
          sendError(e);
          await dispose();
        });
      device.set(_device);
    } catch (e) {
      sendError(e);
      await dispose();
    } finally {
      connecting = false;
    }
  };

  const disconnect = async () => {
    try {
      await $device.close();
    } catch (e) {
      sendError(e);
    } finally {
      device.set(undefined);
    }
  };
</script>

<div>
  <h1>Step 2. 连接设备</h1>
  <ComboBox
    placeholder="无可用设备"
    disabled={!!$device || backendList.length === 0}
    bind:value={selected}
    items={backendList.map((backend) => ({
      name: `${backend.name ? `${backend.name} (${backend.serial})` : backend.serial}`,
      value: backend,
    }))}
  />

  {#if connecting}
    <ProgressBar />
  {/if}
  {#if !$device}
    <Button disabled={!selected} variant={selected ? 'accent' : 'standard'} on:click={connect}>
      连接
    </Button>
    <Button variant={!selected ? 'accent' : 'standard'} on:click={addBackend}>添加设备</Button>
  {:else}
    <Button variant="standard" on:click={disconnect}>断开连接</Button>
  {/if}
  <Pagination next="/backup" disabled={!$device} />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
</style>
