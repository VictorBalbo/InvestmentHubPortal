import React, { useEffect, useState } from 'react'
import { HeaderComponent, OverviewComponent } from '@/components'
import { Menu } from 'antd'
import './App.scss'
import Logo from './assets/logo.svg'
import { ApiService } from '@/services/'

function App() {
	const [isShowValuesEnabled, setIsShowValuesEnabled] = useState<boolean>(true)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	useEffect(() => {
		ApiService.login().then(() => setIsAuthenticated(true))
	}, [])

	return (
		<section id="App">
			<aside id="SideMenu">
				<div className="logo">
					<img src={Logo} alt="Cerberus Logo" />
					<span>InvestmentHub</span>
				</div>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
					<Menu.Item key="1">Summary</Menu.Item>
				</Menu>
			</aside>
			<section id="MainSection" className={isShowValuesEnabled ? '' : 'hide-values-enabled'}>
				<HeaderComponent
					isShowValuesEnabled={isShowValuesEnabled}
					setIsShowValuesEnabled={setIsShowValuesEnabled}
				/>
				<main id="MainContent">
					{isAuthenticated && <OverviewComponent isShowValuesEnabled={isShowValuesEnabled} />}
				</main>
				<footer id="MainFooter">
					<div>InvestmentHub ©{new Date().getFullYear()}</div>
				</footer>
			</section>
		</section>
	)
}

export default App
