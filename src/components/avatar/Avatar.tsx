import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
    username?: string;
    size?: number; // можно потом добавить, если захочешь варьировать размер
}

const Avatar: React.FC<AvatarProps> = ({ username }) => {
    const letter = username?.charAt(0).toUpperCase() || '?';
    return (
        <div className={styles.avatar}>
            {letter}
        </div>
    );
};

export default Avatar;
