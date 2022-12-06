<template>
   <v-app>
  <v-app-bar
  dark
  color="blue"
  elevation="4"
  >
  <v-toolbar-title>Assignment</v-toolbar-title>
</v-app-bar>
  <v-container fluid fill-height>
       <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
             <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                   <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form ref="form" @submit.prevent="submit">
                  <v-alert type="error" :value="alert">
                    {{ serverErrorMessage }}
                  </v-alert>
                       <v-text-field
                         ref="email"
                         name="email"
                         label="Email"
                         type="text"
                         placeholder="Email"
                         required 
                         v-model="form.email" 
                        :rules="rules.email"
                        @update:error="emailError"
                      ></v-text-field>
                      
                       <v-text-field
                         ref="password"
                         v-model="form.password"
                         name="password"
                         label="Password"
                         type="password"
                         placeholder="password"
                         required
                         :rules="rules.password"
                         @update:error="passwordError"
                      ></v-text-field>

                      <v-row
                           align="center"
                           justify="space-around"
                        >
                      
                        <v-btn
                        :disabled="!formIsValid"
                        class="mt-4" 
                        color="primary"
                        type="submit"
                       >Submit
                     </v-btn>
                      <v-btn
                           class="mt-4"
                           depressed
                           color="primary"
                           @click="resetForm"
                        >RESET
                        </v-btn>
                     </v-row>
                     </v-form>
                </v-card-text>
             </v-card>
           
          </v-flex>
       </v-layout>
    </v-container>
</v-app>
</template>
<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
   const defaultForm = Object.freeze({
        email: '',
        password: ''
      })
   const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
   const upercase = /(?=.*?[A-Z])/;
   const lowercase = /(?=.*?[a-z])/;
   const specialChar = /(?=.*?[#?!@$%^&*-])/
    return {
      form: Object.assign({}, defaultForm),
      rules: {
          email: [val => (val || '').length > 0 || 'Email is required', val => emailRegex.test(val) || 'Email should be valid'],
          password: [val => (val || '').length > 0 || 'Password is required', 
          val => (upercase.test(val) && lowercase.test(val)) || 'Must contain one upercase and lowercase',
          val => specialChar.test(val) || 'Must have one special character',
          val => val.length >= 8 || "Minimum length should be 8 characters"
         ],
        },
        defaultForm,
        emailErr: true,
        passwordErr: true,
        serverErrorMessage: '',
        alert: false
    };
  },
  computed: {
      formIsValid () {
         // const isValid = this.$refs.email.validate();
         if(this.emailErr == false && this.passwordErr == false)
         return true
         else
          return false
      },
    },
  methods: {
   emailError(isError) { 
            
            this.emailErr = isError
            //console.log("Email",this.emailErr)
         },
   passwordError(isError) { 
      this.passwordErr = isError
      //console.log("Password",this.passwordErr)
   },
   resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        //this.$refs.form.reset()
      },
   submit () {
      //this.resetForm()
      const data = {
      email: this.form.email,
      password: this.form.password
      }
      axios
      .post('http://restapi.adequateshop.com/api/authaccount/login',data,{
      headers: {
         'Content-Type': 'application/json'
      }})
      .then(response => {
         //console.log(response.data.code)
         if(response.data.code == 1){
            this.alert = true
            this.serverErrorMessage = response.data.message
            setTimeout(()=>{
               this.alert = false
               this.serverErrorMessage = ''
            },3000)
         }else if(response.data.code == 0)
         this.$router.replace({ name: "ProductListing", params:{ username: this.form.email} });
      })
      .catch(error => {
         console.log(error)
      })

   }
  },
};
</script>