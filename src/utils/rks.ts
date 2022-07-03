import type { PlayRecord } from '../stores';
import gameInfomation from './gameInformation';

export interface Entry {
  songsId: string;
  songsName: string;
  level: string;
  difficulty: number;
  illustrator: string;
  charter: string;
  composer: string;
  score: number;
  acc: number;
  combo: number;
  rks: number;
}

export function getEntries(records: Record<string, PlayRecord>): Entry[] {
  if (!records) return [];

  const songs = [
    ...gameInfomation.song.mainSongs,
    ...gameInfomation.song.sideStorySongs,
    ...gameInfomation.song.extraSongs,
  ];

  const entries: Entry[] = [];
  songs.forEach((song) => {
    song.levels.forEach((level, i) => {
      const r = records[`${song.songsId}.Record.${level}`];
      if (r) {
        entries.push({
          songsId: song.songsId,
          songsName: song.songsName,
          level,
          difficulty: song.difficulty[i],
          illustrator: song.illustrator,
          charter: song.charter[i],
          composer: song.composer,
          score: r.s,
          acc: r.a,
          combo: r.c,
          rks: r.a >= 70 ? ((r.a - 55) / 45) ** 2 * song.difficulty[i] : 0,
        });
      }
    });
  });

  entries.sort((a, b) => b.rks - a.rks);
  const bestphi = entries.find((e) => e.acc === 100);
  entries.unshift(bestphi);
  return entries;
}

export function getRks(entries: Entry[]): number {
  return entries.slice(0, 20).reduce((rks, e) => rks + e.rks * 0.05, 0);
}
