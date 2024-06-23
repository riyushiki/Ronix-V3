'use strict';

var bitArray = require('..');

var t1, t2;
var x1, x2;
var str1     = '1100110001100100011001001101110010100101101000111010111101000101';
var str2     = '0001101011011101010100000100010010001100010111110100100010011101';
var str1and2 = '0000100001000100010000000100010010000100000000110000100000000101';
var str1or2  = '1101111011111101011101001101110010101101111111111110111111011101';
var str1xor2 = '1101011010111001001101001001100000101001111111001110011111011000';
var str2not  = '1110010100100010101011111011101101110011101000001011011101100010';

describe('Bit array test', function () {

    beforeEach(function () {
        t1 = [0, 1, 0, 1];
        t2 = [0, 0, 1, 1];
        x1 = bitArray.parseBinaryString(str1);
        x2 = bitArray.parseBinaryString(str2);
    });

    it('AND test', function () {
        var and = bitArray.and(t1, t2);
        and[0].should.equal(0);
        and[1].should.equal(0);
        and[2].should.equal(0);
        and[3].should.equal(1);
        bitArray.and(x1, x2).should.eql(bitArray.parseBinaryString(str1and2));
    });

    it('OR test', function () {
        var or = bitArray.or(t1, t2);
        or[0].should.equal(0);
        or[1].should.equal(1);
        or[2].should.equal(1);
        or[3].should.equal(1);
        bitArray.or(x1, x2).should.eql(bitArray.parseBinaryString(str1or2));
    });

    it('XOR test', function () {
        var xor = bitArray.xor(t1, t2);
        xor[0].should.equal(0);
        xor[1].should.equal(1);
        xor[2].should.equal(1);
        xor[3].should.equal(0);
        bitArray.xor(x1, x2).should.eql(bitArray.parseBinaryString(str1xor2));
    });

    it('NOT test', function () {
        var not = bitArray.not(t2);
        not[0].should.equal(-1);
        not[1].should.equal(-1);
        not[2].should.equal(-2);
        not[3].should.equal(-2);
        bitArray.not(x2).should.eql(bitArray.parseBinaryString(str2not));
    });

    it('get test', function () {
        bitArray.getBit(t1, 2).should.be.false();
        bitArray.getBit(t1, 32).should.be.false();
        bitArray.getBit(t1, 63).should.be.true();
        bitArray.getBit(x1, 0).should.be.true();
        bitArray.getBit(x1, 13).should.be.true();
        bitArray.getBit(x1, 51).should.be.false();
        bitArray.getBit(x2, 42).should.be.false();
        bitArray.getBit(x2, 17).should.be.true();
    });

    it('set test', function () {
        bitArray.getBit(t1, 2).should.be.false();
        var ans = bitArray.setBit(t1, 2, true);
        bitArray.getBit(t1, 2).should.be.true();
        ans.should.equal(t1);

        bitArray.setBit(t1, 2, false);
        bitArray.getBit(ans, 2).should.be.false();
    });

    it('count test', function () {
        bitArray.count([1]).should.equal(1);
        bitArray.count(t1).should.equal(2);
        bitArray.count(t2).should.equal(2);

        var str1Count = str1.split(/0+/).join('').length;
        var str2Count = str2.split(/0+/).join('').length;
        bitArray.count(x1).should.equal(str1Count);
        bitArray.count(x2).should.equal(str2Count);
    });

    describe('string methods', function () {
        it('binary', function () {
            var aux = bitArray.toBinaryString(t1);
            var ans = bitArray.parseBinaryString(aux);
            ans[0].should.equal(0);
            ans[1].should.equal(1);
            ans[2].should.equal(0);
            ans[3].should.equal(1);
            bitArray.toBinaryString([-1]).should.equal('11111111111111111111111111111111');

            var negativeString = bitArray.toBinaryString([-1000, -5]);
            bitArray.parseBinaryString(negativeString).should.eql([-1000, -5]);

            bitArray.toBinaryString(x1).should.equal(str1);
            bitArray.parseBinaryString(str1).should.eql(x1);
        });

        it('hex', function () {
            var aux = bitArray.toHexString(t1);
            var ans = bitArray.parseHexString(aux);
            ans[0].should.equal(0);
            ans[1].should.equal(1);
            ans[2].should.equal(0);
            ans[3].should.equal(1);
            bitArray.toHexString([-1]).should.equal('ffffffff');

            var negativeString = bitArray.toHexString([-1000, -5]);
            bitArray.parseHexString(negativeString).should.eql([-1000, -5]);

            var hex1 = bitArray.toHexString(x1);
            bitArray.parseHexString(hex1).should.eql(x1);
        });
    });

    it('to debug', function () {
        var aux = bitArray.toDebug(t1);
        var expected = '0000: 0000 0000 0000 0000 0000 0000 0000 0000\n0020: 0000 0000 0000 0000 0000 0000 0000 0001\n0040: 0000 0000 0000 0000 0000 0000 0000 0000\n0060: 0000 0000 0000 0000 0000 0000 0000 0001';
        aux.should.equal(expected);
    });
});
