import { Case } from 'types/common/Case'
import { FormRecord, FormMaybeRecord } from 'types/form/FormRecord'

export interface CaseAddFormState {
	errorFlags: FormMaybeRecord<boolean>;
	values: FormRecord<string>;
}

export interface CaseAddFormProps {
	onSubmit: (case_: Case) => void;
}