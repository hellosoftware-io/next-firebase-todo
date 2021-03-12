import React from "react";
import Todo from "models/Todo";
import firebase from "network/firebase";
const db = firebase.firestore();

export function getTodos(
  uid: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) {
  console.log("Getting todos for user: " + uid);

  const query = db
    .collection("users/" + uid + "/todos")
    .orderBy("createdDate")
    .limit(50);

  query.onSnapshot((querySnapshot) => {
    const todos: Todo[] = [];

    querySnapshot.forEach((doc) => {
      const newTodo = doc.data() as Todo;
      newTodo.id = doc.id;
      todos.push(newTodo);
    });

    setTodos(todos);
  });

  // .get()
  // .then(function (querySnapshot) {
  //   querySnapshot.forEach(function (doc) {
  //     const newTodo = doc.data() as Todo;
  //     newTodo.id = doc.id;
  //     todos.push(newTodo);
  //   });

  //   return todos;
  // })
  // .catch((error) => {
  //   console.error("Error getting todos: " + error);
  //   return [];
  // });
}

export function callCreateTodo(uid: string, todo: Todo): Promise<void> {
  return db
    .collection("users/" + uid + "/todos")
    .doc()
    .set(todo);
}

export function callEditTodo(uid: string, todo: Todo): Promise<void> {
  return db
    .collection("users/" + uid + "/todos")
    .doc(todo.id)
    .set(todo);
}

export function deleteTodo(uid: string, todoID: string): Promise<void> {
  return db
    .collection("users/" + uid + "/todos")
    .doc(todoID)
    .delete();
}
