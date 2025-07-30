import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { NewsItem } from '../types';
import NewsCard from './NewsCard';

interface NewsListProps {
  items: NewsItem[];
}

const NewsList: React.FC<NewsListProps> = ({ items }) => (
  <Box>
    <Typography variant="h5" gutterBottom>Новости платформы</Typography>
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} sm={4} key={item.id}>
          <NewsCard item={item} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default NewsList;
