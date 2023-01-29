import classes from "./AuthForms.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { useAtom } from "jotai";
import { NAME } from "../STORE";



function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [atomName, setAtomName] = useAtom(NAME)
    let navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username:'',
        password:''
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value

        }));
    }

    console.log(formValues)
    function handleSubmit(e) {
        e.preventDefault();

        if (validValues()) {
            login();
        } else {
            toast.error('Something went wrong, please try again!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    function redirect(status) {
        if (status === 200) {
            navigate("/");
        }
    }

    async function login() {

        await axios.post("http://localhost:8080/client/login", formValues)
            .then(response => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("userId", response.data.userId);
                // setName(response.data.username)
                setAtomName(response.data.username)
                toast('Successfully Logged In', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style:{"--toastify-color-progress-dark": "#11ed23" }
                })
                redirect(response.status);
            })
            .catch(function (error) {
                toast.error('Something went wrong, please try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                redirect(error.response.data.status);
            });
    }

    function validValues() {
        return !(formValues.username.length <= 0 || formValues.password.length <= 0);
    }

    return (
        <div className={classes.bodyDiv}>
                <h1>LOGIN TO YOUR ACCOUNT</h1>
                <form onSubmit={handleSubmit}>
                    <Box
                        component={Paper}
                        sx={{
                            '& > :not(style)': {m: 3},
                        }}
                        noValidate
                        textAlign='center'
                        autoComplete="off"
                    >

                        <TextField 
                        onChange={handleChange}
                            id="standard-basic-email"
                            label="Email"
                            sx={{m: 1, width: "25ch"}}
                            name="username"
                            required
                            variant="standard"/><br/>

                        <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input onChange={handleChange}
                                id="standard-adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl><br/>

                        <Button type="submit" variant="contained"  style={{backgroundColor: 'black'}}>
                            Log In
                        </Button>

                        <p>Not a member?</p>
                        <Button type="button" variant="contained" href="/register" style={{backgroundColor: 'black'}}>
                            Sign Up
                        </Button>
                    </Box>
                </form>
        </div>
    );
}

export default Login;
