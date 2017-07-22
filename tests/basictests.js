var test = require('tape');
var BatchJSONParser = require('../index');

var testCases = [
  {
    name: 'Basic case',
    batchSize: 4,
    jsonStrings: [
      '{"id": 1}',
      '{"id": 2}',
      '{"id": 3}',
      '{"id": 4}',
      '{"id": 5}',
      '{"id": 6}',
      '{"id": 7}',
      '{"id": 8}',
      '{"id": 9}',
      '{"id": 10}'
    ],
    expected: [
      [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ],
      [
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8}
      ],
      [
        {id: 9},
        {id: 10}
      ]
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name, basicTest);

  function basicTest(t) {
    t.plan(testCase.expected.length);
    var receivedCount = 0;

    var parser = BatchJSONParser({
      batchSize: testCase.batchSize,
      onBatchParsed: checkParsed
    });
    testCase.jsonStrings.forEach(parser.write);
    parser.flush();

    function checkParsed(parsedArray) {
      t.deepEqual(
        parsedArray,
        testCase.expected[receivedCount],
        'Received array is correct.'
      );
      // console.log(parsedArray);
      receivedCount += 1;
    }
  }
}
