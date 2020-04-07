if (localStorage.getItem('accessToken')) {
  home()
} else {
  loginForm()
}

// register
function registerForm() {
  $('#login').hide()
  $('#register').show()
  $('#navbar').hide()
  $('#home').hide()
}

// login
function loginForm() {
  $('#login').show()
  $('#register').hide()
  $('#navbar').hide()
  $('#home').hide()
}

//todo table
function home() {
  $('#login').hide()
  $('#register').hide()
  $('#navbar').show()
  $('#add-todo')[0].reset()
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/todos',
    headers: {
      token: localStorage.getItem('accessToken')
    }
  })
    .done(data => {
      $('#list-table').empty();
      let counter = 1
      for (let i = 0; i < data.length; i++) {
        $('#list-table').append(`
        <tr>
        <td>${counter}</td>
        <td>${data[i].title}</td>
        <td>${data[i].description}</td>
        <td><span class="delete" style="color: green" onclick="editStatus(${data[i].id})" id="delete">${data[i].status}</span></td>
        <td>${data[i].due_date}</td>
        <td style="text-align: center;">
        <button type="button" class="btn btn-warning" id="delete" onclick="todoEdit(${data[i].id})" data-toggle="modal" data-target="#modalContactForm">Edit</button>
        <button type="button" class="btn btn-danger" id="delete" onclick="todoDelete(${data[i].id})">Delete</button>
        </td>
        </tr>`)
        counter++
      }
    })
  $('#profile').text(localStorage.getItem('email'));
  $('#home').show()
}



$('#sign-in').on('click', function (e) {
  e.preventDefault();
  loginForm();
});

$('#sign-up').on('click', function (e) {
  e.preventDefault();
  registerForm();
});

// login User
$('#form-sign-in').on('submit', function (e) {
  e.preventDefault();
  let input = {
    email: $('#emailLogin').val(),
    password: $('#passwordLogin').val()
  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/login',
    data: input
  })
    .done(data => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('email', data.email)
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Welcome ${data.email}`,
        showConfirmButton: false,
        timer: 1000
      })
      home()
    })
    .fail(err => {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: `${err.responseJSON.message}`,
        showConfirmButton: false,
        timer: 1000
      })
    })
})

// login user with google
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/google-signin',
    data: {
      token: id_token
    }
  })
    .done(data => {
      console.log(data);
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('email', data.email)
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Welcome ${data.email}`,
        showConfirmButton: false,
        timer: 1000
      })
      home()
    })
}

// register user
$('#form-register').on('submit', function (e) {
  e.preventDefault()
  let input = {
    email: $('#emailRegister').val(),
    password: $('#passwordRegister').val()
  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/register',
    data: input
  })
    .done(data => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('email', data.email)
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `${data.email} has been create`,
        showConfirmButton: false,
        timer: 1500
      })
      home()
    })
    .fail(err => {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: `${err.responseJSON.message}`,
        showConfirmButton: false,
        timer: 1000
      })
    })
})

// sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: `Dont forget to come back`,
      showConfirmButton: false,
      timer: 1500
    })
    console.log('User signed out.');
    localStorage.clear();
    login()
  });
}

// edit status
function editStatus(id) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/todos' + '/' + id,
    headers: {
      token: localStorage.getItem('accessToken')
    }
  }).done(response => {
    console.log(response);
    let status;
    if (response.status === 'incomplete') {
      status = 'complete';
    } else {
      status = 'incomplete';
    }
    let inputData = { status };
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/todos' + '/' + id,
      data: inputData,
      headers: {
        token: localStorage.getItem('accessToken')
      }
    }).done(() => {
      home();
    })
  });
}

// add task
$('#add-todo').on('submit', function (e) {
  e.preventDefault()
  let input = {
    title: $('#title').val(),
    description: $('#description').val(),
    due_date: $('#due_date').val()
  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/todos',
    data: input,
    headers: {
      token: localStorage.getItem('accessToken')
    }
  })
    .done(response => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `${response.title} has been added`,
        showConfirmButton: false,
        timer: 1500
      })
      $('#add-todo')[0].reset();
      $('#exampleModal').modal('toggle');
      home();
    })
    .fail(err => {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: `Input field cannot be empty`,
        showConfirmButton: false,
        timer: 1000
      })
    });
});

// edit task
function todoEdit(id) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/todos' + "/" + id,
    headers: {
      token: localStorage.getItem('accessToken')
    }
  }).done(response => {
    $('#title-edit').val(response.title);
    $('#description-edit').val(response.description);
    $('#date-edit').val(response.due_date);
    $('#edit-todo').on('submit', function (e) {
      e.preventDefault();
      let input = {
        title: $('#title-edit').val(),
        description: $('#description-edit').val(),
        due_date: $('#date-edit').val()
      }
      $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/todos' + '/' + id,
        data: input,
        headers: {
          token: localStorage.getItem('accessToken')
        }
      }).done(() => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: `${response.title} has been edit`,
          showConfirmButton: false,
          timer: 2000
        })
        $('#edit-todo')[0].reset();
        $('#modalContactForm').modal('toggle');
        home();
      })
    });
  })
}

// DELETE TODO
function todoDelete(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
    .then((result) => {
      if (result.value) {
        $.ajax({
          type: 'DELETE',
          url: 'http://localhost:3000/todos' + '/' + id,
          headers: {
            token: localStorage.getItem('accessToken')
          }
        })
          .done(() => {
            home()
          })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
}