import React, { useRef, useState } from 'react'
import './input.scss'

interface InputProps {
	value: string
	onChange?: (value: string) => void
	label?: string
	type?: 'text' | 'password' | 'email'
	danger?: boolean
	required?: boolean
	errorMessage?: string
	readonly?: boolean
	rightSlot?: React.ReactNode
}

const emailRegex = /^\w+([.+,-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/
export const isValidEmail = (term: string): boolean => {
	return emailRegex.test(term)
}

export const InputComponent = ({
	label,
	value,
	onChange,
	errorMessage,
	type = 'text',
	required = false,
	danger = false,
	readonly = false,
	rightSlot,
}: InputProps) => {
	const inputEl = useRef<HTMLInputElement>(null)
	const [isPristine, setIsPristine] = useState<boolean>(true)

	const isValidateValue = (value: string) => {
		let isValid = true
		if (type === 'email') {
			isValid = isValidEmail(value)
		}

		if (required) {
			isValid = isValid && !!value
		}

		return isValid
	}

	const onChangeEventHandler = (value: string) => {
		setIsPristine(false)
		if (onChange) {
			onChange(value)
		}
	}

	const validationDanger = isPristine ? false : !isValidateValue(value)

	return (
		<div className={'input-component ' + (validationDanger || danger ? 'danger' : '')}>
			<div className="input-div" onClick={() => inputEl.current?.focus()}>
				<div className="input">
					<label className="label">{label}</label>
					<input
						ref={inputEl}
						type={type}
						value={value}
						onChange={(e) => onChangeEventHandler(e.target.value)}
						readOnly={readonly}
					/>
				</div>
				{rightSlot}
			</div>
			{danger && <span className="error-message">{errorMessage}</span>}
		</div>
	)
}
