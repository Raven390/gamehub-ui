import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './NewsCard.module.css';
import { NewsItem } from '../types';

interface NewsCardProps {
    item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => (
    <Box className={styles.card} mb={2}>
        <Typography variant="h6" gutterBottom>{item.title}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{item.date}</Typography>
        <Typography variant="body2">{item.description}</Typography>
    </Box>
);

export default NewsCard;