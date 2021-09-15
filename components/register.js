Vue.component("register-form", {
    data: function() {
        return {
          isErrorRegister: true,
          errorMessage: "",
          userFullName: "",
          userEmail: "",
          userPass: "",
        }
    },
  computed: {
      validateRegisterInput: function(){
        // if(this.userEmail !== "" && this.userPass !== ""){
        //     return false
        // }
        // else {
        //     return true 
        // }
        return this.userEmail !== "" && this.userPass !== "" && this.userFullName !== "" 
      }
    },
    methods: {
      onSubmitRegister (){
        if(this.userFullName.length < 6){
            console.log("Fullname is less than 6 alphabet")
            this.errorMessage = "Fullname is less than 6 alphabet"
            this.isErrorRegister = true
        }
        else if (this.userEmail.length < 6) {
            console.log("Email is less than 6 alphabet")
            this.errorMessage = "Email is less than 6 alphabet"
            this.isErrorRegister = true
        }
        else if (this.userPass.length < 6) {
            console.log("Password is less than 6 alphabet")
            this.errorMessage = "Password is less than 6 alphabet"
            this.isErrorRegister = true
        }
        else {
            axios.post("http://localhost:3000/users/create", {
                name: this.userFullName,
                email: this.userEmail,
                password: this.userPass
            })
            .then(response => {
                // console.log(response)
                swal("Registered!", "Redirecting You To Login Page", "success")
                this.userFullName = ""
                this.userEmail = ""
                this.userPass = ""
                this.$emit("onsuccessregister")
                // this.list = response.data.getTodo
            })
            .catch(err => {
                console.log(err)
                this.isError = true
            })
        }
    }
    },
    template: `
    <div class="register">
      <div class="title-register"> 
        <h2>Register</h2>
      </div>
      <div class="fullName-input">
        <input type="text" v-model="userFullName" class="form-control mt-2" placeholder="full Name" required>
      </div>
      <div class="email-input">
        <input type="email" v-model="userEmail" class="form-control mt-2" placeholder="email" required>
      </div>
      <div class="password-input">
        <input type="password" v-model="userPass" class="form-control mt-2" placeholder="password" required>
      </div>
      <div class="register-false mt-3" v-if="isErrorRegister === true">
        <p>{{errorMessage}}</p>
      </div>
      <div class="button-register">
        <button :disabled="validateRegisterInput === false" @click="onSubmitRegister" class="btn btn-primary">register</button>
        <button @click='$emit("onback")' class="btn btn-primary">back</button>
      </div>
    </div>
    `
})