import React, {useState, useEffect, useCallback} from 'react';
import validate from "validate.js";
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

// styles
import styles from './imageLibrary.module.css';

// actions
import {uploadImage, fetchImages} from "../../store/actions/imageActions";

// images
import {ReactComponent as XIcon} from '../../images/x-icon.svg';
import {ReactComponent as TrashIcon} from '../../images/trash-icon.svg';

// components
import {Heading2} from "../headings/heading2/heading2";
import {CircleAddButton} from "../buttons/circleAddButton/circleAddButton";
import {StandardButton} from "../buttons/standardButton/standardButton";
import {GeneralPagination} from "../generalPagination/generalPagination";

// constraints
const formConstraints = {
    name: {
        presence: true,
        type: 'string',
        length: {minimum: 3, maximum: 255,}
    },
    alt: {
        presence: true,
        type: 'string',
        length: {minimum: 3, maximum: 255,}
    },
    image: {
        presence: {allowEmpty: false, message: 'is required'},
    }
}

export const ImageLibrary = props => {
    const [add, setAdd] = useState(false);
    const [form, setForm] = useState({
        name: '',
        alt: '',
        image: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [list, setList] = useState({pages: 0, count: 0, list: []});
    const [page, setPage] = useState(1);
    const [hover, setHover] = useState('');
    const [focus, setFocus] = useState({});
    
    const getList = useCallback(async () => {
        const {data: {result}} = await fetchImages(page, '');
        setList({
            ...list,
            page: result.pages,
            count: result.count,
            list: result.list,
        });
    }, [fetchImages]);

    function toggle() {
        if (add) {
            setForm({
                name: '',
                alt: '',
                image: '',
            });
            setAdd(false);
        } else {
            setAdd(true);
        }
    }

    async function submit(e) {
        e.preventDefault();
        const {name, alt, image} = form;

        // validation
        const valid = validate({name, alt, image}, formConstraints);
        if (valid) {
            setFormErrors(valid);
            return;
        } else {
            setFormErrors({});
        }

        // upload
        const data = new FormData();
        data.append('name', name);
        data.append('alt', alt);
        data.append('image', image);

        try{
            await uploadImage(data);
            if(page !== 1) {
                setPage(1);
            } else{
                getList();
            }
            toggle();
        } catch (e) {
            console.log(e);
        }
    }

    // get images on first load
    useEffect(() => {
        getList();
    }, [getList]);

    useEffect(() => {
        getList();
    }, [getList, page]);

    return (
        <div>
            <div style={{display: focus.url ? 'block' : 'none'}} className={styles.focusBox}>
                <div className={styles.focusButtons}>
                    <button><TrashIcon/></button>
                    <button onClick={() => setFocus({})}><XIcon/></button>
                </div>

                <form className={styles.focusName}>
                    <input className='form-control' type="text" value={focus.name}/>
                    <StandardButton>Save</StandardButton>
                </form>
                <div className={styles.img} style={{backgroundImage: `url(${focus.url})`}}/>
            </div>
            <div className={styles.headingRow}>
                <Heading2>Images</Heading2>
                <CircleAddButton onClick={toggle}/>
            </div>
            <form onSubmit={submit} className={add ? 'd:b' : 'd:n'}>
                <p>Add New Image</p>
                <div className="form-group margin-bottom-15">
                    <label htmlFor="name">Name</label>
                    <input
                        value={form.name}
                        onChange={event => setForm({...form, name: event.target.value})}
                        type="text"
                        id="name"
                        className="form-control"
                    />
                    {formErrors.name ?
                        <>{formErrors.name.map(err => <span className='text-danger'>{err}</span>)}</>
                        : null
                    }
                </div>
                <div className="form-group margin-bottom-15">
                    <label htmlFor="alt">Alt</label>
                    <input
                        value={form.alt}
                        onChange={event => setForm({...form, alt: event.target.value})}
                        type="text"
                        id="alt"
                        className="form-control"
                    />
                    {formErrors.alt ?
                        <>{formErrors.alt.map(err => <span className='text-danger'>{err}</span>)}</>
                        : null
                    }
                </div>
                <div className="form-group margin-bottom-15">
                    <input
                        onChange={event => setForm({...form, image: event.target.files[0]})}
                        type="file"
                        accept="image/png, image/jpeg"
                    />
                    {formErrors.image ?
                        <>{formErrors.image.map(err => <span className='text-danger'>{err}</span>)}</>
                        : null
                    }
                </div>
                <StandardButton onClick={submit}>Save</StandardButton>
            </form>

            <form className='margin-top-15 margin-bottom-15'>
                <input className='form-control' type="text" placeholder='Search Images'/>
            </form>

            <div className={styles.cardsContainer}>
                {list.list.map(img => (
                    <div key={img.id} className={styles.card}>
                        <div
                            onClick={() => setFocus(img)}
                            onMouseEnter={() => setHover(img.id)}
                            onMouseLeave={() => setHover('')}
                            className={styles.cardImg}
                            style={{backgroundImage: `url(${img.url})`}}>
                            <div className={`${styles.cardOverlay} ${hover === img.id ? styles.show : ''}`}>
                                <div>{img.name}</div>
                                <div>{format(parseISO(img.createdAt), 'MM/dd/yyyy')}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <GeneralPagination pages={3} onPageChange={() => {}}/>
            </div>
        </div>
    )
}