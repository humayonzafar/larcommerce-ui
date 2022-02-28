<template>
  <v-container>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-12">
        <shop-sidebar/>
      </div>
      <div class="col-md-9 col-sm-9 col-xs-12">
        <v-breadcrumbs
          class="pb-0"
          :items="breadcrums"/>
        <v-row dense>
          <v-col cols="12" sm="8" class="pl-6 pt-6">
            <small>Showing 1-12 of 200 products</small>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px;" outlined
                      dense></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <template v-if="products.length>0">
          <div class="row text-center">

            <template v-for="product in products">
              <div class="col-md-3 col-sm-6 col-xs-12" :key="product.id">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="mx-auto"
                    color="grey lighten-4"
                    max-width="600"
                  >
                    <v-img
                      :aspect-ratio="16/9"
                      :src="product.image[0].file_url"
                      height="200px"
                      class="white--text align-end"
                    >
                      <v-card-title>{{ product.category.name }}</v-card-title>
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                          style="height: 100%;"
                        >
                          <v-btn v-if="hover" href="/product" class="" outlined>VIEW</v-btn>
                        </div>

                      </v-expand-transition>
                    </v-img>
                    <v-card-text class="text--primary">
                      <div><a href="/product" style="text-decoration: none">{{ product.name }}</a></div>
                      <div>${{ product.price }}</div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </div>
            </template>
          </div>
          <div class="text-center mt-12">
            <v-pagination
              v-model="page"
              :length="productsMeta.meta.last_page"
              @input="onPaginateClick"
            />
          </div>
        </template>
        <template v-if="products.length===0">
          <p> No Items Found...! </p>
        </template>
      </div>
    </div>
  </v-container>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}
</style>
<script>
export default {
  // async asyncData({$axios, route}) {
  //   try {
  //
  //     // const page = route.query.page ?? 0;
  //     // const category_id = route.query.category_id ?? '';
  //     // const range = route.query.range ?? '';
  //     // const selected_sizes = route.query.selected_sizes ?? '';
  //
  //
  //     console.log(route.query, 'route.query');
  //     // const {data, ...rest} = await $axios.$get(`/api/products`, {params: {...route.query} });
  //     // return {products: data, productsMeta: rest};
  //   } catch (e) {
  //     console.log(e, 'e');
  //   }
  // },
  data: () => ({
    select: 'Popularity',
    products: [],
    productsMeta: [],
    options: [
      'Default',
      'Popularity',
      'Relevance',
      'Price: Low to High',
      'Price: High to Low',
    ],
    page: 1,
    breadcrums: [
      {
        text: 'Home',
        disabled: false,
        href: 'breadcrumbs_home',
      },
      {
        text: 'Clothing',
        disabled: false,
        href: 'breadcrumbs_clothing',
      },
      {
        text: 'T-Shirts',
        disabled: true,
        href: 'breadcrumbs_shirts',
      },
    ]
  }),
  async fetch() {
    try {
      const {data, ...rest} = await this.$axios.$get(`/api/products`, {params: {...this.$route.query}});
      this.products = data;
      this.productsMeta = rest;
    } catch (e) {
      console.log('something went wrong', e);
    }
  },
  created() {
    this.$nextTick(() => {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    });
  },
  methods: {
    async onPaginateClick(value) {
      await this.$router.push({path: 'shop', query: {page: value, ...this.$route.query}});
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
}
</script>
