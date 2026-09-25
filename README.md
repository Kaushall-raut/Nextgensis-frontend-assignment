# Product Management Dashboard

A responsive Product Management Dashboard built with **React.js** and **Tailwind CSS** using the **DummyJSON API**.

The application provides authentication, product listing, search, filtering, sorting, pagination, product details, and CRUD functionality with a responsive UI.

---

## 🚀 Features

### Authentication

- User login using DummyJSON authentication API
- Protected product routes
- Logout functionality
- Authentication token stored in `localStorage`

### Product Management

- View products in a responsive table
- Mobile-friendly product cards
- Product details page
- Product images
- Product descriptions
- Product pricing
- Product ratings
- Product stock information
- Product reviews

### Search & Filtering

- Product search
- Debounced search input
- Search request cancellation using `AbortController`
- Category filtering
- Sorting by:
  - Price: Low to High
  - Price: High to Low
  - Rating
  - Title A-Z
  - Title Z-A

### Pagination

- Server-side pagination using `limit` and `skip`
- Page navigation
- Page size selection
- Pagination state synchronized with URL parameters

### CRUD Operations

- Add product
- Edit product
- Delete product
- Delete confirmation modal
- Form validation
- Loading states during mutations





## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend framework |
| React Router | Routing and protected routes |
| Axios | API requests |
| Tailwind CSS | Styling and responsive UI |
| DummyJSON | Product and authentication API |
| JavaScript | Application logic |
| LocalStorage | Authentication and local persistence |
| Vite | Development and build tool |

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── ProductCard.jsx
│   ├── ProductFilters.jsx
│   ├── ProductForm.jsx
│   ├── ProductTable.jsx
│   ├── ProtectedRoute.jsx
│   └── SearchBar.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── AddProduct.jsx
│   └── EditProduct.jsx
│
├── services/
│   ├── axios.js
│   └── productApi.js
│
├── utils/
│   └── productStorage.js
│
├── App.jsx
└── main.jsx