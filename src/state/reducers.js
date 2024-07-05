import { combineReducers } from "redux";
import teamsReducer  from "./teamsReducer";
import gamesReducer from "./gamesReducers";
import gameDetailReducers from "./gameDetailReducers"
//   const GamesReducer = (state = { games: [],filter: 'all',loading: false }, action) => {
    // switch(action.type) {

//         case 'ADD_COMMENTS':
//           return {
//           ...state,
//           games: action.games,
//           loading: false
//         } 
//         case 'DELETE_COMMENT':
//           return {
//           ...state,
//           games: action.games,
//           loading: false
//         } 
//         case 'ADD_REPLY':
//           return {
//           ...state,
//           games: action.games,
//           loading: false
//         } 
//         case 'DELETE_REPLY':
//           return {
//           ...state,
//           games: action.games,
//           loading: false
//         } 
//           default:
//           return state;
    //     }
    // }


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
  games: gamesReducer,
  game: gameDetailReducers,
  user: UserReducer,
  errorsOrMsg: errorsOrMsg,
});
 
export default rootReducer;
