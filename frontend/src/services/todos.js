import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/todos';

function getAll(user) {
  return axios.get(`${baseUrl}/${user}`);
}

async function create(newTodo, token) {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const response = await axios.post(baseUrl, newTodo, config);
  return response.data;
};

function deleteTodo(todoID) {
  return axios.delete(`${baseUrl}/${todoID}`);
};

function checkTodo(todoID) {
  return axios.put(`${baseUrl}/${todoID}`, { done: true });
};

function uncheckTodo(todoID) {
  return axios.put(`${baseUrl}/${todoID}`, { done: false });
};

export default {
  getAll: getAll,
  create: create,
  deleteTodo: deleteTodo,
  checkTodo: checkTodo,
  uncheckTodo: uncheckTodo,
}