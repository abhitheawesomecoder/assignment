<template>
    <v-app id="inspire">
      <v-app-bar
      dark
      color="blue"
      elevation="4"
      >
  
        <v-toolbar-title>Product Listing</v-toolbar-title>
  
        <v-spacer></v-spacer>

      </v-app-bar>
  
      <v-main>
        <v-container>
          <v-row>
            <v-col
              v-for="n in 24"
              :key="n"
              cols="4"
            >
              <v-card height="200"></v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
    export default {
      //
    }
  </script>