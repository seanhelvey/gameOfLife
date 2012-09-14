$(document).ready(function() {

	var table = [[1,0,1,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,1,0,0,0],[0,0,0,1,0]];

	setInterval(function(){evolve()},1000);

	function evolve(){
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    checkNeighbors();
		    display();
		}
	    }
	}

	var current = 0;
	function checkNeighbors(){
	    current = table[i][j];
	    if(current == 0){
		table[i][j] = 1;
	    }
	    else {
		table[i][j] = 0;
	    }
	}

	function display(){
	    $("#1").text(table[0][0]);
	    $("#2").text(table[0][1]);
	    $("#3").text(table[0][2]);
	    $("#4").text(table[0][3]);
	    $("#5").text(table[0][4]);

	    $("#6").text(table[1][0]);
	    $("#7").text(table[1][1]);
	    $("#8").text(table[1][2]);
	    $("#9").text(table[1][3]);
	    $("#10").text(table[1][4]);

	    $("#11").text(table[2][0]);
	    $("#12").text(table[2][1]);
	    $("#13").text(table[2][2]);
	    $("#14").text(table[2][3]);
	    $("#15").text(table[2][4]);

	    $("#16").text(table[3][0]);
	    $("#17").text(table[3][1]);
	    $("#18").text(table[3][2]);
	    $("#19").text(table[3][3]);
	    $("#20").text(table[3][4]);

	    $("#21").text(table[4][0]);
	    $("#22").text(table[4][1]);
	    $("#23").text(table[4][2]);
	    $("#24").text(table[4][3]);
	    $("#25").text(table[4][4]);

	}

});

