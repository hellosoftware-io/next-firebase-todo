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
import { callCreateTodo } from "network/dataManager";
import Todo from "models/Todo";
import { useUser } from "context/userContext";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function CreateTodoDialog({
  isOpen,
  handleClose,
}: Props): JSX.Element {
  const user = useUser();

  return (
    <Box>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const todo: Todo = {
            id: "",
            title: values.title,
            description: values.description,
            createdDate: new Date().getTime(),
          };
          callCreateTodo(user.user.uid, todo)
            .then(() => {
              setSubmitting(false);
              handleClose();
              resetForm();
            })
            .catch(() => {
              setSubmitting(false);
              handleClose();
              resetForm();
            });
        }}
      >
        {({ submitForm, isSubmitting, values, handleChange, resetForm }) => (
          <Form>
            <Dialog
              open={isOpen}
              onClose={() => {
                handleClose();
                resetForm();
              }}
            >
              <DialogTitle id="form-dialog-title">
                Create a new to-do
              </DialogTitle>
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
                    resetForm();
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
                  Create
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
