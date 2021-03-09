import React, { Dispatch, useState } from 'react'
import { Modal } from 'antd'
import { AccountProvider } from '@/models'
import { InputComponent } from '.'

interface RicoModalProps {
	updateProviderAssets: (provider: { secureCode?: string; providerName: string }) => void
	setUpdatingProvider: Dispatch<React.SetStateAction<AccountProvider | undefined>>
}

export const RicoModalComponent = ({
	updateProviderAssets,
	setUpdatingProvider,
}: RicoModalProps) => {

	const [secureCode, setSecureCode] = useState<string>('')

	const updateAssets = () => {
		updateProviderAssets({
			providerName: 'Rico',
			secureCode,
		})
	}
	return (
		<Modal
			title="Rico"
			visible={true}
			onOk={() => updateAssets()}
			onCancel={() => setUpdatingProvider(undefined)}>
			<div>
				<p>Rico uses a 2 step authentication process:</p>
				<ol>
					<li>
						Open Rico app from your phone and touch <i>Token Rico</i> option;
					</li>
					<li>Input the token here:</li>
				</ol>
			</div>
			<div>
				<InputComponent label="Token" value={secureCode} onChange={setSecureCode}/>
			</div>
		</Modal>
	)
}
