const new_game_button = document.getElementById("new-game-button");
const turn_span = document.getElementById("turn-span");

let board = [];

let turn = 1;
let highest_number = 0;
let winning_player = null;

const generate_move = (row, col, player) => {
	let new_number = 0;

	if (board[row][col].number != 0) return 0;

	const bordering = [];

	// get 8 bordering cells
	bordering.push(board[row - 1] ? board[row - 1][col - 1] : null);
	bordering.push(board[row - 1] ? board[row - 1][col] : null);
	bordering.push(board[row - 1] ? board[row - 1][col + 1] : null);
	bordering.push(board[row][col - 1]);
	bordering.push(board[row][col + 1]);
	bordering.push(board[row + 1] ? board[row + 1][col - 1] : null);
	bordering.push(board[row + 1] ? board[row + 1][col] : null);
	bordering.push(board[row + 1] ? board[row + 1][col + 1] : null);

	// get highest number
	bordering.forEach(cell => {
		if (cell != null && cell.player == player && cell.number >= new_number) new_number = cell.number + 1;
	});

	return new_number;
};

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
			td.className = "cell";

			let num = 0;
			let player = null;

			if (row == 0 && col == 0) { num = 1; td.classList.add("player1"); player = 1 }
			else if (row == 1 && col == 1) { num = 2; td.classList.add("player1"); player = 1 }
			else if (row == 2 && col == 2) { num = 3; td.classList.add("player1"); player = 1 }
			else if (row == height - 1 && col == width - 1) { num = 1; td.classList.add("player2"); player = 2 }
			else if (row == height - 2 && col == width - 2) { num = 2; td.classList.add("player2"); player = 2 }
			else if (row == height - 3 && col == width - 3) { num = 3; td.classList.add("player2"); player = 2 }

			td.addEventListener("click", () => {
				try {
					const new_number = generate_move(row, col, turn);

					if (new_number) {
						if (new_number > highest_number) {
							highest_number = new_number;
							winning_player = turn;
						} else if (new_number == highest_number) {
							winning_player = null;
						}

						board[row][col].number = new_number;
						board[row][col].player = turn;
						td.textContent = new_number;
						td.classList.remove(`player${turn == 1 ? 2 : 1}`);
						td.classList.add(`player${turn}`);
						// alert list of classes
						turn = turn == 1 ? 2 : 1;
						turn_span.textContent = turn == 1 ? "Red" : "Blue";

						let next_move_possible = false;

						for (let row = 0; row < height; row++) {
							for (let col = 0; col < width; col++) {
								const cell = board[row][col];
								if (cell.player == null && generate_move(row, col, turn)) next_move_possible = true;
							}
						}

						if (!next_move_possible) {
							setTimeout(() => {
								if (winning_player == null) {
									alert("Tie!");
								} else {
									alert(`${winning_player == 1 ? "Red" : "Blue"} wins!`);
								}
							}, 750);
							new_game_button.parentElement.hidden = false;
						}
					}
				} catch (e) {
					alert(e);
				}
			});

			board[row].push({ number: num, player});
			td.textContent = num;
		}
	}

	try { document.body.removeChild(document.getElementById("board")) } catch (e) { }
	document.body.appendChild(table);
	document.getElementById("turn-text").hidden = false;
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