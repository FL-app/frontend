import TokenCodes from '../constants/enums/TokenCodes';

export default interface TokenErrorMessage {
  detail: string;
  code: TokenCodes;
}
