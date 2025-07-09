import { useState, useEffect } from 'react';
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
  width: ${props => (props.opened ? '220px' : '72px')};
  min-width: 72px;
  background: ${props => props.theme.sidebarBg};
  color: ${props => props.theme.text};
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
  transition: width 0.3s cubic-bezier(.4,0,.2,1);
  overflow: visible;
  position: relative;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 16px 16px 16px;
  gap: 12px;
  position: relative;
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
  position: absolute;
  top: 36px;
  right: -16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.10);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #3B82F6;
  z-index: 10;
  transition: background 0.2s, color 0.2s;
  &:active {
    background: #e2e8f0;
  }
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  padding: 0 8px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.active ? props.theme.textActive : props.theme.text};
  background: ${props => props.active ? props.theme.sidebarBgActive : 'transparent'};
  transition: background 0.2s, color 0.2s, justify-content 0.2s, min-width 0.2s;
  min-width: ${props => (props.opened ? 'auto' : '40px')};
  svg {
    min-width: 24px;
    width: 24px;
    height: 24px;
    display: block;
    text-align: center;
    color: ${props => props.active ? props.theme.textActive : '#b0b8c9'};
    transition: color 0.2s;
    margin-right: 0;
    background: transparent;
  }
  justify-content: ${props => (props.opened ? 'flex-start' : 'center')};
  span {
    display: ${props => (props.opened ? 'inline' : 'none')};
    margin-left: ${props => (props.opened ? '12px' : '0')};
    white-space: nowrap;
    transition: margin 0.2s;
  }
  &:hover {
    background: ${props => props.theme.sidebarBgHover};
    color: ${props => props.theme.textHover};
    svg {
      color: ${props => props.theme.textHover};
    }
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  padding: 0 8px;
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
  display: ${props => (props.opened ? 'block' : 'none')};
  &:active {
    background: ${props => props.theme.buttonBgActive};
  }
`;

const AnimatedNavItem = styled(NavItem)`
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? '0' : '-16px')});
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
  transition-delay: ${props => props.delay || 0}ms;
`;

const AnimatedBottomItem = styled(NavItem)`
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? '0' : '16px')});
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
  transition-delay: ${props => props.delay || 0}ms;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.divider};
  margin: 12px 0;
`;

const Sidebar = ({ color, onToggleTheme }) => {
    const [isOpened, setIsOpened] = useState(true);
    const [activePath, setActivePath] = useState('/');
    const [showNav, setShowNav] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    useEffect(() => {
        let navTimeout, bottomTimeout;
        if (isOpened) {
            navTimeout = setTimeout(() => setShowNav(true), 80);
            bottomTimeout = setTimeout(() => setShowBottom(true), 200);
        } else {
            setShowNav(false);
            setShowBottom(false);
        }
        return () => {
            clearTimeout(navTimeout);
            clearTimeout(bottomTimeout);
        };
    }, [isOpened]);

    const goToRoute = path => {
        setActivePath(path);
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    return (
        <SidebarContainer opened={isOpened}>
            <LogoRow>
                <LogoImg src={logo} alt="Logo" />
                <LogoText opened={isOpened}>TensorFlow</LogoText>
            </LogoRow>
            <ToggleButton onClick={toggleSidebar} title={isOpened ? 'Свернуть' : 'Развернуть'}>
                <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
            </ToggleButton>
            <NavSection>
                {routes.map((route, i) => (
                    <AnimatedNavItem
                        key={route.title}
                        opened={isOpened}
                        active={activePath === route.path}
                        onClick={() => goToRoute(route.path)}
                        visible={showNav}
                        delay={i * 60}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </AnimatedNavItem>
                ))}
            </NavSection>
            <Divider />
            <BottomSection>
                {bottomRoutes.map((route, i) => (
                    <AnimatedBottomItem
                        key={route.title}
                        opened={isOpened}
                        active={activePath === route.path}
                        onClick={() => goToRoute(route.path)}
                        visible={showBottom}
                        delay={(bottomRoutes.length - i - 1) * 60}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </AnimatedBottomItem>
                ))}
                <ThemeSwitchButton onClick={onToggleTheme} opened={isOpened}>
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
