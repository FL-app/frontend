import AccessTokenDTO from './AccessTokenDTO';
import RefreshTokenDTO from './RefreshTokenDTO.interface';

export default interface TokensDTO extends AccessTokenDTO, RefreshTokenDTO {}
