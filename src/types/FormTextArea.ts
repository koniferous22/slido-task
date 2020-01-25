export interface FormTextAreaProps {
	name: string;
	label: string;
	value: string;
	rows: number;
	errorFlag: boolean;
	onBlur: (s: string) => void;
	onChange: (s: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
