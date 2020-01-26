import { Case } from 'types/common/Case'

type GenericFormRecord<K extends keyof Case, T> = {
	[P in K]?: T;
};
export type FormMaybeRecord<T> = GenericFormRecord<keyof Case, T>
export type FormRecord<T> = Record<keyof Case, T>
