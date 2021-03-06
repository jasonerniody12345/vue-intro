new Vue ({
    el: "#app",
    data: {
        list: [],
        isEmpty: false,
        userFullName: "",
        deleteTodoName: "",
        deleteTodoId: "",
        editTodoId: "",
        title: "list",
        onEditIndex: "",
        updatedList: "",
        newList: "",
        newName: "",
        newDescription: "",
        dueDate: "",
        newStatus: false,
        editName: "",
        editDescription: "",
        editDueDate: "",
        editStatus: "",
        isLoggedIn: true,
        userEmail: "",
        userPass: "",
        emailInput: "",
        passInput: "",
        isError: false,
        isRegister: false,
        registered: false,
        page: "content",
        isError: false,
        isErrorRegisterFullName: false,
        isErrorRegisterEmail: false,
        isErrorRegisterPassword: false
    },
    created (){
        if (localStorage.getItem('token')) {
            axios.post('http://localhost:3000/users/verifyToken', {
                token: localStorage.getItem('token')
            })
            .then(res => {
                console.log(res)
                this.fetchTodoList()
                this.page = 'content'
                this.isLoggedIn = true
            })
            .catch(err => {
                this.page = 'login'
                this.isLoggedIn = false            
            })
        } else {
            this.page = 'login'
            this.isLoggedIn = false
        }
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
            return this.userEmail !== "" && this.userPass !== "" && this.userFullName !== "" 
        },
        validateContentInput: function(){
            return this.newName !== "" && this.newDescription !== "" && this.dueDate !== ""
        },
        createdDate: function(){
            return new Date().toLocaleDateString();
        }
    },
    methods: {
        fetchTodoList () {
            axios.get("http://localhost:3000/todos/getTodo", {

                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(response => {
                // console.log(response.data.getOne)
                if (response.data.getOne.length === 0) {
                    this.isEmpty = true
                }
                else{
                    this.isEmpty = false
                    this.list = response.data.getOne
                }
            })
            .catch(err => {
                console.log(errr)
            })
        },

        onSubmit () {
            
            axios.post("http://localhost:3000/todos/create", {
                name: this.newName,
                description: this.newDescription,
                status: false,
                dueDate: this.newDueDate 
            }, 
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(res => {
                // console.log(res)
                this.newName = "",
                this.newDescription = "",
                this.dueDate = "",
                swal("Sucessfully Added Todo!", "", "success")
                this.fetchTodoList()
            })
            .catch(err => {
                console.log(err)
            })
        },

        onSubmitEdit (){

            // console.log(this.editTodoId)
            axios.put(`http://localhost:3000/todos/update/${this.editTodoId}`, {
               name: this.editName,
               description: this.editDescription,
               status: this.editStatus,
               dueDate: this.editDueDate,
            },
            {
                headers: {
                    token: localStorage.getItem("token")
                } 
            })
            .then(res => {
                // console.log(this.onEditIndex)
                this.fetchTodoList()
                swal("You Updated Recent Todo", "", "success")
            })
            .catch(err => {
                console.log(err)
            })
        },
        onEdit (index){
            // console.log("====", this.list[index])
            // console.log(this.list[index].name)
            // console.log(this.list[index]._id)
            this.onEditIndex = index
            this.editName = this.list[index].name
            this.editDescription = this.list[index].description
            this.editDueDate = this.list[index].dueDate
            this.editStatus = this.list[index].status
            this.editTodoId = this.list[index]._id
        },
        onConfirmDelete () {
            // console.log("==============")
            // console.log(this.deleteTodoId)
            
            axios.delete(`http://localhost:3000/todos/delete/${this.deleteTodoId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(res => {
                this.fetchTodoList()
                swal("You Just Deleted The Recent Todo", "", "success")
            })
            .catch(err => {
                console.log(err)
            })
        },
        onDelete (index){
            // console.log(index)
            // console.log("=========", this.list[index])
            // console.log(this.list[index].name)
            // console.log(this.list)
            this.deleteTodoName = this.list[index].name
            this.deleteTodoId = this.list[index]._id
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
            if(this.userFullName.length < 6){
                console.log("Fullname is less than 6 alphabet")
                this.isErrorRegisterFullName = true
            }
            else if (this.userEmail.length < 6) {
                console.log("Email is less than 6 alphabet")
                this.isErrorRegisterEmail = true
            }
            else if (this.userPass.length < 6) {
                console.log("Password is less than 6 alphabet")
                this.isErrorRegisterPassword = true
            }
            else {
                axios.post("http://localhost:3000/users/create", {
                    name: this.userFullName,
                    email: this.userEmail,
                    password: this.userPass
                })
                .then(response => {
                    // console.log(response)
                    this.page = "login"
                    swal("Registered!", "Redirecting You To Login Page", "success")
                    this.userFullName = ""
                    this.userEmail = ""
                    this.userPass = ""
                    // this.list = response.data.getTodo
                })
                .catch(err => {
                    console.log(err)
                    this.isError = true
                })
            }
        },
        onSubmitLogin (){
            // console.log(this.emailInput)
            // console.log(this.passInput)
            axios.post("http://localhost:3000/users/login", {
                email: this.emailInput,
                password: this.passInput
            })
            .then(response => {
                // console.log(response)
                // taroh swal disini 
                // console.log(response)
                swal("Logged In!", "Redirecting You To Todo Page", "success");
                this.page = "content"
                this.isLoggedIn = true
                localStorage.setItem("token", response.data.accessToken)
                this.emailInput = ""
                this.passInput = ""
                this.fetchTodoList()
                // this.list = response.data.getTodo
            })
            .catch(err => {
                console.log(err)
                this.isError = true
            })
        },
        onBack(){
            this.page = "login"
            this.isLoggedIn = false
            this.list = []
            localStorage.clear();
        }
    }
})