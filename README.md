# fancy-to-do
Fancy To-do App is an application to manage your task. This app has :

* RESTful endpoint for asset's CRUD operation 
* JSON formatted response


##RESTful endpoints

**POST /todos**

*Request Body :*

```
{
        "title": "Membuat dokumentasi",
        "description": "Membuat dokumentasi untuk Api",
        "due_date": "2020-03-30",
}

```

*Response:*

{
    "todo": {
        "id": 4,
        "title": "Membuat dokumentasi",
        "description": "Membuat dokumentasi untuk Api",
        "status": false,
        "due_date": "2020-03-30",
        "updatedAt": "2020-03-30T10:24:52.005Z",
        "createdAt": "2020-03-30T10:24:52.005Z"
    }
}

