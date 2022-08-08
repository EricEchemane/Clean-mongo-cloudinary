import 'mocha';
import environment from './environment';
import makeSession from './make-session';
import Hasher from './hasher';
import Token from './jwt';
import { RequestError } from './exceptions';
import { isAllNumeric, isValidEmail, lengthOf } from './validators';
import { expect } from 'chai';

describe('Single tons modules', () => {

    describe('Environment', () => {

        it('should have port, isDevMode, and secret properties', () => {
            expect(environment).to.have.property('port');
            expect(environment).to.have.property('isDevMode');
            expect(environment).to.have.property('secret');
            expect(environment).to.have.property('API_SECRET');
            expect(environment).to.have.property('API_KEY');
            expect(environment).to.have.property('CLOUD_NAME');
        });
    });

    describe('makeSession', () => {

        const session: any = makeSession('some-secret-key');
        expect(typeof session).to.equal('function');
    });

    describe('Hasher', () => {

        const password = 'a user password';
        const hashedPassword = Hasher.hash(password);

        it('Hasher.verify should return true', () => {
            expect(Hasher.verify(password, hashedPassword)).to.equal(true);
        });

        it('Hasher.verify should return false given a wrong password', () => {
            expect(Hasher.verify('wrong-password', hashedPassword)).to.equal(false);
        });
    });

    describe('jwt', () => {

        const payload = { username: 'john' };
        const signedToken = Token.sign(payload, environment.secret);

        it('Token.verify should return the same payload', () => {
            const user: any = Token.verify(signedToken, environment.secret);
            expect(user).to.have.property('username');
            expect(user.username).to.equal('john');
        });
    });

    describe('Validator functions', () => {

        describe('isAllNumeric', () => {
            it('should return a boolean', () => {
                expect(isAllNumeric('1o43')).to.equal(false);
                expect(isAllNumeric('143')).to.equal(true);
            });
        });

        describe('Email', () => {

            it('should validate email as true or false', () => {
                expect(isValidEmail('name@example.com')).to.equal(true);
                expect(isValidEmail('nameexample.com')).to.equal(false);
                expect(isValidEmail('name@examplecom')).to.equal(false);
            });
        });

        describe('String length', () => {

            it('lengthOf("john").isLessThan(4) should return false', () => {
                expect(lengthOf("john").isLessThan(4)).to.equal(false);
            });
            it('lengthOf("john").isLessThan(10) should return true', () => {
                expect(lengthOf("john").isLessThan(10)).to.equal(true);
            });
            it('lengthOf("john").isGreaterThan(10) should return false', () => {
                expect(lengthOf("john").isGreaterThan(10)).to.equal(false);
            });
            it('lengthOf("john").is(4) should return true', () => {
                expect(lengthOf("john").is(4)).to.equal(true);
            });
            it('lengthOf("j oh n ", false).is(4) should return false', () => {
                expect(lengthOf("j oh n ", false).is(4)).to.equal(false);
            });
            it('lengthOf("john").isNot(1) should return true', () => {
                expect(lengthOf("john").isNot(1)).to.equal(true);
            });
        });

        describe('RequestError - custom error', () => {

            const error = new RequestError(400, 'Password is missing');

            it('should return an instance of RequestError', () => {
                expect(error.code).to.equal(400);
                expect(error.success).to.equal(false);
                expect(error.message).to.equal('Password is missing');
            });
        });
    });
});