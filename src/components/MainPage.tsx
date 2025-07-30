import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import styles from './MainPage.module.css';
import NewsList from './NewsList';
import ProjectList from './ProjectList';
import { NewsItem, ProjectItem } from '../types';

const mockNews: NewsItem[] = [
  { id: 1, title: 'Запуск платформы', date: '2024-08-01', description: 'Мы рады объявить о запуске нашей новой платформы для кооперации разработчиков.' },
  { id: 2, title: 'Новый функционал', date: '2024-08-10', description: 'Добавлена возможность создавать публичные проекты и искать участников.' },
  { id: 3, title: 'Обновление дизайна', date: '2024-08-15', description: 'Мы обновили внешний вид сайта и улучшили навигацию.' },
];

const mockProjects: ProjectItem[] = [
  { id: 1, name: 'Space Adventure', owner: 'Alice', description: 'Космическая аркада о покорении галактики.' },
  { id: 2, name: 'Medieval Quest', owner: 'Bob', description: 'RPG в средневековом сеттинге с командными боями.' },
  { id: 3, name: 'Puzzle Mania', owner: 'Charlie', description: 'Сборник головоломок на каждый день.' },
];

interface MainPageProps {
  isAuthenticated: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ isAuthenticated }) => (
  <Box className={styles.container}>
    <Box className={styles.hero}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать на платформу кооперации!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Здесь находят команды разработчики, геймдизайнеры, художники и другие участники геймдев-проектов
      </Typography>
      <Box className={styles.buttons}>
        {isAuthenticated ? (
          <>
            <Button className={styles.button} variant="contained" color="primary">Перейти в профиль</Button>
            <Button className={styles.button} variant="outlined" color="primary">Создать проект</Button>
          </>
        ) : (
          <>
            <Button className={styles.button} variant="contained" color="primary">Войти</Button>
            <Button className={styles.button} variant="outlined" color="primary">Зарегистрироваться</Button>
          </>
        )}
      </Box>
    </Box>

    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box className={styles.section}>
          <NewsList items={mockNews} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className={styles.section}>
          <ProjectList items={mockProjects} />
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default MainPage;
