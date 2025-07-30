import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ProjectItem } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  items: ProjectItem[];
}

const ProjectList: React.FC<ProjectListProps> = ({ items }) => (
  <Box>
    <Typography variant="h5" gutterBottom>Новые проекты</Typography>
    <Box sx={{ mb: 2, height: 40, background: '#fff', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} />
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} sm={4} key={item.id}>
          <ProjectCard item={item} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ProjectList;
