import React from 'react';

// styles
import styles from './heading2.module.css';

export const Heading2 = props => {
    return (
        <h1 {...props} className={`${props.className ? props.className : ''} ${styles.heading}`}>
            {props.children}
        </h1>
    )
}