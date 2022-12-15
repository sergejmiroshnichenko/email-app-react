import React, { useState } from "react";
import styles from './HomePage.module.scss';
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import FormField from "../../components/Inputttttttt/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../../components/Form/Form';
import Modal from '../../components/Modal/Modal'
import axios, { AxiosRequestConfig } from 'axios';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import schema from '../../components/Validation/Validation'


const HomePage = ({ setIsLoggedIn, setUserName, setUserEmail, setUserPassword, isLoadedIn }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [catchError, setCatchError] = useState(null);
    const [modalActive, setModalActive] = useState(false);

    const changeFormValidation = () => {
        setIsLoggedIn(!isLoadedIn);
    }

    const check = isLoadedIn ? 'Submit' : 'Continue'
    const title = isLoadedIn ? 'Sign in' : 'Create account'

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const send = (userName, userEmail, userPassword) => {
        const user = 'dev_1';
        const password = 'AggC21223';
        const token = btoa(`${user}:${password}`);
        axios({
            method: 'POST',
            url: 'http://68.183.74.14:4005/api/users/',
            data: {
                username: `${userName}`, email: `${userEmail}`, password: `${userPassword}`
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`,
            },
        }).then(response => console.log('response.data ==>', response.data))
            .catch(error => setCatchError(error.response.data.username.join()))
    }


    // const axiosInstance = axios.create({
    //     baseURL: 'http://68.183.74.14:4005/api',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    // });
    //
    // const fetchUserData = async (username, password) => {
    //     const requestConfig: AxiosRequestConfig = {
    //         headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}`},
    //         url: '/users/current/',
    //         method: 'get',
    //     };
    //
    //     const response = await axiosInstance.request(requestConfig);
    //     response.data.then(res => console.log(res.json()));
    //     return response.data.then(res => res.json());
    // };

    const onSubmit = (data) => {
        console.log('data', data)
        send(data.username, data.email, data.password);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', data.username);
        localStorage.setItem('userPassword', data.password);
        localStorage.setItem('userEmail', data.email);
        setUserName(data.username);
        setUserPassword(data.password);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        // navigate('./email')
        methods.reset();
    }

    return (
        <>
            <FormProvider {...methods}>
                <Form className={styles.authorisation} onSubmit={methods.handleSubmit(onSubmit)}>
                    <p className={styles.signIn}>{title}</p>
                    <FormField
                        name='username'
                        label='Login'
                        type='text'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <PersonIcon sx={{ color: 'brown' }} edge="start"/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormField
                        name='password'
                        label='Password'
                        type={!showPassword ? "password" : "text"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <LockIcon sx={{ color: 'brown' }} edge="start"/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton edge="end" onClick={handleClickShowPassword}>
                                        {showPassword ?
                                            <Visibility sx={{ color: 'brown' }}/> :
                                            <VisibilityOff sx={{ color: 'brown' }}/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {!isLoadedIn && <FormField
                        name='email'
                        label='Email'
                        type='email'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <MailOutlineIcon sx={{ color: 'brown' }} edge="start"/>
                                </InputAdornment>
                            ),
                        }}
                    />}

                    <button className={styles.submit}
                            type="submit"
                            onClick={() => (catchError) ? navigate('./email') : (!isLoadedIn ? setModalActive(true) : navigate('./email'))
                            }
                            disabled={!methods.formState.isValid}>{check}
                    </button>
                    {!isLoadedIn &&
                    <p className={styles.register}>Already have an account?
                        <span onClick={changeFormValidation}> Sign in</span>
                    </p>}
                </Form>
            </FormProvider>
            <Modal active={modalActive}
                   isLoadedIn={isLoadedIn}
                   changeFormValidation={changeFormValidation}
                   setActive={setModalActive}
                   minWidth={'confirm'}
                   title={'Confirmation'}>
                <p className={styles.performAuth}>{catchError}</p>
            </Modal>
        </>
    )
}

export default HomePage;