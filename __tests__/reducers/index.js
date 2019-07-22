import constants from './../../src/constants';
import songChangeReducer from './../../src/reducers/songChangeReducer';
import lyricChangeReducer from './../../src/reducers/lyricChangeReducer';
import rootReducer from './../../src/reducers/';
import { createStore } from 'redux';
import * as actions from './../../src/actions';

// eslint-disable-next-line no-undef
describe('Karaoke App', () => {
  const { initialState, types } = constants;
  const store = createStore(rootReducer, initialState);

  // eslint-disable-next-line no-undef
  describe('lyricChangeReducer', () => {
    it('Should accept and return initial state.', () => {
      expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);
    });

    it('Should update currently-displayed lyric of song', () => {
      expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })[2].arrayPosition).toEqual(initialState.songsById[2].arrayPosition + 1);
    });

    it('should restart song', () => {
      expect(lyricChangeReducer(initialState.songsById, actions.restartSong(1))[1].arrayPosition).toEqual(0);
    });

    it('should update currently displayed lyric of song', () => {
      // eslint-disable-next-line no-undef
      expect(lyricChangeReducer(initialState.songsById, actions.nextLyric(2))[2].arrayPosition).toEqual(initialState.songsById[2].arrayPosition +1 );
    });

    it('should update state when API lyrics are being requested', () => {
      const action = actions.requestSong('crocodile rock');
      const newStateEntry = {
        isFetching: true,
        title: action.title,
        songId: action.songId,
      };
      // eslint-disable-next-line no-undef
      expect(lyricChangeReducer(initialState.songsById, action)[actions.songId]).toEqual(newStateEntry);
    });
    it('update state on receiving song', () => {
      const action = actions.receiveSong('kiss', 'price', 1 ['you don\t have to be beautiful', 'to turn me on']);
      const newObject = {
        isFetching: false,
        title: action.title,
        artist: action.artist,
        songId: action.songId,
        receivedAt: action.songArray,
        arrayPosition: 0
      };
      expect(lyricChangeReducer(initialState.songsById, action)[action.songId]).toEqual(newObject)
    });

  });


  // eslint-disable-next-line no-undef
  describe('songChangeReducer', () => {
    it('Should accept and return initial state.', () => {
      expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);
    });

    it('Should change selectedSong.', () => {
      expect(songChangeReducer(initialState.currentSongId, actions.changeSong(2))).toEqual(2);
    });
  });

  // eslint-disable-next-line no-undef
  describe('rootReducer', () => {
    it('Should accept and return initial state.', () => {
      expect(rootReducer(initialState, { type: null })).toEqual(initialState);
    });

    it('Should contain logic from both reducers.', () => {
      expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));
      expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));
    });
  });

  
});