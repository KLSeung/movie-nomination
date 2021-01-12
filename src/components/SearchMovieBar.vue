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
          height="530px"
          class="mb-8"
        >
          <v-card-title class="ml-4"> 
            Movie Results for: {{ movieSearchText }}
          </v-card-title>
          <v-card-text class="ml-4">
            <div v-if="filteredMovieList.length <= 0">
              <h2>No Results Found!</h2>
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
           <v-pagination
            :total-visible="10"
            v-model="page"
            :length="totalPageLength"
            circle
            @input="filterMovie"
          ></v-pagination>
        </v-card>
      </v-col>
      <v-col class="mr-0 pr-0" cols="6">
        <v-card
          width="100%"
        >
          <v-card-title class="ml-4"> 
            <h3>Nominated Movies</h3>
            <v-icon 
              class="pl-3"
              color="yellow darken-2"
            >
              mdi-trophy
            </v-icon>
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
    nominatedMovies: [],
    page: 1,
    totalPageLength: 0
  }),
  methods: {
    filterMovie () {
       axios.get(`http://www.omdbapi.com/?apikey=256754b1&s=${this.movieSearchText}&page=${this.page}&type=movie`)
        .then(res => {
          this.filteredMovieList = []
          console.log(res)
          if (res.data.Response === "True") {
            this.filteredMovieList = res.data.Search
            this.totalPageLength = Math.ceil(res.data.totalResults / 10)
          } else {
            this.filteredMovieList = []
            this.totalPageLength = 0
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
