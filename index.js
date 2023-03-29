const new_game_button = document.getElementById("new-game-button");

// Generate board using tr and td

const generate_board = (width, height) => {
	const table = document.createElement("table");
	const board = [];
	table.id = "board";

	for (let row = 0; row < height; row++) {
		board.push([]);
		const tr = board.appendChild(document.createElement("tr"));
		tr.id = `row-${row}`;

		for (let col = 0; col < width; col++) {
			board[row].push(0);
			const td = tr.appendChild(document.createElement("td"));
			td.id = `col-${col}`;

			td.textContent = 0;
		}
	}

	try { document.removeChild(document.getElementById("board")) } catch (e) { }
	document.body.appendChild(table);
	return board;
};

new_game_button.addEventListener("click", () => {
	const width = document.getElementById("width-input").value;
	const height = document.getElementById("height-input").value;

	generate_board(width, height);

	new_game_button.parentElement.hidden = true;
});