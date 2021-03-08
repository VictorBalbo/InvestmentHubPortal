import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import Logo from '@/assets/logo.svg'
import './SideMenu.scss'

export const SideMenuComponent = () => {
	let pathName = window.location.pathname
	if (pathName === '/') {
		pathName = '/summary'
	}

	return (
		<aside className="side-menu">
			<div className="logo">
				<img src={Logo} alt="InvestmentHub Logo" />
				<span>InvestmentHub</span>
			</div>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={[pathName]}>
				<Menu.Item key="/summary">
					<Link to="/summary">Summary</Link>
				</Menu.Item>
				<Menu.Item key="/providers">
					<Link to="/providers">Providers</Link>
				</Menu.Item>
			</Menu>
		</aside>
	)
}
