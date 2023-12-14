export default interface UserDTO {
	id: number;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	longitude: number;
	latitude: number;
	status: string;
	userpic: string | null;
}
