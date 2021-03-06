import settings from '@/settings.json'
export class AppSettings {
	static data: { [index: string]: any } = {}

	static get(property: string) {
		if (JSON.stringify(this.data) === JSON.stringify({})) {
			if (typeof settings === 'object') {
				this.data = settings
				return this.data[property]
			} else {
				const request = new XMLHttpRequest()
				request.open('GET', '/static/settings.json', false)
				request.send()
				AppSettings.data = JSON.parse(request.responseText)

				return this.data[property]
			}
		} else {
			return this.data[property]
		}
	}
}
