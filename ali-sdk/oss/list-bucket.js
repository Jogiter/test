const client = require('./client');

async function listBuckets() {
  try {
    // 列举当前账号所有地域下的存储空间。
    const result = await client.listBuckets();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

listBuckets();
