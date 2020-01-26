import React from 'react'
import renderer from 'react-test-renderer'
import View from 'components/View'

import { Case } from 'types/common/Case'

/*const case1: Case = {
	title: '',
	description: '',
	date: new Date()
}

const case2: Case = {
	title: '',
	description: '',
	date: new Date()
}

const case3: Case = {
	title: '',
	description: '',
	date: new Date()
}*/

// GENERIC TESTS

function genericOnChangeTest(testComponent: renderer.ReactTestRenderer, field: string, value: string): void {
	let tree = testComponent.toJSON()
	console.log(tree)
	tree!.props.handleFormChangeEvent(field, value)
	tree = component.toJSON()
	expect(tree).toMatchSnapshot()
}

//let tree: renderer.ReactTestRendererJSON | null = renderer.create(<div/>).toJSON()
let component = renderer.create(<div/>)


beforeEach(() => {
	component = renderer.create(<View/>)
})

it('View renders correctly', () => {
	const tree = component.toJSON()
	expect(tree).toMatchSnapshot()
});

/*describe('form onChange events', () => {
	

	test('title field on change', () => {
		genericOnChangeTest(component, 'title', 'filakovsky jarmok')
	})

	test('description field on change', () => {
		genericOnChangeTest(component, 'description', 'medzi prestiznych hosti parti taktiez aj legendarna gizka onova')
	})

	test('date field on change', () => {
		genericOnChangeTest(component, 'date', (new Date()).toLocaleDateString())
	})
})*/

