<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12"  :loading="isLoading">
          <template v-slot:progress>
            <v-progress-linear
              absolute
              color="blue lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
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
                @input="$v.$reset"
                :disabled="isLoading"
                :error-messages="emailErrors"
                clearable
              />
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                v-model="form.password"
                @input="$v.$reset"
                :disabled="isLoading"
                :error-messages="passwordErrors"
                clearable
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <NuxtLink to="/forgot-password">Forgot Password</NuxtLink>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" :loading="isLoading" :disabled="isLoading">Login</v-btn>
          </v-card-actions>
        </v-card>
        Don't have an account?
        <nuxt-link to="register">Sign Up</nuxt-link>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>

import {required, email} from 'vuelidate/lib/validators';
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
    isLoading: false
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    },
  },
  computed: {
    emailErrors () {
      const errors = [];
      if (!this.$v.form.email.$dirty) {
        return errors;
      }
      !this.$v.form.email.required && errors.push('Email is required');
      !this.$v.form.email.email && errors.push('Must be valid e-mail');
      return errors;
    },
    passwordErrors () {
      const errors = [];
      if (!this.$v.form.password.$dirty) {
        return errors;
      }
      !this.$v.form.password.required && errors.push('Password is required');
      return errors;
    },
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) { /* check if form is valid */
        this.isLoading =  true;
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
          this.isLoading = false;
        }
      }
    }
  }
}
</script>
