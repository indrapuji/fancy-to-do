# fancy-todo

### by Indra Puji Novirwan

#### Fancy To-do App is an application to manage your task.

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

Postman Documentation
For a more precise request of a certain status, check link below Link to postman documentations: https://documenter.getpostman.com/view/10620591/SzYbxwWw

### RESTful endpoints

**_POST /register_**

Sign up account

Request Header

```
{
    "Content-Type": "application/json"
}
```

Response Status 201

```
{
  "email": "indrapujinovirwan@gmail.com",
  "accessToken": "<your_token>"
}
```

Response Status 400

```
{
  "message": "User already exist"
}
```

**_POST /login_**

Sign in account

Request Header

```
{
    'accessToken': '<your_token>'
}
```

Response Status 201

```
{
    "email": "indrapujinovirwan@gmail.com",
    "accessToken": "<your_token>"
}
```

Response Status 400

```
{
    "message": "password salah"
}
```

Response Status 404

```
{
    "message": "email tidak terdaftar"
}
```

**_POST /todos_**

Add Todo

Request Header

```
{
    'token': '<your_token'
}
```

Response Status 201

```
{
    "id": 1,
    "title": "Menambahkan task",
    "description": "menambahkan task baru",
    "status": "incomplete",
    "due_date": "04-04-2020",
    "userId": 1,
    "updatedAt": "2020-04-04T05:59:17.581Z",
    "createdAt": "2020-04-04T05:59:17.581Z"
}
```

**_GET /todos_**

Get all todo

Request Header

```
{
    'token': '<your_token'
}
```

Response Status 200

```
[
    {
        "id": 1,
        "title": "Menambahkan task",
        "description": "menambahkan task baru",
        "status": "incomplete",
        "due_date": "04-04-2020",
        "createdAt": "2020-04-04T05:59:17.581Z",
        "updatedAt": "2020-04-04T05:59:17.581Z",
        "userId": 1
    },
    {
        "id": 2,
        "title": "Menambahkan task ke 2",
        "description": "menambahkan task baru yang ke 2",
        "status": "incomplete",
        "due_date": "04-04-2020",
        "createdAt": "2020-04-04T06:00:35.732Z",
        "updatedAt": "2020-04-04T06:00:35.732Z",
        "userId": 1
    },
    {
        "id": 3,
        "title": "Menambahkan task ke 3",
        "description": "menambahkan task baru yang ke 3",
        "status": "incomplete",
        "due_date": "04-04-2020",
        "createdAt": "2020-04-04T06:00:43.895Z",
        "updatedAt": "2020-04-04T06:00:43.895Z",
        "userId": 1
    },
    {
        "id": 4,
        "title": "Menambahkan task ke 4",
        "description": "menambahkan task baru yang ke 4",
        "status": "incomplete",
        "due_date": "04-04-2020",
        "createdAt": "2020-04-04T06:00:51.332Z",
        "updatedAt": "2020-04-04T06:00:51.332Z",
        "userId": 1
    }
]
```

**_GET /todos/2_**

Get todo by Id

Request Header

```
{
    'token': '<your_token'
}
```

Response Status 200

```
{
    "id": 2,
    "title": "Menambahkan task ke 2",
    "description": "menambahkan task baru yang ke 2",
    "status": "incomplete",
    "due_date": "04-04-2020",
    "createdAt": "2020-04-04T06:00:35.732Z",
    "updatedAt": "2020-04-04T06:00:35.732Z",
    "userId": 1
}
```

Response Status 404

```
{
    "message": "Todo not found"
}
```

**_PUT /todos/2_**

Edit todo

Request Header

```
{
    'token': '<your_token'
}
```

Response Status 200

```
{
    "title": "Menambahkan task ke 2",
    "description": "menambahkan task baru yang ke 2",
    "status": "complete",
    "due_date": "04-04-2020",
    "userId": 1
}
```

Response Status 404

```
{
    "message": "Todo not found"
}
```

**_DELETE /todos/2_**

Delete todo

Request Header

```
{
    'token': '<your_token'
}
```

Response Status 200

```
{
    "deleteData": {
        "id": 3,
        "title": "Menambahkan task ke 3",
        "description": "menambahkan task baru yang ke 3",
        "status": "incomplete",
        "due_date": "04-04-2020",
        "createdAt": "2020-04-04T06:00:43.895Z",
        "updatedAt": "2020-04-04T06:00:43.895Z",
        "userId": 1
    },
    "message": "Has been Deleted"
}
```

Response Status 404

```
{
    "message": "Todo not found"
}
```