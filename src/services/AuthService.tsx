import React, { useState, useContext, createContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ApiService } from '.'

interface AuthContext {
	account?: Account
	signin: (data: { email: string; password: string }) => Promise<boolean>
	signup: (data: { email: string; name: string; password: string }) => void
	signout: () => void
}

interface Account {
	email: string
	name: string
}

let authContext: React.Context<AuthContext>
let authData: AuthContext

export const useAuth = () => {
	if (!authContext) {
		authData = useProvideAuth()
		authContext = createContext<AuthContext>(authData)
	}
	return useContext(authContext)
}

export const ProvideAuthComponent = ({ children }: { children: React.ReactNode }) => {
	authData = useProvideAuth()
	return <authContext.Provider value={authData}> {children} </authContext.Provider>
}

export const PrivateRouteComponent = ({ children, ...rest }: any) => {
	const auth = useAuth()
	return (
		<Route {...rest} value={auth}>
			{auth?.account ? children : <Redirect to="/login" />}
		</Route>
	)
}

// Provider hook that creates auth object and handles state
const useProvideAuth = (): AuthContext => {
	const [account, setAccount] = useState<Account>()

	const signin = async (data: { email: string; password: string }) => {
		try {
			const acc = await ApiService.login(data)
			setAccount(acc)
			return true
		} catch (ex) {
			console.error('Error on login', ex)
			return false
		}
	}

	const signup = (data: { email: string; name: string; password: string }) => {
		try {
			ApiService.sendPostRequest('/register', data)
			return true
		} catch (ex) {
			console.error('Error on login', ex)
			return false
		}
	}

	const signout = () => {
		// TODO: Implement sign out
	}

	// Return the user object and auth methods
	return {
		account,
		signin,
		signup,
		signout,
	}
}
