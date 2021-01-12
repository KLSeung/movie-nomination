<template>
  <div>
    <v-card
      width="100%"
      height="550px"
      class="card-outter mb-8"
      :loading="isLoading"
    >
      <v-card-title class="ml-4"> 
        Movie Results for: {{ movieSearchText }}
      </v-card-title>
      <v-card-text class="ml-4">
        <div v-if="filteredMovieList.length <= 0">
          <h2 class="error-text">No Results Found!</h2>
        </div>
        <ul>
          <template v-for="filteredMovie in filteredMovieList">
            <v-row :key="filteredMovie.imdbID" class="ma-0 pa-0">
              <li class="my-2">
                {{ filteredMovie.Title }} ({{ filteredMovie.Year}})
              </li>
            </v-row>
          </template>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data () {
      return {
        isLoading: false
      }
    },
    computed: {
      ...mapState({
        filteredMovieList: state => state.filteredMovieList,
        movieSearchText: state => state.movieSearchText,
        totalPageLength: state => state.totalPageLength
      }),
      movieListPage: {
        get() {
          return this.$store.state.movieListPage
        },
        set(pageNumber) {
          this.$store.state.movieListPage = pageNumber
        }
      }
    },
    methods: {
      fetchMovies() {
        this.isLoading = true
        this.$store.dispatch('fetchMovies')
          .then(() => {
            this.isLoading = false
          })
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
</style>