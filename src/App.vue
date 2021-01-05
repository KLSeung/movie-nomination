<template>
  <v-app>
    <v-app-bar app>
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
    </v-main>
  </v-app>
</template>

<script>
import SearchMovieBar from './components/SearchMovieBar';

export default {
  name: 'App',

  components: {
    SearchMovieBar,
  },

  data: () => ({
    //
  }),
};
</script>
