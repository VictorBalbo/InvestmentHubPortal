import { Constants } from '@/appsettings'

export class ApiService {
	public static authToken: string

	public static async login() {
		const authData = {}
		const response = await fetch(`${Constants.SERVER_HOST}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(authData),
		})
		const { token } = await response.json()
		this.authToken = token
	}

	public static isLoggedIn(): boolean {
		return !!this.authToken
	}

	public static async sendGetRequest<T>(url: string): Promise<T> {
		const response = await fetch(`${Constants.SERVER_HOST}${url}`, {
			headers: this.getAuthHeader(),
		})
		const value = (await response.json()) as T
		return value
	}

	public static async sendPostRequest<T>(url: string, body: Record<string, unknown>): Promise<T> {
		const response = await fetch(`${Constants.SERVER_HOST}${url}`, {
			method: 'POST',
			headers: {
				...this.getAuthHeader(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		const value = (await response.json()) as T
		return value
	}

	private static getAuthHeader() {
		return {
			Authorization: `Bearer ${this.authToken}`,
		}
	}
}
