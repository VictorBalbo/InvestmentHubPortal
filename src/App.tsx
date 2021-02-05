import React, { useEffect, useState } from 'react'
import { FooterComponent, HeaderComponent, OverviewComponent } from '@/components'
import { Menu } from 'antd'
import './App.scss'
import Logo from './assets/logo.svg'
import { ApiService } from '@/services/'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function App() {
	const [isShowValuesEnabled, setIsShowValuesEnabled] = useState<boolean>(true)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	useEffect(() => {
		ApiService.login().then(() => setIsAuthenticated(true))
	}, [])

	return (
		<section id="App">
			<Router>
				<aside id="side-menu">
					<div className="logo">
						<img src={Logo} alt="Cerberus Logo" />
						<span>InvestmentHub</span>
					</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['Summary']}>
						<Menu.Item key="Summary">
							<Link to="/summary">Summary</Link>
						</Menu.Item>
						<Menu.Item key="Providers">
							<Link to="/providers">Providers</Link>
						</Menu.Item>
					</Menu>
				</aside>
				<section id="main-section" className={isShowValuesEnabled ? '' : 'hide-values-enabled'}>
					<HeaderComponent
						isShowValuesEnabled={isShowValuesEnabled}
						setIsShowValuesEnabled={setIsShowValuesEnabled}
					/>
					<main id="main-content">
						<Switch>
							<Route exact path={['/', '/summary']}>
								{isAuthenticated && <OverviewComponent isShowValuesEnabled={isShowValuesEnabled} />}
							</Route>
							<Route path={['/providers']}>
							</Route>
						</Switch>
					</main>
					<FooterComponent />
				</section>
			</Router>
		</section>
	)
}

export default App
