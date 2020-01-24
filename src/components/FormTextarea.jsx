import React from 'react'

const FormTextarea = props => {
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

export default FormTextarea
