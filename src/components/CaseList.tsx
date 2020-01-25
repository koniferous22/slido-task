import React from 'react'

import { Case } from '../types/Case'
import { CaseListProps } from '../types/CaseList'

import '../styles/CaseList.css'

const CaseList: React.FC<CaseListProps> = (props: CaseListProps) => {
	return (
		<section id={props.id}>
			<h4 className="case-list-title">{props.label}</h4>
			<ul className="case-list">
			{
				props.caseEntries.map((case_: Case, index: number) => (
					<li key={index} onClick={(): void => props.handleSelectCase(index + (props.offset || 0))}>
						<i>{'[' + case_.date.toLocaleDateString() + '] '}</i>
						{case_.title.substring(0,50) + (case_.title.length > 50 ? '...' : '' )}
					</li>		
				))
			}
			</ul>
		</section>
	)	
}

export default CaseList
