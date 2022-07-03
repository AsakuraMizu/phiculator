import { derived, writable } from 'svelte/store';
import type { Adb } from '@yume-chan/adb';
import persistent from './utils/persistent';
import { getEntries, getRks } from './utils/rks';

export const device = writable<Adb>();

export const data = writable<Uint8Array>();

export const playerID = persistent<string>('playerId');

export interface PlayRecord {
  s: number; // score
  a: number; // acc
  c: number; // if "full combo"
}

export const records = persistent<Record<string, PlayRecord>>('records');

export const entries = derived(records, getEntries);
export const rks = derived(entries, getRks);
