# OPM Realtime Project

## Endpoints

List of available endpoints:

- `POST /login`
- `POST /register`

### 1. POST /login

#### Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response (200 - OK)

```json
{
  "user": {
    "userName": "string",
    "email": "string"
  },
  "access_token": "string"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Please register first"
}
```

### 2. POST /register

#### Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Response (201 - Created)

```json
{
  "username": "string",
  "email": "string"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "email is required"
}
OR
{
  "message": "username is required"
}
OR
{
  "message": "email must be unique, please input another email!!"
}
OR
{
  "message": "username must be unique, please input another username!!"
}
OR
{
  "message": "password is required"
}
```

### Global Error

#### Response (401 - Unauthorized)

```json
{
  "message": "Token Failed"
}
```

#### Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```
