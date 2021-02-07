import { AccountProvider } from '@/models'
import { ApiService } from '.'

export class AccountProvidersService {
	static getAccountProvidersAsync(): Promise<AccountProvider[]> {
		return ApiService.sendGetRequest<AccountProvider[]>('/accounts/providers')
	}
}
