<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" :loading="isLoading">
          <template v-slot:progress>
            <v-progress-linear
              absolute
              color="blue lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
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
                :disabled="isLoading"
                :error-messages="passwordErrors"
                counter
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
                :disabled="isLoading"
                :error-messages="passwordErrors"
                counter
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="resetPassword" :loading="isLoading" :disabled="isLoading">Reset Password</v-btn>
          </v-card-actions>
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
    isLoading: false,
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
  computed:{
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) {
        return errors;
      }
      !this.$v.form.password.required && errors.push('Password is required');
      !this.$v.form.password.minLength && errors.push('Password must be atleast 6 characters long');
      !this.$v.form.password_confirmation.sameAsPassword && errors.push('Password and confirm password do not match');
      return errors;
    }
  },
  methods: {
    async resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) { /* check if form is valid */
        try {
          this.isLoading = true;
          await this.$axios.$get('sanctum/csrf-cookie');
          await this.$axios.$post('reset-password ', this.form);
          this.$toast.success('Password updated successfully');
          this.$router.push('/login');
        } catch (err) {
          Object.values(err.response.data.errors).forEach(val => {
            this.$toast.error(val[0]);
          });
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
}
</script>
