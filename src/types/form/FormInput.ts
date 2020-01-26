export interface FormInputProps {
	name: string;
	label: string;
	type: string;
	value: string;
	errorFlag: boolean;
	onBlur: (field: string) => void;
	onChange: (field: string, value: string) => void;
}
