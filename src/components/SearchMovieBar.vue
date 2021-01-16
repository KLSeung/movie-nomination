<template>
  <div>
    <v-row 
      :class="{'mx-2': $vuetify.breakpoint.xs, 'mx-16': $vuetify.breakpoint.smAndUp}" 
      justify="center"
    >
      <v-card 
        class="my-12"
        width="100%"
      >
        <v-card-title 
          class="ml-4"
          :class="{'subtitle-2': $vuetify.breakpoint.xs}"
        > 
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
    <v-snackbar
      v-model="isFetchErrorShown"
    >
      Error {{ errorMessageFetchMovie }}: Sorry! We've encountered a problem on our end while getting the movie list.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="isFetchErrorShown = false"
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
  name: 'SearchMovieBar',
  computed: {
    ...mapState({
      isFetchErrorShown: state => state.isFetchErrorShown,
      errorMessageFetchMovie: state => state.errorMessageFetchMovie,
    }),
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
    },
    isFetchErrorShown: {
      get() {
        return this.$store.state.isFetchErrorShown
      },
      set(isShown) {
        this.$store.state.isFetchErrorShown = isShown
      }
    },
  },
  methods: {
    fetchMovies() {
      this.isLoadingResults = true
      clearTimeout(this.searchTimer)

      this.searchTimer = setTimeout(() => {
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
