new Vue ({
    el: "#app",
    data: {
        list: [
            {
                name: "jason",
                description: "ngewe",
                date: "12/12/21",
                status: "married"
            }
        ],
        title: "list",
        newList: "",
        newName: "",
        newDescription: "",
        newDate: "",
        newStatus: "",
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
    computed: {
        validateLoginInput: function () {
          return this.emailInput === this.userEmail && this.userPass === this.passInput && this.UserPass !== "" && this.emailInput !== ""
        },
        validateRegisterInput: function(){
            // if(this.userEmail !== "" && this.userPass !== ""){
            //     return false
            // }
            // else {
            //     return true 
            // }
            return this.userEmail !== "" && this.userPass !== ""
        }
    },
    methods: {
        onSubmit () {
            // console.log(this.newList)
            // this.list.push(this.newList)
            this.list.push(this.newName)
            this.list.push(this.newDescription)
            this.list.push(this.newDate)
            this.list.push(this.newStatus)
            // this.newList = ""
        },
        onDelete (index) {
            this.list.splice(index, 1)
        },
        onLogin (){
            if(this.validateLoginInput){
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
        },
        onBack(){
            this.page = "login"
            this.isLoggedIn = false
        }
    }
})