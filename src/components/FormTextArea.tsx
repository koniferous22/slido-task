import React from 'react'
import { FormTextAreaProps } from '../types/FormTextArea'

const FormTextArea = (props: FormTextAreaProps) => {
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
			<textarea
				{...rest}
				name={name}
				onChange={(event) => onChange(name, event)}
				onBlur={() => onBlur(name)}
			/>			
		</>
	)
}

export default FormTextArea
