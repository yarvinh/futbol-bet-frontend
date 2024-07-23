// import { createContext ,useContext} from 'react'
// const { createContext ,useReducer, useContext} = require("react");

// const AppContext = createContext({
//     user: {},
//     games: [],
//     filterGames: [],
//     teams:[]
// })

// export const useAppContext = ()=>{
//     return useContext(AppContext)
// }


// const reducer = (state,action)=>{
//     switch(action.type) {
//         case 'ADD_GAMES':
//           return  {
//             ...state,
//             games: action.payload,
//           }
//           case "ADD_TEAMS":
//           return  {
//             ...state,
//             teams: action.payload,
//           }
//           case "FILTER_GAMES":
//             return  {
//               ...state,
//               teams: action.payload,
//             }
//         default:
//           return state;
//     }
// }

// export const FutbolContextProvider=({children})=> {
//     const [state, dispatch] = useReducer(reducer, {
//         user: {},
//         games: [],
//         teams:[]
//     });

    // console.log(dispatch)

//     return <AppContext.Provider value={{dispatch, user: state.user, games: state.games, teams: state.teams}}>
//         {children}
//     </AppContext.Provider>
// }