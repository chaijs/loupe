[![NPM version](https://badge.fury.io/js/loupe.png)](http://badge.fury.io/js/loupe)
![Build](https://github.com/chaijs/loupe/workflows/Build/badge.svg?branch=master)

# loupe

Inspect utility for Node.js and browsers.

## Usage

```
var inspect = require('loupe');
```
<!-- js
var inspect = require('./');
-->

```js
inspect({ foo: 'bar' }); // => "{ foo: 'bar' }"
inspect(1); // => '1'
inspect('foo'); // => "'foo'"
inspect([ 1, 2, 3 ]); // => '[ 1, 2, 3 ]'
inspect(/Test/g); // => '/Test/g'

// ...
```

## Installation

npm:

```bash
npm install loupe
```

component:

```bash
component install chaijs/loupe
```

Standalone:

```html
<script src="loupe.js></script>
```

## Tests

```bash
$ npm test
```

Coverage:

```bash
$ npm run coverage
```

## License

(The MIT License)

Copyright (c) 2011-2013 Jake Luer jake@alogicalparadox.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
