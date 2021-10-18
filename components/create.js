Vue.component("create-form",{
    data: function() {
        return {
            newName: "",
            newDescription: "",
            newStatus: "",
            dueDate: ""
        }
    },
    computed: {
        validateContentInput: function(){
            return this.newName !== "" && this.newDescription !== "" && this.dueDate !== ""
        },
    },
    methods: {
        onSubmit () {
                
            axios.post("https://vue-mongoose.herokuapp.com/todos/create", {
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
                this.$emit("onsuccesscreate")
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    template: `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Create Todo List</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <input type="text" class="form-control mt-2"  v-model="newName" placeholder="name" @keyup.enter="onSubmit">
            <input type="text" class="form-control mt-2"  v-model="newDescription" placeholder="description" @keyup.enter="onSubmit">
            <input class= "form-control mt-2" type="date" v-model="dueDate" @keyup.enter="onSubmit"> 
            <br>            
            <p>Todo or Done</p>  
            <label class="switch">
                <input type="checkbox" checked v-model="newStatus" @keyup.enter="onSubmit">
                <span class="slider round"></span>
            </label>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button :disabled="validateContentInput === false" type="button" class="btn btn-primary" data-dismiss="modal" @click="onSubmit">Add List</button>
        </div>
    </div>
    </div>
    </div>
    `
})
