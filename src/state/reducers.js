import { combineReducers } from "redux";
import teamsReducer  from "./teamsReducer";

// const teamsReducer = (state = { teams: [], loading: false }, action) => {
//     switch(action.type) {
//       case 'LOADING_TEAMS':
//         return state = {
//            ...state,
//           teams: [...state.teams],
//           loading: true
//         }
//       case 'ADD_TEAMS':
//         return {
//            ...state,
//           teams: action.teams,
//           loading: false
//         }
//       default:
//         return state;
//     }
//   }



  const GamesReducer = (state = { games: [],filter: 'all',loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_GAMES':
       
        return state = {
           ...state,
          games: [...state.games],
          loading: true
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


  const UserReducer = (state = { user: {}, loading: true }, action) => {

    switch(action.type) {
      case 'LOADING_USER':
        return state = {
          ...state,
          user: state.user,
          loading: true
        } 

        case 'LOADING_NEW_USER':
        return state ={
          ...state,
          user: state.user,
          loading: true,    
        }
        case 'LOADING_LOGIN':
          return state = {
            ...state,
            user: state.user
        }
        case 'LOADING_LOGOUT':
          return state = {
            ...state,
            user: state.user,
            loading: true
          } 

        case 'ADD_USER':
        return {
           ...state,
          user: action.user,
          loading: false
        } 
        case 'ADD_NEW_USER':
          return {
             ...state,
            user: action.user,
            loading: false
          } 

          case 'LOGIN':
            return state = {
              ...state,
              user: action.user,
              loading: false
            }

            case 'LOGOUT':
              return state = {
                ...state,
                user: action.user,
                loading: false
              }

      default:
        return state;
    }
  }

const editUserReducer=(state = { message: {}, loading: false }, action)=>{
  switch(action.type) {
  case 'LOADING_SETTINGS':
    return state = {
      message: state.user,
      loading: true
    } 
  case 'EDITED_USER':
    return {
       ...state,
      message: action.user,
      loading: false
    } 
    default:
      return state;
  }
}


const errorsOrMsg = (state = { errorsOrMsg: {from: 'none', errors: [], msg: []}, loading: true }, action)=>{
  switch(action.type) {
    case 'ERRORS_OR_MESSAGES':
      return {
         ...state,
        errorsOrMsg: action.errorsOrMsg,
        loading: false
      } 
      default:
        return state;
    }
}


const rootReducer = combineReducers({
  editedMessage: editUserReducer,
  teams: teamsReducer,
  games: GamesReducer,
  user: UserReducer,
  errorsOrMsg: errorsOrMsg,
});
 
export default rootReducer;
