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
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-circle"
                name="name"
                label="Name"
                type="text"
                v-model="form.name"
                :disabled="isLoading"
                :error-messages="nameErrors"
                hint="Enter your username"
                @input="$v.$reset"
              />
              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
                v-model="form.email"
                :disabled="isLoading"
                :error-messages="emailErrors"
                @input="$v.$reset"
              />
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showPassword = !showPassword)"
                v-model="form.password"
                :disabled="isLoading"
                :error-messages="passwordErrors"
                counter
                @input="$v.$reset"
              />
              <v-text-field
                id="confirm_password"
                prepend-icon="mdi-lock"
                name="confirm_password"
                label="Confirm Password"
                :type="showConfPassword ? 'text' : 'password'"
                :append-icon="showConfPassword ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="form.password_confirmation"
                @click:append="() => (showConfPassword = !showConfPassword)"
                :disabled="isLoading"
                :error-messages="passwordErrors"
                counter
                @input="$v.$reset"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register" :loading="isLoading" :disabled="isLoading">register</v-btn>
          </v-card-actions>
        </v-card>
        Already have a account?
        <v-btn to="login" plain color="primary">Login</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';

export default {
  name: 'RegisterPage',
  layout: 'guest',
  middleware: 'guest',
  head: {
    title: '',
    meta: [
      {hid: 'description', name: 'description', content: 'Register page'}
    ],
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    showPassword: false,
    showConfPassword: false,
    isLoading: false
  }),
  validations: {
    form: {
      name: {
        required
      },
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
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) {
        return errors;
      }
      !this.$v.form.name.required && errors.push('Name is required');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) {
        return errors;
      }
      !this.$v.form.email.required && errors.push('Email is required');
      !this.$v.form.email.email && errors.push('Must be valid e-mail');
      return errors;
    },
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
    async register() {
      try {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.isLoading = true;
          await this.$axios.$get('sanctum/csrf-cookie');
          await this.$axios.$post('/register', this.form)
            .then(() => {
              this.$auth.loginWith('laravelSanctum', {data: this.form});
              this.$toast.success('Account created successfully');
            })
        }
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
</script>
