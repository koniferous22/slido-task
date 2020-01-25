import { Case } from '../types/Case'

export interface CaseListProps {
	id: string;
	label: string;
	caseEntries: Array<Case>;
	handleSelectCase: (_: number) => void;
	offset?: number;
}
