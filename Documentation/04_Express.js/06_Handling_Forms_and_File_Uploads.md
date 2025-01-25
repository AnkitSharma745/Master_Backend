# Handling Forms and File Uploads in Express.js

## **Overview**

Handling forms and file uploads is a crucial aspect of building web applications. Express.js, combined with middleware like `body-parser` and `multer`, simplifies this process by parsing incoming data and managing file uploads efficiently.

---

## **Handling Forms in Express.js**

Forms can send data to the server using either the `GET` or `POST` method. Express.js can handle these requests using middleware such as `express.urlencoded()` for form-encoded data and `express.json()` for JSON data.

### **Setting Up Middleware for Form Handling**

```javascript
const express = require("express");
const app = express();

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

app.post("/submit-form", (req, res) => {
  const { name, email } = req.body;
  res.send(`Name: ${name}, Email: ${email}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Testing the Form Submission**

1. Create an HTML form:

   ```html
   <form action="http://localhost:3000/submit-form" method="POST">
     <label for="name">Name:</label>
     <input type="text" id="name" name="name" required />

     <label for="email">Email:</label>
     <input type="email" id="email" name="email" required />

     <button type="submit">Submit</button>
   </form>
   ```

2. When the form is submitted, the server will respond with the parsed data.

---

## **Handling File Uploads in Express.js**

File uploads require a middleware to parse `multipart/form-data`. `multer` is a popular middleware for this purpose.

### **Installing Multer**

```bash
npm install multer
```

### **Setting Up Multer**

```javascript
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    res.send(`File uploaded successfully: ${req.file.filename}`);
  } else {
    res.status(400).send("No file uploaded");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Testing the File Upload**

1. Create an HTML form for file uploads:

   ```html
   <form
     action="http://localhost:3000/upload"
     method="POST"
     enctype="multipart/form-data"
   >
     <label for="file">Upload a file:</label>
     <input type="file" id="file" name="file" required />

     <button type="submit">Upload</button>
   </form>
   ```

2. Uploaded files will be stored in the `uploads` directory.

### **Multiple File Uploads**

Modify the upload route to handle multiple files:

```javascript
app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  if (req.files) {
    const fileNames = req.files.map((file) => file.filename);
    res.send(`Files uploaded successfully: ${fileNames.join(", ")}`);
  } else {
    res.status(400).send("No files uploaded");
  }
});
```

---

## **Validating File Uploads**

Multer provides file filtering options to validate uploaded files. For example, restricting file types:

```javascript
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const uploadWithFilter = multer({ storage, fileFilter });

app.post("/upload-image", uploadWithFilter.single("image"), (req, res) => {
  res.send("Image uploaded successfully");
});
```

---

## **Real-World Example: Profile Management System**

### **Scenario**

Build a feature where users can upload their profile pictures and update their personal information.

#### **Code**

```javascript
const express = require("express");
const multer = require("multer");
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure multer storage
const storage = multer.diskStorage({
  destination: "./profile-pics/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.body.username}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// Profile update route
app.post("/update-profile", upload.single("profilePic"), (req, res) => {
  const { username, email } = req.body;
  const profilePic = req.file ? req.file.filename : null;

  // Mock response
  res.json({
    message: "Profile updated successfully",
    data: {
      username,
      email,
      profilePic,
    },
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### **Testing**

Use a form with fields for username, email, and profile picture to test the endpoint.

---

## **Key Takeaways**

1. Use `express.urlencoded()` and `express.json()` to handle form data.
2. Use `multer` for file uploads, with customizable storage and validation options.
3. Validate and sanitize uploaded files to ensure security and prevent misuse.
4. Organize uploads using directories and descriptive filenames.

---
