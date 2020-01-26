import React from 'react'
import renderer from 'react-test-renderer'
import Content from 'components/Content'

import { sampleCases } from 'test/data/sampleCases'

const placeholder = 'Sample Text'

it('Content placeholder renders correctly', () => {	
	const tree = renderer
		.create(
			<Content
				placeholder={placeholder}
				displayedCase={undefined}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('Content correctly', () => {	
	const tree = renderer
		.create(
			<Content
				placeholder={placeholder}
				displayedCase={sampleCases[2]}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});