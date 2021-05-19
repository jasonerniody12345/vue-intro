new Vue ({
    el: "#app",
    data: {
        list: [
            {
                name: "jason",
                description: "tarek sis",
                dueDate: "2021-05-10",
                status: "todo"
            },
            {
                name: "justin",
                description: "mantoel",
                dueDate: "2021-05-04",
                status: "todo"
            }
        ],
        title: "list",
        updatedList: "",
        newList: "",
        newName: "",
        newDescription: "",
        dueDate: "",
        newStatus: "",
        isLoggedIn: true,
        userEmail: "",
        userPass: "",
        emailInput: "",
        passInput: "",
        isError: false,
        isRegister: false,
        registered: false,
        page: "content"
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
        },
        validateContentInput: function(){
            return this.newName !== "" && this.newDescription !== "" && this.dueDate !== ""
        },
        createdDate: function(){
            return new Date().toLocaleDateString();
        }
    },
    methods: {
        onSubmit () {
            // console.log(this.newList)
            // this.list.push(this.newList)
            // this.newList = ""
            this.list.push({
                name: this.newName,
                description: this.newDescription,
                dueDate: this.dueDate,
                status: "todo"
                // status: this.newStatus
            })
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