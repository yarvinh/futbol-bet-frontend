

const GamesReducer = (state = { games: [],filter: 'all',loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_GAMES':
        return state = {
           ...state,
          games: [...state.games],
          loading: true
        } 

        
    }

}


      case 'LOADING_LIKES':
              return state = {
           ...state,
          games: [...state.games],
          loading: true
        } 
        case 'LOADING_GAME_BETS':
              return state = {
                ...state,
                games: [...state.games],
                loading: true
        } 
        case 'LOADING_COMMENTS':
          return state = {
            ...state,
            games: [...state.games],
            loading: true
      } 
      case 'LOADING_REPLIES':
        return state = {
          ...state,
          games: [...state.games],
          loading: true
      } 
      case 'ADD_GAMES':
        return {
           ...state,
          games: action.games,
          loading: false
        } 
       
        case 'SET_FILTER':
                return {
                    ...state,
           filter: action.filterBy,
        } 
        case 'UPDATE_LIKES':
               return {
           ...state,
          games: action.games,
          loading: false
        } 
        case 'ADD_GAME_BETS':
          return {
          ...state,
          games: action.games,
          loading: false
        } 
        case 'ADD_COMMENTS':
          return {
          ...state,
          games: action.games,
          loading: false
        } 
        case 'DELETE_COMMENT':
          return {
          ...state,
          games: action.games,
          loading: false
        } 
        case 'ADD_REPLY':
          return {
          ...state,
          games: action.games,
          loading: false
        } 
        case 'DELETE_REPLY':
          return {
          ...state,
          games: action.games,
          loading: false
        } 
          default:
          return state;
        }
    }
