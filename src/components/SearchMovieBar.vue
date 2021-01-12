<template>
  <div>
    <v-row class="mx-16" justify="center">
      <v-card 
        class="my-12"
        width="100%"
      >
        <v-card-title class="ml-4"> 
          <h3>Search Movie by Title</h3>
          <v-icon 
            class="pl-3"
            color="black"
          >
            mdi-movie-open
          </v-icon>
        </v-card-title>
        <v-card-text class="ml-4">
          <v-text-field
            prepend-icon="mdi-magnify"
            v-model="movieSearchText"
            @input="fetchMovies"
            solo
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'SearchMovieBar',
  computed: {
    movieSearchText: {
      get() {
        return this.$store.state.movieSearchText
      },
      set(text) {
        this.$store.state.movieSearchText = text
      }
    },
    isLoadingResults: {
      get() {
        return this.$store.state.isLoadingResults
      },
      set(isLoading) {
        this.$store.state.isLoadingResults = isLoading
      }
    }
  },
  methods: {
    fetchMovies() {
      this.isLoadingResults = true
      clearTimeout(this._timerId)

      this._timerId = setTimeout(() => {
        this.$store.dispatch('fetchMovies')
          .then(() => {
            this.isLoadingResults = false
          })
          .catch(() => {
            this.isLoadingResults = false
          })
      }, 500)
    },
  },
}
</script>

<style scoped>
  .v-text-field {
    width: 90%
  }
</style>
