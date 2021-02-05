import { Asset } from '@/models'
import { ApiService } from './'

export class AssetService {
	/**
	 * Get the summary for client on backend.
	 * For now, this only returns mocked values.
	 */
	static getCurrentOwnedAssetsAsync(): Promise<Asset[]> {
		return ApiService.sendGetRequest<Asset[]>('/assets/current')
	}

	/**
	 * Get the summary for client on backend.
	 * For now, this only returns mocked values.
	 */
	static getAllAssetsAsync(): Promise<Asset[]> {
		return ApiService.sendGetRequest<Asset[]>('/assets')
	}
}
