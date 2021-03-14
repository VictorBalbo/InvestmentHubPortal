import React, { useEffect, useRef, useState } from 'react'
import { InputComponent } from '.'
import arrowDown from '@/assets/arrow-down.svg'
import './select.scss'

interface SelectProps <T> {
	value: T
	onChange: (value: T) => void
	label?: string
	type?: 'text' | 'password' | 'email'
	danger?: boolean
	required?: boolean
	errorMessage?: string
	options: OptionsProps<T>[]
}

interface OptionsProps<T> {
	label: string
	value: T
}

export const SelectComponent = <T,> ({
	label,
	value,
	onChange,
	errorMessage,
	options,
	danger = false,
}: SelectProps<T>) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState(false)
	const selectEl = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseDownEvent = (event: MouseEvent) => {
			if (!selectEl.current?.contains(event.target as Node)) {
				setIsOptionsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleMouseDownEvent)
		return () => document.removeEventListener('mousedown', handleMouseDownEvent)
	}, [selectEl])

	const selectOption = (option: OptionsProps<T>) => {
		onChange(option.value)
	}

	const selectedOption = options.find(o => o.value === value)

	return (
		<div
			ref={selectEl}
			className={'select-component ' + (danger ? 'danger' : '')}
			onClick={() => {
				setIsOptionsOpen(!isOptionsOpen)
				console.log('click')
			}}>
			<InputComponent
				label={label}
				value={selectedOption?.label ?? ''}
				readonly={true}
				rightSlot={
					<span className={'right-arrow ' + (isOptionsOpen ? 'arrow-up' : 'arrow-down')}>
						<img src={arrowDown} />
					</span>
				}
				danger={danger}
				errorMessage={errorMessage}
			/>
			<div className={'select-options ' + (isOptionsOpen ? 'open-options' : '')}>
				{options.map((o) => (
					<div className="select-option" key={o.label} onClick={() => {selectOption(o)}}>
						{o.label}
					</div>
				))}
			</div>
		</div>
	)
}
