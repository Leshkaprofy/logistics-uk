import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import menuData from '../data/menu.json';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (menuData && menuData.data) {
            setMenuItems(menuData.data);
        }
    }, []);

    return (
        <nav className="menu">
            <h2>Menu</h2>
            <ul>
                {menuItems.length > 0 ? (
                    menuItems.map(menu => (
                        <li key={menu.title}>
                            <Link to={menu.url} className="menu-button">{menu.title}</Link>
                        </li>
                    ))
                ) : (
                    <li>No menu items available</li>
                )}
            </ul>
        </nav>
    );
};

export const getMenuItems = () => menuData.data;

export default Menu;
