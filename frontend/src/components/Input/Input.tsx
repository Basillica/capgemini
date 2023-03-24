import React from 'react';
// import "./Input.css";
import styles from './Input.module.css';

interface InputProps {
    label?: string;
    name: string;
    type: string;
    placeholder?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    inputClass?: string;
}

const Input = ({label, name, type, placeholder, onChange, inputClass}: InputProps) => {
  return (
    <div className={inputClass ? inputClass : styles.input}>
        <label className={styles.label}>{label}</label>
        <input 
            autoComplete="off" name={name} onChange={onChange} type={type} 
            placeholder={placeholder} className={styles.text_input}
        />
    </div>
  )
}

export default Input