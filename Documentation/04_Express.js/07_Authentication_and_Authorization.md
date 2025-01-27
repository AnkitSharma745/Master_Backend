# Handling Forms and File Uploads in Express.js

## **1. Explore Secure File Storage Solutions**

### **Introduction**

Storing uploaded files securely is critical to prevent data breaches and unauthorized access. Cloud storage solutions offer scalability, security, and ease of integration for modern applications.

### **Popular Secure File Storage Solutions**

1. **Amazon S3 (AWS Simple Storage Service)**:

   - Highly scalable and reliable.
   - Built-in security features like encryption at rest and in transit.
   - Fine-grained access control using IAM policies.
   - Example Integration:

     ```javascript
     const AWS = require("aws-sdk");
     const s3 = new AWS.S3();

     app.post("/upload", (req, res) => {
       const params = {
         Bucket: "your-bucket-name",
         Key: req.file.filename,
         Body: req.file.buffer,
       };
       s3.upload(params, (err, data) => {
         if (err) {
           return res.status(500).send("Error uploading file");
         }
         res.status(200).send(`File uploaded successfully: ${data.Location}`);
       });
     });
     ```

2. **Google Cloud Storage**:

   - Global infrastructure and simple setup.
   - Provides features like signed URLs for secure downloads.
   - Example Integration:

     ```javascript
     const { Storage } = require("@google-cloud/storage");
     const storage = new Storage();
     const bucket = storage.bucket("your-bucket-name");

     app.post("/upload", (req, res) => {
       const blob = bucket.file(req.file.originalname);
       const blobStream = blob.createWriteStream();

       blobStream.on("error", (err) => res.status(500).send(err));
       blobStream.on("finish", () =>
         res.status(200).send("File uploaded successfully")
       );

       blobStream.end(req.file.buffer);
     });
     ```

3. **Azure Blob Storage**:

   - Integrated with Microsoft Azure services.
   - Provides seamless integration with enterprise-level applications.
   - Example Integration:

     ```javascript
     const { BlobServiceClient } = require("@azure/storage-blob");
     const blobServiceClient = BlobServiceClient.fromConnectionString(
       "your-connection-string"
     );

     app.post("/upload", async (req, res) => {
       const containerClient = blobServiceClient.getContainerClient(
         "your-container-name"
       );
       const blockBlobClient = containerClient.getBlockBlobClient(
         req.file.originalname
       );

       try {
         await blockBlobClient.uploadData(req.file.buffer);
         res.status(200).send("File uploaded successfully");
       } catch (err) {
         res.status(500).send("Error uploading file");
       }
     });
     ```

### **Best Practices for Secure File Storage**

- Use encrypted connections (e.g., HTTPS).
- Enable server-side encryption for stored files.
- Limit access to specific roles using IAM policies.
- Regularly review and audit access logs.

---

## **2. Implement Advanced Validation Using Libraries**

### **Why Advanced Validation?**

Advanced validation ensures that user inputs meet the expected criteria, preventing invalid or malicious data from entering your application. Libraries like `joi` and `yup` offer extensive features to handle complex validation logic efficiently.

---

### **Using Joi for Validation**

`Joi` is a powerful schema description and data validation library.

#### **Installation**

```bash
npm install joi
```

#### **Example: User Registration Validation**

```javascript
const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.ref("password"),
});

app.post("/register", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.send("Validation successful");
});
```

#### **Features of Joi**

- Conditional validation using `.when()`.
- Custom error messages.
- Validation of nested objects and arrays.

---

### **Using Yup for Validation**

`Yup` is another popular validation library often used with form handling libraries like Formik.

#### **Installation**

```bash
npm install yup
```

#### **Example: Product Creation Validation**

```javascript
const yup = require("yup");

const productSchema = yup.object().shape({
  name: yup.string().required().min(3),
  price: yup.number().required().positive(),
  description: yup.string().max(500),
  category: yup.string().oneOf(["Electronics", "Clothing", "Home"]),
});

app.post("/create-product", async (req, res) => {
  try {
    await productSchema.validate(req.body);
    res.send("Product validation successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
```

#### **Features of Yup**

- Asynchronous validation.
- Schema inheritance using `.concat()`.
- Built-in transformations (e.g., trimming strings).

---

### **Real-World Example: Validating File Uploads**

#### **Scenario: Validate Image Uploads**

