export interface AccountProvider {
	email: string
	password: string
	providerName: string
	providerUserName: string
	providerUserPassword: string
	shouldCachePassword: boolean
	lastSuccessfulUpdate: string
	isProviderLoading: boolean
}
