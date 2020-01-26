import { Case } from 'types/common/Case'

const date1 = new Date()
const date2 = new Date()
date2.setMonth(date1.getMonth() + 1)
const date3 = new Date()
date3.setMonth(date1.getMonth() + 3)

const rickHarrison = "I'm Rick Harrison, and this is my pawn shop.\
I work here with my old man and my son, Big Hoss. Everything in here\
has a story and a price. One thing I've learned after 21 years –\
you never know WHAT is gonna come through that door."

const case1: Case = {
	title: "Dni Zelá v Stupave",
	description: "this was a truly magnificent event",
	date: date1
}
const case2: Case = {
	title: "Filakovsky jarmok",
	description: "Ziedol som 3 a pol porcie segedinskeho gulasu",
	date: date2
}

const case3: Case = {
	title: rickHarrison,
	description: rickHarrison,
	date: date2
}

export const sampleCases: Array<Case> = [ case1, case2, case3 ]
