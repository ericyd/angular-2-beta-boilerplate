import { it, iit, describe, expect, inject, injectAsync, beforeEachProviders, fakeAsync, tick } from 'angular2/testing';
import { provide } from 'angular2/core';
import { ConfirmComponent} from '../bindings/confirm.component';

describe('user service', () => {
    beforeEachProviders(() => [ConfirmComponent])

    it('should do math', () => {
        expect(1 + 1).toEqual(2);

        expect(5).toBeGreaterThan(4);
    });

});

