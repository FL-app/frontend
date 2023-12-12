import TokenCodes from '../constants/enums/TokenCodes';

interface ErrorMessages {
	token_class: string;
	token_type: string;
	message: string;
}

export interface TokenErrorMessage {
	detail: string;
	code: TokenCodes;
}

export interface UserErrorMessage extends TokenErrorMessage {
	messages: ErrorMessages[];
}
