import React from 'react';
import "./Modal.css";
import Button from "../Button";
import styles from './movies.module.css'; 
import {JsonViewer} from '@textea/json-viewer'

interface ModalProps {
    children: React.ReactNode;
    show: boolean;
    handleClose: () => void;
    layoutClass?: string;
    boxClass?: string;
    viewJson?: boolean;
}


const Modal = (props: ModalProps) => {

  return (
    <>
        {props.show && (
            <div className={props.layoutClass ? props.layoutClass : "modal-overlay"}>
                <section className={props.boxClass ? props.boxClass : "modal-box"}>
                    <>
                        <div>
                            {
                                props.viewJson 
                                    ? <JsonViewer rootName={"MOVIE"} displayDataTypes={true} value={props.children} editable={false} /> 
                                    : props.children
                                }
                        </div>
                    </>
                    <div>
                        <Button buttonText="Close" buttonAction={props.handleClose}/>
                    </div>
                </section>
            </div>
        )}
    </>    
  )
}

export default Modal