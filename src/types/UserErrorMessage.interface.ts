import TokenErrorMessage from './TokenErrorMessage.interface';

interface ErrorMessages {
  token_class: string;
  token_type: string;
  message: string;
}

export default interface UserErrorMessage extends TokenErrorMessage {
  messages: ErrorMessages[];
}
