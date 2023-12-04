module.exports = {
    cookieSecret: 'my cookie secret',
    mongo: {development: {
        // 'connectionString': 'mongodb://localhost:27017/Meadowlark'
        'connectionString': 'mongodb://127.0.0.1:27017/Meadowlark'
    }},
    redis: {development: {
        'url': 'redis://:xhyd5STBwLszLyZWacMAgcpYuS27dDCe@redis-17879.c54.ap-northeast-1-2.ec2.cloud.redislabs.com:17879'
    }},
}