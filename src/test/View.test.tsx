import React from 'react'
import renderer from 'react-test-renderer'
import View from 'components/View'

it('View renders correctly', () => {	
	const tree = renderer.create(<View/>).toJSON();
	expect(tree).toMatchSnapshot();
});