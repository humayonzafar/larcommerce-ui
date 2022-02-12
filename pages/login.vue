<template>
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
                prepend-icon="md-person"
                name="email"
                label="Email"
                type="email"
                v-model="form.email"
              />
              <!--              <p class="text&#45;&#45;red" v-if="$v && $v.email.$dirty && $v.email.$invalid">-->
              <!--                Please enter a correct email.-->
              <!--              </p>-->
              <v-text-field
                id="password"
                prepend-icon="md-lock"
                name="password"
                label="Password"
                type="password"
                v-model="form.password"
              />
              <!--              <p class="text&#45;&#45;info" v-if="$v && $v.password.$dirty && $v.password.$invalid">-->
              <!--                Password is incorrect.-->
              <!--              </p>-->
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-alert
      shaped
      prominent
      type="error"
      :value="showError"
      transition="scale-transition"
      dismissible
    >
      {{ errors }}
    </v-alert>
  </v-container>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators';
export default {
  name: 'LoginPage',
  layout: 'guest',
  middleware: 'guest',
  head: {
    title: '',
    meta: [
      {hid: 'description', name: 'description', content: 'Login page'}
    ],
  },
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    errors: '',
    showError: false,
    response: null
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      }
    },
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) { /* check if form is valid */
        try {
          await this.$auth.loginWith('laravelSanctum', {data: this.form});
        } catch (err) {
          this.showError = true;
          this.errors = err && err.response.status === 422 ?
            'Could not sign you in with those credentials.' : 'Something went wrong';
        }
      }
    }
  }
}
</script>
