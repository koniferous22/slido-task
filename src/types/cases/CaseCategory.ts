import { Case } from 'types/common/Case'

export interface CaseCategoryProps {
	id: string;
	label: string;
	caseEntries: Array<Case>;
	handleSelectCase: (_: number) => void;
	offset?: number;
}
