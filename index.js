function BatchJSONParser(opts) {
  var batchSize = 1;
  var onBatchParsed;
  var jsonStrings = [];

  if (opts) {
    batchSize = opts.batchSize;
    onBatchParsed = opts.onBatchParsed;
  }

  return {
    write: write,
    flush: flush
  };

  function write(s) {
    jsonStrings.push(s);
    if (jsonStrings.length === batchSize) {
      flush();
    }
  }

  function flush() {
    var parsed = JSON.parse('[' + jsonStrings.join(',') + ']');
    jsonStrings.length = 0;
    onBatchParsed(parsed);    
  }
}

module.exports = BatchJSONParser;
