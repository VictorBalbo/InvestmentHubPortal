import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '@/services'
import { Button } from 'antd'
import { InputComponent, isValidEmail } from '@/components'
import Logo from '@/assets/logo.svg'
import './Login.scss'

export const LoginComponent = () => {
	const auth = useAuth()
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const isFormValid = !!email && isValidEmail(email) && !!password


	const logIn = async (event?: FormEvent) => {
		event?.preventDefault()

		if (!auth?.account) {
			setIsLoading(true)
			try {
				const isAuthenticated = await auth.signin({ email, password })

				if (isAuthenticated) {
					history.push('/')
				}
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<section className="login-component">
			<div className="login-form">
				<div className="logo">
					<img src={Logo} alt="InvestmentHub Logo" />
					<span>InvestmentHub</span>
				</div>
				<form onSubmit={logIn} noValidate>
					<InputComponent
						label="Email"
						type="email"
						value={email}
						onChange={setEmail}
						required={true}
					/>
					<InputComponent
						label="Password"
						type="password"
						value={password}
						onChange={setPassword}
						required={true}
					/>
					<Button disabled={!isFormValid} type="primary" htmlType="submit" loading={isLoading}>
						Login
					</Button>
				</form>
			</div>
		</section>
	)
}
