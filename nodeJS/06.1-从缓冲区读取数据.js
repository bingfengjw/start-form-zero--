var buffer =new Buffer(26);
for(var i=0;i<26;i++){
	buffer[i] = i+97;
}
console.log(buffer.toString('ascii'));			//按照ASCII码输出内部储存的数据
console.log(buffer.toString('ascii',0,10));		//按照ASCII码输出内部储存的数据(从0-10)
console.log(buffer.toString('utf8',0,10));		//按照UTF-8编码输出内部储存的数据(从0-10)
console.log(buffer.toString(undefined,0,10));	//按照UTF-8编码输出内部储存的数据(从0-10)(默认编码为UTF-8)
//utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。