new Vue ({
    el: "#app",
    data: {
        list: [
            "list1",
            "list2"
        ],
        title: "list",
        newList: "",
        isLoggedIn: false,
        userEmail: "",
        userPass: "",
        emailInput: "",
        passInput: "",
        isError: false,
        isRegister: false,
        registered: false,
        page: "login"
    },
    methods: {
        onSubmit () {
            // console.log(this.newList)
            this.list.push(this.newList)
            this.newList = ""
        },
        onDelete (index) {
            this.list.splice(index, 1)
        },
        onLogin (){
            if(this.emailInput === this.userEmail && this.userPass === this.passInput){
                this.isLoggedIn = true
                this.page = "content"
            }
            else{
                console.log("Email or Password wrong")
                this.isError = true
            }
        },
        onRegister (){
            this.page = "register"
            // this.isRegister = true
        },
        onSubmitRegister (){
            this.page = "login"
        }
    }
})