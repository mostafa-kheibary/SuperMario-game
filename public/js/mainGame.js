// our constant
const back = document.querySelector(".game");
const mario = document.querySelector("#mario");
const mute = document.querySelector(".mute");
const unmute = document.querySelector('.unmute');
const WinModal = document.querySelector(".win-modal");
const Move = 5;
const MoveBackground = 15;
// sound 
const jumpSound = document.getElementById("jump");
const ThemeMusic = document.getElementById("ThemeMusic");
const winSound = document.getElementById('win');
const bumpSound = document.getElementById('bump');
// our let
let Moveto = 0;
let position = 0;



// our function
// for mute and unmute sound
function Music() {
    if (ThemeMusic.paused === true) {
        ThemeMusic.play();
    }
    else {
        ThemeMusic.pause();
    }
    mute.classList.toggle('unmute');
}
// for jump player
function jump() {
    console.log(mario.className);
    if (mario.className.includes("mario-play")) {
        
    }
    else{
        mario.classList.add("mario-play");
        jumpSound.play();
        setTimeout(() => {
            mario.classList.remove("mario-play");
        }, 500)
    }
}
// for jump player when somthing is on his head
function JumpBlock(first, secound, sound) {
    // check if somthing is on the player head or not to change animation
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
// when click D to move right
function MoveRight() {
    Moveto -= Move;
    mario.style.background = 'url(public/image/walk.gif)';
    mario.style.right = `${Moveto}px`;
    mario.classList.remove("mario-left");
}
// when click A to move left
function MoveLeft() {
    Moveto += Move;
    mario.style.right = `${Moveto}px`;
    mario.classList.add("mario-left");
}
//for screen moving 
function screenMoveRight() {
    position -= MoveBackground;
    back.style = `background-position: ${position}px ;`
}
//for screen moving 
function screenMoveLeft() {
    position -= - MoveBackground;
    back.style = `background-position: ${position}px ;`
}
// when player win
function win() {
    ThemeMusic.pause();
    winSound.play();
    WinModal.classList.add('show-win-modal')
    setTimeout(() => {
        window.location.reload();
    }, 5000);
}



// events start
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        jump();
        JumpBlock(250, 270, bumpSound);
        JumpBlock(270, 290, bumpSound);
        JumpBlock(290, 310, bumpSound);
        
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
mute.addEventListener("click", function () {
    Music();
});