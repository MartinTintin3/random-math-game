const new_game_button = document.getElementById("new-game-button");

let board = [];

const generate_board = (width, height) => {
	const table = document.createElement("table");
	const board = [];
	table.id = "board";

	for (let row = 0; row < height; row++) {
		board.push([]);
		const tr = table.appendChild(document.createElement("tr"));
		tr.id = `row-${row}`;
		tr.className = "row";

		for (let col = 0; col < width; col++) {
			const td = tr.appendChild(document.createElement("td"));
			td.id = `cell-${row}-${col}`;
			id.className = "cell";

			let num = 0;

			if (row == 0 && col == 0) num = 1;
			else if (row == 1 && col == 1) num = 2;
			else if (row == 2 && col == 2) num = 3;
			else if (row == height - 1 && col == width - 1) num = 1;
			else if (row == height - 2 && col == width - 2) num = 2;
			else if (row == height - 3 && col == width - 3) num = 3;

			board[row].push(num);
			td.textContent = num;
		}
	}

	try { document.removeChild(document.getElementById("board")) } catch (e) { }
	document.body.appendChild(table);
	return board;
};

new_game_button.addEventListener("click", () => {
	const width = document.getElementById("width-input").value;
	const height = document.getElementById("height-input").value;

	try {
		board = generate_board(width, height);
	} catch (e) {
		alert(e);
	}

	new_game_button.parentElement.hidden = true;
});