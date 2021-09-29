Vue.component("content-form", {
    data: function() {
        return {
            title: "list",
        }
    },
    props: ["list", "isEmpty"],
    computed: {
      createdDate: function(){
        return new Date().toLocaleDateString();
      }
    },
    methods: {
        onDelete (index){
          console.log(index)
          this.$emit("ondelete", index)
        },
        onEdit (index){
          this.$emit("onedit", index)
        }
    },
    template: `
    <div class="is-logged-in">
    <div class="title-content">
    <h2>{{ title }}</h2>
  </div>
  <div class="add-button">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Add Todo List</button>
    <button @click='$emit("onback")' class="btn btn-primary">Logout</button>
  </div>
    <div class="table" v-if="isEmpty === false">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Created Date</th>
          <th scope="col">Due Date</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <th scope="row"> <p v-bind:class="{'red-text': item.status === false, 'green-text': item.status === true}"> {{ index + 1 }} </p></th>
          <td><p> {{ item.name }} </p></td>
          <td><p> {{ item.description }} </p></td>
          <td><p> {{ createdDate }} </p></td>
          <td><p> {{ item.dueDate }} </p></td>
          <td v-if="item.status === true"><p style="color:green"> done </p></td>
          <td v-else="item.status === false"><p style="color:red"> todo </p></td>
          <td><p><a href = "#"data-toggle="modal" data-target="#exampleModalCenter2" @click="onEdit(index)">Edit</a> | <a href = "#" data-toggle="modal" data-target="#exampleModalCenter3" @click="onDelete(index)">Delete</a></p></td>
        </tr>
      </tbody>
    </table>
    </div>
    </div>
    `
})