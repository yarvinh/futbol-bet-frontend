export const TeamsReducer = (state = { teams: [], loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_TEAMS':
        return state = {
           ...state,
          teams: [...state.teams],
          loading: true
        }
      case 'ADD_TEAMS':
        return {
           ...state,
          teams: action.teams,
          loading: false
        }
      default:
        return state;
    }
  }
