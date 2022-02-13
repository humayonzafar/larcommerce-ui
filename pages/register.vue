<template>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-email"
                  name="name"
                  label="Name"
                  type="text"
                  v-model="form.name"
                />
                <v-text-field
                  prepend-icon="mdi-email"
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
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="register">register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';

export default {
  name: 'RegisterPage',
  layout: 'guest',
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
    errors: ''
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
  methods: {
    async register() {
      try {
        // let errors = [];
        this.$v.$touch();
        if (!this.$v.$invalid) {
          await this.$axios.$get('sanctum/csrf-cookie');
          await this.$axios.$post('/register', this.form)
            .then(() => {
              this.$auth.loginWith('laravelSanctum', {data: this.form});
            })
        }
      } catch (errors) {
        this.errors = errors;
        console.log(errors, 'error');
      }
    }
  }
}
</script>
