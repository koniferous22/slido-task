export interface FormInputProps {
	name: string,
	label: string,
	type: string,
	value: string,
	errorFlag: boolean,
	onBlur: (s: string) => void,
	onChange: (s: string, e: React.ChangeEvent<HTMLInputElement>) => void
}
