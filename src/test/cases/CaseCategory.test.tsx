import React from 'react'
import renderer from 'react-test-renderer'
import CaseCategory from 'components/cases/CaseCategory'

import { cleanup, fireEvent, render } from '@testing-library/react'

import { shortenTitle } from 'utils/functions'

import { sampleCases } from 'test/data/sampleCases'

afterEach(cleanup)

it('CaseCategory renders correctly', () => {	
	const tree = renderer
		.create(
			<CaseCategory
				id="case-list"
				label="Case List"
				caseEntries={sampleCases}
				handleSelectCase={(): void => {return}}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});


it('Select case event', () => {
	const mockSelectCase = jest.fn((): void => {return});
	const { getByText, findByText } = render(<CaseCategory
		id="case-list"
		label="Case List"
		caseEntries={sampleCases}
		handleSelectCase={mockSelectCase}
	/>)
	fireEvent.click(getByText(shortenTitle(sampleCases[0].title, 50)));
	expect(mockSelectCase).toHaveBeenCalled()
})