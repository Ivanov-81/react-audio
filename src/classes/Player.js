import Graphics from "./Graphics";

export default class Player {
  constructor(options) {
    this.audio = null;
    this.canvas = null;
    this.file = null;
    this.typeFile = null;
    this.path = "media/";
    this.frequencies = options.frequencies - 1;
    this.graphics = null;
  }

  play() {
    this.audio.play();
    this.audio.addEventListener("ended", () => {
      this.audio.play();
    });
  }

  pause() {
    this.audio.pause();
  }

  set setWrapper($el) {
    this.graphics = new Graphics({
      audio: this.audio,
      canvas: this.canvas,
      frequencies: this.frequencies,
      wrapper: $el,
    });
    this.graphics.init();
  }

  get setAudio() {
    return this.audio;
  }
  set setAudio(audio) {
    this.audio = audio;
  }

  get setCanvas() {
    return this.canvas;
  }
  set setCanvas(canvas) {
    this.canvas = canvas;
  }

  get setFile() {
    return this.file;
  }
  set setFile(file) {
    if (file.type === "audio/mpeg") {
      this.audio.pause();
      this.file = file;
      this.typeFile = file.type;
      this.audio.src = this.path + file.name;
      this.play();
      if (this.graphics) {
        this.graphics.start();
      }
    }
  }
}
