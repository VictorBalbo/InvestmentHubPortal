import { AppSettings } from '@/appsettings'

export class ApiService {
	public static authToken: string

	public static async login() {
		/// TODO: Create login page
		const authData = {
			email: AppSettings.get('DEFAULT_EMAIL'),
			password: AppSettings.get('DEFAULT_PASSWORD'),
		}
		const { token } = await this.sendPostRequest('/login', authData)
		this.authToken = token
	}

	public static isLoggedIn(): boolean {
		return !!this.authToken
	}

	public static async sendGetRequest<T>(url: string): Promise<T> {
		const response = await fetch(`${AppSettings.get('SERVER_HOST')}${url}`, {
			headers: this.getAuthHeader(),
		})
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
		const responseType = response.headers.get("content-type")
		if(responseType?.includes('application/json')) {
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
