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
        isRegister: false,
        registered: false,
        page: "content",
    },
    created (){
        if (localStorage.getItem('token')) {
            axios.post('https://vue-mongoose.herokuapp.com/users/verifyToken', {
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
    methods: {
        fetchTodoList () {
            axios.get("https://vue-mongoose.herokuapp.com/todos/getTodo", {

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
                console.log(err)
            })
        },

        onSuccessLogin (){
            this.page = "content"
            this.isLoggedIn = true
            this.fetchTodoList()
        },  

        onSuccessCreate (){
            this.fetchTodoList()
        },

        onSuccessEdit (){
            this.fetchTodoList()
        },

        onSuccessRegister () {
            this.page = "login"
        },

        onSuccessDelete () {
            this.fetchTodoList()
        },
        onEdit (index){
            // console.log("====", this.list[index])
            // console.log(this.list[index].name)
            // console.log(this.list[index]._id)
            // console.log(index, "====================")
            this.onEditIndex = index
            this.editName = this.list[index].name
            this.editDescription = this.list[index].description
            this.editDueDate = this.list[index].dueDate
            this.editStatus = this.list[index].status
            this.editTodoId = this.list[index]._id
        },
        onDelete (index){
            // console.log(index)
            // console.log("=========", this.list[index])
            // console.log(this.list[index].name)
            // console.log(this.list)
            // console.log(this.list)
            // console.log(index)
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
        onBack(){
            this.page = "login"
            this.isLoggedIn = false
            this.list = []
            localStorage.clear();
        }
    }
})