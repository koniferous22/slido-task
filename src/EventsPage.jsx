import React from 'react'

import './EventsPage.css'
import { sortedArrayItemInsertionIndex } from './helper'

class EventsPage extends React.Component {
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
	}

	validateFormFields(...fields) {
		const reduceCb = (flagz, field) => (typeof field !== 'string' && this.state.formValues[field]) ? flagz : Object.assign(flagz, {[field]: this.state.formValues[field] === ''})
		const newFormErrorFlags = fields.reduce(
			reduceCb, this.state.formErrorFlags
		)
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
				//formValues: { ...this.defaultFormValues },
				formErrorFlags: {}
			})
		}
	}

	handleSelectCase(selectedCase, event) {
		if (selectedCase < this.state.cases.length && selectedCase >= 0) {
			this.setState({
				selectedCase
			})
		}
	}

	render() {
		const displayPast = this.state.selectedCase > 0
		const displayFuture = this.state.selectedCase + 1 < this.state.cases.length
		const requiredFieldErrorMessage = (
			<div className="error">
				Field is required
			</div>
		)
		return (
			<div id="container">
				<section className="cases">
					{displayPast && 
						<section id="past">
							<h4 className="case-list-title">Past Events</h4>
							<ul className="case-list">
							{
								this.state.cases.slice(0, this.state.selectedCase).map((case_, index) => (
									<li key={index} onClick={this.handleSelectCase.bind(this, index)}>
										<i>{'[' + case_.date.toLocaleDateString() + '] '}</i>
										{case_.title.substring(0,50) + (case_.title.length > 50 ? '...' : '' )}
									</li>		
								))
							}
							</ul>
						</section>
					}
					{
						this.state.cases.length > 1 && (
							<div id="cases-hint">
								<h4>Pick an event to display</h4>
								<h6>lists are scrollable :)</h6>
							</div>
						)
					}
					{
						displayFuture && (
							<section id="future">
								<h4 className="case-list-title">Future Events</h4>
								<ul className="case-list">
								{
									this.state.cases.slice(this.state.selectedCase + 1).map((case_, index) => (
										<li key={index} onClick={this.handleSelectCase.bind(this, this.state.selectedCase + index + 1)}>
											<i>{'[' + case_.date.toLocaleDateString() + '] '}</i>
											{case_.title.substring(0,50) + (case_.title.length > 50 ? '...' : '' )}
										</li>		
									))
								}
								</ul>
							</section>
						)
					}
				</section>
				<section id="content">
				{
					// conition whether array index is in range already verified in event hadler "handle select case"
					// first condition does not catch when state.selectedCase is equal to zeros
					(this.state.selectedCase || this.state.selectedCase === 0) ? (
							<React.Fragment>
								<h2 id="content-title">{this.state.cases[this.state.selectedCase].title}</h2>
								<i>{this.state.cases[this.state.selectedCase].date.toLocaleDateString()}</i>
								<p>{'Description: ' + this.state.cases[this.state.selectedCase].description}</p>
							</React.Fragment>
						) : (
							<React.Fragment>
								Submit form down below to add events
							</React.Fragment>
						)
				}
				</section>
				<form id="case-add" onSubmit={this.handleSubmitEvent}>
					<h3 id="form-title">Submit event here</h3>
					<React.Fragment>
						{this.state.formErrorFlags.title && requiredFieldErrorMessage}
						<label htmlFor="title">
							Event Title:
						</label>
						<input
							name="title"
							type="text"
							value={this.state.formValues.title}
							onChange={this.handleFormChangeEvent.bind(this, 'title')} 
							onBlur={this.handleFormBlurEvent.bind(this, 'title')}
						/>
					</React.Fragment>

					<React.Fragment>
						{this.state.formErrorFlags.description && requiredFieldErrorMessage}
						<label htmlFor="description">
							Description:
						</label>
						<textarea
							name="description"
							value={this.state.formValues.description}
							rows={5}
							onChange={this.handleFormChangeEvent.bind(this, 'description')}
							onBlur={this.handleFormBlurEvent.bind(this, 'description')}	
						/>
					</React.Fragment>
					<React.Fragment>
						{this.state.formErrorFlags.date && requiredFieldErrorMessage}
						<label htmlFor="date">
							Event Date:
						</label>
						<input
							name="date"
							type="date"
							value={this.state.formValues.date}
							onChange={this.handleFormChangeEvent.bind(this, 'date')} 
							onBlur={this.handleFormBlurEvent.bind(this, 'date')}
						/>
						</React.Fragment>

					<input className="submit-button" type="submit" value="Add Event" />
				</form>
			</div>
		)
	}
}

export default EventsPage
