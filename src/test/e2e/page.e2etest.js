const pageUrl = 'https://eager-murdock-f72428.netlify.com/'

const formSelectors = {
	title: 'form#case-add input[name=title]',
	description: 'form#case-add textarea',
	date: 'form#case-add input[name=date]'
}

const date1 = new Date()
const date2 = new Date()
date2.setMonth(date1.getMonth() + 1)
const date3 = new Date()
date3.setMonth(date1.getMonth() + 2)

const case1 = {
	title: 'Filakovsky jarmok',
	description: 'Minule som tam ziedol 3 a pol porcii segendinskeho gulas',
	date: date1.toLocaleDateString()
}

const case2 = {
	title: 'Dni Zelá v Stupave',
	description: 'Mnam',
	date: date2.toLocaleDateString()
}

const case3 = {
	title: '14ty comeback legendarnej Gizky Onovej',
	description: 'jak napana, pome zrobit moshpit',
	date: date3.toLocaleDateString()
}


async function errorHintCountTest(count) {
	const errorDivs = await page.$$('form#case-add div.error')
	expect(errorDivs.length).toEqual(count)
}

async function errorElementIdTest(field) {
	const errorElementId = await page.$eval('form#case-add div.error', errorElement => errorElement.id)
	expect(errorElementId).toEqual('error-' + field)
}

async function fillFieldsExcept(fieldName, case_) {
	Object.keys(formSelectors).map(field => field === fieldName ? Promise.resolve() : page.keyboard.type(formSelectors[field], case_[field]))/*page.evaluate((selector, value) => {
		document.querySelector(selector).value = value;
	}, formSelectors[field], case_[field]))*/
}

async function genericFailTest(field, case_) {
	await fillFieldsExcept(field, case_)
	await attemptSubmitForm()
	await errorHintCountTest(1)
	await errorElementIdTest(field)
}

async function clearElement(selector) {
	await page.focus(selector)
	await page.evaluate((selector) => {
      document.querySelector(selector).value = ''
    }, selector);
}

async function attemptSubmitForm() {
	await page.$eval('form#case-add input.submit-button', async button => {
		button.click()
	})
}

beforeAll(async () => {
    await page.goto(pageUrl)
})

describe('E2E test', () => {

  it('should be loaded properly + no selected case', async () => {
    const placeholderText = await page.$eval('section#content', elem => elem.innerHTML)
    expect(placeholderText).toBe("Submit form down below to add events")
  });

  describe('should display error when form field is empty', () => {

  	beforeEach(() => {
  		return Promise.all(Object.values(formSelectors).map(selector => clearElement(selector))).catch()
  	})

  	it('when whole form is empty', async () => {
  		await attemptSubmitForm()
  		await errorHintCountTest(3)
  	})

  	it('when single field is empty', async() => {
  		genericFailTest('description', case1)
			await page.screenshot({path: '../image-description.jpg', type: 'jpeg'})
  	})
  	
  })
});

/*
TODO
1. Verify placeholder
2. submit case
3. verify displayed content
4. submit another one
5. verify 1 past
6. click 1 past 
7. verify 1 future
8. submit another one
9.
*/
