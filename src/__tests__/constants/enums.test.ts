import Gender from '../../constants/enums/gender';
import InputTypes from '../../constants/enums/inputTypes';
import TokenCodes from '../../constants/enums/TokenCodes';
import RoutesPath from '../../constants/enums/routesPath';
import ValidationErrorMessages from '../../constants/enums/validation';

const expectEnum = <T extends { [key: string]: string }>(enumType: T) =>
	expect.stringMatching(Object.values(enumType).join('|'));

describe('Enum tests', () => {
	describe('Gender enum', () => {
		const validGenders = [Gender.male, Gender.female];
		test.each(validGenders)('Gender accepts valid value %s', (value) => {
			expect(Gender[value]).toBeDefined();
		});
		test('Gender to match object', () => {
			expect({ type: Gender.male }).toMatchObject({ type: expectEnum(Gender) });
			expect({ type: Gender.female }).toMatchObject({
				type: expectEnum(Gender),
			});
		});
	});

	describe('inputTypes enum', () => {
		const validInputTypes = [
			InputTypes.text,
			InputTypes.password,
			InputTypes.email,
		];
		test.each(validInputTypes)('inputTypes accepts valid value %s', (value) => {
			expect({ type: value }).toMatchObject({
				type: expectEnum(InputTypes),
			});
		});
	});

	describe('TokenCodes enum', () => {
		test('Gender to match object', () => {
			expect({ type: TokenCodes.notValid }).toMatchObject({
				type: expectEnum(TokenCodes),
			});
		});
	});

	describe('RoutesPath enum', () => {
		const validRoutesPath = [
			RoutesPath.map,
			RoutesPath.chat,
			RoutesPath.accessAge,
			RoutesPath.accessGeo,
			RoutesPath.accessGeoError,
			RoutesPath.comingSoon,
			RoutesPath.login,
			RoutesPath.root,
			RoutesPath.registration,
			RoutesPath.privacyPolicy,
			RoutesPath.termsOfUse,
			RoutesPath.friends,
			RoutesPath.profile,
		];
		test.each(validRoutesPath)('RoutesPath accepts valid value %s', (value) => {
			expect({ type: value }).toMatchObject({
				type: expectEnum(RoutesPath),
			});
		});
	});

	describe('ValidationErrorMessages enum', () => {
		const validValidationErrorMessages = [
			ValidationErrorMessages.emptyNameErrorText,
			ValidationErrorMessages.emptySurnameErrorText,
			ValidationErrorMessages.emptyNicknameErrorText,
			ValidationErrorMessages.emptyEmailErrorText,
			ValidationErrorMessages.emptyPasswordErrorText,
			ValidationErrorMessages.invalidNameErrorText,
			ValidationErrorMessages.invalidSurnameErrorText,
			ValidationErrorMessages.invalidNicknameErrorText,
			ValidationErrorMessages.invalidEmailErrorText,
			ValidationErrorMessages.invalidConfirmPasswordErrorText,
			ValidationErrorMessages.friendExistErrorText,
			ValidationErrorMessages.wrongLoginOrPassword,
			ValidationErrorMessages.emptyString,
		];
		test.each(validValidationErrorMessages)(
			'ValidationErrorMessages accepts valid value %s',
			(value) => {
				expect({ type: value }).toMatchObject({
					type: expectEnum(ValidationErrorMessages),
				});
			}
		);
	});
});
