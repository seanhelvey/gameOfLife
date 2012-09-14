$(document).ready(function() {
	
	var table = [[0,1,0,0,0],[1,0,0,1,1],[1,1,0,0,1],[0,1,0,0,0],[1,0,0,0,1]];
	var outTable = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	var testTable = [[0,0,0,0,0],[1,0,1,1,1],[1,1,1,1,1],[0,1,0,0,0],[0,0,0,0,0]];

	evolve();
	assertEquals();

	function assertEquals(){
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    if(outTable[i][j] != testTable[i][j]){
			alert("test failed");
		    }
		}
	    }
	}

	function evolve(){
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    checkNeighbors();
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
});

