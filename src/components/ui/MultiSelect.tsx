import React, { useState, useRef } from 'react';
import styles from './MultiSelect.module.css';

interface Option {
    value: string | number;
    label: string;
}

interface MultiSelectProps {
    label: string;
    options: Option[];
    selected: (string | number)[];
    onChange: (v: (string | number)[]) => void;
    placeholder?: string;
    error?: string;
}


const MultiSelect: React.FC<MultiSelectProps> = ({
                                                     label, options, selected, onChange, placeholder, error
                                                 }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Фильтруем доступные варианты
    const filtered = options.filter(opt =>
        opt.label.toLowerCase().includes(input.toLowerCase()) &&
        !selected.includes(opt.value)
    );

    function addTag(val: string | number) {
        if (!selected.includes(val)) {
            onChange([...selected, val]);
            setInput('');
            inputRef.current?.focus();
        }
    }
    function removeTag(val: string | number) {
        onChange(selected.filter(t => t !== val));
    }
    function handleInputKey(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && filtered[0]) addTag(filtered[0].value);
        if (e.key === 'Backspace' && !input && selected.length) removeTag(selected[selected.length - 1]);
    }


    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <div className={`${styles.control} ${error ? styles.inputError : ''}`}>
                <div className={styles.chips}>
                    {selected.map(val => {
                        const opt = options.find(o => o.value === val);
                        return (
                            <span className={styles.chip} key={val}>
                            {opt?.label ?? val}
                                <button
                                    type="button"
                                    className={styles.removeBtn}
                                    onClick={() => removeTag(val)}
                                    tabIndex={0}
                                    aria-label={`Удалить ${opt?.label ?? val}`}
                                >×</button>
                            </span>
                        );
                    })}

                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={selected.length === 0 ? placeholder : ''}
                        onKeyDown={handleInputKey}
                        list={`multi-select-${label}`}
                        aria-label={`Добавить ${label.toLowerCase()}`}
                    />
                </div>
                {filtered.length > 0 && input &&
                    <ul className={styles.dropdown}>
                        {filtered.slice(0, 5).map(opt => (
                            <li
                                key={opt.value}
                                className={styles.option}
                                onClick={() => addTag(opt.value)}
                            >{opt.label}</li>
                        ))}
                    </ul>
                }
            </div>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default MultiSelect;
