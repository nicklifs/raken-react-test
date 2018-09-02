import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import person from './person.svg';
import styled, { css } from 'styled-components';

const navHeight = 76;
const font = `
    font-family: Roboto;
    font-style: normal;
    font-stretch: normal;
    font-weight: 400;
    font-size: 14px;
`;

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${navHeight}px;
    ${font}
    font-weight: 300;
    color: #4a4a4a;
    background: #f3f3f3;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
`;

const NavLeft = styled.div`
    padding: 0 20px;
    font-size: 16px;
`;

const NavRight = styled.div`
    display: flex;
    align-items: center;
`;

const MenuItemTextWithIcon = styled.span`
    padding-right: 20px;
    
    @media (max-width: 1024px) {
        padding-right: 15px;
    }
`;

const MenuItem = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    color: #4a4a4a;
    ${font}
  
    &:hover {
        color: #f26620;
        opacity: .7;
    }
  
    ${props => props.active && css`
        font-weight: 700;
        color: #f26620;
    `}
    
    ${props => !props.icon && css`
        padding: 0 25px;
        
        & + .itemWithIcon {
            margin-left: 25px;
        }
        
        @media (max-width: 1024px) {
            padding: 0 15px;
            
            & + .itemWithIcon {
                margin-left: 15px;
            }
        }
        
        @media (max-width: 700px) {
            padding: 0 8px;
            
            & + .itemWithIcon {
                margin-left: 8px;
            }
        }
    `}
    
    ${props => props.icon && css`
        display: flex;
        align-items: center;
        border-left: 1px solid #e4e4e4;
        
        &:before {
            content: '';
            display: block;
            width: 100px;
            height: ${navHeight}px;
        }
        
        @media (max-width: 1024px) {
            &:before {
                width: 80px;
            }
        }
        
        @media (max-width: 700px) {
            &:before {
                width: 70px;
            }
        }
    `}
    
    ${props => props.icon === 'person' && css`
        &:before {
            background: url(${person}) center no-repeat;
        }
    `}
    
    ${props => props.submenu && css`
        position: relative;
    `}
    
    ${props => props.active && props.submenu && css`
        background: #e4e4e4;
        
        /* triangle in the top */
        &:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border: 18px solid transparent;
            border-bottom: 18px solid white;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -10px;
            z-index: 1;
            cursor: default;
        }
    `}
    
`;

const SubMenuWrapper = styled.div`
    position: relative; 
`;

const SubMenu = styled.div`
    position: absolute;
    right: 10px;
    top: ${navHeight / 2 + 10}px;
    display: block;
    background: #fff
    border-radius: 7px;
    box-shadow: 0px 2px 30px 0px rgba(0,0,0,0.3);
    cursor: default;
    overflow: hidden;
`;

const SubMenuItem = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 50px;
    padding: 0 30px;
    text-transform: uppercase;
    ${font}
    color: #4a4a4a;
    text-decoration: none;
    
    /* separator */
    & ~ a:before {
        position: absolute;
        top: 0;
        content: '';
        border-top: 1px solid #d8d8d8;
        width: calc(100% - 60px);       /* 30px padding left and right */
        display: block;
    }
    
    ${props => props.active && css`
        background: #d8d8d8;
        
        & + a:before {
            border-top-color: transparent;
        }
    `}
    
    &:hover {
        background: #d8d8d8;
        opacity: .7;
        
        & + a:before {
            border-top-color: transparent;
        }
    }
`;

const Badge = styled.span`
    margin-left: 20px;
    font-size: 10px;
    line-height: 1;
    background: #f26620;
    color: #fff;
    border-radius: 50%;
    padding: 3px;
`;

class Nav extends PureComponent {

    constructor(props)
    {
        super(props);

        this.state = {
            activeSubMenu: null
        };

        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.renderSubMenuItem = this.renderSubMenuItem.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.page !== newProps.page)
        {
            this.setState({ activeSubMenu: null });
        }
    }

    handleMenuItemToggle(activeSubMenu)
    {
        this.setState(prevState => ({
            activeSubMenu: prevState.activeSubMenu !== activeSubMenu ? activeSubMenu : null
        }));
    }

    static renderBadge(badge)
    {
        return (
          <Badge>{badge}</Badge>
        );
    }

    renderSubMenu(items)
    {
        if (!items || !items.length)
        {
            return null;
        }

        return (
            <SubMenuWrapper>
                <SubMenu>
                    { items.map(this.renderSubMenuItem) }
                </SubMenu>
            </SubMenuWrapper>
        );
    }

    renderSubMenuItem(item)
    {
        const { id, label, badge } = item;
        const isActiveItem = this.props.page === `/${id}`;

        return (
            <SubMenuItem
                to={id}
                key={id}
                active={isActiveItem ? 'true' : ''} /* fix warning in console */
            >
                <span>{label}</span>
                {!!badge && Nav.renderBadge(badge)}
            </SubMenuItem>
        );
    }

    renderMenu()
    {
        const { items = [] } = this.props;

        return items.map(this.renderMenuItem);
    }

    renderMenuItem(item)
    {
        const { id, label, icon, items } = item;
        const isActiveItem = this.props.page === `/${id}`;
        const className = icon ? 'itemWithIcon' : '';

        if (items)
        {
            const isActiveSubMenu = this.state.activeSubMenu === id;

            return (
                <React.Fragment key={id}>
                    <MenuItem
                        className={className}
                        to={id}
                        icon={icon}
                        active={isActiveSubMenu ? 'true' : ''}  /* fix warning in console */
                        submenu='true'
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            this.handleMenuItemToggle(id)
                        }}
                    >
                        { label && <MenuItemTextWithIcon>{ label }</MenuItemTextWithIcon> }
                    </MenuItem>
                    { isActiveSubMenu && this.renderSubMenu(items) }
                </React.Fragment>
            );
        }

        return (
            <MenuItem
                className={className}
                to={id}
                key={id}
                icon={icon}
                active={isActiveItem ? 'true' : ''} /* fix warning in console */
            >
                { label }
            </MenuItem>
        )
    }

    render()
    {
        return (
            <NavWrapper>
                <NavLeft>COMPANY NAME</NavLeft>
                <NavRight>{ this.renderMenu() }</NavRight>
            </NavWrapper>
        );
    }
}

export default Nav;
