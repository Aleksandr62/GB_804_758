<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn text to="/calculator/">Calculator</v-btn>
      <v-btn text to="/dashboard/">Dashboard</v-btn>         
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
    <v-container fluid>
      
      <router-view></router-view>
    </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
