import React, { forwardRef } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    maxLength?: number;
    error?: string;
    autoFocus?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
                                                                    label, value, onChange, placeholder, maxLength, error, autoFocus
                                                                }, ref) => (
    <div className={styles.field}>
        <label className={styles.label}>
            {label}
            <input
                ref={ref}
                type="text"
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                autoFocus={autoFocus}
            />
        </label>
        {maxLength &&
            <span className={styles.counter}>
                    {value.length}/{maxLength}
                </span>
        }
        {error && <div className={styles.error}>{error}</div>}
    </div>
));

export default TextField;
