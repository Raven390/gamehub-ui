import React, { useState, useRef, useEffect } from "react";
import styles from "./EditableMultiSelect.module.css";
import { FieldEditIcon } from "./FieldEditIcon";

interface Option {
    id: number | string;
    name: string;
}

interface EditableMultiSelectProps {
    label?: string;
    values: string[]; // Массив выбранных name!
    options: Option[];
    canEdit?: boolean;
    onSave: (newValues: string[]) => Promise<void>;
    loading?: boolean;
    className?: string;
    placeholder?: string;
    maxCount?: number;
}

export const EditableMultiSelect: React.FC<EditableMultiSelectProps> = ({
                                                                            label,
                                                                            values,
                                                                            options,
                                                                            canEdit = false,
                                                                            onSave,
                                                                            loading = false,
                                                                            className = "",
                                                                            placeholder = "Начните вводить...",
                                                                            maxCount
                                                                        }) => {
    const [editing, setEditing] = useState(false);
    const [selected, setSelected] = useState<string[]>(values);
    const [input, setInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editing) setSelected(values);
    }, [editing, values]);

    // Клик вне дропдауна — выход из edit
    useEffect(() => {
        if (!editing) return;
        function onClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setEditing(false);
            }
        }
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [editing]);

    // Фильтрация опций
    const filtered = options.filter(opt =>
        opt.name.toLowerCase().includes(input.trim().toLowerCase())
        && !selected.includes(opt.name)
    );

    // Save
    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(selected);
            setSaved(true);
            setTimeout(() => setSaved(false), 1100);
        } finally {
            setSaving(false);
            setEditing(false);
            setInput("");
        }
    };

    // Toggle
    const toggle = (name: string) => {
        setSelected(sel =>
            sel.includes(name)
                ? sel.filter(n => n !== name)
                : maxCount && sel.length >= maxCount
                    ? sel // ignore, максимум
                    : [...sel, name]
        );
    };

    // Отмена по Esc
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") setEditing(false);
        if (e.key === "Enter") handleSave();
    };

    return (
        <div className={`${styles.wrapper} ${className}`}>
            {label && <div className={styles.label}>{label}</div>}

            {!editing ? (
                <div
                    className={`${styles.displayField} ${canEdit ? styles.editable : ""}`}
                    tabIndex={canEdit ? 0 : -1}
                    role={canEdit ? "button" : undefined}
                    aria-label={label}
                    onClick={() => canEdit && setEditing(true)}
                    onKeyDown={e => {
                        if (canEdit && (e.key === "Enter" || e.key === " ")) setEditing(true);
                    }}
                >
                    <div className={styles.chips}>
                        {values.length
                            ? values.map(val => (
                                <span key={val} className={styles.chip}>{val}</span>
                            ))
                            : <span className={styles.empty}>–</span>
                        }
                    </div>
                    {canEdit && <FieldEditIcon className={styles.editIcon} />}
                    {saved && (
                        <span className={styles.saved} title="Сохранено!">✔</span>
                    )}
                </div>
            ) : (
                <div className={styles.dropdownWrap} ref={ref}>
                    <div className={styles.dropdown} tabIndex={0} onKeyDown={handleKeyDown}>
                        <input
                            className={styles.search}
                            type="text"
                            placeholder={placeholder}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            autoFocus
                        />
                        <div className={styles.selectedList}>
                            {selected.map(val => (
                                <span
                                    key={val}
                                    className={styles.chipActive}
                                    tabIndex={0}
                                    onClick={() => toggle(val)}
                                    onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggle(val)}
                                    title="Снять выбор"
                                >{val} ×</span>
                            ))}
                        </div>
                        <div className={styles.optionsList}>
                            {filtered.length
                                ? filtered.map(opt => (
                                    <div
                                        key={opt.id}
                                        className={styles.option}
                                        tabIndex={0}
                                        onClick={() => toggle(opt.name)}
                                        onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggle(opt.name)}
                                    >{opt.name}</div>
                                ))
                                : <span className={styles.empty}>Не найдено</span>
                            }
                        </div>
                        <div className={styles.actions}>
                            <button
                                className={styles.btn}
                                onClick={handleSave}
                                disabled={saving || loading}
                            >Сохранить</button>
                            <button
                                className={styles.btnCancel}
                                onClick={() => setEditing(false)}
                                disabled={saving || loading}
                            >Отмена</button>
                            {(saving || loading) && <span className={styles.spinner} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
