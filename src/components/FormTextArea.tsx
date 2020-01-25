import React from 'react'
import { FormTextAreaProps } from '../types/FormTextArea'

const FormTextArea: React.FC<FormTextAreaProps> = (props: FormTextAreaProps) => {
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
				onChange={(event): void => onChange(name, event)}
				onBlur={(): void => onBlur(name)}
			/>			
		</>
	)
}

export default FormTextArea
