export default function musics(state, action) {
      switch (action.type) {
          case 'addMusic':
              return {
                  ...state,
                  music: [...state.music, action.music]
              }
          default:
              return state
      }
}