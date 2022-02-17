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
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
                v-model="form.email"
                :disabled="isLoading"
                :error-messages="emailErrors"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
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
    isLoading: false
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
    }
  },
  computed:{
    emailErrors () {
      const errors = [];
      if (!this.$v.form.email.$dirty) {
        return errors;
      }
      !this.$v.form.email.required && errors.push('Email is required');
      !this.$v.form.email.email && errors.push('Must be valid e-mail');
      return errors;
    },
  },
  methods: {
    async resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) { /* check if form is valid */
        try {
          this.isLoading = true;
          await this.$axios.$get('sanctum/csrf-cookie');
          await this.$axios.$post('forgot-password', this.form);
          this.$toast.success('Email sent successfully');
        } catch (err) {
          Object.values(err.response.data.errors).forEach(val => {
            this.$toast.error(val[0]);
          });
        }
        finally {
          this.isLoading = false;
        }
      }
    }
  }
}
</script>
