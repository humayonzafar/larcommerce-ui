<template>
  <v-app>
    <topbar/>
    <navbar/>
    <v-content>
      <Nuxt/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>
