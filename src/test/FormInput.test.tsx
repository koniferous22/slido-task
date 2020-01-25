'use strict';

import React from 'react'
import renderer from 'react-test-renderer'
import FormInput from '../components/FormInput'

it('FormInput renders correctly', () => {
	const tree = renderer
		.create(
			<FormInput
				name="input"
				type="text"
				label="Input"
				value="sample value"
				errorFlag={false}
				onChange={(): void => {return;}}
				onBlur={(): void => {return;}}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('FormInput renders correctly with error', () => {
	const tree = renderer
		.create(
			<FormInput
				name="input"
				type="text"
				label="Input"
				value="sample value"
				errorFlag={true}
				onChange={(): void => {return;}}
				onBlur={(): void => {return;}}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
