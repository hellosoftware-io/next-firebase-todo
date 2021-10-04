import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import Todo from "models/Todo";
import { firebaseApp } from "network/firebase";
import React from "react";
const db = getFirestore(firebaseApp);

export function getTodos(
  uid: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) {
  console.log("Getting todos for user: " + uid);

  const docsQuery = query(
    collection(db, "users/" + uid + "/todos"),
    orderBy("createdDate"),
    limit(50)
  );

  onSnapshot(docsQuery, (querySnapshot) => {
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

export function callCreateTodo(
  uid: string,
  todo: Todo
): Promise<DocumentReference<DocumentData>> {
  return addDoc(collection(db, "users/" + uid + "/todos"), todo);
}

export function callEditTodo(uid: string, todo: Todo): Promise<void> {
  return setDoc(doc(db, "users/" + uid + "/todos", todo.id), todo);
}

export function deleteTodo(uid: string, todoID: string): Promise<void> {
  return deleteDoc(doc(db, "users/" + uid + "/todos", todoID));
}
