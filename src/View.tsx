import React from 'react'

import { ViewState } from './types/ViewState'
import { Case } from './types/Case'
import { Dictionary } from './types/Dictionary'

import CaseList from './components/CaseList'
import FormInput from './components/FormInput'
import FormTextArea from './components/FormTextArea'

import './View.css'

import { sortedArrayItemInsertionIndex } from './helper'


const defaultFormValues: Dictionary<string> = {
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
			formValues: { ...defaultFormValues },
			// for now empty, so that the messages are undefined
			formErrorFlags: { }
		}

		this.handleSubmitEvent = this.handleSubmitEvent.bind(this)
		this.selectDisplayedCase = this.selectDisplayedCase.bind(this)
		this.handleFormChangeEvent = this.handleFormChangeEvent.bind(this)
		this.handleFormBlurEvent = this.handleFormBlurEvent.bind(this)
	}

	validateFormFields(...fields: string[]) {
		const reduceCb = (flagz: Dictionary<boolean>, field: string): Dictionary<boolean> => {
			return /*const result = this.state.formValues[field] ? flagz :*/ Object.assign(flagz, {[field]: (this.state.formValues[field] === '')})
		}
		const newFormErrorFlags = fields.reduce(
			reduceCb, this.state.formErrorFlags
		)
		this.setState({
			formErrorFlags: newFormErrorFlags
		})
	}
	
	handleFormChangeEvent(formField: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
		this.setState({
			formValues: Object.assign(this.state.formValues, {[formField]: event.target.value.trim()})
		})
	}

	handleFormBlurEvent(formField: string) {
		this.validateFormFields(formField)
	}

	handleSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
		// prevents page reloading on form submit
		event.preventDefault();
		
		this.validateFormFields('title', 'description', 'date')

		// verify that every error has been fixed
		if (Object.keys(this.state.formErrorFlags).every((key: string) => this.state.formErrorFlags[key] === false)) {
			// Previous revision contains cooler way to do this, but had to resolve typescript and stuff like that
			// still probably better, cause lower overhead (not worth applying arrow functions on 3 items :D )
			const newCase: Case = {
				title: this.state.formValues.title,
				description: this.state.formValues.description,
				date: new Date(this.state.formValues.date)
			}
			const insertionIndex: number = sortedArrayItemInsertionIndex(this.state.cases, newCase, (c1: Case, c2: Case): boolean => c1.date < c2.date)
			// inserts in to the array
			this.state.cases.splice(insertionIndex, 0, newCase)

			this.setState({
				// keeps the order of the selected item
				selectedCaseIndex:  insertionIndex <= this.state.selectedCaseIndex ? this.state.selectedCaseIndex + 1 : this.state.selectedCaseIndex,
				// reset the form here, also forces rerender
				formValues: { ...defaultFormValues },
				formErrorFlags: {}
			})
		}
	}

	selectDisplayedCase(selectedCaseIndex: number) {
		if (selectedCaseIndex < this.state.cases.length && selectedCaseIndex >= 0) {
			this.setState({
				selectedCaseIndex
			})
		}
	}

	render() {
		const displayPast: boolean = this.state.selectedCaseIndex > 0
		const displayFuture: boolean = this.state.selectedCaseIndex + 1 < this.state.cases.length
		return (
			<div id="container">
				<section className="cases">
					{
						displayPast && <CaseList id="past" caseEntries={this.state.cases.slice(0, this.state.selectedCaseIndex)} handleSelectCase={this.selectDisplayedCase}/>
					}
					{
						this.state.cases.length > 1 &&
							<div id="cases-hint">
								<h4>Pick an event to display</h4>
								<h6>lists are scrollable :)</h6>
							</div>
					}
					{
						displayFuture && 
							<CaseList 
								id="future" 
								caseEntries={this.state.cases.slice(this.state.selectedCaseIndex + 1)} 
								handleSelectCase={this.selectDisplayedCase} 
								offset={this.state.selectedCaseIndex + 1}
							/>
					}
				</section>
				<section id="content">
				{
					this.state.cases[this.state.selectedCaseIndex] ? (
							<>
								<h2 id="content-title">{this.state.cases[this.state.selectedCaseIndex].title}</h2>
								<i>{this.state.cases[this.state.selectedCaseIndex].date.toLocaleDateString()}</i>
								<p>{'Description: ' + this.state.cases[this.state.selectedCaseIndex].description}</p>
							</>
						) : (
							<>
								Submit form down below to add events
							</>
						)
				}
				</section>
				<form id="case-add" onSubmit={this.handleSubmitEvent}>
					<h3 id="form-title">Submit event here</h3>
					<FormInput
						name="title" label="Title"
						type="text"
						errorFlag={this.state.formErrorFlags.title}
						onBlur={this.handleFormBlurEvent}
						onChange={this.handleFormChangeEvent}
						value={this.state.formValues.title || ''}
					/>
					<FormTextArea
						name="description" label="Description"
						errorFlag={this.state.formErrorFlags.description}
						onBlur={this.handleFormBlurEvent}
						onChange={this.handleFormChangeEvent}
						rows={5}
						value={this.state.formValues.description || ''}
					/>
					<FormInput
						name="date" label="Event Date"
						type="date"
						errorFlag={this.state.formErrorFlags.date}
						onBlur={this.handleFormBlurEvent}
						onChange={this.handleFormChangeEvent}
						value={this.state.formValues.date || ''}
					/>
					<input className="submit-button" type="submit" value="Add Event" />
				</form>
			</div>
		)
	}
}

export default View
