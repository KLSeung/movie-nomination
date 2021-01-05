<template>
  <div>
    <v-card 
      class="mx-auto my-12"
      max-width="80%"
    >
      <v-card-title class="ml-4"> 
        Search Movie
      </v-card-title>
      <v-card-text class="ml-4">
        <v-text-field
          prepend-icon="mdi-magnify"
          v-model="movieSearchText"
          solo
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'SearchMovieBar',

    data: () => ({
      movieSearchText: ''
    }),
    watch: {
      movieSearchText: function () {
        console.log(this.movieSearchText)
      }
    }
  }
</script>

<style scoped>
  .v-text-field {
    width: 90%
  }
</style>
