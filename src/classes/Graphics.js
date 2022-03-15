export default class Graphics {
	constructor(options) {
		this.x = null
		this.spans = null
		this.barHeight = null
		this.audio = options.audio
		this.canvas = options.canvas
		this.wrapper = options.wrapper
		this.number = options.frequencies
		this.frequencies = this.fillArray(options.frequencies)
		this.barWidth = (1024 / this.frequencies.length) - 2
	}

	init() {
		let str = ''
		this.spans = {}
		this.frequencies.forEach(item => {
			this.spans[`span${item}`] = null
			str += `<span id=span${item} class='span' style='width: ${Math.floor((1024 / this.frequencies.length) - 2)}px'></span>`
		})
		this.wrapper.innerHTML = str
		document.querySelectorAll('.span').forEach($el => {
			this.spans[$el.id] = $el
		})
	}

	fillArray(n) {
		let m = Math.floor(1024 / n)
		n = parseInt(n, 10);
		if (n < 1) return [];
		function* g() {
			let i = 0;
			while (i <= 856 && (i+m) <= 856) {
				i === 0
					? yield i++
					: i === 1
						? yield i = (i+m)-1
						: yield i = i+m
			}
		}

		return Array.from(g());
	}

	loop = (analyser, ctx, arr) => {
		this.x = 0
		ctx.clearRect(0,0, 1024, 215 )
		analyser.getByteFrequencyData(arr);
		this.frequencies.forEach((item, index) => {
			this.barHeight = arr[item] / 2
			const hue = index * 2
			ctx.fillStyle = `black`
			ctx.fillRect(this.x, (215 - this.barHeight - 3), this.barWidth, 2)
			ctx.fillStyle = `hsl(${hue},100%,50%)`
			ctx.fillRect(this.x, (215 - this.barHeight), this.barWidth, this.barHeight)
			this.spans[`span${item}`].style.minHeight = (arr[item]/2) + "px"
			this.x += this.barWidth + 2
		})
		window.requestAnimationFrame(this.loop.bind(this, analyser, ctx, arr))
	}

	start() {
		let ctx = this.canvas.getContext('2d'),
			context = new AudioContext(),
			analyser = context.createAnalyser(),
			source = context.createMediaElementSource(this.audio),
			bufferLength = analyser.frequencyBinCount;
		let arr = new Uint8Array(bufferLength)
		source.connect(analyser)
		analyser.connect(context.destination);
		// analyser.fftSize = 64
		this.loop(analyser, ctx, arr);
	}
}
