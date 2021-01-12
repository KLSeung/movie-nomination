<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>