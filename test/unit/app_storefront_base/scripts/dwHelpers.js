'use strict';

const assert = require('chai').assert;
const Collection = require('../../../mocks/dw.util.Collection');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

describe('dwHelpers', function () {
    let helpers = null;

    beforeEach(function () {
        helpers = proxyquire('../../../../app_storefront_base/cartridge/scripts/dwHelpers', {
            'dw/util/Collection': Collection
        });
    });

    it('should map collection to an array', function () {
        const collection = new Collection([1, 2, 3]);
        const result = helpers.map(collection, function (item) {
            return item + 10;
        });

        assert.deepEqual(result, [11, 12, 13]);
    });

    it('should map empty collection to an empty array', function () {
        const collection = new Collection();
        const result = helpers.map(collection, function (item) {
            return item + 10;
        });

        assert.deepEqual(result, []);
    });

    it('should correctly iterate over collection', function () {
        const collection = new Collection([1, 2, 3]);
        const result = [];

        helpers.forEach(collection, function (item) {
            result.push(item);
        });

        assert.deepEqual(result, [1, 2, 3]);
    });

    it('should never call iterator function for empty collection', function () {
        const collection = new Collection();
        let called = false;

        helpers.forEach(collection, function () {
            called = true;
        });

        assert.isFalse(called);
    });

    it('should concatinate multiple collection into one', function () {
        const collection1 = new Collection([1, 2, 3]);
        const collection2 = new Collection([4, 5, 6]);
        const collection3 = new Collection([7, 8, 9]);

        const result = helpers.concat(collection1, collection2, collection3);

        assert.isFalse(Array.isArray(result));
        assert.deepEqual(result.toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should not concatinate empty collections', function () {
        const collection1 = new Collection([1, 2, 3]);
        const collection2 = new Collection();

        const result = helpers.concat(collection1, collection2);

        assert.deepEqual(result.toArray(), [1, 2, 3]);
    });
});