```javascript
const Joi = require("joi");

const fileSchema = Joi.object({
  file: Joi.object({
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .required(), // 5 MB max size
  }),
});

app.post("/upload-image", (req, res) => {
  const { error } = fileSchema.validate({ file: req.file });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.send("File validation successful");
});
```

---

## **3. Authentication and Authorization**

### **Introduction**

Authentication and authorization are key to securing your application.

- **Authentication** verifies the identity of a user (e.g., login credentials).
- **Authorization** determines what resources the authenticated user can access (e.g., role-based permissions).

---

### **Authentication with JWT**

JSON Web Tokens (JWT) are widely used for secure stateless authentication.

#### **Installation**

```bash
npm install jsonwebtoken bcrypt
```

#### **Example: User Login with JWT**

```javascript
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    username: "testUser",
    password: bcrypt.hashSync("password123", 10), // Password hashing
  },
];

const SECRET_KEY = "your-secret-key";

// Login Endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send("Invalid username or password");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.send({ message: "Login successful", token });
});
```

---

### **Authorization with Middleware**

Middleware can protect routes and ensure only authorized users access certain resources.

#### **Example: Protecting Routes**

```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token required");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.send(`Welcome ${req.user.username}, you have access!`);
});
```

---

### **Role-Based Authorization**

Grant access based on user roles.

#### **Example: Role-Based Access**

```javascript
const roles = {
  admin: ["read", "write", "delete"],
  user: ["read"],
};

const authorizeRole = (role) => (req, res, next) => {
  if (!roles[role].includes(req.body.action)) {
    return res.status(403).send("Permission denied");
  }
  next();
};

app.post("/action", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.send("Action performed successfully");
});
```

---

### **Best Practices**

- Use HTTPS for secure communication.
- Store JWTs securely (e.g., HttpOnly cookies).
- Set short expiration times for tokens and implement refresh tokens.
- Regularly rotate secrets and revoke compromised tokens.

---

## **Key Takeaways**

1. Secure file storage, advanced validation, and proper authentication/authorization are essential for modern applications.
2. Implement JWT for stateless authentication and middleware for role-based access.
3. Regularly review and update security practices to stay ahead of potential threats.

# Handling Forms and File Uploads in Express.js

## **1. Explore Secure File Storage Solutions**

### **Introduction**

Storing uploaded files securely is critical to prevent data breaches and unauthorized access. Cloud storage solutions offer scalability, security, and ease of integration for modern applications.

### **Popular Secure File Storage Solutions**

1. **Amazon S3 (AWS Simple Storage Service)**:

   - Highly scalable and reliable.
   - Built-in security features like encryption at rest and in transit.
   - Fine-grained access control using IAM policies.
   - Example Integration:

     ```javascript
     const AWS = require("aws-sdk");
     const s3 = new AWS.S3();

     app.post("/upload", (req, res) => {
       const params = {
         Bucket: "your-bucket-name",
         Key: req.file.filename,
         Body: req.file.buffer,
       };
       s3.upload(params, (err, data) => {
         if (err) {
           return res.status(500).send("Error uploading file");
         }
         res.status(200).send(`File uploaded successfully: ${data.Location}`);
       });
     });
     ```

2. **Google Cloud Storage**:

   - Global infrastructure and simple setup.
   - Provides features like signed URLs for secure downloads.
   - Example Integration:

     ```javascript
     const { Storage } = require("@google-cloud/storage");
     const storage = new Storage();
     const bucket = storage.bucket("your-bucket-name");

     app.post("/upload", (req, res) => {
       const blob = bucket.file(req.file.originalname);
       const blobStream = blob.createWriteStream();

       blobStream.on("error", (err) => res.status(500).send(err));
       blobStream.on("finish", () =>
         res.status(200).send("File uploaded successfully")
       );

       blobStream.end(req.file.buffer);
     });
     ```

3. **Azure Blob Storage**:

   - Integrated with Microsoft Azure services.
   - Provides seamless integration with enterprise-level applications.
   - Example Integration:

     ```javascript
     const { BlobServiceClient } = require("@azure/storage-blob");
     const blobServiceClient = BlobServiceClient.fromConnectionString(
       "your-connection-string"
     );

     app.post("/upload", async (req, res) => {
       const containerClient = blobServiceClient.getContainerClient(
         "your-container-name"
       );
       const blockBlobClient = containerClient.getBlockBlobClient(
         req.file.originalname
       );

       try {
         await blockBlobClient.uploadData(req.file.buffer);
         res.status(200).send("File uploaded successfully");
       } catch (err) {
         res.status(500).send("Error uploading file");
       }
     });
     ```

