import React, { Dispatch, SetStateAction } from 'react'
import { Button, Tooltip } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import './Header.scss'

interface HeaderProps {
	isShowValuesEnabled: boolean
	setIsShowValuesEnabled: Dispatch<SetStateAction<boolean>>
}

export const HeaderComponent = ({isShowValuesEnabled, setIsShowValuesEnabled}: HeaderProps) => {

	return (
		<header className='main-header'>
			<h2 className='greetings'>Hi, Victor Balbo</h2>
			<Tooltip title={isShowValuesEnabled ? 'Hide Values' : 'Show Values'}>
				<Button
					shape="circle"
					icon={isShowValuesEnabled ? <EyeOutlined /> : <EyeInvisibleOutlined />}
					onClick={() => setIsShowValuesEnabled(!isShowValuesEnabled)}
				/>
			</Tooltip>
		</header >
	)
}
