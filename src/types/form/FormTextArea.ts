export interface FormTextAreaProps {
	name: string;
	label: string;
	value: string;
	rows: number;
	errorFlag: boolean;
	onBlur: (field: string) => void;
	onChange: (field: string, value: string) => void;
}
