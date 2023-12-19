enum ValidationErrorMessages {
	emptyNameErrorText = 'Имя не может быть пустым',
	emptySurnameErrorText = 'Фамилия не может быть пустой',
	emptyNicknameErrorText = 'Ник не может быть пустым',
	emptyEmailErrorText = 'Email не может быть пустым',
	emptyPasswordErrorText = 'Пароль не может быть пустым',
	invalidNameErrorText = 'Имя должно содержать только буквы, пробел и дефис',
	invalidSurnameErrorText = 'Фамилия должна содержать только латиницу, кириллицу, пробел и дефис',
	invalidNicknameErrorText = 'Ник должно содержать только латиницу, кириллицу, пробел и дефис',
	invalidEmailErrorText = 'Некорректный email',
	invalidConfirmPasswordErrorText = 'Пароли должны совпадать',
	friendExistErrorText = 'Пользователь с такой почтой уже есть у тебя в друзьях',
	wrongLoginOrPassword = 'Неверный логин или пароль',
	emptyString = '',
}

export default ValidationErrorMessages;
