<template>
  <div>
    <v-card
      width="100%"
      height="100%"
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
        <div v-if="nominatedMovieList.length <= 0">
          <h2>You have not nominated any movies yet!</h2>
          <p>Use the search bar above to find movies you want to nominate</p>
        </div>
        <ul class="pa-0 ml-4">
          <div v-for="(nominatedMovie, index) in nominatedMovieList" :key="nominatedMovie.imdbID">
            <v-row class="ma-0 pa-0">
              <v-col cols="7">
                <li class="my-2">
                  {{ nominatedMovie.Title }} ({{ nominatedMovie.Year}})
                </li>
              </v-col>
              <v-col cols="5">
                <v-btn
                  color="red"
                  icon
                  @click="removeNominatedMovie(index)"
                >
                  <v-icon>
                    mdi-close-thick
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'NominatedMovies',
    computed: {
      nominatedMovieList() {
        return this.$store.state.nominatedMovieList
      }
    },
    methods: {
      removeNominatedMovie(movieIndex) {
        this.$store.state.nominatedMovieList.splice(movieIndex, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>