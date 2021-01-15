<template>
  <div>
    <v-card
      class="card-outter mb-8"
      width="100%"
      height="100%"
      min-height="300px"
      :loading="isLoadingResults"
    >
      <v-card-title class="ml-4"> 
        Movie Results for: {{ movieSearchText }}
      </v-card-title>
      <v-card-text class="mb-3">
        <div v-if="filteredMovieList.length <= 0 && isLoadingResults === false">
          <h2 class="ml-4 error-text">No Results Found!</h2>
        </div>
        <ul class="pa-0 ml-4">
          <div v-for="(filteredMovie, index) in filteredMovieList" :key="filteredMovie.imdbID">
            <v-row class="ma-0 pa-0">
              <v-col cols="7">
                <li class="my-2">
                  {{ filteredMovie.Title }} ({{ filteredMovie.Year}})
                </li>
              </v-col>
              <v-col cols="5">
                <v-btn
                  color="success"
                  @click="nominateMovie(index)"
                  :disabled="checkMovieIsSelected(filteredMovie)"
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
          @input="fetchMovies"
          />
      </v-card-actions>
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
        isFetchErrorShown: false,
        isNominateErrorShown: false
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
        }
      },
      isLoadingResults: {
        get() {
          return this.$store.state.isLoadingResults
        },
        set(isLoading) {
          this.$store.state.isLoadingResults = isLoading
        }
      },
    },
    methods: {
      fetchMovies() {
        this.isLoadingResults = true
        this.$store.dispatch('fetchMovies')
          .then(() => {
            this.isLoadingResults = false
          })
          .catch(() => {
            this.isLoadingResults = false
            this.isFetchErrorShown = true
          })
      },
      nominateMovie(movieIndex) {
        if (this.$store.state.nominatedMovieList.length < 5) {
          this.$store.state.nominatedMovieList.push(this.filteredMovieList[movieIndex])
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
      }
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
</style>