"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileExtSync = exports.isFileExt = exports.fileExtSync = exports.fileExt = exports.forEachFile = void 0;
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const assertErr = {
    missPath: 'fsExt: missing path',
    pathNotStr: 'fsExt: path should be a string',
    callReq: 'fsExt: callback function required'
};
function _forEachFile(dir, callback) {
    fs.readdir(dir, function (err, result) {
        if (err) {
            callback(err);
        }
        result.forEach(function (res) {
            const _path = path.resolve(dir, res);
            fs.stat(_path, function (err, stats) {
                if (err) {
                    callback(err);
                }
                if (stats.isDirectory()) {
                    _forEachFile(_path, callback);
                }
                else if (stats.isFile()) {
                    callback(null, _path, stats);
                }
            });
        });
    });
}
function forEachFile(dir, callback) {
    assert(dir, assertErr.missPath);
    assert.strictEqual(typeof dir, 'string', assertErr.pathNotStr);
    assert.strictEqual(typeof callback, 'function', assertErr.callReq);
    _forEachFile(dir, callback);
}
exports.forEachFile = forEachFile;
function _fileExt(file, callback) {
    fs.stat(file, function (err, stats) {
        if (err) {
            return callback(err);
        }
        if (!stats) {
            return callback(new Error(`File ${file} not found`));
        }
        if (stats.isDirectory()) {
            return callback(null, null);
        }
        else if (stats.isFile()) {
            const parts = file.split('.');
            return callback(null, parts.pop());
        }
    });
}
function fileExt(file, callback) {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    assert.strictEqual(typeof callback, 'function', assertErr.callReq);
    _fileExt(file, callback);
}
exports.fileExt = fileExt;
function _fileExtSync(file) {
    const stats = fs.statSync(file);
    if (!stats) {
        throw new Error(`File ${file} not found`);
    }
    if (stats.isFile()) {
        const parts = file.split('.');
        const _pop = parts.pop();
        return typeof _pop === 'undefined' ? null : _pop;
    }
    return null;
}
function fileExtSync(file) {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    return _fileExtSync(file);
}
exports.fileExtSync = fileExtSync;
function _isFileExt(file, ext, callback) {
    _fileExt(file, function (err, _ext) {
        if (err) {
            return callback(err);
        }
        return callback(null, _ext === ext);
    });
}
function isFileExt(file, ext, callback) {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    assert(ext, 'fsExt: missing "extension" argument');
    assert.strictEqual(typeof callback, 'function', assertErr.callReq);
    _isFileExt(file, ext, callback);
}
exports.isFileExt = isFileExt;
function _isFileExtSync(file, ext) {
    return _fileExtSync(file) === ext;
}
function isFileExtSync(file, ext) {
    assert(file, assertErr.missPath);
    assert.strictEqual(typeof file, 'string', assertErr.pathNotStr);
    assert(ext, 'fsExt: missing "extension" argument');
    return _isFileExtSync(file, ext);
}
exports.isFileExtSync = isFileExtSync;
