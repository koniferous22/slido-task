import React from 'react'
import renderer from 'react-test-renderer'
import FormInput from 'components/form/FormInput'

import { cleanup, fireEvent, render } from '@testing-library/react'

afterEach(cleanup)

it('FormInput renders correctly', () => {
	const tree = renderer
		.create(
			<FormInput
				name="title"
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
				name="date"
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

it('onchange, onblur mocks', () => {
	const mockOnChange = jest.fn()
	const mockOnBlur = jest.fn()
	const { getByLabelText } = render(<FormInput
		name="date"
		type="text"
		label="Input"
		value="sample value"
		errorFlag={true}
		onChange={mockOnChange}
		onBlur={mockOnBlur}
	/>)
	fireEvent.change(getByLabelText(/Input/), { target: { value: 'a' } });
	expect(mockOnChange).toHaveBeenCalled()
	fireEvent.blur(getByLabelText(/Input/));
	expect(mockOnBlur).toHaveBeenCalled()
})