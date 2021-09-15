Vue.component("edit-form",{
    props: ["editTodoId", "editName", "editDueDate", "editStatus", "editDescription"],
    data: function() {
        return {
            nameInput: ""
        } 
    },
    created (){
        this.nameInput = this.editName

    },
    methods: {

        onSubmitEdit (){
            // console.log(this.editTodoId)
            console.log("=======================")
            console.log(this.editTodoId)
            axios.put(`http://localhost:3000/todos/update/${this.editTodoId}`, {
            name: this.editNewName,
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
                console.log(res)
                this.$emit("onsuccessedit")
                swal("You Updated Recent Todo", "", "success")
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    template: `
    <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Todo List</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <input type="test" class="form-control mt-2" v-model="nameInput" placeholder="name" @keyup.enter="onSubmitEdit">
        <input type="text" class="form-control mt-2" v-model="editDescription" placeholder="description" @keyup.enter="onSubmitEdit">
        <input type="date" class= "form-control mt-2" v-model="editDueDate" @keyup.enter="onSubmitEdit">
        <br>
        <p>Todo or Done</p>
        <label class="switch">
            <input type="checkbox" checked v-model="editStatus" @keyup.enter="onSubmitEdit">
            <span class="slider round"></span>
        </label>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onSubmitEdit">Save changes</button>
        </div>
    </div>
    </div>
    </div>
    `
})