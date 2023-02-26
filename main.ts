input.onButtonPressed(Button.A, function () {
    if (minion__x > 0) {
        led.unplot(minion__x, 4)
        minion__x += -1
        drawMinion(minion__x)
    }
})
function levelUp (pause2: number) {
    if (score > 0 && score % 10 == 0) {
        pause2 = pause2 - score * 5
    }
    return pause2
}
function moveBananas (bananas: number[][]) {
    bananas_old = [
    [
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0
    ],
    [
    0,
    0,
    0,
    0,
    0
    ]
    ]
    for (let y = 0; y <= 4; y++) {
        for (let x = 0; x <= 4; x++) {
            bananas_old[x][y] = bananas[x][y]
        }
    }
    for (let x = 0; x <= 4; x++) {
        bananas[x][0] = 0
    }
    for (let y = 0; y <= 3; y++) {
        for (let x = 0; x <= 4; x++) {
            bananas[x][y + 1] = bananas_old[x][y]
        }
    }
}
function drawBananas (bananas: number[][]) {
    bananas[randint(0, 4)][0] = banana
    for (let y = 0; y <= 4; y++) {
        for (let x = 0; x <= 4; x++) {
            if (bananas[x][y] == 1) {
                led.plotBrightness(x, y, 20)
            } else {
                led.unplot(x, y)
            }
        }
    }
    drawMinion(minion__x)
}
function drawMinion (minion__x: number) {
    led.plotBrightness(minion__x, 4, 150)
}
input.onButtonPressed(Button.B, function () {
    if (minion__x < 4) {
        led.unplot(minion__x, 4)
        minion__x += 1
        drawMinion(minion__x)
    }
})
input.onGesture(Gesture.Shake, function () {
    control.reset()
})
function gameScoreOver (bananas: number[][]) {
    for (let x = 0; x <= 4; x++) {
        if (bananas[x][4] == banana && x != minion__x) {
            music.setVolume(100)
            music.playMelody("F E D C C C - - ", 500)
            basic.pause(pause2)
            basic.clearScreen()
            while (true) {
                basic.showNumber(score)
            }
        } else {
            if (bananas[x][4] == banana && x == minion__x) {
                score += 1
            }
        }
    }
}
let bananas_old: number[][] = []
let score = 0
let minion__x = 0
let banana = 0
let pause2 = 0
let bananas = [
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
],
[
0,
0,
0,
0,
0
]
]
music.setVolume(50)
pause2 = 1000
banana = 1
minion__x = 2
score = 0
basic.forever(function () {
    drawBananas(bananas)
    gameScoreOver(bananas)
    music.playTone(988, music.beat(BeatFraction.Eighth))
    pause2 = levelUp(pause2)
    basic.pause(pause2)
    moveBananas(bananas)
})
