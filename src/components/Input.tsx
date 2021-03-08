import React, { ChangeEvent, useRef, useState } from 'react'
import './input.scss'

interface InputProps {
	label: string
	value: string
	onChange: (value: string) => void
	type?: 'text' | 'password' | 'email'
	danger?: boolean
	required?: boolean
	errorMessage?: string
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
		onChange(value)
	}

	const validationDanger = isPristine ? false : !isValidateValue(value)

	return (
		<div className={'input-component ' + (validationDanger ? 'danger' : '')}>
			<div
				className={'input-div'}
				onClick={() => inputEl.current?.focus()}>
				<label className="label">{label}</label>
				<input ref={inputEl} type={type} value={value} onChange={(e) => onChangeEventHandler(e.target.value)} />
			</div>
			{danger && <span className='error-message'>{errorMessage}</span>}
		</div>
	)
}
