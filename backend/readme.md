
# User API Documentation


## Endpoint: `POST /user/register`

---

### Description

This endpoint allows a new user to register by providing their full name, email, and password. Upon successful registration, a JWT token and user details are returned.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "<user_id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

#### Missing Fields

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "All fields are required"
        }
      ]
    }
    ```

---

### Example Request

```bash
curl -X POST http://localhost:4000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```

---

## Endpoint: `POST /user/login`

---

### Description

This endpoint allows an existing user to log in using their email and password. If the credentials are valid, a JWT token and user details are returned.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "<user_id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

#### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "invalid email or password"
    }
    ```
    or
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

---

### Example Request

```bash
curl -X POST http://localhost:4000/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```

---


---

## Endpoint: `GET /user/profile`

---

### Description

This endpoint returns the authenticated user's profile information. The request must include a valid JWT token in the cookie or Authorization header.

---

### Request

- **Headers:**
    - `Authorization: Bearer <jwt_token>` (if not using cookies)

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "No token provided, authorization denied"
    }
    ```

---

## Endpoint: `GET /user/logout`

---

### Description

This endpoint logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token for 24 hours. The request must include a valid JWT token in the cookie or Authorization header.

---

### Request

- **Headers:**
    - `Authorization: Bearer <jwt_token>` (if not using cookies)

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "User logged out successfully"
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "No token provided, authorization denied"
    }
    ```

---


---

## Endpoint: `POST /captains/register`

---

### Description

This endpoint allows a new captain to register by providing their full name, email, password, and vehicle details. Upon successful registration, a JWT token and captain details are returned.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plateNumber": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plateNumber` (string, required): Minimum 3 characters, unique.
- `vehicle.capacity` (integer, required): Minimum 1.
- `vehicle.vehicleType` (string, required): One of: `car`, `bike`, `auto`.

---

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "message": "Captain registered successfully",
      "captain": {
        "_id": "<captain_id>",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Smith"
        },
        "email": "jane.smith@example.com",
        "vehicle": {
          "color": "Red",
          "plateNumber": "ABC1234",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Last name must be at least 3 characters long",
          "param": "fullname.lastname",
          "location": "body"
        },
        {
          "msg": "Please provide a valid email address",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "Vehicle color must be at least 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Vehicle plate number must be at least 3 characters long",
          "param": "vehicle.plateNumber",
          "location": "body"
        },
        {
          "msg": "Vehicle capacity must be at least 1",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": "Vehicle type must be one of: car, bike, truck",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

#### Duplicate Email

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "message": "Captain with this email already exists"
    }
    ```

---

### Example Request

```bash
curl -X POST http://localhost:4000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plateNumber": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

---

## Notes

- The password is securely hashed before storage.
- The returned JWT token can be used for authenticated requests.