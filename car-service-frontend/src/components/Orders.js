import React, { useEffect } from "react";
import { Container, Typography, Grid, Paper, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetOrdersQuery,
  useGetOrdersByClientIdQuery,
  selectOrdersResultData,
  selectAllOrders,
  selectOrdersForClientId,
} from "../features/orders/orderSlice";

function Orders() {
  const client = useSelector((state) => state.client);

  const orders = useSelector((state) =>
    selectOrdersForClientId(state, client?.id)
  );

  return (
    <Container maxWidth={"md"} sx={{ mt: 4 }}>
      {client ? (
        <>
          <Typography variant={"h5"} sx={{ mb: 3 }}>
            Your orders{orders.length === 0 ? " will be here" : null}
          </Typography>

          {orders.map((order) => (
            <Paper key={order.id} sx={{ p: 2, mb: 2 }} elevation={3}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant={"h6"}>Tasks</Typography>
                  <Stack spacing={1}>
                    {order.tasks.map((task) => (
                      <Paper
                        key={task.id}
                        sx={{
                          p: 0.5,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant={"body2"}
                          color="text.secondary"
                          sx={{ flexGrow: 1 }}
                        >
                          {task.name}
                        </Typography>
                        {task.fulfilled ? (
                          <CheckOutlinedIcon />
                        ) : (
                          <CloseOutlinedIcon />
                        )}
                      </Paper>
                    ))}
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant={"h6"}>Date</Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{order.date}</Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant={"h6"}>Price</Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>${order.price}</Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant={"h6"}>Fulfilled</Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {order.fulfilled ? (
                      <CheckOutlinedIcon />
                    ) : (
                      <CloseOutlinedIcon />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </>
      ) : (
        <Typography variant={"h4"}>You did not login</Typography>
      )}
    </Container>
  );
}

export default Orders;
