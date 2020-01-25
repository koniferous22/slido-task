import React from 'react'
import { FormInputProps } from '../types/FormInput'

const FormInput: React.FC<FormInputProps> = (props: FormInputProps) => {
	const {name, label, errorFlag, onChange, onBlur, ...rest} = props	
	return (
		<>
			{
				errorFlag && (
					<div className="error">
						Field is required
					</div>
				)
			}
			<label htmlFor={name}>
				{label + ': '}
			</label>
			<input
				{...rest}
				name={name}
				onChange={(event): void => onChange(name, event)}
				onBlur={(): void => onBlur(name)}
			/>			
		</>
	)
}

export default FormInput
