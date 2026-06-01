## 🛠️ Tech Stack & Key Features

- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database Layer:** MongoDB & Mongoose ORM
- **Environment Management:** Dotenv (Secured configuration)
- **Architecture:** Clean Model-View-Controller (MVC)
- **Advanced Features:** 
  - Strict Schema Input Validation (Regex email checks, Age restrictions)
  - Case-insensitive Partial Text Search (`$regex`)
  - Dynamic Field Sorting (Ascending & Descending)
  - Scalable Query Pagination (`skip` & `limit` optimization)

---

## 📂 Project Architecture Layout

```text
decodeLabs-project3/
├── controllers/
│   └── userController.js    # Express Request/Response Business Logic
├── db/
│   └── connection.js        # MongoDB Asynchronous Initialization
├── models/
│   └── User.js              # Mongoose Schema Definitions & Validations
├── routes/
│   └── userRoutes.js        # Dynamic Express Route Maps
├── .env.example             # Sample template for environment variables
├── .gitignore               # Excludes node_modules and structural secrets
├── package.json             # Project Dependencies & Lifecycle Scripts
└── server.js                # Core Gateway Application Bootstrapper