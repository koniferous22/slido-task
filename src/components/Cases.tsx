import React from 'react'

import CaseCategory from './cases/CaseCategory'
import { Case } from 'types/common/Case'
import { CasesProps } from 'types/Cases'

import 'styles/Cases.css'

const CasesRenderer: React.FC<CasesProps> = ({caseEntries, selectedCaseIndex, handleSelectCase}: CasesProps) => {
	const shouldDisplayPast: boolean = selectedCaseIndex > 0
	const shouldDisplayFuture: boolean = selectedCaseIndex + 1 < caseEntries.length
	const shouldDisplayHint: boolean = caseEntries.length > 1

	const pastCases: Array<Case> = caseEntries.slice(0, selectedCaseIndex)
	const futureCases: Array<Case> = caseEntries.slice(selectedCaseIndex + 1)

	return (
		<section id="cases">
			{
				shouldDisplayPast && 
					<CaseCategory
						id="past"
						label="Past Events"
						caseEntries={pastCases}
						handleSelectCase={handleSelectCase}
					/>
			}
			{
				shouldDisplayHint &&
					<div id="cases-hint">
						<h4>Pick an event to display</h4>
						<h6>lists are scrollable :)</h6>
					</div>
			}
			{
				shouldDisplayFuture && 
					<CaseCategory 
						id="future"
						label="Future Events"
						caseEntries={futureCases}
						handleSelectCase={handleSelectCase} 
						offset={selectedCaseIndex + 1}
					/>
			}
		</section>
	)	
}

export default CasesRenderer
