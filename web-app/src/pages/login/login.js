import React from 'react';
import {Link} from "react-router-dom";

// styles
import styles from './login.module.css';
import {StandardButton} from "../../components/buttons/standardButton/standardButton";

const Login = props => {
    return (
        <div className={styles.container}>
            <div className={`${styles.gradient}`}/>
            <div className="pos:r z-i:1">
                <img className={styles.logo} src="https://tranel-teaches-content.s3.us-east-2.amazonaws.com/assets/deInstruct+logo+old.png" alt="logo"/>

                {/* Login Form*/}
                <form className={styles.loginContainer}>
                    <div className={styles.loginEmail}>
                        <label htmlFor="email">Email</label>
                        <input id='email' type="text"/>
                    </div>
                    <div className={styles.loginPassword}>
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password"/>
                    </div>
                    <Link className={styles.forgot} to={'/'}>Forgot Password</Link>
                    <div className={styles.login}>
                        <StandardButton>Login</StandardButton>
                    </div>
                </form>
                <div className={styles.signUp}>
                    <p>Not a Member yet?</p>
                    <Link to={'/'}>Sign Up Today!</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;