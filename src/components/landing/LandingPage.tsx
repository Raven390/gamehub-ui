import Header from "./Header";
import HeroSection from "./HeroSection";
import ProjectList from "./lists/ProjectList";
import NewsList from "./lists/NewsList";
import Footer from "./Footer";
import styles from "./LandingPage.module.css";
import { Project } from "../../types/Project";
import { NewsItem } from "../../types";
import LandingCarousel from "./carousel";

// Моки (замени на fetch, если нужно)
const mockProjects: Project[] = [
    { id: 1, name: "Task Manager", status: "Active", time: "2h", icon: "✅" },
    { id: 2, name: "Game Engine", status: "Hiring", time: "5h", icon: "🎮" }
];

const mockNews: NewsItem[] = [
    {
        id: 1,
        title: "Запуск платформы",
        date: "2024-08-01",
        description: "Мы рады объявить о запуске новой платформы для разработчиков.",
    },
    {
        id: 2,
        title: "Новый релиз",
        date: "2024-08-08",
        description: "Вышла версия 1.1 с поддержкой новых команд и багфиксами.",
    }
];

const LandingPage = () => (
    <>
        <Header />
        <main className={styles.main}>
            <HeroSection />
            <LandingCarousel />
            <section className={styles.section}>
                <div className={styles.lists}>
                    <div className={styles.listColumn}>
                        <ProjectList items={mockProjects} />
                    </div>
                    <div className={styles.listColumn}>
                        <NewsList items={mockNews} />
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </>
);

export default LandingPage;
