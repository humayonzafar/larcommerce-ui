<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!--            @submit.prevent="login"-->
            <v-form>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-visibility_off' : 'mdi-visibility'"
                @click:append="() => (showPassword = !showPassword)"
                v-model="form.password"
              />
              <v-text-field
                id="confirm_password"
                prepend-icon="mdi-lock"
                name="confirm_password"
                label="Confirm Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-visibility_off' : 'mdi-visibility'"
                v-model="form.password_confirmation"
                @click:append="() => (showPassword = !showPassword)"
              />
              <!--              <p class="text&#45;&#45;red" v-if="$v && $v.form.email.$dirty && $v.form.email.$invalid">-->
              <!--                Please enter a correct email.-->
              <!--              </p>-->
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="resetPassword">Reset Password</v-btn>
          </v-card-actions>
          <NuxtLink to="/forgot-password">Forgot Password</NuxtLink>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';

export default {
  name: 'ResetPasswordPage',
  layout: 'guest',
  head: {
    title: '',
    meta: [
      {hid: 'description', name: 'description', content: 'Reset page'}
    ],
  },
  mounted() {
    this.form.email = this.$route.query.email;
    this.form.token = this.$route.params.token;
  },
  data: () => ({
    form: {
      email: '',
      password: '',
      password_confirmation: '',
      token: ''
    },
    errors: '',
    showError: false,
    response: null,
    showPassword: false,
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password_confirmation: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    async resetPassword() {
      this.$v.$touch();
      console.log(this.$v,'this.$v');
      if (!this.$v.$invalid) { /* check if form is valid */
        try {
          await this.$axios.$get('sanctum/csrf-cookie');
          await this.$axios.$post('reset-password ', this.form);
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
