import AuditoryCard from "./AuditoryCard";
import styles from "./AuditoryList.module.css";

const audience = [
    {
        icon: "👶",
        title: "Джуниоры",
        text: "Только начинаешь путь в IT? DevHub поможет найти первую команду и опыт.",
    },
    {
        icon: "🎓",
        title: "Студенты",
        text: "Участвуй в реальных проектах, прокачивай портфолио и soft skills.",
    },
    {
        icon: "🎮",
        title: "Геймдев-энтузиасты",
        text: "Объединяйся с единомышленниками, запускай свои идеи в игровой индустрии.",
    },
    {
        icon: "💻",
        title: "Инди-разработчики",
        text: "Хочешь собрать команду под свой pet-проект? Здесь ты найдёшь нужных людей.",
    },
    {
        icon: "🎨",
        title: "Дизайнеры и художники",
        text: "Погружайся в командную работу, находи проекты и прокачивай портфолио.",
    },
    {
        icon: "🚀",
        title: "Стартаперы",
        text: "Тестируй гипотезы, находи специалистов и выстраивай крутые команды.",
    },
];

const AuditoryList: React.FC = () => (
    <div className={styles.audienceList}>
        {audience.map((item, i) => (
            <AuditoryCard
                key={i}
                icon={item.icon}
                title={item.title}
                text={item.text}
            />
        ))}
    </div>
);

export default AuditoryList;
