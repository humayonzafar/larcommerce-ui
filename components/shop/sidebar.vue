<template>
  <v-card outlined>
    <!--    <v-card-title>Filters</v-card-title>-->
    <!--    <v-divider></v-divider>-->
    <!--    <template>-->
    <!--      <v-treeview :items="items" :open="[1]" :active="[5]" :selected-color="'#fff'" activatable open-on-click-->
    <!--                  dense></v-treeview>-->
    <!--    </template>-->
        <v-divider></v-divider>
        <v-card-title>Price</v-card-title>
        <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          :height="10"
          class="align-center"
          dense
        ></v-range-slider>
        <v-row class="pa-2" dense>
          <v-col cols="12" sm="5">
            <v-text-field
              :value="range[0]"
              label="Min"
              outlined
              dense
              @change="$set(range, 0, $event)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <p class="pt-2 text-center">TO</p>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              :value="range[1]"
              label="Max"
              outlined
              dense
              @change="$set(range, 1, $event)"
            ></v-text-field>
          </v-col>
        </v-row>
    <v-divider></v-divider>
    <v-card-title class="pb-0">Customer Rating</v-card-title>
    <v-container class="pt-0" fluid>
      <v-checkbox append-icon="mdi-star" label="4 & above" hide-details dense></v-checkbox>
      <v-checkbox append-icon="mdi-star" label="3 & above" hide-details dense></v-checkbox>
      <v-checkbox append-icon="mdi-star" label="2 & above" hide-details dense></v-checkbox>
      <v-checkbox append-icon="mdi-star" label="1 & above" hide-details dense></v-checkbox>
    </v-container>
    <v-divider></v-divider>
    <v-card-title class="pb-0">Size</v-card-title>
    <v-container class="pt-0" fluid>
      <v-checkbox v-for="size in sizes.data" :key="size.id" :label="size.size" hide-details dense></v-checkbox>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "sidebar",
  async fetch() {
    this.sizes = await this.$axios.$get('/api/product-sizes');
  },
  data() {
    return {
      range: [0, 10000],
      min:0,
      max:10000,
      sizes: []
    }
  }
}
</script>

<style scoped>

</style>
