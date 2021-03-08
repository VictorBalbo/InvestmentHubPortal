import { AppSettings } from '@/appsettings'

export class ApiService {
	private static authToken: string

	public static async login(authData: {email: string, password: string}) {
		const { token, email, name } = await this.sendPostRequest('/login', authData)
		this.authToken = token
		return { email, name }
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
