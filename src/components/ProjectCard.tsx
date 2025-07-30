import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from './ProjectCard.module.css';
import { ProjectItem } from '../types';

interface ProjectCardProps {
    item: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => (
    <Box className={styles.card}>
        <div>
            <Typography variant="h6" gutterBottom>{item.name}</Typography>
            <Typography variant="subtitle2" gutterBottom>Owner: {item.owner}</Typography>
            <Typography variant="body2">{item.description}</Typography>
        </div>
        <Button className={styles.button}>Подробнее</Button>
    </Box>
);

export default ProjectCard;