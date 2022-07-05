import React, {useState} from 'react';

// styles
import styles from './passwordInput.module.css';

// images
import {ReactComponent as EyeIcon} from '../../images/eye.svg';

export const PasswordInput = props => {
    // local
    const [show, setShow] = useState(false);
    return (
        <div className={`${styles.password} ${props.className}`}>
            <input id={props.id} value={props.value} onChange={props.onChange} type={show ? 'text' : 'password'}/>
            <div className={styles.eyeContainer}>
                <EyeIcon className={styles.eye} onClick={() => setShow(!show)}/>
            </div>
        </div>
    )
}