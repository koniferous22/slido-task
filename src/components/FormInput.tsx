import React from 'react'
import { FormInputProps } from '../types/FormInput'

const FormInput = (props: FormInputProps) => {
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
				onChange={(event) => onChange(name, event)}
				onBlur={() => onBlur(name)}
			/>			
		</>
	)
}

export default FormInput
