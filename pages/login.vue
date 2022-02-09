<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-person"
                    name="email"
                    label="Email"
                    type="email"
                    v-model="form.email"
                  />
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="form.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'guest',
  head: {
    title: '',
    meta: [
      { hid: 'description', name: 'description', content: 'Login page' }
    ],
  },
  data:() => ({
    form: {
      email: '',
      password: ''
    },
    errors: ''
  }),
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('laravelSanctum', {data:this.form})
      } catch (err) {
        if (err && err.response.status === 422) {
          this.errors = 'Could not sign you in with those credentials.'
        }
      }
    }
  }
}
</script>
