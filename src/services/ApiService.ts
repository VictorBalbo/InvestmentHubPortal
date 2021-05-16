import { AppSettings } from '@/appsettings'
import { Account } from '@/models'

export class ApiService {
	private static authToken: string
	private static readonly TOKEN_KEY: string = 'token'

	public static async tryLogin(): Promise<Account | null> {
		const token = localStorage.getItem(this.TOKEN_KEY)
		if (token) {
			this.authToken = token
			const account = await this.sendGetRequest<Account>('/accounts')
			if(account) {
				return account
			} else {
				this.authToken = ''
				localStorage.removeItem(this.TOKEN_KEY)
			}
		}
		return null
	}

	public static async login(authData: {email: string, password: string}): Promise<Account> {
		const { token, email, name } = await this.sendPostRequest('/login', authData)
		this.authToken = token
		localStorage.setItem(this.TOKEN_KEY, token)
		return { email, name, password: authData.password }
	}

	public static async signup(authData: {email: string, password: string}): Promise<Account> {
		const { token, email, name } = await this.sendPostRequest('/register', authData)
		this.authToken = token
		localStorage.setItem(this.TOKEN_KEY, token)
		return { email, name, password: authData.password }
	}

	public static async signOut(): Promise<void> {
		this.authToken = ''
		localStorage.removeItem(this.TOKEN_KEY)
	}

	public static isLoggedIn(): boolean {
		return !!this.authToken
	}

	public static async sendGetRequest<T>(url: string): Promise<T> {
		const response = await fetch(`${AppSettings.get('SERVER_HOST')}${url}`, {
			headers: this.getAuthHeader(),
		})
		
		if (!response.ok) {
			throw Error(response.statusText)
		}
		
		const value = (await response.json()) as T
		return value
	}

	public static async sendPostRequest<T>(url: string, body: Record<string, unknown>): Promise<T> {
		const response = await fetch(`${AppSettings.get('SERVER_HOST')}${url}`, {
			method: 'POST',
			headers: {
				...this.getAuthHeader(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		if (!response.ok) {
			throw Error(response.statusText)
		}

		const responseType = response.headers.get('content-type')
		if (responseType?.includes('application/json')) {
			const value = (await response.json()) as T
			return value
		}
		return {} as T
	}

	private static getAuthHeader() {
		if (this.authToken) {
			return {
				Authorization: `Bearer ${this.authToken}`,
			}
		} else {
			return []
		}
	}
}
