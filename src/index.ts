import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';

const assertErr = {
    missPath: 'fsExt: missing path',
    pathNotStr: 'fsExt: path should be a string',
    callReq: 'fsExt: callback function required'
};


function _forEachFile(
    dir: string, callback: (err: Error | null, file?: string, stats?: fs.Stats) => void
): void {
    fs.readdir(dir, function (err: Error | null, result: string[]) {
        if (err) { callback(err); }
        result.forEach(function (res: string) {
            const _path: string = path.resolve(dir, res);
            fs.stat(_path, function (err: Error | null, stats: fs.Stats) {
                if (err) { callback(err); }
                if (stats.isDirectory()) {
                    _forEachFile(_path, callback);
                } else if (stats.isFile()) {
                    callback(null, _path, stats);
                }
            });
        });
    });
}
export function forEachFile(
    dir: string, callback: (err: Error | null, file?: string, stats?: fs.Stats) => void
): void {
    assert(dir, assertErr.missPath);
    assert.strictEqual(typeof dir, 'string', assertErr.pathNotStr);
    assert.strictEqual(typeof callback, 'function', assertErr.callReq);
    _forEachFile(dir, callback);
}


function _fileExt(
    file: string, callback: (err: Error | null, ext?: string | null) => void
): void {
    fs.stat(file, function (err: Error | null, stats: fs.Stats) {
        if (err) { return callback(err); }
        if (!stats) { return callback(new Error(`File ${file} not found`)); }
        if (stats.isDirectory()) {
            return callback(null, null);
        } else if (stats.isFile()) {
            const parts = file.split('.');
            return callback(null, parts.pop());
        }
    });
}
export function fileExt(
    file: string, callback: (err: Error | null, ext?: string | null) => void
): void {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    assert.strictEqual(typeof callback, 'function', assertErr.callReq);
    _fileExt(file, callback);
}


function _fileExtSync(file: string): string | null {
    const stats = fs.statSync(file);
    if (!stats) { throw new Error(`File ${file} not found`); }
    if (stats.isFile()) {
        const parts = file.split('.');
        const _pop = parts.pop();
        return typeof _pop === 'undefined' ? null : _pop;
    }
    return null;
}
export function fileExtSync(file: string): string | null {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    return _fileExtSync(file);
}


function _isFileExt(
    file: string, ext: string, callback: (err: Error | null, eq?: boolean) => void
): void {
    _fileExt(file, function (err: Error | null, _ext: string | null | undefined) {
        if (err) { return callback(err); }
        return callback(null, _ext === ext);
    });
}
export function isFileExt(
    file: string, ext: string, callback: (err: Error | null, eq?: boolean) => void
): void {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    assert(ext, 'fsExt: missing "extension" argument');
    assert.strictEqual(typeof callback, 'function', assertErr.callReq);
    _isFileExt(file, ext, callback);
}


function _isFileExtSync(file: string, ext: string | null): boolean {
    return _fileExtSync(file) === ext;
}
export function isFileExtSync(file: string, ext: string | null): boolean {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    assert(ext, 'fsExt: missing "extension" argument');
    return _isFileExtSync(file, ext);
}
