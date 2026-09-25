import api from "./axios";

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};

export const getProducts = async (limit = 10, skip = 0) => {
  const response = await api.get(
    `/products?limit=${limit}&skip=${skip}`
  );

  return response.data;
};

export const searchProducts = async (
  query,
  limit = 10,
  skip = 0,
  signal
) => {
  const response = await api.get(
    `/products/search?q=${encodeURIComponent(
      query
    )}&limit=${limit}&skip=${skip}`,
    {
      signal,
    }
  );

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get(
    "/products/categories"
  );

  return response.data;
};

export const getProductsByCategory = async (
  category,
  limit = 10,
  skip = 0
) => {
  const response = await api.get(
    `/products/category/${category}?limit=${limit}&skip=${skip}`
  );

  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
};

// Add product
export const addProduct = async (product) => {
  const response = await api.post(
    "/products/add",
    product
  );

  return response.data;
};

// Update product
export const updateProduct = async (
  id,
  product
) => {
  const response = await api.put(
    `/products/${id}`,
    product
  );

  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};