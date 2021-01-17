import * as path from 'path';
import * as fsExt from '../src';
import { expect } from 'chai';
import 'mocha';

describe('fileExt (invalid file)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    fsExt.fileExt(
        _path,
        function(err, result) {
            it('has error', () => expect(err).to.not.be.null);
            it('no result', () => expect(result).to.be.undefined);
        });
});

describe('fileExt (valid file)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    fsExt.fileExt(
        _path,
        function(err, result) {
            it('no error', () => expect(err).to.be.null);
            it('has result', () => expect(result).to.not.be.undefined);
            it('not null', () => expect(result).to.not.be.null);
            it('not falsy', () => expect(result).to.be.ok);
            it('correct result', () => expect(result).to.equal('json'));
        });
});

describe('fileExtSync (invalid file)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    it('throws error', () => {
        expect(() => fsExt.fileExtSync(_path)).to.throw();
    });
});

describe('fileExtSync (valid file)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    const result = fsExt.fileExtSync(_path);
    it('has result', () => expect(result).to.not.be.undefined);
    it('not null', () => expect(result).to.not.be.null);
    it('not falsy', () => expect(result).to.be.ok);
    it('correct result', () => expect(result).to.equal('json'));
});

describe('isFileExt (invalid file)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    fsExt.isFileExt(
        _path,
        'json',
        function(err, result) {
            it('has error', () => expect(err).to.not.be.null);
            it('no result', () => expect(result).to.be.undefined);
        });
});

describe('isFileExt (valid file)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    fsExt.isFileExt(
        _path,
        'json',
        function(err, result) {
            it('no error', () => expect(err).to.be.null);
            it('has result', () => expect(result).to.not.be.undefined);
            it('not null', () => expect(result).to.not.be.null);
            it('is truthy', () => expect(result).to.be.ok);
        });
});

describe('isFileExtSync (invalid file)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    it('throws error', () => {
        expect(() => fsExt.isFileExtSync(_path, 'json')).to.throw();
    });
});

describe('isFileExtSync (valid file)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    const result = fsExt.isFileExtSync(_path, 'json');
    it('has result', () => expect(result).to.not.be.undefined);
    it('not null', () => expect(result).to.not.be.null);
    it('is truthy', () => expect(result).to.be.ok);
});
