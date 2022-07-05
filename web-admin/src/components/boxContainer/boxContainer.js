import React from 'react';

// styles
import styles from './boxContainer.module.css';

export const BoxContainer = props => {
    return (
        <div className={`${props.className ? props.className : ''} ${styles.boxContainer}`}>
            {props.children}
        </div>
    )
}