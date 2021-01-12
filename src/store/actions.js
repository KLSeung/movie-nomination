import axios from 'axios'

const actions = {
  fetchMovies({ commit, state }) {
    console.log(state)
    return new Promise((resolve, reject) => {
      axios.get(`http://www.omdbapi.com/?apikey=256754b1&s=${state.movieSearchText}&page=${state.movieListPage}&type=movie`)
      .then(res => {
        commit('EMPTY_MOVIE_LIST')
        if (res.data.Response === "True") {
          commit('UPDATE_MOVIES', res.data.Search) 
          commit('UPDATE_PAGE_LENGTH', this.totalPageLength = Math.ceil(res.data.totalResults / 10))
          resolve(res)
        } else {
          commit('EMPTY_MOVIE_LIST')
          commit('UPDATE_PAGE_LENGTH', 0)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

export default actions