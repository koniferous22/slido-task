I went with [ReactJS](https://reactjs.org/): Simple reasoning state-management. From the task description, I was aware, that website has a simple state. Although it would not be difficult to encapsulate the state with closure, I decided not to reinvent the wheel, and go with React. In order to demonstrate at least first steps of development in VanillaJS, I attached a short code-snippet in directory [vanilla-snippet](vanilla-snippet/)

### Fully implemented
* Core functionlalities (ReactJS), styles (CSS3) + Responsive design (up until 400px)
* Static code analysis [ESLint](https://eslint.org/), [Typescript](https://www.typescriptlang.org/) + tried also [React.StrictMode](https://reactjs.org/docs/strict-mode.html)
* Manually tested Chrome, Firefox, Safari & Windows, Linux, Mac
* Deployed on [Netlify](https://eager-murdock-f72428.netlify.com/)
* Wrote basic unit tests ([Jest](https://jestjs.io/), [testing-library/react](https://testing-library.com/docs/react-testing-library/intro), [react-test-renderer](https://reactjs.org/docs/test-renderer.html))

### partially implemented
* [SaSS](https://sass-lang.com/) preprocessing
* E2E [puppeteer](https://github.com/puppeteer/puppeteer/) tests

### Further possible features
* Implement timeline, attachment to events, column for concurrent events
* Improve page with Google Fonts and some static resources

### Problems I'd work on
* enforce coding style, subsequently fix lot of ESlint error
* Mock form on submit:
	for testing I use 'react-test-renderer' and 'testing-library/react'
	[enzyme](https://airbnb.io/enzyme/docs/guides/jest.html) by airbnb covers both functionality, moreover supports deep/shallow rendering, which I'd need for one missing unit test
* attempt to change format on [date input element](src/components/form/FormInput.tsx) so that it's localized, seemed complicated
* improve scrollbars on [CaseCategory](src/components/cases/CaseCategory.tsx): make them work in Chrome & appear on outer/inner side
	- requires in Firefox (for example) some CSS [h4xx0rz](https://stackoverflow.com/questions/18997724/how-to-change-scroll-bar-position-with-css)
* Think of a way to unify [FormInput](src/components/form/FormInput.tsx) and [FormTextArea](src/components/form/FormTextArea.tsx) component (probably some HOC would be possible)
