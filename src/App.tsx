import React, { useState } from 'react'
import { FooterComponent, HeaderComponent, SideMenuComponent } from '@/components'
import { LoginComponent, OverviewComponent, ProvidersComponent, RegisterComponent } from '@/pages'
import './App.scss'
import { ProvideAuthComponent, PrivateRouteComponent } from '@/services/AuthService'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
	const [isShowValuesEnabled, setIsShowValuesEnabled] = useState<boolean>(true)

	return (
		<section id="App">
			<Router>
				<ProvideAuthComponent>
					<Switch>
						<Route exact path="/login">
							<LoginComponent />
						</Route>
						<Route exact path="/register">
							<RegisterComponent />
						</Route>
						<Route>
							<SideMenuComponent />
							<section
								id="main-section"
								className={isShowValuesEnabled ? '' : 'hide-values-enabled'}>
								<HeaderComponent
									isShowValuesEnabled={isShowValuesEnabled}
									setIsShowValuesEnabled={setIsShowValuesEnabled}
								/>
								<main id="main-content">
									<PrivateRouteComponent exact path={['/', '/summary']}>
										<OverviewComponent isShowValuesEnabled={isShowValuesEnabled} />
									</PrivateRouteComponent>
									<PrivateRouteComponent exact path={['/providers']}>
										<ProvidersComponent />
									</PrivateRouteComponent>
								</main>
								<FooterComponent />
							</section>
						</Route>
					</Switch>
				</ProvideAuthComponent>
			</Router>
		</section>
	)
}

export default App
