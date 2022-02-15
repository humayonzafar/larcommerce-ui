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
                @input="$v.$reset"
              />
              <p class="red--text px-8" v-if="$v.form.email.$dirty && $v.form.email.$invalid">
                Please enter a correct email.
              </p>
              <v-text-field
                id="password"
                prepend-icon="md-lock"
                name="password"
                label="Password"
                type="password"
                v-model="form.password"
                @input="$v.$reset"
              />
              <p class="red--text px-8" v-if="$v.form.password.$dirty && $v.form.password.$invalid">
                Password is incorrect.
              </p>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <NuxtLink to="/forgot-password">Forgot Password</NuxtLink>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" :loading="loading" :disabled="loading">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import {required, email, minLength} from 'vuelidate/lib/validators';
import {responseType} from "@/constants/responsetypes";
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
    loading: false
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
        this.loading =  true;
        try {
          await this.$auth.loginWith('laravelSanctum', {data: this.form});
          this.$toast.success('Logged in successfully');
        } catch (err) {
          let msg = err.response.data.message;
          if(err && err.response.status === responseType.TOO_MANY_ATTEMPTS){
            msg = 'Invalid Credentials';
          }
          this.$toast.error(msg);
        }finally{
          this.loading = false;
        }
      }
    }
  }
}
</script>
