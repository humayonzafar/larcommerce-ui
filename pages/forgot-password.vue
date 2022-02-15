<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset Password</v-toolbar-title>
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
              <p class="text--red" v-if="$v.form.email.$dirty && $v.form.email.$invalid">
                Please enter a correct email.
              </p>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <NuxtLink to="/forgot-password">Forgot Password</NuxtLink>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="resetPassword">Reset Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators';

export default {
  name: 'ForgotPasswordPage',
  layout: 'guest',
  middleware: 'guest',
  head: {
    title: '',
    meta: [
      {hid: 'description', name: 'description', content: 'Reset page'}
    ],
  },
  data: () => ({
    form: {
      email: '',
    },
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
    }
  },
  methods: {
    async resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) { /* check if form is valid */
        try {
          await this.$axios.$get('sanctum/csrf-cookie');
          await this.$axios.$post('forgot-password', this.form);
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
