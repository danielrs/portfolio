---
title: "Dobro"
date: 2018-05-13T12:38:02-05:00
description: CLI-client for the Pandora API.
tags: ['rust', 'cli', 'api']
weight: 3

projectUrl: https://github.com/danielrs/dobro
---

[ffmpeg]: https://www.ffmpeg.org/
[ao]: https://xiph.org/ao/

Dobro is a terminal client for the Pandora API. The client lets you log-in, create, update, edit and play Pandora stations from the terminal. Here's a quick demo of the app in action:

<script src="https://asciinema.org/a/1a8lbfqujpzxx1epgyua1jvn6.js" id="asciicast-1a8lbfqujpzxx1epgyua1jvn6" async></script>

## Development

Rust is a good systems programming language, however, it lacks the diversity of libraries that some more established languages like *C++* have. For instance, most of the app functionalities where developed using plain Rust, with the exception of audio playback and audio decoding; which where handled by the native libraries [ffmpeg][ffmpeg] and [ao][ao] respectively.
