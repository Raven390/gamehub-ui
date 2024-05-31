import React, {CSSProperties} from "react";
import {Avatar, Dropdown, Menu} from "antd";
import {observer} from "mobx-react-lite";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons"; // Иконки для меню
import keycloak from "../../services/keycloak";
import {useStores} from "../../stores/root-store/root-store-context";
import styles from "./Header.module.css"; // Импортируем стили из модуля CSS
import {Header} from "antd/es/layout/layout";

// Функция для генерации цвета на основе имени пользователя
const getUserColor = (username: string) => {
    // Преобразуем имя пользователя в число
    const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Выбираем цвет из списка цветов на основе хеша имени пользователя
    const colorList = ['#7265e6', '#ffbf00', '#00a2ae', '#389e0d', '#722ed1', '#eb2f96', '#13c2c2', '#f56a00'];
    const index = hash % colorList.length;
    return colorList[index];
};


// Компонент шапки страницы
export const MainHeader = observer(() => {
    // Получаем хранилище профиля из контекста
    const {profileStore: store} = useStores();
    // Получаем имя пользователя из хранилища профиля
    let username = store.userShortName;
    // Получаем цвет пользователя на основе его имени
    const color = store.userShortName ? getUserColor(store.userShortName) : "#000000"; // Здесь "#000000" - это какой-то дефолтный цвет по умолчанию


    // Функция для обработки выхода из системы
    const handleLogout = () => {
        keycloak.logout().then(() => keycloak.login());
    };

// Определяем стили для меню
    const customMenuStyle: CSSProperties = {
        backgroundColor: '#ffffff', // Цвет фона меню
        border: '1px solid #eaeaea', // Граница меню
        borderRadius: '8px', // Скругление углов
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Тень меню
        minWidth: '250px'
    };

// Определяем стили для элемента меню
    const customMenuItemStyle: CSSProperties = {
        padding: '12px 20px', // Задаем отступы для элемента меню
        fontSize: '16px', // Устанавливаем размер шрифта
        color: '#333333', // Цвет текста
        cursor: 'pointer', // Курсор при наведении
        transition: 'background-color 0.3s ease', // Анимация изменения цвета фона при наведении
    };

    const customAvatarStyle: CSSProperties = {
        backgroundColor: color,
        marginRight: "10px",
        cursor: "pointer"
    }

// Определяем стили для иконок в меню
    const customMenuItemIconStyle: CSSProperties = {
        marginRight: '10px', // Задаем отступ между иконкой и текстом
    };

    // Содержимое меню
    const menu = (
        <Menu style={customMenuStyle}>
            <Menu.Item key="profile" icon={<UserOutlined style={customMenuItemIconStyle}/>} style={customMenuItemStyle}>
                Профиль
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined style={customMenuItemIconStyle}/>} onClick={handleLogout} style={customMenuItemStyle}>
                Выйти
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className={styles.header}>
            <div className={styles.container}>
                {/* Аватар пользователя с всплывающим меню */}
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar
                        style={customAvatarStyle}
                        size="large"
                    >
                        {/* Первая буква имени пользователя */}
                        {username != null ? username.substring(0, 1).toUpperCase() : username}
                    </Avatar>
                </Dropdown>
            </div>
        </Header>
    );
});
