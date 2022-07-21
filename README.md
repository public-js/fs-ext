## ⚠️ This repo is no longer maintained

### One of the best alternatives is [fs-extra](https://www.npmjs.com/package/fs-extra)

---

fs-ext provides several useful methods for Node.js built-in `fs`. With Typescript under the hood you will be able to write nice and shiny Node scripts.


## Getting Started

Add fs-ext to your project by running:
```shell
npm install @public-js/fs-ext --save
```

Then import it with any of these:
```typescript
import { fileExt } from '@public-js/fs-ext';
import * as fsExt from '@public-js/fs-ext';
const fsExt = require('@public-js/fs-ext');
```


## API reference

#### forEachFile

Iterates over all files inside the specified directory executing callback for each file found.

Example:
```typescript
const dirPath = path.resolve(__dirname, 'dist');
fsExt.forEachFile(dirPath, function(err, filePath) {
    console.log(filePath); // '/path/to/dist/hello.json'
});
```

#### fileExt

Provide this function with any file and get it's extension in a callback.

Example:
```typescript
const filePath = path.resolve(__dirname, 'file.json');
fsExt.fileExt(filePath, function(err, result) {
    console.log(result); // 'json'
});
```

#### fileExtSync

Literally the same as `fileExt` but no callback needed.

Example:
```typescript
const filePath = path.resolve(__dirname, 'file.json');
console.log(fsExt.fileExtSync(filePath)); // 'json'
```

#### isFileExt

Provide this function with any file and extension to test against to get result in a callback.

Example:
```typescript
const filePath = path.resolve(__dirname, 'file.json');
fsExt.isFileExt(filePath, 'json', function(err, result) {
    console.log(result); // true
});
```

#### isFileExtSync

Literally the same as `isFileExt` but no callback needed.

Example:
```typescript
const filePath = path.resolve(__dirname, 'file.json');
console.log(fsExt.isFileExtSync(filePath, 'json')); // true
```
