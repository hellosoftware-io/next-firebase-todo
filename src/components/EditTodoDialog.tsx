import React from "react";
import {
  DialogActions,
  Grid,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { callEditTodo } from "network/dataManager";
import Todo from "models/Todo";
import { useUser } from "context/userContext";

type Props = {
  todo: Todo;
  isOpen: boolean;
  handleClose: () => void;
};

export default function EditTodoDialog({
  todo,
  isOpen,
  handleClose,
}: Props): JSX.Element {
  const user = useUser();

  return (
    <Box>
      <Formik
        initialValues={{
          title: todo.title,
          description: todo.description,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const newTodo: Todo = {
            id: todo.id,
            title: values.title,
            description: values.description,
            createdDate: new Date().getTime(),
          };
          callEditTodo(user.user.uid, newTodo)
            .then(() => {
              setSubmitting(false);
              handleClose();
            })
            .catch(() => {
              setSubmitting(false);
              handleClose();
            });
        }}
      >
        {({ submitForm, isSubmitting, values, handleChange }) => (
          <Form>
            <Dialog
              open={isOpen}
              onClose={() => {
                handleClose();
              }}
            >
              <DialogTitle id="form-dialog-title">Edit to-do</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      label="Title"
                      type="text"
                      value={values.title}
                      onChange={handleChange}
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Description"
                      type="text"
                      value={values.description}
                      onChange={handleChange}
                      fullWidth
                      variant="filled"
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  onClick={() => {
                    handleClose();
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={submitForm}
                  disabled={isSubmitting}
                >
                  Update
                </Button>
              </DialogActions>
              {isSubmitting && <LinearProgress />}
            </Dialog>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
