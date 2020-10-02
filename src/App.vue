<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer"> 
      <v-list>
        <v-list-item v-for="link of links" :key="link.title" :to="link.url">
        
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>   
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      color="primary"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <v-toolbar-title><router-link to="/" tag="span" class="pointer">Ad application</router-link></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="hidden-sm-and-down" text v-for="link of links" :key="link.title" :to="link.url">
        <v-icon left>{{link.icon}}</v-icon>
        {{link.title}}
      </v-btn>
    </v-app-bar>  
    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    },
    links () {
      if (this.isLogin) {
        return [
          {title: 'New ad', icon: 'mdi-star', url: '/new'},
          {title: 'My ads', icon: 'mdi-star', url: '/list'}
        ]
      } else {
        return [
          {title: 'Login', icon: 'mdi-star', url: '/login'},
          {title: 'Registration', icon: 'mdi-star', url: '/registration'}
        ]
      }
    }
  }
};
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>