batch-json-parser
==================

Parses JSON strings in batch for situations in which the profiler says you're calling JSON.parse too much. Sort of like [through-batch](https://github.com/trygve-lie/through-batch/), except without streams for browser lightness.

Installation
------------

    npm install batch-json-parser

Usage
-----

    var BatchJSONParser = require('batch-json-parser');
    var parser = BatchJSONParser{batchSize: 4, onBatchParsed: logParsed});
    parser.write'{"id": 1}');
    parser.write'{"id": 2}');
    parser.write'{"id": 3}');
    parser.write'{"id": 4}');
    parser.write'{"id": 5}');
    parser.write'{"id": 6}');
    parser.write'{"id": 7}');
    parser.write'{"id": 8}');
    parser.write'{"id": 9}');
    parser.write'{"id": 10}');
    parser.flush();

    function logParsed(parsedBatch) {
      console.log(parsedBatch);
    }

Output:

    [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4}
    ]

Then:

    [
      {id: 5},
      {id: 6},
      {id: 7},
      {id: 8}
    ]

Finally:

    [
      {id: 9},
      {id: 10}
    ]

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2017 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
