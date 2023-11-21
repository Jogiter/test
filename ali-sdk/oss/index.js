const OSS = require('ali-oss');

async function listBuckets() {
  try {
    // 列举当前账号所有地域下的存储空间。
    const result = await client.listBuckets();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

async function list () {
	// 不带任何参数，默认最多返回100个文件。
	const result = await client.list({
		prefix: '/audios/',
		"max-keys": 10
	});
	console.log(result);
}

list();

// listBuckets();
