import Gender from '../constants/enums/gender';
import UserDTO from './UserDTO.interface';
import UserErrorMessage from './UserErrorMessage.interface';

export default interface UserState extends UserDTO {
  gender: Gender;
  isLoading: boolean;
  errorMessage?: UserErrorMessage | string;
  registerSuccess: boolean;
  isAuthenticated: boolean;
  requestCounter: number;
}
