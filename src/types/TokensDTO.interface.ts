import AccessTokenDTO from './AccessTokenDTO.interface';
import RefreshTokenDTO from './RefreshTokenDTO.interface';

export default interface TokensDTO extends AccessTokenDTO, RefreshTokenDTO {}
