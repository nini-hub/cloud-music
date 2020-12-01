import mode from './modeType'
export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isPlaying: false,
  // isPlaying: false
  isShowListPlayer: false,
  modeType: mode.loop,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  curTime: 0,
  favoriteList: [],
  historyList: []
}
