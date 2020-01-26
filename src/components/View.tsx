import React from 'react'

import { ViewState } from 'types/View'
import { Case } from 'types/common/Case'
import { Dictionary } from 'types/common/Dictionary'

import Cases from './Cases'
import Content from './Content'

// Possibly move after possible refactor
import FormInput from './form/FormInput'
import FormTextArea from './form/FormTextArea'

import 'styles/View.css'
import 'styles/CaseAddForm.css'

import { getSortedInsertionIndex } from 'utils/functions'


const DEFAULT_FORM_VALUES: Dictionary<string> = {
	title: '',
	description: '',
	date: ''
}

class View extends React.Component<{}, ViewState> {
	constructor(props: {}) {
		super(props)

		this.state = {
			// we assume this array is sorted by date
			cases: [],
			selectedCaseIndex: 0,
			// decided not to use nested state, because of the overhead when accessing attributes
			formValues: { ...DEFAULT_FORM_VALUES },
			// for now empty, so that the messages are undefined
			formErrorFlags: { }
		}

		this.handleSubmitEvent = this.handleSubmitEvent.bind(this)
		this.selectDisplayedCase = this.selectDisplayedCase.bind(this)
		this.handleFormChangeEvent = this.handleFormChangeEvent.bind(this)
		this.handleFormBlurEvent = this.handleFormBlurEvent.bind(this)
	}

	validateFormFields(...fields: string[]): void {
		const reduceCb = (errorFlags: Dictionary<boolean>, field: string): Dictionary<boolean> => {
			return Object.assign(errorFlags, {[field]: (this.state.formValues[field].trim() === '')})
		}
		const newFormErrorFlags = fields.reduce(reduceCb, this.state.formErrorFlags)
		this.setState({formErrorFlags: newFormErrorFlags})
	}
	
	handleFormChangeEvent(formField: string, eventValue: string): void {
		this.setState({
			formValues: Object.assign(this.state.formValues, {[formField]: eventValue})
		})
	}

	handleFormBlurEvent(formField: string): void {
		this.validateFormFields(formField)
	}

	handleSubmitEvent(event: React.FormEvent<HTMLFormElement>): void {
		// prevents page reloading on form submit
		event.preventDefault();
		
		this.validateFormFields('title', 'description', 'date')

		const {cases, formValues, formErrorFlags, selectedCaseIndex} = this.state

		// verify that every error has been fixed
		const noFormError: boolean = Object.keys(formErrorFlags).every((key: string) => formErrorFlags[key] === false)
		if (noFormError) {
			// Previous revision contains cooler way to do this, but had to resolve typescript and stuff like that
			// still probably better, cause lower overhead (not worth applying arrow functions on 3 items :D )
			const newCase: Case = {
				title: formValues.title,
				description: formValues.description,
				date: new Date(formValues.date)
			}
			const insertionIndex: number = getSortedInsertionIndex(cases, newCase, (c1: Case, c2: Case): boolean => c1.date < c2.date)
			// inserts in to the array
			cases.splice(insertionIndex, 0, newCase)

			const shouldSelectedIndexShift: boolean = insertionIndex <= selectedCaseIndex && insertionIndex + 1 < cases.length
			const newSelectedCase: number = shouldSelectedIndexShift ? selectedCaseIndex + 1 : selectedCaseIndex
			this.setState({
				// keeps the order of the selected item
				selectedCaseIndex: newSelectedCase,
				// reset the form here, also forces rerender
				formValues: { ...DEFAULT_FORM_VALUES },
				formErrorFlags: {}
			})
		}
	}

	selectDisplayedCase(selectedCaseIndex: number): void {
		if (selectedCaseIndex < this.state.cases.length && selectedCaseIndex >= 0) {
			this.setState({selectedCaseIndex})
		}
	}

	render(): React.ReactNode {
		const {cases, formValues, formErrorFlags, selectedCaseIndex} = this.state
		return (
			<div id="container">
				<Cases
					caseEntries={cases}
					selectedCaseIndex={selectedCaseIndex}
					handleSelectCase={this.selectDisplayedCase}
				/>
				<Content
					placeholder="Submit form down below to add events"
					displayedCase={cases[selectedCaseIndex]}
				/>
				<form id="case-add" onSubmit={this.handleSubmitEvent}>
					<h3 id="form-title">Submit event here</h3>
					<FormInput
						name="title" label="Title"
						type="text"
						errorFlag={formErrorFlags.title}
						onBlur={this.handleFormBlurEvent}
						onChange={this.handleFormChangeEvent}
						value={formValues.title || ''}
					/>
					<FormTextArea
						name="description" label="Description"
						errorFlag={formErrorFlags.description}
						onBlur={this.handleFormBlurEvent}
						onChange={this.handleFormChangeEvent}
						rows={5}
						value={formValues.description || ''}
					/>
					<FormInput
						name="date" label="Event Date"
						type="date"
						errorFlag={formErrorFlags.date}
						onBlur={this.handleFormBlurEvent}
						onChange={this.handleFormChangeEvent}
						value={formValues.date || ''}
					/>
					<input className="submit-button" type="submit" value="Add Event" />
				</form>
			</div>
		)
	}
}

export default View
