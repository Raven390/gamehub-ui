import React, { useRef, useEffect } from 'react';
import styles from './TextareaField.module.css';

interface TextareaFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    maxLength?: number;
    error?: string;
    rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
                                                         label, value, onChange, placeholder, maxLength, error, rows = 4
                                                     }) => {
    // Автоматический resize
    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <div className={styles.field}>
            <label className={styles.label}>
                {label}
                <textarea
                    ref={ref}
                    className={`${styles.textarea} ${error ? styles.inputError : ''}`}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    rows={rows}
                />
                {maxLength &&
                    <span className={styles.counter}>
                        {value.length}/{maxLength}
                    </span>
                }
            </label>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default TextareaField;
