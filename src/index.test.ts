import * as path from 'path';
import * as fsExt from './index';

test('fileExt (invalid)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    fsExt.fileExt(
        _path,
        function(err, result) {
            expect(err).not.toBeNull();
            expect(result).toBeUndefined();
        });
});

test('fileExt (valid)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    fsExt.fileExt(
        _path,
        function(err, result) {
            expect(err).toBeNull();
            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result).not.toBeFalsy();
            expect(result).toBe('json');
        });
});

test('fileExtSync (invalid)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    expect(() => fsExt.fileExtSync(_path)).toThrowError();
});

test('fileExtSync (valid)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    const result = fsExt.fileExtSync(_path);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).not.toBeFalsy();
    expect(result).toBe('json');
});

test('isFileExt (invalid)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    fsExt.isFileExt(
        _path,
        'json',
        function(err, result) {
            expect(err).not.toBeNull();
            expect(result).toBeUndefined();
        });
});

test('isFileExt (valid)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    fsExt.isFileExt(
        _path,
        'json',
        function(err, result) {
            expect(err).toBeNull();
            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result).toBeTruthy();
        });
});

test('isFileExtSync (invalid)', () => {
    const _path = path.resolve(__dirname, '../package.jso');
    expect(() => fsExt.isFileExtSync(_path, 'json')).toThrowError();
});

test('isFileExtSync (valid)', () => {
    const _path = path.resolve(__dirname, '../package.json');
    const result = fsExt.isFileExtSync(_path, 'json');
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeTruthy();
});
