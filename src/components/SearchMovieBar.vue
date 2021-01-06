<template>
  <div>
    <v-row class="mx-16" justify="center">
      <v-card 
        class="my-12"
        width="100%"
      >
        <v-card-title class="ml-4"> 
          Search Movie by Title
        </v-card-title>
        <v-card-text class="ml-4">
          <v-text-field
            prepend-icon="mdi-magnify"
            v-model="movieSearchText"
            @input="filterMovie"
            solo
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="mx-16" dense>
      <v-col class="ml-0 pl-0 pr-12" cols="6" >
        <v-card
          width="100%"
          min-height="200%"
        >
          <v-card-title class="ml-4"> 
            Movie Results for "{{ movieSearchText }}""
          </v-card-title>
          <v-card-text class="ml-4">
            <div v-if="filteredMovieList.length <= 0">
              <h2>No Results</h2>
            </div>
            <template v-for="filteredMovie in filteredMovieList">
              <v-row :key="filteredMovie.imdbID" class="my-6">
              {{ filteredMovie.Title }} ({{ filteredMovie.Year}})
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="mr-0 pr-0" cols="6">
        <v-card
          width="100%"
          min-height="200%"
        >
          <v-card-title class="ml-4"> 
            Nominated Movies
          </v-card-title>
          <v-card-text class="ml-4">  
            <div v-if="nominatedMovies.length <= 0">
              <h2>You have not nominated any movies yet!</h2>
              <p>Use the search bar above to find movies you want to nominate</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchMovieBar',

  data: () => ({
    movieSearchText: '',
    filteredMovieList: [],
    nominatedMovies: []
  }),
  methods: {
    filterMovie () {
       axios.get(`http://www.omdbapi.com/?apikey=256754b1&t=${this.movieSearchText}&type=movie`)
        .then(res => {
          this.filteredMovieList = []
          if (res.data.Response === "True") {
            this.filteredMovieList.push(res.data)
          } else {
            this.filteredMovieList = []
          }
       })
    }
  }
}
</script>

<style scoped>
  .v-text-field {
    width: 90%
  }
</style>
