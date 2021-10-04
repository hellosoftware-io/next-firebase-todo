import React from "react";
import { Grid, Typography } from "@mui/material";
import Todo from "models/Todo";
import TodoCard from "./TodoCard";

type Props = {
  todos: Todo[];
};

export default function TodoList({ todos }: Props): JSX.Element {
  function EmptyTodos() {
    return (
      <React.Fragment>
        <Typography variant="subtitle1">No todos found</Typography>
      </React.Fragment>
    );
  }

  if (todos.length <= 0) {
    return <EmptyTodos />;
  } else {
    return (
      <Grid container spacing={4}>
        {todos.map((todo, index) => (
          <TodoCard todo={todo} key={index} />
        ))}
      </Grid>
    );
  }
}
