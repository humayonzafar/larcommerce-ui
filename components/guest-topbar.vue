<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
  >
    <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

    <v-toolbar-title
      style="width: 350px"
    >
      <a href="/" class="white--text" style="text-decoration: none"><v-icon>mdi-truck</v-icon>&nbsp;Laracommerce</a>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down pl-10 ml-4"
    />
    <v-spacer />
    <v-btn href="/cart" icon>
      <v-badge
        content="2"
        value="2"
        color="green"
        overlap
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
    <v-btn to="login">Login</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "GuestTopBar",
  methods:{
  }
}
</script>

<style scoped>

</style>
