"use strict";

function render(template, node) {
	if (!node) {
		return;
	}
	node.innerHTML = (typeof template === 'function' ? template() : template);
}


function caseList() {
	const listElements = caseList.cases.map((case_, index) => `<li onclick="setContent(${index})">${case_.title}</li>`).join('\n')
	return listElements
}

caseList.cases = []
caseList.activeEntry = Number.NaN

function sortedInsertionIndex(array, value, lessThanBy) {
    let lowIndex = 0, highIndex = array.length;

    while (lowIndex < highIndex) {
        let middleIndex = (lowIndex + highIndex) >>> 1;
    	let lessThanResult = lessThanBy(array[middleIndex], value);
        if (lessThanResult === true) {
        	lowIndex = middleIndex + 1;
        } else {
        	highIndex = middleIndex;
        }
    }
    return lowIndex;
}

function addCase(case_) {
	caseList.cases.splice(sortedInsertionIndex(caseList.cases, case_, (c1, c2) => c1.date < c2.date), 0, case_);
	render(caseList(), document.querySelector('ul#case-list'))
}

function createElementWithContents(tagName, contents) {
	const element = document.createElement(tagName)
	element.appendChild(document.createTextNode(contents))
	return element
}

function setContent(index) {
	const contentElement = document.querySelector('div#content')
	if ((!index && typeof index != 'number') || index < 0 || index >= caseList.cases.length)  {
		contentElement.innerHTML = "Submit form down below to add events"
		return
	}
	const case_ = caseList.cases[index]
	console.log(case_)
	console.log(index)
	console.log(caseList.cases[index])

	//debugger
	const titleElement = createElementWithContents('h3', case_.title)
	const descriptionElement = createElementWithContents('p', case_.description)
	const dateElement = createElementWithContents('span', case_.date.toLocaleDateString())

	contentElement.innerHTML = ''
	contentElement.appendChild(titleElement)
	contentElement.appendChild(descriptionElement)
	contentElement.appendChild(dateElement)
}

function submitCaseForm() {
	//console.log(document.forms["caseform"]);
	const caseForm = document.forms["caseform"];
	const titleElement = caseForm["input-title"], descriptionElement = document.getElementById('text-area-description'), dateElement = caseForm["input-date"]
	let title = titleElement.value, description = descriptionElement.value, date = dateElement.value;
	const requiredValues = [ title, description, date ]
	if (requiredValues.some(value => value.trim() === '')) {
		return; // throw error here
	}
	// insert into state container somewhere
	addCase({
		title,
		description,
		date: new Date(date)
	})
	// clear form
	titleElement.value = descriptionElement.value = dateElement.value = ''
	// prevent default behaviour
	return false;
}

function verifyInputNonEmpty(elementId) {
	const inputElement = document.getElementById(elementId)
	if (!inputElement) {
		return; // throw error here
	}
	const errorElement = document.querySelector('#' + elementId + '~.error')
	if (inputElement.value === '' && !errorElement) {
		const errorMessageDiv = document.createElement('div');
		errorMessageDiv.classList.add('error')
		errorMessageDiv.appendChild(document.createTextNode("Field is required"))
		inputElement.parentNode.appendChild(errorMessageDiv)
		
	} else if (inputElement.value !== '' && errorElement) {
		inputElement.parentNode.removeChild(errorElement);
	}
	// else if error mesesage present remove it
}
