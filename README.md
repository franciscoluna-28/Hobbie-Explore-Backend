# Official Hobby Explore API Documentation


## Used Technologies
For handling the backend of this API I'm using Express, Node.JS, Typescript to ensure safety, Firebase admin, Mongoose and Natural.js to handle language processing.

## General API Guidelines
To ensure the security and integrity of the Hobby Explore API, all requests must include a valid and up-to-date API token in the header. This measure is in place to prevent unauthorized access and spamming of the API by external sources. To include your token in a request, use the following format and the backend will automatically check if it's valid:

```
config.headers.authorization = `Bearer ${token}`;
```

If not token is provided, you'll get a 401 error code as the following: `({ message: "Unauthorized! Token missing" })`

## How Authorization Works
Authorization within Hobby Explore's backend is a critical security feature that ensures only authenticated and authorized users can access the API. Here's how the authorization process works:

### Middleware for Firebase
Hobby Explore employs a middleware component responsible for checking tokens and their expiration status. This middleware is a crucial part of the authentication flow, and client applications are expected to handle and update token values as the authentication flow evolves. Below is a breakdown of how this middleware operates:

```import admin from "../config/firebase-config";
import { NextFunction, Request, Response } from "express";

// Middleware for Firebase
class FirebaseMiddleware {
  async decodeToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      // If the user doesn't provide a token, a "Unauthorized! Token missing" response is sent.
      return res.status(401).json({ message: "Unauthorized! Token missing" });
    }

    // If a token is provided, an attempt is made to decode it.
    try {
      const decodedValue = await admin.auth().verifyIdToken(token);

      if (decodedValue) {
        return next();
      }

      // If the token for Firebase is invalid, a "Unauthorized! Invalid token" response is sent.
      return res.status(401).json({ message: "Unauthorized! Invalid token" });
    } catch (error) {
      console.error("Error decoding token:", error);
      // If an error occurs during token decoding or the token has expired, a "Firebase ID Token has expired" response is sent.
      return res.status(401).json({ message: "Firebase ID Token has expired." });
    }
  }
}

export default FirebaseMiddleware;
```


## List of Valid Activity Types
The selection of activity types is not arbitrary; instead, it adheres to the predefined types provided by the Bored API, ensuring consistency and reliability within this project.

   - education
   - recreational
   - social
   - diy
  - charity
  - cooking
  - relaxation
  - music
 - busywork

## Default Activities
Default activities are the activities that are pre-loaded in the Hobby Explore application. They are generated using data from the Bored API and images from the Unsplash API. Below are the available API endpoints for managing these default activities:

### Retrieve Default Activities
- Endpoint: /api/activity/random
- HTTP Method: **GET**
- Query parameters:
  `type (optional)`: Specify an activity type to filter results.
- Description: This endpoint yields six random default activities. If a specific type is provided, the response will consist of six activities falling within that designated category.

### Retrieve Activity by ID
- Endpoint: /api/activity/activity-by-id/:id
- HTTP Method: GET
- Parameters:
`id (Path Parameter)`: Specify the unique activity ID.
- Description: Retrieves comprehensive information, including all metadata, for a specific activity identified by its unique ID.
### Example of response: 

```{
  "_id": "64f0ab09c8baf5620e13a21f",
  "name": "Learn how to play a new sport",
  "imageId": "WUehAgqO5hE",
  "type": "recreational",
  "participants": 1,
  "price": 0.1,
  "accessibility": 0.2,
  "description": "",
  "averageRating": 0,
  "reviews": 0,
  "blur_hash": "LAFiMkx@%gxsND_4WFs,Gt%Ns;M{",
  "listOfLinks": [],
  "user": {
    "name": "Markus Spiske",
    "username": "markusspiske",
    "profile_image": {
      "medium": "https://images.unsplash.com/profile-1641662541726-527734cb4708image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64"
    },
    "links": {
      "html": "https://unsplash.com/@markusspiske"
    }
  },
  "urls": {
    "full": "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0MzU3ODN8MHwxfHNlYXJjaHwzfHxMZWFybiUyMGhvdyUyMHRvJTIwcGxheSUyMGElMjBuZXclMjBzcG9ydHxlbnwwfDB8fHwxNjkzNDk0MDg0fDA&ixlib=rb-4.0.3&q=85",
    "regular": "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzU3ODN8MHwxfHNlYXJjaHwzfHxMZWFybiUyMGhvdyUyMHRvJTIwcGxheSUyMGElMjBuZXclMjBzcG9ydHxlbnwwfDB8fHwxNjkzNDk0MDg0fDA&ixlib=rb-4.0.3&q=80&w=1080"
  }
}
```

## Users

### Register User
Register a user in Hobby Explore.

- Endpoint: /api/user/register
- HTTP Method: POST
- Description: This endpoint allows users to create an account in the Hobby Explore application.
  
### Parameters: `(Request Body)`:
- email (string): The email address of the user.
- uid (string): A unique user identifier.
- bearerToken (string): An authentication token for the user.
- photoUrl (string): The URL of the user's profile photo.
- displayName (string): The user's display name.
- emailVerified (boolean): Indicates whether the user's email is verified.
- disabled (boolean): Indicates whether the user's account is disabled.
- createdAt (string): A timestamp indicating when the user was created.

### Examples Request:

```
POST /api/user/register
{
  "email": "user@example.com",
  "uid": "unique_user_id",
  "bearerToken": "authentication_token",
  "photoUrl": "https://example.com/profile.jpg",
  "displayName": "User Name",
  "emailVerified": true,
  "disabled": false,
  "createdAt": "2023-09-01T12:00:00Z"
}

```

### Example of a response: 

```
{
  "userId": "unique_user_id",
  "message": "User created successfully."
}
```

### HTTP Status Codes:
- 201 (Created): User registration was successful.
- 500 (Internal Server Error): Registration failed.

## User Deletion
Delete a user's account in Hobby Explore. This action can only be done by the **OWN** user.

- Endpoint: `/api/user/delete/:uid`
- HTTP Method: **DELETE**
- Description: This endpoint allows the deletion of a user's account in the Hobby Explore application.
- Parameters `(Path Parameter)`:
uid (string): The unique identifier of the user to be deleted.

### Example of a Succesful Response:

```
{
  "message": "User deleted successfully."
}
```



### HTTP Status Codes:
200 (OK): User account deletion was successful.
500 (Internal Server Error): Deletion failed.






