$(document).ready(function() {

	var table = [[0,1,0,0,0],[1,0,0,1,1],[1,1,0,0,1],[0,1,0,0,0],[1,0,0,0,1]];
	var outTable = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];

	setInterval(function(){evolve()},1000);
	//evolve(); for testing

	function evolve(){
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    checkNeighbors();
		    display();
		}
	    }
	    copyValues(); //******** CRITICAL
	}

	function copyValues(){
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    table[i][j] = outTable[i][j];
		}
	    }
	}

	var current = 0;
	var testRow = 0;
	var testCol = 0;
	var neighborCount = 0;
	function checkNeighbors(){
	    current = table[i][j];
	    
	    //1 check above left
	    testRow = i-1;
	    testCol = j-1;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //2 check above
	    testRow = i-1;
	    testCol = j;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //3 check above right
 	    testRow = i-1;
	    testCol = j+1;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //4 check right
	    testRow = i;
	    testCol = j+1;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //5 check lower right
	    testRow = i+1;
	    testCol = j+1;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //6 check below
	    testRow = i+1;
	    testCol = j;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //7 check lower left
	    testRow = i+1;
	    testCol = j-1;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //8 check left
	    testRow = i;
	    testCol = j-1;
	    
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }

	    //JUDGEMENT DAY
	    determineCellLife(current, neighborCount);
	    neighborCount = 0;

	    /*
	    if(current == 0){
		table[i][j] = 1;
	    }
	    else {
		table[i][j] = 0;
	    }
	    */
	}

	function determineCellLife(currentValue, numNeighbors){
	    //under population
	    if(currentValue == 1 && numNeighbors < 2){
		outTable[i][j] = 0;
	    }
	    //survival
	    else if(currentValue == 1 && (numNeighbors == 2 || numNeighbors == 3)){
		outTable[i][j] = 1;
	    }
	    //overcrowding
	    else if(currentValue == 1 && numNeighbors > 3){
		outTable[i][j] = 0;
	    }
	    //reproduction
	    else if(currentValue == 0 && numNeighbors == 3){
		outTable[i][j] = 1;
	    }
	}

	function isAlive(testTable, row, col){
	    if(testTable[row][col] == 0){
		return false;
	    }
	    return true;
	}

	function isDefined(testTable, row, col){
	    if(row < 0 || col < 0){
		return false;
	    }
	    else if( row > 4 || col > 4){
		return false;
	    }
	    return true;
	}

	function display(){
	    $("#1").text(outTable[0][0]);
	    $("#2").text(outTable[0][1]);
	    $("#3").text(outTable[0][2]);
	    $("#4").text(outTable[0][3]);
	    $("#5").text(outTable[0][4]);

	    $("#6").text(outTable[1][0]);
	    $("#7").text(outTable[1][1]);
	    $("#8").text(outTable[1][2]);
	    $("#9").text(outTable[1][3]);
	    $("#10").text(outTable[1][4]);

	    $("#11").text(outTable[2][0]);
	    $("#12").text(outTable[2][1]);
	    $("#13").text(outTable[2][2]);
	    $("#14").text(outTable[2][3]);
	    $("#15").text(outTable[2][4]);

	    $("#16").text(outTable[3][0]);
	    $("#17").text(outTable[3][1]);
	    $("#18").text(outTable[3][2]);
	    $("#19").text(outTable[3][3]);
	    $("#20").text(outTable[3][4]);
	    
	    $("#21").text(outTable[4][0]);
	    $("#22").text(outTable[4][1]);
	    $("#23").text(outTable[4][2]);
	    $("#24").text(outTable[4][3]);
	    $("#25").text(outTable[4][4]);

	}

});