### **Best Practices for Secure File Storage**

- Use encrypted connections (e.g., HTTPS).
- Enable server-side encryption for stored files.
- Limit access to specific roles using IAM policies.
- Regularly review and audit access logs.

---

## **2. Implement Advanced Validation Using Libraries**

### **Why Advanced Validation?**

Advanced validation ensures that user inputs meet the expected criteria, preventing invalid or malicious data from entering your application. Libraries like `joi` and `yup` offer extensive features to handle complex validation logic efficiently.

---

### **Using Joi for Validation**

`Joi` is a powerful schema description and data validation library.

#### **Installation**

```bash
npm install joi
```

#### **Example: User Registration Validation**

```javascript
const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.ref("password"),
});

app.post("/register", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.send("Validation successful");
});
```

#### **Features of Joi**

- Conditional validation using `.when()`.
- Custom error messages.
- Validation of nested objects and arrays.

---

### **Using Yup for Validation**

`Yup` is another popular validation library often used with form handling libraries like Formik.

#### **Installation**

```bash
npm install yup
```

#### **Example: Product Creation Validation**

```javascript
const yup = require("yup");

const productSchema = yup.object().shape({
  name: yup.string().required().min(3),
  price: yup.number().required().positive(),
  description: yup.string().max(500),
  category: yup.string().oneOf(["Electronics", "Clothing", "Home"]),
});

app.post("/create-product", async (req, res) => {
  try {
    await productSchema.validate(req.body);
    res.send("Product validation successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
```

#### **Features of Yup**

- Asynchronous validation.
- Schema inheritance using `.concat()`.
- Built-in transformations (e.g., trimming strings).

---

### **Real-World Example: Validating File Uploads**

#### **Scenario: Validate Image Uploads**

```javascript
const Joi = require("joi");

const fileSchema = Joi.object({
  file: Joi.object({
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .required(), // 5 MB max size
  }),
});

app.post("/upload-image", (req, res) => {
  const { error } = fileSchema.validate({ file: req.file });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  res.send("File validation successful");
});
```

---

## **3. Explore OAuth 2.0 for Third-Party Authentication**

### **What is OAuth 2.0?**

OAuth 2.0 is an authorization framework that allows third-party services to access user resources without exposing credentials.

---

### **How OAuth 2.0 Works**

1. **Authorization Request**: The client requests permission from the user to access resources.
2. **Authorization Grant**: The user grants the client access via an authorization server.
3. **Access Token Issuance**: The authorization server issues an access token to the client.
4. **Resource Access**: The client uses the token to access protected resources.

---

### **Real-World Example: Google OAuth 2.0**

#### **Setup**

1. Create a project in Google Cloud Console.
2. Enable the "Google+ API".
3. Create OAuth 2.0 credentials.

#### **Integration Example**

```javascript
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Save user details in the database
      done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
```

---

## **4. Implement Multi-Factor Authentication (MFA)**

### **Why MFA?**

MFA adds an extra layer of security by requiring multiple forms of verification (e.g., password + OTP).

---

### **Implementation Using TOTP (Time-Based One-Time Password)**

#### **Setup**

1. Install the `speakeasy` library:
   ```bash
   npm install speakeasy qrcode
   ```

#### **Example Code**

```javascript
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

// Generate Secret
app.get("/generate-secret", (req, res) => {
  const secret = speakeasy.generateSecret();
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    res.send(`<img src="${data}" />`);
  });
});

// Verify OTP
app.post("/verify", (req, res) => {
  const verified = speakeasy.totp.verify({
    secret: req.body.secret,
    encoding: "base32",
    token: req.body.token,
  });

  res.send(verified ? "Verification successful" : "Verification failed");
});
```

---

## **Key Takeaways**

1. OAuth 2.0 simplifies secure third-party authentication.
2. MFA enhances security by requiring multiple verification factors.

## **Next Steps**

- Explore advanced token management techniques (e.g., JWT refresh tokens).
- Learn to integrate other OAuth providers like Facebook and GitHub.
