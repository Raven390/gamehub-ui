import React, {useEffect, useRef, useState} from "react";
import styles from "./EditableField.module.css";
import { FieldEditIcon } from "./FieldEditIcon";

interface EditableFieldProps {
    label?: string;
    value: string;
    placeholder?: string;
    canEdit?: boolean;
    onSave: (newValue: string) => Promise<void>;
    className?: string;
    inputType?: "input" | "textarea";
    maxLength?: number;
    validate?: (value: string) => string | null; // возвращает ошибку, если есть
    loading?: boolean;
    autoFocus?: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
                                                                label,
                                                                value,
                                                                placeholder,
                                                                canEdit = false,
                                                                onSave,
                                                                className = "",
                                                                inputType = "input",
                                                                maxLength,
                                                                validate,
                                                                loading = false,
                                                                autoFocus = false
                                                            }) => {
    const [editing, setEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);


    // Сброс значения при открытии edit
    React.useEffect(() => {
        if (editing) {
            setLocalValue(value);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        }
    }, [editing, value]);

    // Обработка сохранения
    const handleSave = async () => {
        const err = validate?.(localValue);
        if (err) {
            setError(err);
            return;
        }
        if (localValue === value) {
            setEditing(false);
            setError(null);
            return;
        }
        try {
            setSaving(true);
            await onSave(localValue);
            setEditing(false);
            setError(null);
            setSaved(true);
            setTimeout(() => setSaved(false), 1300);
        } catch (e: any) {
            setError(e?.message || "Ошибка сохранения");
        } finally {
            setSaving(false);
        }
    };

    // Обработка клавиш
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
        if (e.key === "Escape") {
            setEditing(false);
            setError(null);
            setLocalValue(value);
        }
    };

    // Отрисовка
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {label && <div className={styles.label}>{label}</div>}

            {/* Режим редактирования */}
            {editing ? (
                <div className={styles.editField}>
                    {inputType === "textarea" ? (
                        <textarea
                            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                            className={`${styles.input} ${error ? styles.error : ""}`}
                            value={localValue}
                            placeholder={placeholder}
                            maxLength={maxLength}
                            disabled={saving || loading}
                            onChange={e => {
                                setLocalValue(e.target.value);
                                setError(null);
                            }}
                            onBlur={handleSave}
                            onKeyDown={handleKeyDown}
                            autoFocus={autoFocus}
                            rows={3}
                        />
                    ) : (
                        <input
                            ref={inputRef as React.RefObject<HTMLInputElement>}
                            className={`${styles.input} ${error ? styles.error : ""}`}
                            value={localValue}
                            placeholder={placeholder}
                            maxLength={maxLength}
                            disabled={saving || loading}
                            onChange={e => {
                                setLocalValue(e.target.value);
                                setError(null);
                            }}
                            onBlur={handleSave}
                            onKeyDown={handleKeyDown}
                            autoFocus={autoFocus}
                            type="text"
                        />
                    )}
                    {/* Лоадинг */}
                    {(saving || loading) && (
                        <div className={styles.spinner} title="Сохраняем..." />
                    )}
                    {/* Saved анимация */}
                    {saved && (
                        <div className={styles.saved} title="Сохранено!">✔</div>
                    )}
                </div>
            ) : (
                // Read-only + edit icon
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
                    <span className={styles.value}>
                        {value?.length > 0 ? value : <span className={styles.placeholder}>{placeholder || "—"}</span>}
                    </span>
                    {canEdit && <FieldEditIcon className={styles.editIcon} />}
                    {saved && (
                        <span className={styles.saved} title="Сохранено!">✔</span>
                    )}
                </div>
            )}

            {/* Ошибка */}
            {error && <div className={styles.errorMsg}>{error}</div>}
            {/* Длина значения (если есть лимит) */}
            {maxLength && editing && (
                <div className={styles.lengthHint}>
                    {localValue.length} / {maxLength}
                </div>
            )}
        </div>
    );
};
