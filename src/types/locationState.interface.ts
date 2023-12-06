export default interface LocationState {
	latitude: number;
	longitude: number;
	errorMessage: string;
	isAccessAllowed: boolean;
	isLoading: boolean;
}
