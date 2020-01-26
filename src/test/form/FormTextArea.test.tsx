import React from 'react'
import renderer from 'react-test-renderer'
import FormTextArea from 'components/form/FormTextArea'

it('FormTextArea renders correctly', () => {
	const tree = renderer
		.create(
			<FormTextArea
				name="input"
				label="Input"
				value="sample value"
				rows={5}
				errorFlag={false}
				onChange={(): void => {return;}}
				onBlur={(): void => {return;}}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('FormTextArea renders correctly with error', () => {
	const tree = renderer
		.create(
			<FormTextArea
				name="input"
				label="Input"
				value="sample value"
				rows={6}
				errorFlag={true}
				onChange={(): void => {return;}}
				onBlur={(): void => {return;}}
			/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
