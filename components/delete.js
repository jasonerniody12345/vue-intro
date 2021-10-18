Vue.component("delete-form",{
    data: function(){
        return {

        }
    },
    props: ["deleteTodoName", "deleteTodoId"],
    methods: {

        onConfirmDelete () {
            // console.log("==============")
            console.log(this.deleteTodoId)
            
            axios.delete(`https://vue-mongoose.herokuapp.com/todos/delete/${this.deleteTodoId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(res => {
                this.$emit("onsuccessdelete")
                swal("You Just Deleted The Recent Todo", "", "success")
            })
            .catch(err => {
                console.log(err)
            })
        },

    },
    template: `
    <div class="modal fade" id="exampleModalCenter3" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Delete Todo List</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            <p>Are you sure you want to delete todo {{ deleteTodoName }}?</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onConfirmDelete">Confirm</button>
            </div>
        </div>
        </div>
    </div>
    `
})