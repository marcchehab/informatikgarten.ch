// Sorting sortcontainer
class SortExample {
	constructor(sortcontainer) {
		this.sortcontainer = sortcontainer; // <div class="sortcontainer" data-algo="bubblesort"></div>
		this.algo = sortcontainer.dataset.algo; // "bubblesort"
		this.RUNNING = false;

		let boxslider = this.sortcontainer.parentNode.querySelector('input[type="range"].nrofboxes');
		this.nrofboxes = boxslider ? boxslider.value : 30;
		if (boxslider) {
			boxslider.addEventListener('input', this.generatearray.bind(this));
			let span = document.createElement('span');
			span.innerHTML = boxslider.value;
			boxslider.parentNode.insertBefore(span, boxslider.nextSibling);
			boxslider.addEventListener('input', function() { span.innerHTML = boxslider.value; });
		}

		let speedslider = this.sortcontainer.parentNode.querySelector('input[type="range"].speed');
		this.speed = speedslider ? speedslider.value : 200;
		if (speedslider) {
			speedslider.addEventListener('input', this.setspeed.bind(this));
			let span = document.createElement('span');
			span.innerHTML = speedslider.value;
			speedslider.parentNode.insertBefore(span, speedslider.nextSibling);
			speedslider.addEventListener('input', function() { span.innerHTML = speedslider.value; });
		}
		
		let playbutton = this.sortcontainer.parentNode.querySelector('.playstop');
		if (playbutton) playbutton.addEventListener('click', this.playstop.bind(this));
		
		// Generate
		this.generatearray(this.nrofboxes);
	}


	// Function to generate the array of blocks
	generatearray() {
		this.stop();
		let nrofboxes = this.sortcontainer.parentNode.querySelector('input[type="range"].nrofboxes').value;
		this.sortcontainer.innerHTML = "";
		let totalwidth = this.sortcontainer.offsetWidth;
		let boxoffsetwidth = totalwidth/nrofboxes;
		for (let i = 0; i < nrofboxes; i++) {
			let value = Math.ceil(Math.random() * 100);
			let array_ele = document.createElement("div");
			array_ele.classList.add("block");
			array_ele.style.height = `${value}px`;
			array_ele.style.width = `${boxoffsetwidth-2}px`;
			array_ele.style.fontSize = `${20-nrofboxes/10}px`;
			array_ele.style.transform = `translate(${i * boxoffsetwidth}px)`;

			// Creating label element for displaying
			// size of particular block
			let array_ele_label = document.createElement("label");
			array_ele_label.classList.add("block_id");
			array_ele_label.innerText = value;

			// Appending created elements to index.html
			array_ele.appendChild(array_ele_label);
			this.sortcontainer.appendChild(array_ele);
		}
	}

	runalgo() {
		if (this.algo === "bubblesort") {
			this.BubbleSort();
		}
		if (this.algo == "bubbleonce") {
			this.BubbleOnce();
		}
		if (this.algo == "insertionsort") {
			this.InsertionSort();
		}
	}

	// Promise to swap two blocks
	swap(el1, el2) {
		return new Promise((resolve, reject) => {
			let timeout;
			// For exchanging styles of two blocks
			let temp = el1.style.transform;
			el1.style.transform = el2.style.transform;
			el2.style.transform = temp;

			window.requestAnimationFrame(() => {
				// Waiting
				timeout = setTimeout(() => {
					try {
						this.sortcontainer.insertBefore(el2, el1);
					} 
					catch {
						console.log("Error"); }
					resolve();
				}, this.speed);
			});
		});
	}

	setspeed() {
		let newspeed = this.sortcontainer.parentNode.querySelector('input[type="range"].speed').value;
		this.speed = newspeed;
	}

	stop() {
		let elem = this.sortcontainer.parentNode.querySelector('.playstop');
		this.RUNNING = false;
		elem.classList.add("stopped");
	}
	stop = this.stop.bind(this);
	playstop() {
		let elem = this.sortcontainer.parentNode.querySelector('.playstop');
		if (this.RUNNING) {
			this.stop();
		} else {
			this.RUNNING = true;
			elem.classList.remove("stopped");
			this.runalgo();
		}
	}

