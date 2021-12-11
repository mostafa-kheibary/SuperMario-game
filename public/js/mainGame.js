const back = document.querySelector(".game");
const mario = document.querySelector("#mario");
const mute = document.querySelector(".mute");
const WinModal = document.querySelector(".win-modal");
let Moveto = 0;
let position = 0;
const Move = 5;
const MoveBackground = 15;
// sound 
const jumpSound = document.getElementById("jump");
const ThemeMusic = document.getElementById("ThemeMusic");
const winSound = document.getElementById('win');
const bumpSound = document.getElementById('bump');
// for mute and unmute sound
mute.addEventListener("click", function () {
    if (ThemeMusic.paused === true) {
        ThemeMusic.play();
    }
    else {
        ThemeMusic.pause();
    }
});



function jump() {
    if (mario.className !== "mario-play") {
        mario.classList.add("mario-play");
        jumpSound.play();
        setTimeout(() => {
            mario.classList.remove("mario-play");
        }, 500)
    }
}
function JumpBlock(first, secound, sound) {
    if (mario.offsetLeft > first && mario.offsetLeft < secound) {
        if (mario.className !== "jump-block") {
            mario.classList.add('jump-block');
            jumpSound.play();
            setTimeout(() => {
                sound.play();
            }, 100)
            setTimeout(() => {

                mario.classList.remove("jump-block");
            }, 500)
        }
    }

}
function MoveRight() {
    Moveto -= Move;
    mario.style.background = 'url(public/image/walk.gif)';
    mario.style.right = `${Moveto}px`;
    mario.classList.remove("mario-left");
}
function MoveLeft() {
    Moveto += Move;
    mario.style.right = `${Moveto}px`;
    mario.classList.add("mario-left");
}
function screenMoveRight() {
    position -= MoveBackground;
    back.style = `background-position: ${position}px ;`
}
function screenMoveLeft() {
    position -= - MoveBackground;
    back.style = `background-position: ${position}px ;`
}
function win() {
    ThemeMusic.pause();
    winSound.play();
    WinModal.classList.add('show-win-modal')
    setTimeout(() => {
        window.location.reload();
    }, 5000);
}
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        JumpBlock(250, 270, bumpSound);
        JumpBlock(270, 290, bumpSound);
        JumpBlock(290, 310, bumpSound);
        jump();
    }
    if (e.which == 68) {
        if (mario.offsetLeft < 770) {
            MoveRight();
            screenMoveRight();
        }
        else {
            win();
        }
        console.log(mario.offsetLeft);
    }
    if (e.which == 65) {
        if (back.style.backgroundPosition <= "0px") {
            MoveLeft();
            screenMoveLeft();
        }

    }
});
document.addEventListener("keyup", function () {
    mario.style.background = 'url(public/image/player.svg)';
})