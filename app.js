$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyA2N002dj4xD2qojTXjHy5eK9lSYMvaHyk",
        authDomain: "todo-2-ab2a1.firebaseapp.com",
        projectId: "todo-2-ab2a1",
        storageBucket: "todo-2-ab2a1.appspot.com",
        messagingSenderId: "63365815374",
        appId: "1:63365815374:web:52b02a22e4e38d4c59b71f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let todo = firebase.database().ref('todo');
    todo.on('value', function (snapshot) {
        console.log(snapshot.val());

        let data = snapshot.val()
        $('#pending').html(' ')
        $('#completed').html(' ')
        for (let key in data) {
            if (data[key].status === "pending") {
                $('#pending').append(`
                <div class="card">
                    <div class="card-body">
                        <h5>${data[key].task}</h5>
                        <button data-id="${key}" class="btn btn-danger btn-sm delete">Delete</button>
                        <button data-id="${key}" class="btn btn-success btn-sm complete">Completed</button>
                    </div> 
                </div>
               `);
             }
             else{
                 $('#completed').append(`
                 <div class="card">
                 <div class="card-body">
                     <h5>${data[key].task}</h5>
                 </div>
             </div> 
             `);
             }
              

        };
    })
    $('#add-task').click(function () {
        let task = $('#task-input').val();
        lettodoRef = todo.push({
            task: task,
            status: 'pending'
        });
        $('#task-input').val(' ');
        alert("task added")

    });

    //event delegation
    $('#pending').on('click', '.delete', function () {
        let taskId = $(this).data("id");

        //delete the particular task
        firebase.database().ref('todo/' + taskId).remove();
    });
    $('#pending').on('click', '.complete', function () {
        let taskId = $(this).data("id");

        //delete the particular task
        firebase.database().ref('todo/' + taskId).update({
            status: 'completed'
        });
    });
})