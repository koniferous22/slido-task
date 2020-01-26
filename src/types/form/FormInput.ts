import { Case } from 'types/common/Case'

export interface FormInputProps {
	name: keyof Case;
	label: string;
	type: string;
	value: string;
	errorFlag: boolean;
	onBlur: (field: keyof Case) => void;
	onChange: (field: keyof Case, value: string) => void;
}
