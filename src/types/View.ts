import { Case } from './common/Case'
import { Dictionary } from './common/Dictionary'

export interface ViewState {
	cases: Case[];
	selectedCaseIndex: number;
	formValues: Dictionary<string>;
	formErrorFlags: Dictionary<boolean>;
}
