$(document).ready(function() {
	
        test();
	main();

        function test(){

            var table = [[0,1,0,0,0],[1,0,0,1,1],[1,1,0,0,1],[0,1,0,0,0],[1,0,0,0,1]];
            var outTable = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
            var testTable = [[0,0,0,0,0],[1,0,1,1,1],[1,1,1,1,1],[0,1,0,0,0],[0,0,0,0,0]];

            gameOfLife(table, outTable, true);
            assertEquals(outTable, testTable);
        }

        function assertEquals(outTable, testTable){
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 5; j++) {
                    if(outTable[i][j] != testTable[i][j]){
                        alert("test failed");
                    }
                }
            }
        }

	function main(){

	    var table = [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]];
	    var outTable = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];

	    setInterval(function(){gameOfLife(table, outTable, false)},1000);
       
	}

	function gameOfLife(table, outTable, isTest){
	    evolve(table, outTable);
	    copyValues(table, outTable);

	    if(!isTest){
		display(outTable);
	    }
	}

	function evolve(table, outTable){
	    var current = 0;
	    var neighborCount = 0;
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    neighborCount = checkNeighbors(table, outTable, neighborCount);
		    current = table[i][j];
		    determineCellLife(current, neighborCount, outTable);
		    neighborCount = 0;
		}
	    }
	}

	function copyValues(table, outTable){
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    table[i][j] = outTable[i][j];
		}
	    }
	}


	function checkNeighbors(table, outTable, neighborCount){

	    var testRow = 0;
	    var testCol = 0;
	    
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

	    return neighborCount;
	}

	function determineCellLife(currentValue, numNeighbors, outTable){
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

	function display(outTable){
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

