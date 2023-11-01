export const emailPattern =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const namePattern = /^[a-яёa-z -]{2,30}$/i;
export const nicknamePattern = /^[a-яёa-z0-9 -]{2,30}$/i;

export const emptyNameErrorText = 'Имя не может быть пустым';
export const emptySurnameErrorText = 'Фамилия не может быть пустой';
export const emptyNicknameErrorText = 'Ник не может быть пустым';
export const emptyEmailErrorText = 'Email не может быть пустым';
export const emptyPasswordErrorText = 'Пароль не может быть пустым';

export const invalidNameErrorText =
	'Имя должно содержать только латиницу, кириллицу, пробел и дефис';
export const invalidSurnameErrorText =
	'Фамилия должна содержать только латиницу, кириллицу, пробел и дефис';
export const invalidNicknameErrorText =
	'Ник должно содержать только латиницу, кириллицу, пробел и дефис';
export const invalidEmailErrorText = 'Некорректный email';
export const invalidConfirmPasswordErrorText = 'Пароли должны совпадать';

export const friendExistErrorText =
	'Пользователь с такой почтой уже есть у тебя в друзьях';
