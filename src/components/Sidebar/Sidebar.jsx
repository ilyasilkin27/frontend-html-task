import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

const routes = [
    { title: 'Home', icon: 'house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const SidebarContainer = styled.div`
  width: ${props => (props.opened ? '220px' : '64px')};
  background: ${props => props.theme.sidebarBg};
  color: ${props => props.theme.text};
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(.4,0,.2,1);
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 16px 16px 16px;
  gap: 12px;
`;

const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  color: ${props => props.theme.logo};
  font-weight: 700;
  font-size: 1.2rem;
  opacity: ${props => (props.opened ? 1 : 0)};
  transition: opacity 0.2s;
  white-space: nowrap;
`;

const ToggleButton = styled.button`
  margin-left: auto;
  background: ${props => props.theme.buttonBg};
  border: none;
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  color: ${props => props.theme.text};
  transition: background 0.2s;
  &:active {
    background: ${props => props.theme.buttonBgActive};
  }
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.active ? props.theme.textActive : props.theme.text};
  background: ${props => props.active ? props.theme.sidebarBgActive : 'transparent'};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${props => props.theme.sidebarBgHover};
    color: ${props => props.theme.textHover};
  }
  span {
    opacity: ${props => (props.opened ? 1 : 0)};
    transition: opacity 0.2s;
    white-space: nowrap;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const ThemeSwitchButton = styled.button`
  margin: 16px;
  background: ${props => props.theme.buttonBg};
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  color: ${props => props.theme.text};
  font-size: 0.95rem;
  transition: background 0.2s;
  &:active {
    background: ${props => props.theme.buttonBgActive};
  }
`;

const Sidebar = ({ color, onToggleTheme }) => {
    const [isOpened, setIsOpened] = useState(true);
    const [activePath, setActivePath] = useState('/');

    const goToRoute = path => {
        setActivePath(path);
        // тут должен быть рутинг, но пока для примера просто выделяем активный пункт
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    return (
        <SidebarContainer opened={isOpened}>
            <LogoRow>
                <LogoImg src={logo} alt="Logo" />
                <LogoText opened={isOpened}>TensorFlow</LogoText>
                <ToggleButton onClick={toggleSidebar} title={isOpened ? 'Свернуть' : 'Развернуть'}>
                    <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
                </ToggleButton>
            </LogoRow>
            <NavSection>
                {routes.map(route => (
                    <NavItem
                        key={route.title}
                        opened={isOpened}
                        active={activePath === route.path}
                        onClick={() => goToRoute(route.path)}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </NavItem>
                ))}
            </NavSection>
            <BottomSection>
                {bottomRoutes.map(route => (
                    <NavItem
                        key={route.title}
                        opened={isOpened}
                        active={activePath === route.path}
                        onClick={() => goToRoute(route.path)}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </NavItem>
                ))}
                <ThemeSwitchButton onClick={onToggleTheme}>
                    Сменить тему
                </ThemeSwitchButton>
            </BottomSection>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
    onToggleTheme: PropTypes.func,
};

export default Sidebar;
