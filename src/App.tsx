import React, { useState } from 'react'
import { FooterComponent, HeaderComponent, ProvidersComponent } from '@/components'
import { LoginComponent, OverviewComponent } from '@/pages'
import { Menu } from 'antd'
import './App.scss'
import Logo from './assets/logo.svg'
import { ProvideAuthComponent, PrivateRouteComponent, useAuth } from '@/services/AuthService'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function App() {
	const [isShowValuesEnabled, setIsShowValuesEnabled] = useState<boolean>(true)

	let pathName = window.location.pathname
	if (pathName === '/') pathName = '/summary'

	const auth = useAuth()

	return (
		<section id="App">
			<Router>
				<aside id="side-menu">
					<div className="logo">
						<img src={Logo} alt="Cerberus Logo" />
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
				<section id="main-section" className={isShowValuesEnabled ? '' : 'hide-values-enabled'}>
					<HeaderComponent
						isShowValuesEnabled={isShowValuesEnabled}
						setIsShowValuesEnabled={setIsShowValuesEnabled}
					/>
					<main id="main-content">
						<Switch>
							<ProvideAuthComponent>
								<Route exact path="/login">
									{auth.account}
									<LoginComponent />
								</Route>
								<PrivateRouteComponent exact path={['/', '/summary']}>
									<OverviewComponent isShowValuesEnabled={isShowValuesEnabled} />
								</PrivateRouteComponent>
								<Route path={['/providers']}>
									<ProvidersComponent />
								</Route>
							</ProvideAuthComponent>
						</Switch>
					</main>
					<FooterComponent />
				</section>
			</Router>
		</section>
	)
}

export default App
