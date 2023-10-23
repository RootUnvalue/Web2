const fortuneCookies = [
    "Conquer your fears or they conquer you.",
    "봄이 오면 강물은 흐른다.",
    "You will have a pleasant surpise.",
    "쉽게 생각하라."
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortuneCookies.length)
    return fortuneCookies[idx]
}