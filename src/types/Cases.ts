import { Case } from 'types/common/Case'

export interface CasesProps {
	caseEntries: Array<Case>;
	handleSelectCase: (_: number) => void;
	selectedCaseIndex: number;
}
