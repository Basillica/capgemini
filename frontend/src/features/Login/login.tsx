import React from "react";
import { useState, useEffect } from "react";
import styles from './login.module.css';
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from './../../app/hooks'
import { login, selectUser, loginUser } from './userStore'
import { ActionCreatorWithPayload} from "@reduxjs/toolkit";
import { User } from "./model";

type Errors = {
  username?: string;
  password?: string;
}

function Login() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { errors, handleChange, handleSubmit, token } =  useForm(login, validator, dispatch);

  return (
    <>
      {token && token != ""  && (
          <Navigate to="/movies" replace={true} state={ {token} }/>
      )}
      <div className={styles.background}>
          <div className={styles.login_box}>
                <div className={styles.left_background}>
                  <h2 className={styles.title}>Capgemini</h2>
                </div>
                <div className={styles.login_form}>
                      <Input label="Username" name="username" type="email" onChange={handleChange} />
                      {errors.username && (
                        <p className={styles.error}>{errors.username}</p>
                      )}
                      <Input label="Password" name="password" type="password" onChange={handleChange}/>
                      {errors.password && (
                        <p className={styles.error}>{errors.password}</p>
                      )}
                      <Button buttonText="Login" buttonAction={handleSubmit}/>
                </div>
          </div>
      </div>
    </>
  );
}


const validator = (values: {username: string, password: string}): Errors => {
    let errors: Errors = {};

    if (!values.username) {
      errors.username = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.username)) {
      errors.username = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 or more characters";
    } 
    return errors;
}


const useForm = (callback: ActionCreatorWithPayload<User, "user/login">, validate: any, dispatch: any) => {
  const [values, setValues] = useState({username: "", password: ""});
  const [errors, setErrors] = useState({
    username: "", password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("")

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback({username: values.username, password: values.password});
    }
  }, [errors]);

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    validate(values)
    setErrors(validate(values));

    if (errors.username == "" || errors.password == "") {
        setIsSubmitting(true);
        const promise = new Promise((resolve, reject) => {
          resolve(dispatch(loginUser({username: values.username, password: "password"})))
        })
        
        promise.then((value: any) => {
          setToken(value.payload.token)
        });
    }
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    token
  };
};

export default Login;