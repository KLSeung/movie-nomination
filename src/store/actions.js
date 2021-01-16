import axios from 'axios'

const actions = {
  fetchMovies({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.get(`http://www.omdbapi.com/?apikey=256754b1&s=${state.movieSearchText}&page=${state.movieListPage}&type=movie`)
        .then(res => {
          commit('EMPTY_MOVIE_LIST')
          if (res.data.Response === 'True') {
            commit('UPDATE_MOVIES', res.data.Search)
            commit('UPDATE_PAGE_LENGTH', this.totalPageLength = Math.ceil(res.data.totalResults / 10))
            resolve(res)
          } else if (res.data.Error === 'Too many results.') {
            // This is for the case when there are too many results, but still should have a result
            // An example of a movie like this would be "Up" which
            axios.get(`http://www.omdbapi.com/?apikey=256754b1&t=${state.movieSearchText}&page=${state.movieListPage}&type=movie`)
              .then(singleSearchRes => {
                commit('UPDATE_MOVIES', res.data)
                commit('UPDATE_PAGE_LENGTH', 1)
                resolve(singleSearchRes)
              })
          } else {
            commit('EMPTY_MOVIE_LIST')
            commit('UPDATE_PAGE_LENGTH', 0)
            resolve(res)
          }
        })
        .catch(err => {
          state.isFetchErrorShown = true
          state.errorMessageFetchMovie = err.response.status
          reject(err.response)
        })
    })
  },
}

export default actions
