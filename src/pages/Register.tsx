import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '@/services'
import { Button, notification, Spin } from 'antd'
import { InputComponent, isValidEmail } from '@/components'
import Logo from '@/assets/logo.svg'
import { LoadingOutlined } from '@ant-design/icons'
import './Register.scss'

export const RegisterComponent = () => {
	const auth = useAuth()
	const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isFullPageLoading, setIsFullPageLoading] = useState(false)

	const isFormValid = !!name && !!email && isValidEmail(email) && !!password

	useEffect(() => {
		if (!auth.account) {
			setIsFullPageLoading(true)
			auth
				.signInFromStorage()
				.then((isAuthenticated) => {
					if (isAuthenticated) {
						history.push('/')
					}
				})
				.finally(() => {
					setIsFullPageLoading(false)
				})
		}
	}, [])

	const signUp = async (event?: FormEvent) => {
		event?.preventDefault()

		if (!auth?.account) {
			setIsLoading(true)
			try {
				const isAuthenticated = await auth.signUp({ email, name, password })

				if (isAuthenticated) {
					history.push('/')
				} else {
					notification.error({
						message: 'Error',
						description: 'There where an error signing you up',
						placement: 'bottomLeft',
					})
				}
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<section className="register-component">
			{isFullPageLoading && <Spin className='full-page-loading' indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />}
			{!isFullPageLoading && (
				<div className="reigster-form">
					<div className="logo">
						<img src={Logo} alt="InvestmentHub Logo" />
						<span>InvestmentHub</span>
					</div>
					<form onSubmit={signUp} noValidate>
						<InputComponent
							label="Name"
							value={name}
							onChange={setName}
							required={true}
						/>
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
							Create Account
						</Button>
					</form>
				</div>
			)}
		</section>
	)
}
