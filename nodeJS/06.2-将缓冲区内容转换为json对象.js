var buffer = new Buffer('这是一段中文的文字,放置在了缓冲区中');
var toJson = buffer.toJSON(buffer);
console.log(toJson);