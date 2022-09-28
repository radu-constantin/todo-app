import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/todos'

function getAll() {
  return axios.get(baseUrl);
}

function create(newTodo) {
  const request = axios.post(baseUrl, newTodo);
  return request.then(response => {
    return response.data;
  });
};

function deleteTodo(todoID) {
  axios.delete(`${baseUrl}/${todoID}`);
};

function checkTodo(todoID) {
  axios.put(`${baseUrl}/${todoID}`, {done: true});
}

export default {
  getAll: getAll,
  create: create,
  deleteTodo: deleteTodo,
  checkTodo: checkTodo
}