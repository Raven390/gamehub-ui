import React, {useState} from "react";
import {Button, Layout, Menu} from "antd";
import {HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {ROUTE} from "../../common/routes";
import styles from "../../screens/homepage/Homepage.module.css";

const {Sider} = Layout;

//TODO: переделать боковое меню
// Функция для получения ключа меню для заданного пути
const getMenuKeyForPath = (path: string) => {
    const segments = path.split('/');
    if (segments.length > 2) {
        return `/${segments.slice(1, -1).join('/')}`;
    }
    return path;
};

const MainSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation();
    const selectedKeys = [getMenuKeyForPath(location.pathname)];

    return (
        <Sider
            style={{position: "fixed", height: "100vh", transition: 'width 0.2s', bottom: "0", top: "0px"}}
            theme="dark" width={200}
            trigger={null} collapsible collapsed={collapsed}
        >
            <Button
                style={{paddingLeft: "30px"}}
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined className={styles.buttonMenuIcon}/> :
                    <MenuFoldOutlined className={styles.buttonMenuIcon}/>}
                onClick={() => setCollapsed(!collapsed)}
                className={styles.buttonMenu}
                color="white"
            />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[ROUTE.home]}
                selectedKeys={selectedKeys}
            >
                <Menu.Item key={ROUTE.home} icon={<HomeOutlined/>} title={"Домой"}>
                    {/* Ссылка на домашнюю страницу */}
                    <Link to={ROUTE.home}>Домой</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default MainSider;
