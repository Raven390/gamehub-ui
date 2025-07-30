import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{item.title}</Typography>
      <Typography variant="caption" display="block" gutterBottom>{item.date}</Typography>
      <Typography variant="body2">{item.description}</Typography>
    </CardContent>
  </Card>
);

export default NewsCard;
