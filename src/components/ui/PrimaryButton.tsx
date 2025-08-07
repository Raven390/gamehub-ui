import React from 'react';
import styles from './PrimaryButton.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ children, loading, ...props }) => (
    <button className={styles.btn} {...props} disabled={props.disabled || loading}>
        {loading ? <span className={styles.loader}></span> : children}
    </button>
);

export default PrimaryButton;
