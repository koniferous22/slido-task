import React from 'react'
import { FormTextAreaProps } from 'types/form/FormTextArea'

import 'styles/form/FormTextArea.css'

const FormTextArea: React.FC<FormTextAreaProps> = ({name, label, errorFlag, onChange, onBlur, ...textAreaProps}: FormTextAreaProps) => {
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
				{...textAreaProps}
				name={name}
				onChange={(event): void => onChange(name, event.target.value)}
				onBlur={(): void => onBlur(name)}
			/>			
		</>
	)
}

export default FormTextArea
