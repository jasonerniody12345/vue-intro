Vue.component("login-form", {
    data: function() {
        return {
            emailInput: "",
            passInput: "",
            isError: false
              
        }
    },
    methods: {
        onSubmitLogin (){
            // console.log(this.emailInput)
            // console.log(this.passInput)
            axios.post("https://vue-mongoose.herokuapp.com/users/login", {
                email: this.emailInput,
                password: this.passInput
            })
            .then(response => {
                // console.log(response)
                // taroh swal disini 
                localStorage.setItem("token", response.data.accessToken)
                swal("Logged In!", "Redirecting You To Todo Page", "success");
                this.emailInput = ""
                this.passInput = ""
                this.$emit("onsuccesslogin")
                // this.list = response.data.getTodo
            })
            .catch(err => {
                console.log(err)
                this.isError = true
            })
        },
    },
    template: `
    <div class="is-logged-out">
        <div class="title-login"> 
            <h2>Login</h2>
        </div>
        <div class="email-input-1">
            <input type="text" v-model="emailInput" class="form-control mt-2" placeholder="email" required>
        </div>
        <div class=password-input-1>
            <input type="password" v-model="passInput" class="form-control mt-2" placeholder="password" required>
        </div>
        <div class="login-false" v-if="isError === true"> 
            <p>Wrong Username or password</p>
        </div>
        <div class="button-login">
            <button @click="onSubmitLogin()" class="btn btn-primary">login</button>
            <button @click='$emit("onregister")' class="btn btn-primary">register</button>
        </div>
     </div>
    `
})

