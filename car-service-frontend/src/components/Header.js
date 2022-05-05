import React from "react";
import { Stack, Link, Container, Typography, Divider } from "@mui/material";
import {
  useNavigate,
  Link as RouterLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
const headerLinks = [
  { id: 1, link: "/", name: "Home" },
  { id: 2, link: "/orders", name: "Orders" },
  { id: 3, link: "/profile", name: "Profile" },
  { id: 4, link: "/about", name: "About" },
];

function Header(props) {
  let history = window.location.pathname;
  return (
    <Container maxWidth={"md"}>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
      >
        {headerLinks.map((headerLink) => (
          <Link
            key={headerLink.id}
            color={"inherit"}
            underline={"none"}
            component={RouterLink}
            to={headerLink.link}
          >
            <Typography variant={"h4"}>{headerLink.name}</Typography>
          </Link>
        ))}
      </Stack>
      <Divider sx={{ mt: 2 }} />
    </Container>
  );
}

export default Header;
