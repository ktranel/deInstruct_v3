import React from 'react';

// styles
import styles from './mainHeading.module.css';

export const MainHeading = props => {
    return (
        <h1 {...props} className={`${props.className ? props.className : ''} ${styles.heading}`}>
            {props.children}
        </h1>
    )
}