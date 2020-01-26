import React from 'react'
import renderer from 'react-test-renderer'
import CaseCategory from 'components/cases/CaseCategory'

import { Case } from 'types/common/Case'

it('CaseCategory renders correctly', () => {
	const date1 = new Date()
	const date2 = new Date()
	date2.setMonth(date1.getMonth() + 1)
	const case1: Case = {
		title: "Dni Zelá v Stupave",
		description: "this was a truly magnificent event",
		date: date1
	}
	const case2: Case = {
		title: "Filakovsky jarmok",
		description: "Ziedol som 3 a pol porcie segedinskeho gulasu",
		date: date2
	}
	const tree = renderer
		.create(
			<CaseCategory
				id="case-list"
				label="Case List"
				caseEntries={[case1, case2]}
				handleSelectCase={(): void => {return}}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
