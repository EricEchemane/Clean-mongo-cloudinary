import environment from './environment';
import makeSession from './make-session';
import Hasher from './hasher';
import Token from './jwt';
import { RequestError } from './exceptions';
import { isAllNumeric, isValidEmail, lengthOf } from './validators';

jest.mock('./environment');

describe('Single tons modules', () => {

    describe('Environment', () => {

        it('should have port, isDevMode, and secret properties', () => {
            expect(environment).toHaveProperty('port');
            expect(environment).toHaveProperty('isDevMode');
            expect(environment).toHaveProperty('secret');
        });
    });

    describe('makeSession', () => {

        const session: any = makeSession('some-secret-key');
        expect(typeof session).toBe('function');
    });

    describe('Hasher', () => {

        const password = 'a user password';
        const hashedPassword = Hasher.hash(password);

        test('Hasher.verify should return true', () => {
            expect(Hasher.verify(password, hashedPassword)).toBe(true);
        });

        test('Hasher.verify should return false given a wrong password', () => {
            expect(Hasher.verify('wrong-password', hashedPassword)).toBe(false);
        });
    });

    describe('jwt', () => {

        const payload = { username: 'john' };
        const signedToken = Token.sign(payload, environment.secret);

        test('Token.verify should return the same payload', () => {
            const user: any = Token.verify(signedToken, environment.secret);
            expect(user).toHaveProperty('username');
            expect(user.username).toBe('john');
        });
    });

    describe('Validator functions', () => {

        describe('isAllNumeric', () => {
            test('should return a boolean', () => {
                expect(isAllNumeric('1o43')).toBe(false);
                expect(isAllNumeric('143')).toBe(true);
            });
        });

        describe('Email', () => {

            it('should validate email as true or false', () => {
                expect(isValidEmail('name@example.com')).toBe(true);
                expect(isValidEmail('nameexample.com')).toBe(false);
                expect(isValidEmail('name@examplecom')).toBe(false);
            });
        });

        describe('String length', () => {

            test('lengthOf("john").isLessThan(4) should return false', () => {
                expect(lengthOf("john").isLessThan(4)).toBe(false);
            });
            test('lengthOf("john").isLessThan(10) should return true', () => {
                expect(lengthOf("john").isLessThan(10)).toBe(true);
            });
            test('lengthOf("john").isGreaterThan(10) should return false', () => {
                expect(lengthOf("john").isGreaterThan(10)).toBe(false);
            });
            test('lengthOf("john").is(4) should return true', () => {
                expect(lengthOf("john").is(4)).toBe(true);
            });
            test('lengthOf("j oh n ", false).is(4) should return false', () => {
                expect(lengthOf("j oh n ", false).is(4)).toBe(false);
            });
            test('lengthOf("john").isNot(1) should return true', () => {
                expect(lengthOf("john").isNot(1)).toBe(true);
            });
        });

        describe('RequestError - custom error', () => {

            const error = new RequestError(400, 'Password is missing');

            it('should return an instance of RequestError', () => {
                expect(error.code).toBe(400);
                expect(error.success).toBe(false);
                expect(error.message).toBe('Password is missing');
            });
        });
    });
});