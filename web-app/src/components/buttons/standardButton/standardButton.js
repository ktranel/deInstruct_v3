import React from 'react';

// styles
import styles from './standardButton.module.css';

export const StandardButton = props => {
    return (
        <button {...props} className={`${styles.button} ${props.className}`}>
            {props.children}
        </button>
    )
}