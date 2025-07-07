# Spotify-Clone
```
# 🎵 Spotify Clone

A sleek, responsive front-end clone of Spotify built using **HTML**, **CSS**, and **JavaScript**. This clone mimics the layout and core music playback functionalities of Spotify, including interactive playlists, playbar controls, and a dynamic song list rendered from a local server.

## 🚀 Features

- 🎧 Music player with play, pause, next, and previous controls
- 📃 Dynamic song list fetched from a local server
- 🔊 Volume controls with mute toggle
- ⌛ Seekbar with live updates
- 📱 Responsive layout with hamburger menu for mobile
- 🎨 Styled with custom utility classes and modern CSS

## 📁 Project Structure

```

SpotifyClone/
├── index.html         # Main HTML layout
├── style.css          # Main stylesheet
├── utility.css        # Utility classes for layout and design
├── script.js          # JavaScript for interactivity and logic
└── icons/             # SVG icons used in the app

````

## 🛠️ How to Use

### 1. Clone this repository

```bash
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone
````

### 2. Run a local server

You can use any local server (like Python, VSCode Live Server, etc.)

#### Python 3 (quick method):

```bash
# Start server at root of project
python -m http.server 3000
```

Make sure your songs (MP3 files) are in this folder:

```
SpotifyClone/
└── songs/
    ├── Song1.mp3
    ├── Song2.mp3
    └── ...
```

### 3. Open the app in your browser

Visit:

```
http://127.0.0.1:3000/SpotifyClone/
```

> The music list is fetched from `/SpotifyClone/songs/` based on available `.mp3` files.

## 📸 Screenshots

> *(Add screenshots here of the UI in action, desktop and mobile views)*

## 📦 Dependencies

No external frameworks. Pure HTML, CSS, and JavaScript!

## 📌 Notes

* This is a front-end only project.
* All song files must be stored locally inside the `songs` directory.
* Not affiliated with Spotify. Built for educational and portfolio purposes.

## 📄 License

MIT License

---

Made with ❤️ by \Touhid

```

