import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Stack,
  Paper,
  IconButton,
  Divider,
  Box,
  Button,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { useAddOrderMutation } from "../features/orders/orderSlice";

import {
  addTasks,
  removeTask,
  removeAllTasks,
  selectTasksResultData,
  selectAddedTasks,
} from "../features/tasks/tasksSlice";

const TasksAccordion = () => {
  const tasks = useSelector(selectTasksResultData);
  const dispatch = useDispatch();
  const handleAddTaskClicked = (taskObject) => {
    dispatch(addTasks([taskObject]));
  };

  return (
    <div>
      {Object.values(tasks.entities).map((task) => (
        <Accordion key={task.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={"header" + task.id.toString()}
          >
            <Typography
              sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
            >
              {task.name}, ${task.cost}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleAddTaskClicked(task);
              }}
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant={"body2"} color="text.secondary">
              {task.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const AddedTasks = ({
  setOpenLoginError,
  setOpenNoTasksError,
  setOpenSuccess,
}) => {
  const dispatch = useDispatch();
  const selectedTasks = useSelector(selectAddedTasks);
  const orderTotal = Object.values(selectedTasks).reduce(
    (previousValue, currentItem) => previousValue + currentItem.cost,
    0
  );

  const [addOrder] = useAddOrderMutation();

  const client = useSelector((state) => state.client);

  const handleSubmitOrderClicked = () => {
    if (selectedTasks.length === 0) {
      setOpenNoTasksError(true);
    } else {
      if (!client) {
        setOpenLoginError(true);
      } else {
        const taskIds = selectedTasks.map((task) => task.id);
        addOrder({ taskIds, client });
        dispatch(removeAllTasks());
        setOpenSuccess(true);
      }
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        {selectedTasks.map((task) => (
          <Paper
            key={task.id}
            sx={{ p: 1, display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ flexGrow: 1 }}>{task.name}</Typography>
            <Typography sx={{ mr: 1 }}>
              <b>${task.cost}</b>
              {/*<b>${task.price}</b> x {task.times}*/}
            </Typography>
            <IconButton onClick={() => dispatch(removeTask(task.id))}>
              <DeleteOutlineIcon />
            </IconButton>
          </Paper>
        ))}
      </Stack>
      <Box
        sx={{
          mt: 2,
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h5"} sx={{ mr: 2 }}>
          Total: ${orderTotal}
        </Typography>
        <Button variant={"secondary"} onClick={handleSubmitOrderClicked}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

function Home() {
  const [openLoginError, setOpenLoginError] = useState(false);
  const [openNoTasksError, setOpenNoTasksError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const addedTasksProps = {
    setOpenLoginError,
    setOpenNoTasksError,
    setOpenSuccess,
  };

  const collapseVariants = [
    {
      id: 1,
      title: "Error",
      description: "You must log in first!",
      isOpen: openLoginError,
      opener: setOpenLoginError,
      severity: "error",
    },
    {
      id: 2,
      title: "Error",
      description: "Select some services...",
      isOpen: openNoTasksError,
      opener: setOpenNoTasksError,
      severity: "error",
    },
    {
      id: 3,
      title: "Success",
      description:
        "Your order was submitted. Proceed to Orders page for a view of all of\n" +
        "          your orders.",
      isOpen: openSuccess,
      opener: setOpenSuccess,
      severity: "success",
    },
  ];

  return (
    <Container maxWidth={"md"} sx={{ mt: 4 }}>
      {collapseVariants.map((variant) => (
        <Collapse in={variant.isOpen} key={variant.id}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  variant.opener(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={variant.severity}
            sx={{ mb: 2 }}
          >
            <AlertTitle>
              <b>{variant.title}</b>
            </AlertTitle>
            {variant.description}
          </Alert>
        </Collapse>
      ))}
      {/*<Collapse in={openNoTasksError}>*/}
      {/*  <Alert*/}
      {/*    action={*/}
      {/*      <IconButton*/}
      {/*        aria-label="close"*/}
      {/*        color="inherit"*/}
      {/*        size="small"*/}
      {/*        onClick={() => {*/}
      {/*          setOpenNoTasksError(false);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <CloseIcon fontSize="inherit" />*/}
      {/*      </IconButton>*/}
      {/*    }*/}
      {/*    severity={"error"}*/}
      {/*    sx={{ mb: 2 }}*/}
      {/*  >*/}
      {/*    <AlertTitle>*/}
      {/*      <b>Error</b>*/}
      {/*    </AlertTitle>*/}
      {/*    Select some services...*/}
      {/*  </Alert>*/}
      {/*</Collapse>*/}
      {/*<Collapse in={openSuccess}>*/}
      {/*  <Alert*/}
      {/*    action={*/}
      {/*      <IconButton*/}
      {/*        aria-label="close"*/}
      {/*        color="inherit"*/}
      {/*        size="small"*/}
      {/*        onClick={() => {*/}
      {/*          setOpenNoTasksError(false);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <CloseIcon fontSize="inherit" />*/}
      {/*      </IconButton>*/}
      {/*    }*/}
      {/*    severity={"success"}*/}
      {/*    sx={{ mb: 2 }}*/}
      {/*  >*/}
      {/*    <AlertTitle>*/}
      {/*      <b>Success!</b>*/}
      {/*    </AlertTitle>*/}
      {/*    Your order was submitted. Proceed to Orders page for a view of all of*/}
      {/*    your orders.*/}
      {/*  </Alert>*/}
      {/*</Collapse>*/}

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant={"h5"} sx={{ mb: 3 }}>
            Our services
          </Typography>
          <TasksAccordion />
        </Grid>
        <Grid item xs={6}>
          <Typography variant={"h5"} sx={{ mb: 3 }}>
            Added
          </Typography>
          <AddedTasks {...addedTasksProps} />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4 }} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant={"h5"} sx={{ alignSelf: "center", mt: 4 }}>
          Relevant info goes here
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
