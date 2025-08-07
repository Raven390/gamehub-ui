import React from 'react';
import styles from './SecondaryButton.module.css';

const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
                                                                                      children, ...props
                                                                                  }) => (
    <button className={styles.btn} {...props}>
        {children}
    </button>
);

export default SecondaryButton;
