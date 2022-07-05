import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";

// styles
import styles from './login.module.css';

// actions
import {login, checkLogin} from "../../store/actions/authActions";

// components
import {StandardButton} from "../../components/buttons/standardButton/standardButton";
import {PasswordInput} from "../../components/passwordInput/passwordInput";

const Login = props => {
    // state
    const {appState} = props;
    // actions
    const {login, checkLogin} = props;
    // local
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ready, setReady] = useState(false);
    // hooks
    const navigate = useNavigate();
    const location = useLocation();

    // check if a user is logged in
    useEffect(() => {
        async function prepare() {
            try {
                await checkLogin();
            } catch(e) {
                setReady(true);
            }
        }
        prepare();
    }, [checkLogin]);

    useEffect(() => {
        if (!appState) return;
        if (appState.isLoggedIn && appState.appReady) {
            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate('/admin/dashboard');
            }
        } else if (!appState.isLoggedIn && appState.appReady) {
            setReady(true);
        }
    }, [appState, location.state, navigate]);

    async function submit(e) {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch(e) {
            console.log(e);
        }
    }

    if (!ready) return <div/>;

    return (
        <div className={styles.container}>
            <div className={`${styles.gradient}`}/>
            <div className="pos:r z-i:1">
                <img className={styles.logo} src="https://tranel-teaches-content.s3.us-east-2.amazonaws.com/assets/deInstruct+logo+old.png" alt="logo"/>
                <p className={styles.adminLabel}>ADMIN</p>
                {/* Login Form*/}
                <form onSubmit={submit} className={styles.loginContainer}>
                    <div className={styles.loginEmail}>
                        <label htmlFor="email">Email</label>
                        <input
                            id='email'
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.loginPassword}>
                        <label htmlFor="password">Password</label>
                        <PasswordInput
                            id='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <Link className={styles.forgot} to={'/'}>Forgot Password</Link>
                    <div className={styles.login}>
                        <StandardButton onClick={submit}>Login</StandardButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

function mapStateToProps({appState}) {
    return {
        appState,
    }
}

const actions = {
    login,
    checkLogin,
}
export default connect(mapStateToProps, actions)(Login);