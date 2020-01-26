import React from 'react'
import renderer from 'react-test-renderer'
import CaseAddForm from 'components/CaseAddForm'

it('CaseAddForm renders correctly', () => {
	const tree = renderer
		.create(<CaseAddForm onSubmit={(): void => {return;}}/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
