console.log("JS running");
let currentsong = new Audio();
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const seekbar = document.querySelector(".seekbar");
const seekCircle = document.querySelector(".seek");
let isDragging = false;


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    // Pad with zeroes if needed
    const formattedMins = mins.toString().padStart(2, "0");
    const formattedSecs = secs.toString().padStart(2, "0");
    return `${formattedMins}:${formattedSecs}`;
}

function setTimeFromEvent(e) {
    const rect = seekbar.getBoundingClientRect();
    const x = e.clientX || e.touches?.[0]?.clientX;
    const offsetX = Math.min(Math.max(0, x - rect.left), rect.width);
    const percent = offsetX / rect.width;
    currentsong.currentTime = percent * currentsong.duration;
    seekCircle.style.left = `${percent * 100}%`;
}


async function getSongs() {
    // Fetch the response from the local server
    let response = await fetch("http://127.0.0.1:3000/SpotifyClone/songs/");
    let text = await response.text();

    // Create a temporary container to parse HTML
    let div = document.createElement("div");
    div.innerHTML = text;

    // Extract all anchor tags
    let links = div.querySelectorAll("a");

    let songs = [];
    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }

    return songs;
}

const playMusic = (track) => {
    currentsong.src = "http://127.0.0.1:3000/SpotifyClone/songs/" + track.replaceAll(" ", "%20") + ".mp3";;
    currentsong.play();
    play.src = "icons/pausebutton.svg"
    document.querySelector(".info").innerText = track
};

async function main() {
    let songs = await getSongs();
    var audio = new Audio(songs[0]);

    let songUl = document.querySelector(".songUl");
    for (const song of songs) {
        // Create a new <li> element with class 'songLi'
        let li = document.createElement("li");
        li.className = "songLi";
        li.innerHTML = document.querySelector(".songLi").innerHTML;
        console.log(song);
        li.querySelector("h2").innerText = song.split("/songs/")[1].replaceAll("%20", " ").replaceAll(".mp3", "");

        // Log the text content (or song name)
        console.log(li.textContent);

        // Append the <li> to the <ul>
        songUl.appendChild(li);
    }


    //   audio.play();

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime);
    });
    Array.from(document.querySelector(".songUl").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            const songName = e.querySelector("h2").innerText
            console.log(songName);
            playMusic(songName);
        });
    });


    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "icons/pausebutton.svg"
        }
        else {
            currentsong.pause()
            play.src = "icons/playbutton.svg"
        }
    })
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songduration").innerText = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
        document.querySelector(".seek").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
    })



    seekbar.addEventListener("click", (e) => {
        setTimeFromEvent(e);
    });

    seekCircle.addEventListener("mousedown", () => isDragging = true);
    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            seekCircle.style.scale = "1.5"
            seekCircle.style.transition = "0.01s"
            setTimeFromEvent(e);
        }
        else {
            seekCircle.style.transition = "0.5s"
            seekCircle.style.scale = "1"
        }
    });

    document.querySelector(".hamburger-icon").addEventListener("click", () => {
        console.log("HAmburgUr");
        document.querySelector(".left").style.left = "0";
    })
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-350px";
    })

    next.addEventListener("click", () => {
        console.log(currentsong.src)
        let currIndex = songs.indexOf(currentsong.src)
        if (currIndex < songs.length) {
            currentsong.src = songs[(currIndex + 1) % songs.length]
            let songName = decodeURIComponent(currentsong.src.split("/songs/")[1]).replace(".mp3", "");
            console.log("Next : " + songName);
            playMusic(songName);
        }
        console.log(currentsong.src)
    })

    prev.addEventListener("click", () => {
        console.log(currentsong.src)
        let currIndex = songs.indexOf(currentsong.src)
        if (currIndex >= 0) {
            currentsong.src = songs[(currIndex - 1 + songs.length) % songs.length]
            let songName = decodeURIComponent(currentsong.src.split("/songs/")[1]).replace(".mp3", "");
            console.log("Previous : " + songName);
            playMusic(songName);
        }
        console.log(currentsong.src)
    })

    // Example: Log or apply volume
    document.querySelector(".range input").addEventListener('input', (e) => {
        const volume = e.target.value;
        console.log('Volume:', volume);
        currentsong.volume = volume / 100;
    });

    const volumeIcon = document.querySelector('.volumebarimage');
    let volumeSlider = document.querySelector(".range input")
    let lastVolume = volumeSlider.value;
    volumeIcon.addEventListener('click', function () {
        if (volumeSlider.value > 0) {
            lastVolume = volumeSlider.value;
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = lastVolume || 100;
        }

        // Trigger the input event to update logic/UI
        volumeSlider.dispatchEvent(new Event('input'));
    });




}

main();
