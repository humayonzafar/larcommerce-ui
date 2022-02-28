<template>
  <v-card outlined>
    <v-card-title>Filters</v-card-title>
    <v-divider></v-divider>
    <template>
      <v-treeview
        :items="categoryTypes.data"
        :item-key="categoryTypes.data.id"
        item-children="categories"
        selection-type="leaf"
        :selected-color="'#fff'"
        activatable
        open-on-click
        dense
        @update:active="selectedCategories"
      />
    </template>
    <v-divider></v-divider>
    <v-card-title>Price</v-card-title>
    <v-range-slider
      v-model="range"
      :max="max"
      :min="min"
      :height="10"
      class="align-center"
      dense
      @end="onSliderChange"
    ></v-range-slider>
    <v-row class="pa-2" dense>
      <v-col cols="12" sm="5">
        <v-text-field
          :value="range[0]"
          label="Min"
          outlined
          dense
          @change="onRangeChange($event, 0)"

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
          @change="onRangeChange($event, 1)"
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
      <v-checkbox
        v-for="size in sizes.data"
        :key="size.id"
        :value="size.id"
        v-model="selectedSizes"
        :label="size.size"
        hide-details dense/>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "sidebar",
  async fetch() {
    try {
      const [sizes, categoryTypes] = await Promise.all([
        this.$axios.$get('/api/product-sizes'),
        this.$axios.$get('/api/category-types')
      ]);
      this.sizes = sizes;
      this.categoryTypes = categoryTypes;
    } catch (e) {
      console.log('something went wrong', e);
    }
  },
  data() {
    return {
      range: [0, 10000],
      min: 0,
      max: 10000,
      sizes: [],
      selectedSizes: [],
      categoryTypes: [],
      selectedCategory: ''
    }
  },
  mounted() {
    console.log('created');
    if ('selected_sizes' in this.$route.query && this.$route.query.selected_sizes && this.$route.query.selected_sizes !== '') {
      const values = this.$route.query.selected_sizes.split(",").map(val => parseInt(val));
      if (values && values.length > 0) {
        this.selectedSizes = values;
      }
    }
    if ('category_id' in this.$route.query && this.$route.query.category_id) {
      this.selectedCategory = this.$route.query.category_id;
    }
    if ('range' in this.$route.query && this.$route.query.range) {
      const values = this.$route.query.range.split(",").map(val => parseInt(val));
      if (values && values.length === 2) {
        this.range = values;
      }
    }
  },
  watch: {
    selectedCategory: {
      handler(value) {
        this.$nextTick(() => {
          this.updateRouteParams('category_id', value);
        });
      }
    },
    selectedSizes: {
      handler(value) {
        this.$nextTick(() => {
          const sizes = value == null || value.length <= 0 ? '' : value.join(',');
          if (sizes) {
            this.updateRouteParams('selected_sizes', sizes);
          }
        });
      }
    },
  },
  methods: {
    selectedCategories(val) {
      this.selectedCategory = val && val.length > 0 ? val[0] : this.selectedCategory;
    },
    onSliderChange(value) {
      this.range = value;
      console.log(this.range.toString(), 'this.range.toString()')
      this.updateRouteParams('range', this.range.toString());
    },
    onRangeChange(value, index) {
      this.range[index] = parseInt(value);
      console.log(this.range.toString(), 'this.range.toString()')
      this.updateRouteParams('range', this.range.toString());
    },
    updateRouteParams(key, data) {
      const queryParams = {...this.$route.query, [key]: data};
      delete queryParams.page;
      this.$router.push({path: 'shop', query: queryParams});
    }
  }
}
</script>

<style scoped>

</style>
