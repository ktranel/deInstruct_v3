import React from 'react';

// styles
import styles from './circleAddButton.module.css';

// images
import {ReactComponent as PlusIcon} from '../../../images/plus-solid.svg';

export const CircleAddButton = props => {
    return (
        <PlusIcon {...props} className={`${props.className} ${styles.button}`}/>
    )
}