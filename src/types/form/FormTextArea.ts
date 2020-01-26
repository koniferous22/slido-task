import { Case } from 'types/common/Case'

export interface FormTextAreaProps {
	name: keyof Case;
	label: string;
	value: string;
	rows: number;
	errorFlag: boolean;
	onBlur: (field: keyof Case) => void;
	onChange: (field: keyof Case, value: string) => void;
}
