// src/services/api.js
const BASE_URL = '/api'; // Replace with your backend API URL

async function request(endpoint, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Include the JWT token in the request headers if the user is authenticated
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}

export default {
  request,
};
// After successful login
const token = // Get the JWT token from the response;
localStorage.setItem('token', token);
