const client = require('./client');

async function list () {
	// 不带任何参数，默认最多返回100个文件。
	const result = await client.list({
		prefix: '/audios/',
		"max-keys": 10
	});
	console.log(result);
}

list();
