## Submission Challenge 6 for Binar Academy

# Art Upload API

This API allows you to upload, retrieve, update, and delete artwork.

## Base URL
34.101.244.5:9090/api/v1

## Endpoints

### 1. **Upload Art**
- **POST** `/arts/upload`
- **Description**: Upload a new artwork image along with a title and description.
- **Required Fields**:
  - `title` (form-data): The title of the artwork.
  - `description` (form-data): A description of the artwork.
  - `image` (form-data): The image file of the artwork.
- **Response**:
  - **200 OK**: Art uploaded successfully.
  - **400 Bad Request**: If `title`, `description`, or `image` are missing.
  - **500 Internal Server Error**: If there is a server error.

### 2. **Get All Arts**
- **GET** `/arts`
- **Description**: Retrieve a list of all the artworks in the system.
- **Response**:
  - **200 OK**: Successfully retrieved all arts.
  - **500 Internal Server Error**: If there is a server error.

### 3. **Get Art by ID**
- **GET** `/arts/{artId}`
- **Description**: Retrieve details of a specific art by its ID.
- **Parameters**:
  - `artId` (path): The ID of the art to retrieve.
- **Response**:
  - **200 OK**: Art found with its details.
  - **404 Not Found**: Art not found.
  - **500 Internal Server Error**: If there is a server error.

### 4. **Update Art by ID**
- **PUT** `/arts/{artId}`
- **Description**: Update an existing artwork's title, description, or image.
- **Parameters**:
  - `artId` (path): The ID of the art to update.
  - `title` (form-data, optional): New title for the artwork.
  - `description` (form-data, optional): Updated description for the artwork.
  - `image` (form-data, optional): New image file for the artwork.
- **Required Fields**:
  - At least one of the fields (`title`, `description`, or `image`) must be provided. 
- **Response**:
  - **200 OK**: Art updated successfully.
  - **400 Bad Request**: If no fields (`title`, `description`, or `image`) are provided for updating.
  - **404 Not Found**: If the art is not found.
  - **500 Internal Server Error**: If there is a server error.

### 5. **Delete Art by ID**
- **DELETE** `/arts/{artId}`
- **Description**: Delete a specific art by its ID.
- **Parameters**:
  - `artId` (path): The ID of the art to delete.
- **Response**:
  - **200 OK**: Art deleted successfully.
  - **404 Not Found**: Art not found.
  - **500 Internal Server Error**: If there is a server error.

---
