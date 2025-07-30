import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  item: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{item.name}</Typography>
      <Typography variant="subtitle2" gutterBottom>Owner: {item.owner}</Typography>
      <Typography variant="body2">{item.description}</Typography>
    </CardContent>
    <Button variant="outlined" sx={{ m: 2 }}>Подробнее</Button>
  </Card>
);

export default ProjectCard;
