const fortuneCookies = [
    "기쁨 가득한 하루가 되기를 바랍니다.",
    "보람찬 시간을 보내기 바랍니다.",
    "미래를 알 수 없지만 그럼에도 행복할 겁니다.",
    "희망은 한줄기의 빛과 같아요. 언제나 당신 곁에 있습니다."
]

exports.getFortune() = () => {
    return Math.floor(Math.random()*fortuneCookies.length)
}