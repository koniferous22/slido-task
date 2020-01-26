import React from 'react'
import { FormInputProps } from 'types/form/FormInput'

import 'styles/form/FormInput.css'

const FormInput: React.FC<FormInputProps> = ({name, label, errorFlag, onChange, onBlur, ...inputProps}: FormInputProps) => {
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
				{...inputProps}
				name={name}
				onChange={(event): void => onChange(name, event.target.value)}
				onBlur={(): void => onBlur(name)}
			/>			
		</>
	)
}

export default FormInput
