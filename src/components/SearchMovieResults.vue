<template>
  <div>
    <v-card
      class="card-outter mb-8"
      width="100%"
      height="100%"
      min-height="300px"
      :loading="isLoadingResults"
    >
      <v-card-title
        class="ml-4"
        :class="{'subtitle-2': $vuetify.breakpoint.xs}"
      >
        Movie Results for: {{ movieSearchText }}
      </v-card-title>
      <v-card-text class="mb-3">
        <div v-if="filteredMovieList.length <= 0 && isLoadingResults === false">
          <h2 class="ml-4" >No Results Found!</h2>
        </div>
        <ul class="pa-0 ml-4">
          <div v-for="(filteredMovie, index) in filteredMovieList" :key="filteredMovie.imdbID">
            <v-row class="ma-0 pa-0">
              <v-col cols="6">
                <li class="my-2">
                  <button
                    class="link"
                    @click="openMovieInfo(filteredMovie)"
                  >
                   {{ filteredMovie.Title }} ({{ filteredMovie.Year}})
                  </button>
                </li>
              </v-col>
              <v-col cols="6">
                <v-btn
                  class="text-wrap"
                  color="success"
                  @click="nominateMovie(index)"
                  :disabled="checkMovieIsSelected(filteredMovie)"
                  :small='$vuetify.breakpoint.xs'
                >
                  <v-icon left>
                    mdi-trophy
                  </v-icon>
                  Nominate
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </ul>
      </v-card-text>
      <v-card-actions width="100%" class="card-pagination justify-center">
          <v-pagination
          :total-visible="10"
          v-model="movieListPage"
          :length="totalPageLength"
          @input="fetchMovieList"
          />
      </v-card-actions>
      <v-dialog
        v-model="isMovieInfoOpen"
        max-width="800"
        @input="resetSelectedMovieInfo"
      >
        <v-card :loading="isSelectedMovieInfoLoading">
          <v-card-title
            class="ml-4 my-2"
            :class="{'subtitle-2': $vuetify.breakpoint.xs}"
          >
            {{ selectedMovieTitle }} ({{ selectedMovieYear }})
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="my-4"
            v-if="isSelectedMovieInfoLoading === false"
          >
            <v-row>
              <v-col cols="6">
                <v-img
                  class="justify-start ml-4"
                  :src="selectedMovieImg"
                  width="300"
                  contain
                />
              </v-col>
              <v-col cols="6">
                <div>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="info-list__title">
                        <h4>Director:</h4> {{ selectedMovieDirector }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="info-list__title">
                        <h4>Writers:</h4>
                        {{ selectedMovieWriter }}
                      </v-list-item-title>
                  </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="info-list__title">
                        <h4>Actors:</h4>
                        {{ selectedMovieActors }}
                      </v-list-item-title>
                  </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="info-list__title">
                        <h4>IMDB Rating:</h4>
                        {{ selectedMovieRating }}/10
                      </v-list-item-title>
                  </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="info-list__title">
                        <h4>Plot</h4>
                        {{ selectedMoviePlot }}
                      </v-list-item-title>
                  </v-list-item-content>
                  </v-list-item>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>

    <v-snackbar
      v-model="isNominateErrorShown"
    >
      You can only nominate up to 5 movies
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="isNominateErrorShown = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchMovieResults',
  data() {
    return {
      isNominateErrorShown: false,
      isMovieInfoOpen: false,
      isSelectedMovieInfoLoading: false,
      selectedMovieTitle: '',
      selectedMovieYear: '',
      selectedMovieImg: '',
      selectedMovieDirector: '',
      selectedMovieWriter: '',
      selectedMovieActors: '',
      selectedMovieRating: '',
      selectedMoviePlot: '',
    }
  },
  computed: {
    ...mapState({
      filteredMovieList: state => state.filteredMovieList,
      movieSearchText: state => state.movieSearchText,
      totalPageLength: state => state.totalPageLength,
    }),
    movieListPage: {
      get() {
        return this.$store.state.movieListPage
      },
      set(pageNumber) {
        this.$store.state.movieListPage = pageNumber
      },
    },
    isLoadingResults: {
      get() {
        return this.$store.state.isLoadingResults
      },
      set(isLoading) {
        this.$store.state.isLoadingResults = isLoading
      },
    },
    isFetchErrorShown: {
      get() {
        return this.$store.state.isFetchErrorShown
      },
      set(isShown) {
        this.$store.state.isFetchErrorShown = isShown
      },
    },
  },
  methods: {
    fetchMovieList() {
      this.isLoadingResults = true
      this.$store.dispatch('fetchMovies')
        .then(() => {
          this.isLoadingResults = false
        })
        .catch(() => {
          this.isLoadingResults = false
        })
    },
    nominateMovie(movieIndex) {
      if (this.$store.state.nominatedMovieList.length < 5) {
        this.$store.state.nominatedMovieList.push(this.filteredMovieList[movieIndex])
        // Saving in local storage is generally a bad idea,
        // but this is non-sensitive information so it is okay for now
        localStorage.setItem('nominatedMovies', JSON.stringify(this.$store.state.nominatedMovieList))
      } else {
        this.isNominateErrorShown = true
      }
    },
    checkMovieIsSelected(filteredMovie) {
      let isMovieSelected = false
      this.$store.state.nominatedMovieList.forEach((movie) => {
        if (movie.Title === filteredMovie.Title && movie.Year === filteredMovie.Year) {
          isMovieSelected = true
        }
      })
      return isMovieSelected
    },
    openMovieInfo(filteredMovie) {
      this.isSelectedMovieInfoLoading = true
      this.isMovieInfoOpen = true
      this.$store.dispatch('fetchMovieInfo', filteredMovie.imdbID)
        .then(res => {
          this.selectedMovieTitle = res.Title
          this.selectedMovieYear = res.Year
          this.selectedMovieDirector = res.Director
          this.selectedMovieWriter = res.Writer
          this.selectedMovieActors = res.Actors
          this.selectedMovieRating = res.imdbRating
          this.selectedMoviePlot = res.Plot
          this.isSelectedMovieInfoLoading = false
          if (res.Poster === 'N/A') {
            this.selectedMovieImg = 'https://i.imgur.com/oJwdhWr.jpg'
          } else {
            this.selectedMovieImg = res.Poster
          }
        })
    },
    resetSelectedMovieInfo() {
      this.selectedMovieTitle = ''
      this.selectedMovieYear = ''
      this.selectedMovieImg = ''
      this.selectedMovieDirector = ''
      this.selectedMovieWriter = ''
      this.selectedMovieActors = ''
      this.selectedMovieRating = ''
      this.selectedMoviePlot = ''
    },
  },
}
</script>

<style lang="scss" scoped>
  .card-outter {
    position: relative;
    padding-bottom: 50px;
  }
  .card-pagination {
    position: absolute;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .error-text {
    color: red;
  }
  .link {
    background: none;
    border: none;
    outline:none;
    text-align: left;
    color:#2196F3;
  }
  .info-list__title {
    white-space:normal
  }
</style>
