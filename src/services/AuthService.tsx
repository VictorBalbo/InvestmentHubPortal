import React, { useState, useContext, createContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ApiService } from '.'
import { Account } from '@/models'

interface AuthContext {
	account?: Account
	signInFromStorage: () => Promise<boolean>
	signIn: (data: { email: string; password: string }) => Promise<boolean>
	signUp: (data: { email: string; name: string; password: string }) => void
	signOut: () => void
}

let authContext: React.Context<AuthContext>
let authData: AuthContext

export const useAuth = () => {
	return useContext(authContext)
}

export const ProvideAuthComponent = ({ children }: { children: React.ReactNode }) => {
	authData = useProvideAuth()
	if(!authContext) {
		authContext = createContext<AuthContext>(authData)
	}
	return <authContext.Provider value={authData}> {children} </authContext.Provider>
}

export const PrivateRouteComponent = ({ children, ...rest }: any) => {
	const auth = useAuth()
	return (
		<Route {...rest} value={auth}>
			{auth.account ? children : <Redirect to="/login" />}
		</Route>
	)
}

// Provider hook that creates auth object and handles state
const useProvideAuth = (): AuthContext => {
	const [account, setAccount] = useState<Account>()

	const signInFromStorage = async () => {
		try {
			const acc = await ApiService.tryLogin()
			if (acc) {
				setAccount(acc)
				return true
			}
		} catch (ex) {
			console.error('Error on login', ex)
		}
		return false
	}

	const signIn = async (data: { email: string; password: string }) => {
		try {
			const acc = await ApiService.login(data)
			setAccount(acc)
			return true
		} catch (ex) {
			console.error('Error on login', ex)
			return false
		}
	}

	const signUp = (data: { email: string; name: string; password: string }) => {
		try {
			ApiService.sendPostRequest('/register', data)
			return true
		} catch (ex) {
			console.error('Error on login', ex)
			return false
		}
	}

	const signOut = () => {
		// TODO: Implement sign out
	}

	// Return the user object and auth methods
	return {
		account,
		signInFromStorage,
		signIn,
		signUp,
		signOut,
	}
}
