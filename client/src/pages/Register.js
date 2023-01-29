import classes from "./AuthForms.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export default function Register() {
    const baseURL = "http://localhost:8080";
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    async function register() {
        await axios.post(baseURL + "/client/register", formValues)
            .then(response => {
                toast('Successfully Registered!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style: {"--toastify-color-progress-light": "#39c41a"}

                })
                console.log(response);
            })
            .finally(navigate("/login"));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (validValues()) {
            register();
        } else {
            toast.error('Something went wrong, please try again!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    function validValues() {
        return !(formValues.password.length <= 0 ||
            formValues.email.length <= 0 ||
            formValues.firstName.length <= 0 ||
            formValues.lastName.length <= 0 ||
            formValues.confirmPassword.length <= 0 ||
            formValues.password !== formValues.confirmPassword);
    }

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className={classes.bodyDiv}>
            <h1>CREATE AN ACCOUNT</h1>
            <form onSubmit={handleSubmit}>
                <Box
                    component={Paper}
                    sx={{
                        '& > :not(style)': {m: 2},
                    }}
                    noValidate
                    textAlign='center'
                    autoComplete="off"
                >

                    <TextField
                        id="standard-basic-first-name"
                        label="First Name"
                        sx={{m: 1, width: "25ch"}}
                        name="firstName"
                        onChange={handleChange}
                        variant="standard"/>

                    <TextField
                        id="standard-basic-last-name"
                        label="Last Name"
                        sx={{m: 1, width: "25ch"}}
                        name="lastName"
                        onChange={handleChange}
                        variant="standard"/>

                    <TextField
                        id="standard-basic-email"
                        label="Email"
                        sx={{m: 1, width: "25ch"}}
                        name="email"
                        onChange={handleChange}
                        variant="standard"/>

                    <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            name="password"
                            onChange={handleChange}
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
                    </FormControl>

                    <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        <Input
                            id="standard-adornment-password-confirmation"
                            name="confirmPassword"
                            onChange={handleChange}
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
                    </FormControl>

                    <Button type="submit" variant="contained" style={{backgroundColor: 'black'}}>
                        Sign Up
                    </Button>

                    <p>You are a member?
                        <Button type="button" variant="contained" href="/login"
                                style={{backgroundColor: 'black'}}>
                            Log In
                        </Button>
                    </p><br/>
                </Box>
            </form>
        </div>
    );
}
