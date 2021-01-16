<template>
  <div>
    <v-card
      width="100%"
      height="100%"
      min-height="300px"
    >
      <v-card-title 
        class="ml-4"
        :class="{'subtitle-2': $vuetify.breakpoint.xs}"
      > 
        <h3>Nominated Movies</h3>
        <v-icon 
          class="pl-3"
          color="yellow darken-2"
        >
          mdi-trophy
        </v-icon>
      </v-card-title>
      <v-card-text class="mb-3">  
        <div class="ml-4" v-if="nominatedMovieList.length <= 0">
          <h2>You have not nominated any movies yet!</h2>
          <p class="my-3">Use the search bar above to find movies you want to nominate. You can nominate up to 5 different movies!</p>
        </div>
        <div v-if="nominatedMovieList.length >= 5">
          <v-alert
            text
            type="info"
            color="green"
            :icon="false"
          >
            <v-row align="center">
              <v-col cols="7" class="grow">
                <span 
                  class="font-weight-bold"
                  :class="{'subtitle-2': $vuetify.breakpoint.xs}"
                >
                  These are your 5 nominated movies!
                </span>
              </v-col>
            </v-row>
          </v-alert>
        </div>
        <ol class="pa-0 ml-4">
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
        </ol>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'NominatedMovies',
    computed: {
      nominatedMovieList: {
        get() {
          return this.$store.state.nominatedMovieList
        },
        set(savedMovies) {
          this.$store.state.nominatedMovieList = savedMovies
        }
      }
    },
    methods: {
      removeNominatedMovie(movieIndex) {
        this.$store.state.nominatedMovieList.splice(movieIndex, 1)
        //Saving in local storage is generally a bad idea, but this is non-sensitive information so it is okay for now
        localStorage.setItem('nominatedMovies', JSON.stringify(this.nominatedMovieList))
      },
    },
    created() {
      if (localStorage.getItem('nominatedMovies').length > 0) {
        this.nominatedMovieList = JSON.parse(localStorage.getItem('nominatedMovies'))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>