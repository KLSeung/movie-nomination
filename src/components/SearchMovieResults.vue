<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>