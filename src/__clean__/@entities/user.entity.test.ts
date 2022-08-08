import { expect } from 'chai';
import 'mocha';
import User from './user.entity';

describe('User entity', () => {
    it('should be defined', () => {
        const user = new User();
        expect(user).not.to.be.undefined;
        expect(user).to.have.property('save');
    });
});