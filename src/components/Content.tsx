import React from 'react'

import { ContentProps } from 'types/Content'

import 'styles/Content.css'

const Content: React.FC<ContentProps> = ({placeholder, displayedCase}: ContentProps) => {
	return (
		<section id="content">
		{
			displayedCase ? (
					<>
						<h2 id="content-title">{displayedCase.title}</h2>
						<i>{displayedCase.date.toLocaleDateString()}</i>
						<p>{'Description: ' + displayedCase.description}</p>
					</>
				) : (
					<>
						{placeholder}
					</>
				)
		}
		</section>
	)
}

export default Content