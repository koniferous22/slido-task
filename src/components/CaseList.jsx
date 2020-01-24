import React from 'react'

const CaseList = props => {
	return (
		<section id={props.id}>
			<h4 className="case-list-title">Past Events</h4>
			<ul className="case-list">
			{
				props.caseEntries.map((case_, index) => (
					<li key={index} onClick={() => props.handleSelectCase(index + (props.offset || 0))}>
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
