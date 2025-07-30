import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ProjectItem } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  items: ProjectItem[];
}

const ProjectList: React.FC<ProjectListProps> = ({ items }) => (
  <div>
    <Typography variant="h5" gutterBottom>Новые проекты</Typography>
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} sm={4} key={item.id}>
          <ProjectCard item={item} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default ProjectList;
