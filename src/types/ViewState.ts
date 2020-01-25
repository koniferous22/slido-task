import { Case } from './Case'
import { Dictionary } from './Dictionary'

export interface ViewState {
	cases: Case[];
	selectedCaseIndex: number;
	formValues: Dictionary<string>;
	formErrorFlags: Dictionary<boolean>;
}