	// Asynchronous BubbleSort function
	async BubbleSort() {
		let blocks = this.sortcontainer.querySelectorAll(".block");
		// BubbleSort Algorithm
		for (let i = 0; i < blocks.length; i += 1) {
			for (let j = 0; j < blocks.length - i - 1; j += 1) {
				if (!(this.RUNNING === true)) {
					return;
				}
				// To change background-color of the
				// blocks to be compared
				blocks[j].style.backgroundColor ="#FF4949";
				blocks[j + 1].style.backgroundColor ="#FF4949";

				// To wait for "speed" miliseconds
				await new Promise((resolve) =>
					setTimeout(() => {
						resolve();
					}, this.speed)
				);

				let value1 = Number(blocks[j].childNodes[0].innerHTML);
				let value2 = Number(blocks[j + 1]
					.childNodes[0].innerHTML);

				// To compare value of two blocks
				if (value1 > value2) {
					try {
						await this.swap(blocks[j], blocks[j + 1]);
						blocks = this.sortcontainer.querySelectorAll(".block");
					}
					catch (e) {
						return;
					}
				}

				// Changing the color to the previous one
				blocks[j].style.backgroundColor ="#6b5b95";
				blocks[j + 1].style.backgroundColor ="#6b5b95";
			}

			//changing the color of greatest element
			//found in the above traversal
			blocks[blocks.length - i - 1]
				.style.backgroundColor ="#13CE66";
		}
	}

	// Asynchronous Bubble once function
	async BubbleOnce() {
		let blocks = this.sortcontainer.querySelectorAll(".block");
		// Bubble Once Algorithm
		for (let i = 0; i < blocks.length-1; i++) {
			if (!(this.RUNNING === true)) {
				return;
			}
			// To change background-color of the
			// blocks to be compared
			blocks[i].style.backgroundColor ="#FF4949";
			blocks[i + 1].style.backgroundColor ="#FF4949";

			// To wait for "speed" miliseconds
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, this.speed)
			);

			let value1 = Number(blocks[i].childNodes[0].innerHTML);
			let value2 = Number(blocks[i + 1]
				.childNodes[0].innerHTML);

			// To compare value of two blocks
			if (value1 > value2) {
				try {
					await this.swap(blocks[i], blocks[i + 1]);
					blocks = this.sortcontainer.querySelectorAll(".block");
				}
				catch (e) {
					return;
				}
			}

			// Changing the color to the previous one
			blocks[i].style.backgroundColor ="#6b5b95";
			blocks[i + 1].style.backgroundColor ="#6b5b95";
		}

		//changing the color of greatest element
		//found in the above traversal
		blocks[blocks.length - 1]
			.style.backgroundColor ="#13CE66";
	}

	// Asynchronous InsertionSort function
	async InsertionSort() {
		// InsertionSort Algorithm
		let blocks = this.sortcontainer.querySelectorAll(".block");

		for (let i = 1; i < blocks.length; i += 1) {
			blocks = this.sortcontainer.querySelectorAll(".block");
			let key = blocks[i].childNodes[0].innerHTML;
			let j = i - 1;
			blocks[i].style.backgroundColor = "#FF4949";
			blocks[j].style.backgroundColor = "#13CE66";
			for (let k = 0; k < i - 1; k += 1) {
				blocks[k].style.backgroundColor = "#6b5b95";
			}

			while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > Number(key)) {
				blocks = this.sortcontainer.querySelectorAll(".block");
				if (!(this.RUNNING === true)) {
					return;
				}
				await this.swap(blocks[j], blocks[j + 1]);

				await new Promise((resolve) =>
					setTimeout(() => {
						resolve();
					}, this.speed)
				);
				
				j -= 1;
			}
			if (j == i - 1) {
				// This means we're still on the first comparison & green should be switched
				blocks[j].style.backgroundColor = "#13CE66";
				blocks[i].style.backgroundColor = "#FF4949";		

				await new Promise((resolve) =>
					setTimeout(() => {
						resolve();
					}, this.speed)
				);			
			}
		}
	}

	
}

// Get all sort sortcontainers and initiate sorting according to attribute 
document.addEventListener('DOMContentLoaded', function() {
	let sortcontainers = document.querySelectorAll(".renderhtmldiv .sortcontainer");
	for (var i = 0; i < sortcontainers.length; i++) {
		sortcontainers[i].sortobj = new SortExample(sortcontainers[i]);
	}
});