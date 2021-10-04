import React, { useState } from "react";
import {
  Typography,
  Card,
  Grid,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Todo from "models/Todo";
import { formatDistance } from "date-fns";
import { deleteTodo } from "network/dataManager";
import { useUser } from "context/userContext";
import EditTodoDialog from "./EditTodoDialog";

type Props = {
  todo: Todo;
};

export default function TodoCard({ todo }: Props): JSX.Element {
  const user = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const currentDate = new Date();
  const todoDate = new Date(todo.createdDate);

  function openMenuClicked(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function deleteClicked() {
    handleClose();
    deleteTodo(user.user.uid, todo.id);
  }

  function editClicked() {
    handleClose();
    setIsEditDialogOpen(true);
  }

  return (
    <Grid item xs={12} sm={6}>
      <Card sx={{ p: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h2">{todo.title}</Typography>
          </Grid>
          <Grid item justifySelf="felx-end">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              size="medium"
              onClick={openMenuClicked}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={editClicked}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
              <MenuItem onClick={deleteClicked}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {formatDistance(currentDate, todoDate) + " ago"}
        </Typography>
        <Typography variant="body1">{todo.description}</Typography>
      </Card>
      <EditTodoDialog
        todo={todo}
        isOpen={isEditDialogOpen}
        handleClose={() => {
          setIsEditDialogOpen(false);
        }}
      />
    </Grid>
  );
}
