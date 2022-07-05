import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

// styles
import styles from './imageHolder.module.css';

// images
import {ReactComponent as PictureIcon} from '../../images/image_upload.svg';
import {ImageLibrary} from "../imageLibrary/imageLibrary";

export const ImageHolder = props => {
    const [show, setShow] = useState(false);
    return (
        <>
            {props.image ?
                <div style={{backgroundImage: `url(${props.image})`}} className={styles.image}/>
                :
                <div className={styles.image}>
                    <PictureIcon onClick={() => setShow(true)}/>
                </div>
            }
            <Modal className={styles.modal} show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    {show ? <ImageLibrary/> : null}
                </Modal.Body>
            </Modal>
        </>
    )
}