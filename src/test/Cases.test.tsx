import React from 'react'
import renderer from 'react-test-renderer'
import Cases from 'components/Cases'

import { cleanup, fireEvent, render } from '@testing-library/react'

import { shortenTitle } from 'utils/functions'

import { sampleCases } from 'test/data/sampleCases'

afterEach(cleanup)

const renderTests: Array<string> = ['future only', 'perfectly balanced', 'past only']

for (let selectedCase = 0; selectedCase < renderTests.length; ++selectedCase) {
	it('CaseAddForm renders correctly: ' + renderTests[selectedCase], () => {
		const tree = renderer
			.create(<Cases
				caseEntries={sampleCases}
				selectedCaseIndex={selectedCase}
				handleSelectCase={(): void => {return;}}
			/>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
}

it('Click past case', () => {
	const mockSelectCase = jest.fn();	
	const { getByText } = render(<Cases
		caseEntries={sampleCases}
		selectedCaseIndex={1}
		handleSelectCase={mockSelectCase}
	/>)
	fireEvent.click(getByText(shortenTitle(sampleCases[0].title, 50)));
	expect(mockSelectCase).toHaveBeenCalled()
})

it('Click future case', () => {
	const mockSelectCase = jest.fn();	
	const { getByText } = render(<Cases
		caseEntries={sampleCases}
		selectedCaseIndex={1}
		handleSelectCase={mockSelectCase}
	/>)
	fireEvent.click(getByText(shortenTitle(sampleCases[2].title, 50)));
	expect(mockSelectCase).toHaveBeenCalled()
})
