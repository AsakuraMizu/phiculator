import { song, songAllCombos } from '../assets/GameInformation.json';

export interface ISong {
  songsId: string;
  songsKey: string;
  songsName: string;
  songsTitle: string;
  difficulty: number[];
  illustrator: string;
  charter: string[];
  composer: string;
  levels: string[];
  // unused ones are omitted
}

export interface ISongAllCombos {
  songsId: string;
  allComboNum: number[];
}

export interface IGameInformation {
  song: {
    mainSongs: ISong[];
    extraSongs: ISong[];
    sideStorySongs: ISong[];
    otherSongs: ISong[];
  };
  songAllCombos: ISongAllCombos[];
  // unused ones are omitted
}

const gameInfomation: IGameInformation = { song, songAllCombos };
export default gameInfomation;
