import React, { useState, useEffect } from 'react'
import { Card, Divider, Statistic, Table } from 'antd'
import { Doughnut, Line } from 'react-chartjs-2'
import { compareAsc, format, parseISO } from 'date-fns'
import { Asset, AssetType, PatrimonyEvolution } from '@/models'
import { AssetService, ColorService } from '@/services'
import './Overview.scss'

export function OverviewComponent({ isShowValuesEnabled }: { isShowValuesEnabled: boolean }) {
	const [allAssets, setAllAssets] = useState<Asset[]>()
	useEffect(() => {
		AssetService.getAllAssetsAsync().then(setAllAssets)
	}, [])

	let patrimonyChart
	if (allAssets) {
		const evolution = getPatrimonyEvolution(allAssets)
		patrimonyChart = {
			labels: evolution.map((p) => format(parseISO(p.Date), 'dd/MM/yy')),
			datasets: [
				{
					data: evolution.map((i) => i.Value),
				},
			],
		}
	}

	const [currentOwnedAssets, setcurrentOwnedAssets] = useState<Asset[]>()
	useEffect(() => {
		AssetService.getCurrentOwnedAssetsAsync().then(setcurrentOwnedAssets)
	}, [])

	let netWorthValue = 0
	let investedValue = 0
	let debtValue = 0
	let positiveAssetsValue = 0
	let walletChartData
	let walletTableSource

	if (currentOwnedAssets) {
		netWorthValue = currentOwnedAssets.reduce((acc, val) => acc + val.value, 0)
		debtValue = currentOwnedAssets
			.filter((a) => a.value < 0)
			.reduce((acc, val) => acc + val.value, 0)
		positiveAssetsValue = currentOwnedAssets
			.filter((a) => a.value > 0)
			.reduce((acc, val) => acc + val.value, 0)
		investedValue = currentOwnedAssets
			.filter((a) => a.generatesIncome)
			.reduce((acc, val) => acc + val.value, 0)

		// Group investiments by type
		const investmentsByType =
			currentOwnedAssets.reduce((acc: { [key in AssetType]?: number }, i) => {
				acc[i.type] = (acc[i.type] || 0) + i.value
				return acc
			}, {}) ?? {}

		walletChartData = {
			labels: Object.keys(investmentsByType).filter((a) => a !== AssetType.Credit),
			datasets: [
				{
					percentage: Object.values(investmentsByType)
						.filter((val) => (val ?? 0) > 0)
						.map((val) => formatPercentage((val ?? 0) / positiveAssetsValue)),
					data: Object.values(investmentsByType)
						.filter((val) => (val ?? 0) > 0)
						.map((val) => roundDecimals(val ?? 0)),
					backgroundColor: Object.keys(investmentsByType).map((i) => ColorService.getColor(i)),
					borderWidth: 1,
				},
			],
		}

		walletTableSource = Object.entries(investmentsByType).map(([key, value]) => ({
			key: key,
			type: key,
			participacao:
				key === AssetType.Credit ? '-' : formatPercentage((value ?? 0) / positiveAssetsValue),
			value: roundDecimals(value ?? 0),
		}))
	}

	const walletTablecolumns = [
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			sorter: (a: any, b: any) => a.type.localeCompare(b.type),
		},
		{
			title: 'Participação',
			dataIndex: 'participacao',
			key: 'participacao',
			sorter: (a: any, b: any) => parseFloat(a.participacao) - parseFloat(b.participacao),
		},
		{
			title: 'Valor',
			dataIndex: 'value',
			key: 'value',
			sorter: (a: any, b: any) => a.value - b.value,
			render: (value: number) => (isShowValuesEnabled ? value : '-'),
		},
	]

	return (
		<div id="OverviewComponent">
			<section className="CardSection">
				<Card title="My Summary" className="OverviewCard SummaryCard" loading={!currentOwnedAssets}>
					<Statistic
						title="Net Worth"
						value={isShowValuesEnabled ? netWorthValue : '-'}
						precision={2}
						prefix={'R$'}
					/>
					<Divider className="Divider" />
					<Statistic
						title="Invested"
						value={isShowValuesEnabled ? investedValue : '-'}
						precision={2}
						prefix={'R$'}
					/>
					{debtValue !== 0 && (
						<span>
							<Divider className="Divider" />
							<Statistic
								title="Assets"
								value={isShowValuesEnabled ? positiveAssetsValue : '-'}
								precision={2}
								prefix={'R$'}
								valueStyle={{ color: '#3f8600' }}
							/>
							<Divider className="Divider" />
							<Statistic
								title="Debt"
								value={isShowValuesEnabled ? debtValue : '-'}
								precision={2}
								prefix={'R$'}
								valueStyle={{ color: '#cf1322' }}
							/>
						</span>
					)}
				</Card>

				<Card title="Evolution" className="OverviewCard EvolutionCard" loading={!allAssets}>
					<Line
						data={patrimonyChart}
						height={250}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							scales: {
								yAxes: [
									{
										ticks: {
											display: isShowValuesEnabled,
										},
									},
								],
							},
							legend: {
								display: false,
								onClick: (e: Event) => e.stopPropagation(),
							},
						}}
					/>
				</Card>
			</section>

			<section className="CardSection">
				<Card title="My Wallet" className="OverviewCard WalletCard" loading={!currentOwnedAssets}>
					<div className="WalletWrapper">
						<div className="WalletChart">
							<Doughnut
								data={walletChartData}
								options={{
									tooltips: {
										callbacks: {
											label: ({ datasetIndex, index }: any, { datasets }: any) =>
												isShowValuesEnabled
													? `R$ ${datasets[datasetIndex].data[index]}`
													: `${datasets[datasetIndex].percentage[index]}`,
										},
									},
									responsive: true,
									maintainAspectRatio: false,
									legend: {
										onClick: (e: Event) => e.stopPropagation(),
									},
								}}
							/>
						</div>
						<div className="WalletTable">
							<Table
								dataSource={walletTableSource}
								columns={walletTablecolumns}
								rowClassName={(record: any) => (record.value < 0 ? 'text-red' : '')}
							/>
						</div>
					</div>
				</Card>
			</section>
		</div>
	)
}

const formatPercentage = (value: number) => `${roundDecimals(value * 100)}%`

const roundDecimals = (value: number, decimals: number = 2) =>
	Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)

/**
 * Get the evolution of patrimony given a list of assets
 * @param assets List of assets
 */
const getPatrimonyEvolution = (assets: Asset[]): PatrimonyEvolution[] => {
	const assetsByDate = assets.reduce((acc: { [key: string]: { [key: string]: number } }, val) => {
		const assetDate = format(new Date(val.storageDate), 'yyyy-MM-dd')
		acc[assetDate] = acc[assetDate] || {}
		acc[assetDate][val.providerName] = val.value + (acc[assetDate][val.providerName] || 0)
		return acc
	}, {})

	const patrimonyByDateByProvider = Object.keys(assetsByDate)
		.sort((a, b) => compareAsc(new Date(a), new Date(b)))
		.map((date, index, datesArray) => {
			// Providers not synced on the day should keep the last recorded value
			const valueByProviders = { ...assetsByDate[datesArray[index - 1]], ...assetsByDate[date] }
			return {
				Date: date,
				Value: Object.keys(valueByProviders).reduce(
					(acc, providerName) => acc + valueByProviders[providerName],
					0,
				),
			}
		})
	return patrimonyByDateByProvider
}
