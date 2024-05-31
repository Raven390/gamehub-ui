import React, { Component } from 'react';
import { Image } from 'antd';
import image from "../../public/1.jpg";

// Компонент для отображения домашней страницы
class Homepage extends Component {
    render() {
        return (
            // Контейнер для центрирования изображения
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* Изображение с указанными размерами */}
                <Image width={"600px"} height={"800px"} src={image}></Image>
            </div>
        );
    }
}

export default Homepage;
