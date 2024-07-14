import { combineReducers } from "redux";
import teamsReducer  from "./teamsReducer";
import gamesReducer from "./gamesReducers";
import gameDetailReducers from "./gameDetailReducers"
import commentsReducer from "./commentsReducers"
import serverErrorsReducer from "./serverErrors"
import userReducer from "./userReducer";
import errorsOrMsgReducer from "./errorsOrMsgs";


const rootReducer = combineReducers({
  comments: commentsReducer,
  teams: teamsReducer,
  games: gamesReducer,
  game: gameDetailReducers,
  user: userReducer,
  errorsOrMsg: errorsOrMsgReducer,
  serverErrors: serverErrorsReducer
});
 
export default rootReducer;
