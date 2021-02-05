import React from 'react'
import './Footer.scss'

export const FooterComponent = () => {
	return (
		<footer className="main-footer">
			<span>InvestmentHub ©{new Date().getFullYear()}</span>
		</footer>
	)
}
