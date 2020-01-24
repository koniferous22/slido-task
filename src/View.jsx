import React from 'react'

import CaseList from './components/CaseList'
import FormInput from './components/FormInput'
import FormTextarea from './components/FormTextarea'

import './View.css'

import { sortedArrayItemInsertionIndex } from './helper'

class View extends React.Component {
	constructor() {
		super()
		this.defaultFormValues = {
			title: '',
			description: '',
			date: ''
		}
		this.state = {
			// we assume this array is sorted by date
			cases: [],
			selectedCase: undefined,
			// decided not to use nested state, because of the overhead when accessing attributes
			formValues: { ...this.defaultFormValues },
			// for now empty, so that the messages are undefined
			formErrorFlags: { }
		}

		this.handleSubmitEvent = this.handleSubmitEvent.bind(this)
		this.selectDisplayedCase = this.selectDisplayedCase.bind(this)
		this.handleFormChangeEvent = this.handleFormChangeEvent.bind(this)
		this.handleFormBlurEvent = this.handleFormBlurEvent.bind(this)
	}

	validateFormFields(...fields) {
		const reduceCb = (flagz, field) => (typeof field !== 'string' && this.state.formValues[field]) ? flagz : Object.assign(flagz, {[field]: this.state.formValues[field] === ''})
		const newFormErrorFlags = fields.reduce(
			reduceCb, this.state.formErrorFlags
		)
		console.log(newFormErrorFlags)
		this.setState({
			formErrorFlags: newFormErrorFlags
		})
	}
	
	handleFormChangeEvent(formField, event) {
		this.setState({
			formValues: Object.assign(this.state.formValues, {[formField]: event.target.value})
		})
	}

	handleFormBlurEvent(formField) {
		this.validateFormFields(formField);
	}

	handleSubmitEvent(event) {
		// prevents page reloading on form submit
		event.preventDefault();
		
		this.validateFormFields('title', 'description', 'date')
		const parsers = {
			title: value => value,
			description: value => value,
			date: value => new Date(value)
		}

		// verify that every error has been fixed
		if (Object.keys(this.state.formErrorFlags).every(key => this.state.formErrorFlags[key] === false)) {
			const newCase = Object.fromEntries(
				Object.entries(this.state.formValues).map(([key, value]) => [key, parsers[key](value)])
			)

			let insertionIndex = sortedArrayItemInsertionIndex(this.state.cases, newCase, (c1, c2) => c1.date < c2.date)
			// inserts in to the array
			this.state.cases.splice(insertionIndex, 0, newCase);

			this.setState({
				// keeps the order of the selected item
				selectedCase: this.state.selectedCase === undefined ? 0 : ( insertionIndex <= this.state.selectedCase ? this.state.selectedCase + 1 : this.state.selectedCase ),
				// reset the form here, also forces rerender
				formValues: { ...this.defaultFormValues },
				formErrorFlags: {}
			})
		}
	}

	selectDisplayedCase(selectedCaseIndex) {
		if (selectedCaseIndex < this.state.cases.length && selectedCaseIndex >= 0) {
			this.setState({
				selectedCaseIndex
			})
		}
	}

	render() {
		const displayPast = this.state.selectedCase > 0
		const displayFuture = this.state.selectedCase + 1 < this.state.cases.length
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
					// conition whether array index is in range already verified in event hadler "handle select case"
					// first condition does not catch when state.selectedCase is equal to zero
					(this.state.selectedCase || this.state.selectedCase === 0) ? (
							<>
								<h2 id="content-title">{this.state.cases[this.state.selectedCase].title}</h2>
								<i>{this.state.cases[this.state.selectedCase].date.toLocaleDateString()}</i>
								<p>{'Description: ' + this.state.cases[this.state.selectedCase].description}</p>
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
					<FormTextarea
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
