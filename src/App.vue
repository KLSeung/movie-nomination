<template>
  <v-app>
    <v-app-bar color="#43a047" dark app>
      <div class="d-flex align-center">
        <h2>The Shoppies</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <SearchMovieBar/>
      <v-row class="mx-16" dense>
        <v-col class="ml-0 pl-0 pr-12" cols="6">
          <SearchMovieResults/>
        </v-col>
        <v-col class="mr-0 pr-0" cols="6">
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

  data: () => ({
    //
  }),
};
</script>
