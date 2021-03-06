import React, {  } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '@/services'
import { AppSettings } from '@/appsettings'

export const LoginComponent = () => {
	const auth = useAuth()
	const history = useHistory()

	const onClick = () => {
		if(!auth?.account) {
			auth?.signin({
				email: AppSettings.get('DEFAULT_EMAIL'),
				password: AppSettings.get('DEFAULT_PASSWORD'),
			}).then((isAuthenticated) => {
				if(isAuthenticated) {
					history.push('/')
				}
			})
		}
	}

	return <button onClick={onClick}>LOGIN
	</button>
}