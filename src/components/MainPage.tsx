import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
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
  <Container sx={{ py: 4 }}>
    <Box textAlign="center" mb={4}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать на платформу кооперации!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Здесь находят команды разработчики, геймдизайнеры, художники и другие участники геймдев-проектов
      </Typography>
      <Box mt={2}>
        {isAuthenticated ? (
          <>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Перейти в профиль</Button>
            <Button variant="outlined" color="primary">Создать проект</Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Войти</Button>
            <Button variant="outlined" color="primary">Зарегистрироваться</Button>
          </>
        )}
      </Box>
    </Box>

    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <NewsList items={mockNews} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProjectList items={mockProjects} />
      </Grid>
    </Grid>
  </Container>
);

export default MainPage;
