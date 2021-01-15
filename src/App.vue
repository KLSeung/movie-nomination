<template>
  <v-app>
    <v-app-bar color="#43a047" dark app>
      <!-- <div class="d-flex align-center">
        <h2>The Shoppies</h2>
      </div> -->
      <v-app-bar-title
        @click="$router.push('/')"
        class="app-bar-title ml-13"
      >
        The Shoppies
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <SearchMovieBar/>
      <v-row class="mx-16" dense>
        <v-col class="ma-0 pa-0" :class="[this.$vuetify.breakpoint.width > 768 ? 'pr-12' : '']" :cols="cols">
          <SearchMovieResults/>
        </v-col>
        <v-col class="ma-0 pa-0" :cols="cols">
          <NominatedMovies/>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import SearchMovieBar from './components/SearchMovieBar'
import SearchMovieResults from './components/SearchMovieResults'
import NominatedMovies from './components/NominatedMovies'

export default {
  name: 'App',

  components: {
    SearchMovieBar,
    SearchMovieResults,
    NominatedMovies,
  },

  computed:{
    cols() {
      if (this.$vuetify.breakpoint.width <= 768) {
        return 12
      } 
      return 6
    }
  },
};
</script>

<style lang="scss" scoped>
  .app-bar-title {
    cursor: pointer;
  }
</style>
