import TokenCodes from '../constants/enums/TokenCodes';

interface ErrorMessages {
	token_class: string;
	token_type: string;
	message: string;
}
export default interface TokenErrorMessage {
	detail: string;
	code: TokenCodes;
	messages: ErrorMessages[];
}
