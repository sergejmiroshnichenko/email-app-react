import * as yup from "yup";

const schema = yup.object().shape({
    username: yup
        .string()
        .required('Login is a required field')
        .min(2)
        .matches(/^[\w.@+-]+$/g, "english letters, digits and @/./+/-/_ only"),
    password: yup
        .string()
        .required('Password is a required field')
        .min(2)
        .matches(/^[a-zA-Z]+$/g, 'only english letters'),

    email: yup
        .string()
        .required('Email is a required field')
        .email()
        .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'email must be a valid email'),
})

export default schema