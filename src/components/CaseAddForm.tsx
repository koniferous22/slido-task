import React from 'react'

import { Case } from 'types/common/Case'
import { FormRecord, FormMaybeRecord } from 'types/form/FormRecord'
import { CaseAddFormProps, CaseAddFormState } from 'types/CaseAddForm'

import FormInput from './form/FormInput'
import FormTextArea from './form/FormTextArea'

import 'styles/CaseAddForm.css'

const DEFAULT_FORM_VALUES: FormRecord<string> = {
	title: '',
	description: '',
	date: ''
}

class CaseAddForm extends React.Component<CaseAddFormProps, CaseAddFormState> {
	constructor(props: CaseAddFormProps) {
		super(props)

		this.state = {
			values: { ...DEFAULT_FORM_VALUES },
			errorFlags: {}
		}
		this.handleFormChangeEvent = this.handleFormChangeEvent.bind(this)
		this.handleFormBlurEvent = this.handleFormBlurEvent.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	validateFormFields(...fields: Array<keyof Case>): void {
		const reduceCb = (errorFlags: FormMaybeRecord<boolean>, field: keyof Case): FormMaybeRecord<boolean> => {
			return Object.assign(errorFlags, {[field]: (this.state.values[field].trim() === '')})
		}
		const newFormErrorFlags = fields.reduce(reduceCb, this.state.errorFlags)
		this.setState({errorFlags: newFormErrorFlags})
	}

	handleFormBlurEvent(field: keyof Case): void {
		this.validateFormFields(field)
	}

	handleFormChangeEvent(field: keyof Case, eventValue: string): void {
		this.setState({
			values: Object.assign(this.state.values, {[field]: eventValue})
		})
	}

	handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		
		this.validateFormFields('title', 'description', 'date')

		const { values, errorFlags } = this.state

		// verify that every error has been fixed
		const formKeys: Array<keyof Case> = Object.keys(errorFlags) as Array<keyof Case>
		const noFormError: boolean = formKeys.every((key: keyof Case) => errorFlags[key] === false )
		if (noFormError) {
			const newCase: Case = {
				title: values.title || '',
				description: values.description || '',
				date: values.date ? new Date(values.date) : new Date()
			}
			this.setState({ values: { ...DEFAULT_FORM_VALUES }})
			this.props.onSubmit(newCase)
		}
	}

	render() {

		const { errorFlags, values } = this.state

		return (
			<form id="case-add" onSubmit={this.handleSubmit}>
				<h3 id="form-title">Submit event here</h3>
				<FormInput
					name="title" label="Title"
					type="text"
					errorFlag={Boolean(errorFlags.title)}
					onBlur={this.handleFormBlurEvent}
					onChange={this.handleFormChangeEvent}
					value={values.title || ''}
				/>
				<FormTextArea
					name="description" label="Description"
					errorFlag={Boolean(errorFlags.description)}
					onBlur={this.handleFormBlurEvent}
					onChange={this.handleFormChangeEvent}
					rows={5}
					value={values.description || ''}
				/>
				<FormInput
					name="date" label="Event Date"
					type="date"
					errorFlag={Boolean(errorFlags.date)}
					onBlur={this.handleFormBlurEvent}
					onChange={this.handleFormChangeEvent}
					value={values.date || ''}
				/>
				<input className="submit-button" type="submit" value="Add Event" />
			</form>
		)
	}
}


export default CaseAddForm