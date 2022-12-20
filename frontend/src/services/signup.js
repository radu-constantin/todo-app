import axios from 'axios';
const baseUrl = '/api/users'

async function registerUser(newUser) {
  const response = await axios.post(baseUrl, newUser);
  // return response.data;
}

export default {
  registerUser: registerUser,
}