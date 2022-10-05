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
  return axios.delete(`${baseUrl}/${todoID}`);
};

function checkTodo(todoID) {
  return axios.put(`${baseUrl}/${todoID}`, {done: true});
};

function uncheckTodo(todoID) {
  return axios.put(`${baseUrl}/${todoID}`, {done: false}); 
};

export default {
  getAll: getAll,
  create: create,
  deleteTodo: deleteTodo,
  checkTodo: checkTodo,
  uncheckTodo: uncheckTodo
}