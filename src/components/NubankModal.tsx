import React, { Dispatch } from 'react'
import { Modal } from 'antd'
import QrCode from 'qrcode.react'
import { AccountProvider } from '@/models'
import { v4 as uuidv4 } from 'uuid'

interface NubankModalProps {
	updateProviderAssets: (provider: { secureCode: string; providerName: string }) => void
	setUpdatingProvider: Dispatch<React.SetStateAction<AccountProvider | undefined>>
}

export const NubankModalComponent = ({
	updateProviderAssets,
	setUpdatingProvider,
}: NubankModalProps) => {
	const secureCode = uuidv4()

	const updateAssets = () => {
		updateProviderAssets({
			providerName: 'Nubank',
			secureCode,
		})
	}

	return (
		<Modal
			title="Nubank"
			visible={true}
			onOk={() => updateAssets()}
			onCancel={() => setUpdatingProvider(undefined)}>
			<div>
				<p>Nubank uses a 2 step authentication process:</p>
				<ol>
					<li>
						Open Nubank app from your phone and touch the gear icon to access configuration menu;
					</li>
					<li>Select profile and then select Access from website;</li>
					<li>Aim the phone here to apture the Qr Code.</li>
				</ol>
			</div>
			<div style={{ textAlign: 'center' }}>
				<QrCode value={secureCode} level="Q" size={180}/>
			</div>
		</Modal>
	)
}
