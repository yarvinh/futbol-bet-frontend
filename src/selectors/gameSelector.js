export const gameSelector = (games,filterBy) => {
    if(filterBy === 'all')
        return games
    else
        return games.filter( game => game.league.id.toString() === filterBy)
}

