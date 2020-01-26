import React from 'react'

import { Case } from 'types/common/Case'
import { CaseCategoryProps } from 'types/cases/CaseCategory'

import { shortenTitle } from 'utils/functions'

import 'styles/cases/CaseCategory.css'

const CaseCategory: React.FC<CaseCategoryProps> = ({id, label, caseEntries, offset, handleSelectCase}: CaseCategoryProps) => {
	const listEntries = caseEntries.map((case_: Case, index: number) => (
			<li 
				key={index} 
				onClick={(): void => handleSelectCase(index + (offset || 0))}
			>
				<i>{'[' + case_.date.toLocaleDateString() + '] '}</i>
				{shortenTitle(case_.title, 50)}
			</li>		
		))
	return (
		<section id={id}>
			<h4 className="case-list-title">{label}</h4>
			<ul className="case-list">
			{
				listEntries
			}
			</ul>
		</section>
	)	
}

export default CaseCategory
