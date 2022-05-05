import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardMedia,
} from "@mui/material";

const mechanics = [
  {
    id: 1,
    name: "Dominic Toretto",
    image: "https://i1.sndcdn.com/avatars-000495537786-fik68d-t500x500.jpg",
  },
  {
    id: 2,
    name: "Brian O'Connor",
    image:
      "https://assets.mycast.io/actor_images/actor-brian-o-connor-290596_large.jpg?1635042503",
  },
  {
    id: 3,
    name: "Deckard Shaw",
    image:
      "https://www.cheatsheet.com/wp-content/uploads/2021/06/Jason-Statham.jpg",
  },
];

const MechanicCard = ({ mechanic }) => (
  <Card sx={{ display: "flex", m: 1, alignItems: "center" }}>
    <CardMedia
      component="img"
      sx={{ height: "100px", width: "100px", p: 1, borderRadius: "100%" }}
      image={mechanic.image}
      alt={"My image"}
    />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        maxWidth: 250,
        // flex: "1 1 auto",
      }}
    >
      <Typography variant="h6">{mechanic.name}</Typography>
    </Box>
  </Card>
);

function About() {
  return (
    <Container
      maxWidth={"md"}
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant={"h5"} sx={{ mb: 3 }}>
        About us
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>
              We're an emerging autoservice. We value our clients' satisfaction
              above all else. We strive for greatness.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ mb: 1 }}>Our schedule of work:</Typography>
            <Typography>
              9AM-6PM: Monday-Friday
              <br />
              10AM-3PM: Saturday
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ mb: 1 }}>Phone numbers and contacts:</Typography>
            <Typography>
              8-499-000-00-00
              <br />
              8-916-000-00-00
              <br />
              service@service-mail.com
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant={"h5"} sx={{ mb: 3 }}>
        Our mechanics
      </Typography>
      <Grid container spacing={1}>
        {mechanics.map((mechanic) => (
          <Grid key={mechanic.id} item xs={4}>
            <MechanicCard mechanic={mechanic} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default About;
