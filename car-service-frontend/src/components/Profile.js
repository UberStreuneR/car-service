import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetClientsQuery,
  // useGetClientByEmailQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  selectAllClients,
  selectClientByEmail,
  addClient,
} from "../features/clients/clientsSlice";

const noImage =
  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

const ProfileImage = styled("img")({
  borderRadius: "100%",
  maxWidth: "100px",
  maxHeight: "100px",
});

const ProfileBox = (props) => {
  const [updateClient] = useUpdateClientMutation();
  const dispatch = useDispatch();

  const [imageURL, setImageURL] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);

  const [fieldName, setFieldName] = useState(props.name);
  const [fieldAge, setFieldAge] = useState(props.age);
  const [fieldEmail, setFieldEmail] = useState(props.email);

  const { name, age, email, setName, setAge, setEmail } = props;

  const realProps = { name, age, email };
  const editProps = { setFieldName, setFieldAge, setFieldEmail };

  const clientFromServer = useSelector((state) =>
    selectClientByEmail(state, fieldEmail)
  );

  useEffect(() => {
    if (clientFromServer) {
      dispatch(addClient(clientFromServer));
    }
  }, [clientFromServer]);

  const handleSaveClicked = () => {
    const updatedClient = {
      name: fieldName,
      dob: fieldAge,
      email: fieldEmail,
      id: props.id,
    };
    updateClient(updatedClient);
  };

  useEffect(() => {
    fetch(noImage)
      .then((res) => res.blob())
      .then((blob) => {
        setImageURL(URL.createObjectURL(blob));
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [noImage]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {loaded ? (
          <ProfileImage sx={{ mr: 3 }} src={imageURL} />
        ) : (
          <Skeleton
            variant={"circular"}
            height={100}
            width={100}
            sx={{ mr: 3 }}
          />
        )}
        {edit ? <EditStack {...editProps} /> : <ProfileStack {...realProps} />}
      </Box>
      {edit ? (
        <ButtonGroup>
          <Button
            variant={"contained"}
            sx={{ mt: 2, mr: 2 }}
            color={"error"}
            onClick={() => setEdit(false)}
          >
            Back
          </Button>
          <Button
            variant={"contained"}
            sx={{ mt: 2 }}
            onClick={() => {
              setName(fieldName);
              setAge(fieldAge);
              setEmail(fieldEmail);
              handleSaveClicked();
              setEdit(false);
            }}
          >
            Save
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          variant={"contained"}
          sx={{ mt: 2 }}
          onClick={() => setEdit(true)}
        >
          Edit
        </Button>
      )}
    </Box>
  );
};

const ProfileStack = ({ name, age, email }) => (
  <Stack spacing={2}>
    <Typography variant={"h6"}>Name: {name}</Typography>
    <Typography variant={"h6"}>Age: {age}</Typography>
    <Typography variant={"h6"}>Email: {email}</Typography>
  </Stack>
);

const EditStack = ({ setFieldName, setFieldAge, setFieldEmail }) => {
  return (
    <Stack spacing={2}>
      <TextField
        variant={"outlined"}
        label={"Name"}
        onChange={(e) => setFieldName(e.target.value)}
      />
      <TextField
        variant={"outlined"}
        label={"Date of birth"}
        onChange={(e) => setFieldAge(e.target.value)}
        helperText={"YYYY-MM-DD"}
      />
      <TextField
        variant={"outlined"}
        label={"Email"}
        onChange={(e) => setFieldEmail(e.target.value)}
      />
    </Stack>
  );
};

const LoginForm = ({ clients, setClient }) => {
  const dispatch = useDispatch();

  const [emailField, setEmailField] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleLoginClicked = () => {
    const client = Object.values(clients.entities).find(
      (client) => client.email === emailField
    );
    if (client) {
      setClient(client);
      setError(false);
      setHelperText("");
      dispatch(
        addClient({
          id: client.id,
          age: client.age,
          email: client.email,
          dob: client.dob,
          name: client.name,
        })
      );
    } else {
      setError(true);
      setHelperText("Error, no client with such email");
    }
  };
  return (
    <Box>
      <TextField
        variant={"outlined"}
        label={"email"}
        onChange={(e) => setEmailField(e.target.value)}
        error={error}
        helperText={helperText}
      />
      <Button
        variant={"contained"}
        sx={{ ml: 2, mt: 1 }}
        onClick={handleLoginClicked}
      >
        Login
      </Button>
    </Box>
  );
};

const SignUpForm = ({ setClient, setLoginAction }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [disabledSignUp, setDisabledSignUp] = useState(true);

  const [addClientMutation, data, isLoading, isFetching, isSuccess, isError] =
    useAddClientMutation();
  const registeredClient = useSelector((state) =>
    selectClientByEmail(state, email)
  );

  useEffect(() => {
    if (registeredClient) {
      setError(true);
      setHelperText("Email taken");
      setDisabledSignUp(true);
    } else {
      setError(false);
      setHelperText("");
      if (email !== "" && name !== "" && dob !== "") {
        setDisabledSignUp(false);
      }
    }
  });

  const handleSignUpClicked = () => {
    addClientMutation({ email, name, dob }).then((res) => {
      dispatch(addClient(res.data));
      setClient(res.data);
    });
    setLoginAction(true);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          variant={"outlined"}
          label={"email"}
          size={"small"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          error={error}
          helperText={helperText}
        />
        <TextField
          variant={"outlined"}
          label={"name"}
          size={"small"}
          onChange={(e) => setName(e.target.value)}
          sx={{ my: 1 }}
        />
        <TextField
          variant={"outlined"}
          label={"Date of birth"}
          size={"small"}
          onChange={(e) => setDob(e.target.value)}
          helperText={"YYYY-MM-DD"}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Button variant={"secondary"} onClick={() => setLoginAction(true)}>
          Back to Login
        </Button>
        <Button
          variant={"contained"}
          sx={{ ml: 1 }}
          onClick={handleSignUpClicked}
          disabled={disabledSignUp}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

const Authorize = ({ setClient, clients }) => {
  const [loginAction, setLoginAction] = useState(true);
  const signUpProps = { setClient, setLoginAction };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {loginAction ? (
        <React.Fragment>
          <LoginForm clients={clients} setClient={setClient} />
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography variant={"body2"} sx={{ mr: 1 }}>
              Don't have an account?
            </Typography>
            <Button
              variant={"secondary"}
              size={"small"}
              onClick={() => setLoginAction(false)}
            >
              Sign up
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <SignUpForm {...signUpProps} />
      )}
    </Box>
  );
};

function Profile(props) {
  const localClient = useSelector((state) => state.client);
  const [client, setClient] = useState(localClient);

  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [email, setEmail] = useState();

  const profileProps = { name, age, email, id };
  const editProps = { ...profileProps, setName, setAge, setEmail };

  const { data: clients = [] } = useGetClientsQuery();

  const authorizeProps = { setClient, clients };

  useEffect(() => {
    if (client) {
      setName(client.name);
      setAge(client.age);
      setEmail(client.email);
      setId(client.id);
    }
  }, [client]);
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
      {client ? (
        <ProfileBox {...editProps} />
      ) : (
        <Authorize {...authorizeProps} />
      )}
    </Container>
  );
}

export default Profile;
