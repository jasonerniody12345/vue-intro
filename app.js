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
        userEmail: "user",
        userPass: "user123",
        emailInput: "",
        passInput: "",
        isError: false
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
        onLogin(){
            if(this.emailInput === this.userEmail && this.userPass === this.passInput){
                this.isLoggedIn = true
            }
            else{
                console.log("Email wrong")
                this.isError = true
            }
        },
        onReset(){
            this.emailInput = ""
            this.passInput = ""  
        }
    }
})