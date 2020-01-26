import React from 'react'

import { ViewState } from 'types/View'
import { Case } from 'types/common/Case'

import Cases from './Cases'
import Content from './Content'
import CaseAddForm from './CaseAddForm'

import 'styles/View.css'

import { getSortedInsertionIndex } from 'utils/functions'

class View extends React.Component<{}, ViewState> {
	constructor(props: {}) {
		super(props)

		this.state = {
			// we assume this array is sorted by date
			cases: [],
			selectedCaseIndex: 0,
		}

		this.addCase = this.addCase.bind(this)
		this.selectDisplayedCase = this.selectDisplayedCase.bind(this)
	}

	addCase(case_: Case): void {
		const {cases, selectedCaseIndex} = this.state

		const insertionIndex: number = getSortedInsertionIndex(cases, case_, (c1: Case, c2: Case): boolean => c1.date < c2.date)
		// inserts in to the array
		cases.splice(insertionIndex, 0, case_)

		const shouldSelectedIndexShift: boolean = insertionIndex <= selectedCaseIndex && insertionIndex + 1 < cases.length
		const newSelectedCase: number = shouldSelectedIndexShift ? selectedCaseIndex + 1 : selectedCaseIndex
		this.setState({
			selectedCaseIndex: newSelectedCase,
		})
	}

	selectDisplayedCase(selectedCaseIndex: number): void {
		if (selectedCaseIndex < this.state.cases.length && selectedCaseIndex >= 0) {
			this.setState({selectedCaseIndex})
		}
	}

	render(): React.ReactNode {
		const {cases, selectedCaseIndex} = this.state
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
				<CaseAddForm onSubmit={this.addCase}/>
			</div>
		)
	}
}

export default View
