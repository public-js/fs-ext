/// <reference types="node" />
import * as fs from 'fs';
export declare function forEachFile(dir: string, callback: (err: Error | null, file?: string, stats?: fs.Stats) => void): void;
export declare function fileExt(file: string, callback: (err: Error | null, ext?: string | null) => void): void;
export declare function fileExtSync(file: string): string | null;
export declare function isFileExt(file: string, ext: string, callback: (err: Error | null, eq?: boolean) => void): void;
export declare function isFileExtSync(file: string, ext: string | null): boolean;
