import { AssetType } from './'

export interface Asset {
	/**
	 * Id of the asset
	 */
	id: string

	/**
	 * Name of the provider
	 */
	providerName: string

	/**
	 * Name of the asset
	 */
	assetName: string

	/**
	 * Value in the asset
	 */
	value: number

	/**
	 * Type of the investment
	 */
	type: AssetType

	/**
	 * Is this investment profitable (does it generate passive income)
	 */
	generatesIncome: boolean

	/**
	 * Date the asset was saved
	 */
	storageDate: Date

	/**
	 * Percentage of the investment over the total
	 */
	Alocation: number

	/**
	 * Percentage of the investment over the total that generates income
	 */
	InvestedAlocation: number
}
