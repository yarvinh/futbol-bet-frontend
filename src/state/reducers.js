import { combineReducers } from "redux";
import teamReducer  from "./teamReducer";
import teamsReducer  from "./teamsReducer";
import gamesReducer from "./gamesReducers";
import gameDetailReducers from "./gameDetailReducers"
import commentsReducer from "./commentsReducers"
import serverErrorsReducer from "./serverErrors"
import userReducer from "./userReducer";
import errorsOrMsgReducer from "./errorsOrMsgs";
import betReducer from "./betReducer";
import displayElementReducer from "./displayElementReducer";
import leaguesReducer from "./leaguesReducer"


const rootReducer = combineReducers({
  comments: commentsReducer,
  teams: teamsReducer,
  team: teamReducer,
  games: gamesReducer,
  game: gameDetailReducers,
  user: userReducer,
  errorsOrMsg: errorsOrMsgReducer,
  serverErrors: serverErrorsReducer,
  bet: betReducer,
  isDisplay: displayElementReducer,
  leagues: leaguesReducer
});
 
export default rootReducer;
