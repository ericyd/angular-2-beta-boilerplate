// import { it, describe, expect} from 'angular2/testing';

describe('universal truths', () => {
    it('should do math', () => {
        expect(1 + 1).toEqual(2);

        expect(5).toBeGreaterThan(4);
    });

    it('should match text', () => {
        expect("this").toEqual("this");

        expect("that").toEqual("that");
    });

    xit('should skip this', () => {
        expect(4).toEqual(40);
    });
});
