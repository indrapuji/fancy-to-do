# fancy-todo

### by Indra Puji Novirwan

#### Fancy To-do App is an application to manage your task.

- RESTful endpoint for asset's CRUD operation
- JSON formatted response
---

### Response Formats  
The default response format is JSON
```
application/json
```  
### Authentication  
```
access_token  
```
---
## Routes
All routes need to be prefixed with
> ### <https://server-todoapp-13042020.herokuapp.com>  
---  

Postman Documentation  
For more precise request status check link below  
<https://documenter.getpostman.com/view/10620591/SzYbxwWw>


### RESTful endpoints

**_POST /register_**

> Register new account  
> (after register will automatic login)

Request Body  
```
{
    email: String
    password: String
}
```

Response Status (201 - Created)

```
{
  "email": "<email>",
  "accessToken": "<your_token>"
}
```

Response Status (400 - Bad Request)

```
{
  "message": "User already exist"
}
```

Response Status (500 - Internal Server Error)

```
{
  "message": "Internal server Error"
}
```

**_POST /login_**

> Sign in account  

Request Body  
```
{
    email: String
    password: String
}
```

Request Header

```
{
    "accessToken": "<your_token>"
}
```

Response Status (201 - OK)

```
{
    "email": "<email>",
    "accessToken": "<your_token>"
}
```

Response Status (400 - Bad Request)

```
{
    "message": "wrong password"
}
```

Response Status (404 - Not Found)

```
{
    "message": "email not found"
}
```

Response Status (500 - Internal Server Error)

```
{
  "message": "Internal server Error"
}
```

**_POST /todos_**

> Add Todo

Request Header

```
{
    "accessToken": "<your_token>"
}
```

Request Body  
```
{
    title: String
    description: String
    due_date: String
}
```

Response Status (201 - Created)

```
{
    "id": 1,
    "title": "title",
    "description": "description",
    "status": "status",
    "due_date": "date",
    "userId": 1
}
```

Response Status (400 - Bad Request)

```
[
  {
    "message": "Title cannot be empty"
  },
  {
    "message": "Description cannot be empty"
  },
  {
    "message": "Due date cannot be empty"
  }
]
```

Response Status (500 - Internal Server Error)

```
{
  "message": "Internal server Error"
}
```


**_GET /todos_**

> Get all todo

Request Header

```
{
    "accessToken": "<your_token>"
}
```

Response Status (200 - OK)

```
[
    {
        "id": 1,
        "title": "title",
        "description": "description",
        "status": "status",
        "due_date": "date",
        "userId": 1
    },
    {
        "id": 2,
        "title": "title",
        "description": "description",
        "status": "status",
        "due_date": "date",
        "userId": 1
    },
    {
        "id": 3,
        "title": "title",
        "description": "description",
        "status": "status",
        "due_date": "date",
        "userId": 1
    }
]
```

Response Status (500 - Internal Server Error)

```
{
  "message": "Internal server Error"
}
```

**_GET /todos/:id_**

> Get todo by Id

Request Header

```
{
    "accessToken": "<your_token>"
}
```

Response Status (200 - OK)

```
{
    "id": id,
    "title": "title",
    "description": "description",
    "status": "status",
    "due_date": "date",
    "userId": 1
}
```

Response Status (404 - Bad Request)

```
{
    "message": "Todo not found"
}
```

Response Status (500 - Internal Server Error)

```
{
  "message": "Internal server Error"
}
```

**_PUT /todos/:id_**

> Edit todo

Request Header

```
{
    "accessToken": "<your_token>"
}
```

Request Body  
```
{
    title: String
    description: String
    due_date: String
}
```

Response Status (200 - Success)

```
{
    "title": "new title",
    "description": "new description",
    "status": "new status",
    "due_date": "new date",
    "userId": 1
}
```

Response Status (400 - Bad Request)
```
[
    {
        "message": "Title cannot be empty"
    },
    {
        "message": "Description cannot be empty"
    },
    {
        "message": "Status cannot be empty"
    },
    {
        "message": "Due date cannot be empty"
    }
]
```

Response Status (404 - Not Found)

```
{
    "message": "Todo not found"
}
```

Response Status (500 - Internal Server Error)

```
{
  "message": "Internal server Error"
}
```

**_DELETE /todos/:id_**

> Delete todo

Request Header

```
{
    "accessToken": "<your_token>"
}
```

Response Status (200 - OK)

```
{
    "deleteData": {
        "id": 1,
        "title": "title",
        "description": "description",
        "status": "status",
        "due_date": "date",
        "userId": 1
    },
    "message": "Has been Deleted"
}
```

Response Status (404 - Bad Request)

```
{
    "message": "Todo not found"
}
```

Response Status (500 - Internal Server Error)

```
{
  "message": "Internal server Error"
}
```