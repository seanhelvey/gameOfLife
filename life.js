/*
Conway's Game of Life
Author: Sean Helvey
Date: 9/14/2012
*/

$(document).ready(function() {
	
        test();
	main();

	/* A crude test to ensure that given test input results in correct output.
	gameOfLife is called just once here and the results are not displayed.
	As an example, this game board as input:
	0 1 0 0 0
	1 0 0 1 1
	1 1 0 0 1
	0 1 0 0 0
	1 0 0 0 1
	Will have a subsequent generation of:
	0 0 0 0 0
	1 0 1 1 1
	1 1 1 1 1
	0 1 0 0 0
	0 0 0 0 0 */
        function test(){
            var table = [[0,1,0,0,0],[1,0,0,1,1],[1,1,0,0,1],[0,1,0,0,0],[1,0,0,0,1]];
            var outTable = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
            var testTable = [[0,0,0,0,0],[1,0,1,1,1],[1,1,1,1,1],[0,1,0,0,0],[0,0,0,0,0]];
            gameOfLife(table, outTable, true);
            assertEquals(outTable, testTable);
        }

	/* The value of each cell within table should match the values in testTable after one iteration. 
	An alert message is displayed if any one of the cells in table doesn't match with testTable.  */
        function assertEquals(outTable, testTable){
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 5; j++) {
                    if(outTable[i][j] != testTable[i][j]){
                        alert("test failed");
                    }
                }
            }
        }

	/* The main functon drives program execution by calling gameOfLife every second.
	Unlike the test function above, the main function will pass a different argument
	to the gameOfLife function to ensure that results are displayed. */
	function main(){
	    var table = [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]];
	    var outTable = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	    setInterval(function(){gameOfLife(table, outTable, false)},1000);
	}

	/* gameOfLife calls evolve to access the environment surrounding each cell before
	copying the values from the input table to the output table and displays results. */
	function gameOfLife(table, outTable, isTest){
	    evolve(table, outTable);
	    copyValues(table, outTable);
	    if(!isTest){
		display(outTable);
	    }
	}	

	/* evolve calls checkNeighbors to examine each cells surroundings and determineCellLife
	to proceess the number of neighboring cells in the context of the cells current state. */
	function evolve(table, outTable){
	    var current = 0;
	    var neighborCount = 0;
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    neighborCount = checkNeighbors(table, neighborCount);
		    current = table[i][j];
		    determineCellLife(current, neighborCount, outTable);
		    neighborCount = 0;
		}
	    }
	}

	/* The value of each cell is copied from outTable to table at the end of each iteration. 
	This cannot be done while iterating, because it would affect the results. */
	function copyValues(table, outTable){
	    for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
		    table[i][j] = outTable[i][j];
		}
	    }
	}

	/* Each neighboring cell is examined and a count of live neighbords is returned. */
	function checkNeighbors(table, neighborCount){
	    var testRow = 0;
	    var testCol = 0;
	    
	    //check above left
	    testRow = i-1;
	    testCol = j-1;
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    //check above
	    testRow = i-1;
	    testCol = j;	    
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    //check above right
 	    testRow = i-1;
	    testCol = j+1;	    
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    //check right
	    testRow = i;
	    testCol = j+1;	    
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    //check lower right
	    testRow = i+1;
	    testCol = j+1;	    
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    //check below
	    testRow = i+1;
	    testCol = j;	    
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    //check lower left
	    testRow = i+1;
	    testCol = j-1;	    
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    //check left
	    testRow = i;
	    testCol = j-1;	    
	    neighborCount = updateNeighborCount(table, testRow, testCol, neighborCount);

	    return neighborCount;
	}

	/* If the neighbor is defined and alive, neighborCount is incremented and returned */
	function updateNeighborCount(table, testRow, testCol, neighborCount){
	    if(isDefined(table, testRow, testCol) && isAlive(table, testRow, testCol)) {
		    neighborCount++;
	    }
	    return neighborCount;
	}

	/* Each cell's life for the next round is determined by its current 
	value and the number of living neighbors immediately surrounding it. */
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
	
	/* returns boolean false if the cell is dead, true if the cell is alive. */
	function isAlive(testTable, row, col){
	    if(testTable[row][col] == 0){
		return false;
	    }
	    return true;
	}

	/* returns boolean false if the cell is not defined, true if defined.
	Note that indicies less than zero or greater than four are assumed to
	be undefined here, because the size of the table is five by five. */
	function isDefined(testTable, row, col){
	    if(row < 0 || col < 0){
		return false;
	    }
	    else if( row > 4 || col > 4){
		return false;
	    }
	    return true;
	}

	/* The div corresponding to each cell is selected and its text 
	is assigned the value of the appropriate cell of outputTable. */
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

