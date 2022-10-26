// let todos = [
//   {
//     "name":"Undone 20/10",
//     "done": false,
//     "createdAt":"2022-10-20T03:55:25.460Z",
//     "updatedAt":"2022-10-20T03:55:25.460Z",
//     "id":"6350c6adc83e626d4cc285ca"
//   },
//   {
//     "name":"Done 24/10",
//     "done": true,
//     "createdAt":"2022-10-24T03:55:25.460Z",
//     "updatedAt":"2022-10-24T03:55:25.460Z",
//     "id":"6350c6adc83e626d4cc285ca"
//   },
//   {
//     "name":"Done 22/10",
//     "done": true,
//     "createdAt":"2022-10-22T03:55:25.460Z",
//     "updatedAt":"2022-10-22T03:55:25.460Z",
//     "id":"6350c6adc83e626d4cc285ca"
//   },
//   {
//     "name":"Undone 21/10", 
//     "done": false,
//     "createdAt":"2022-10-21T03:55:25.460Z",
//     "updatedAt":"2022-10-21T03:55:25.460Z",
//     "id":"6350c6adc83e626d4cc285ca"
//   },
//   {
//     "name":"Undone 21/10", 
//     "done": false,
//     "createdAt":"2022-10-21T03:55:25.460Z",
//     "updatedAt":"2022-10-21T03:55:25.460Z",
//     "id":"6350c6adc83e626d4cc285ca"
//   }
// ]

function sortTodos(todoList) {
  let sortedList = todoList.slice();
  return sortedList.sort(compareTodos)
};

function compareTodos(a, b) {
  let createdAtA = new Date(a.createdAt);
  let createdAtB = new Date(b.createdAt);

  let bothAreDone = a.done === true && b.done === true;
  let bothAreNotDone = a.done === false && b.done === false;

  if (bothAreDone && createdAtA > createdAtB) {
    return -1;
  } else if (bothAreDone && createdAtA < createdAtB) {
    return 1;
  } else if (bothAreNotDone && createdAtA > createdAtB) {
    return -1
  } else if (bothAreNotDone && createdAtA < createdAtB) {
    return 1;
  } else if (a.done === true && b.done === false) {
    return 1;
  } else if (a.done === false && b.done === true) {
    return -1;
  } else {
    return 0;
  }
};

export default {
  sortTodos
}
/*
  Sort todos list array by:
  1. Done/Unfinished;
  2. Date;

  First sort todos by done/unfinished, then by date.

  if (a.done === true && b.done === true && a.createdAt > b.createdAt) {
    return -1
  } else if (a.done === true && b.done === true && a.createdAt < b.createdAt)
    return 1;
  } else if (a.done === true && b.done === false) {
    return 1;
  } else if (a.done === false && b.done === true) {
    return -1;
  } else {
    return 0;
  }
  [
    {
      "name":"Undone 20/10", 2
      "done": false,"
      createdAt":"2022-10-20T03:55:25.460Z",
      "updatedAt":"2022-10-20T03:55:25.460Z",
      "id":"6350c6adc83e626d4cc285ca"
    },
    {
      "name":"Done 24/10", 3
      "done": true,
      "createdAt":"2022-10-24T03:55:25.460Z",
      "updatedAt":"2022-10-24T03:55:25.460Z",
      "id":"6350c6adc83e626d4cc285ca"
    },
    {
      "name":"Done 22/10", 4
      "done": true,
      "createdAt":"2022-10-22T03:55:25.460Z",
      "updatedAt":"2022-10-22T03:55:25.460Z",
      "id":"6350c6adc83e626d4cc285ca"
    },
    { 1
      "name":"Undone 21/10", 
      "done": false,
      "createdAt":"2022-10-21T03:55:25.460Z",
      "updatedAt":"2022-10-21T03:55:25.460Z",
      "id":"6350c6adc83e626d4cc285ca"
    }
  ]
*/