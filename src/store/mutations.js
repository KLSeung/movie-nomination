const mutations = {
  UPDATE_MOVIES(state, movies) {
    if (Array.isArray(movies)) {
      state.filteredMovieList = movies
    } else {
      state.filteredMovieList.push(movies)
    }
  },
  EMPTY_MOVIE_LIST(state) {
    state.filteredMovieList = []
  },
  UPDATE_PAGE_LENGTH(state, length) {
    state.totalPageLength = length
  },
}

export default mutations
