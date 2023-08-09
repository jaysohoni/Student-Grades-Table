/*
for your testing you must go to inspect->application->local storage->file:///->clear all local storage                               (for chrome)

After doing the above, you can now test.


This is the finished code. I have tested and everything works successfully. I have kept in console.log() functions to show where I had errors to help me fix them.

*/





window.onload = function() //functions that load when window loads
{
   average();
   addAttributes();
}

function addStudent() // function to add new student row. Student row name and ID is not editable as it mentions this in the assignment brief pdf
{
  console.log("point1");
  var table = document.getElementById("table");
  var numCellsToCreate = table.rows[0].cells.length;
  var row = table.insertRow(-1);
  for(var i = table.rows.length-1; i<table.rows.length; i++) {
    console.log("point i" + i);
    // var row = table.rows[i];
    console.log("pointaaaa" + i);
    for (var j = 0; j< numCellsToCreate; j++)
      {
        console.log("pointj" + j);
        var cell = row.insertCell(j);
        if(j < 2){
          cell.innerHTML = "New Student";
        }
        if(j >= 2 && j < numCellsToCreate-1){
          cell.innerHTML = "-";
          cell.setAttribute("contenteditable", "true");
        }
        if(j == numCellsToCreate-1){
          cell.innerHTML = average();
        }
      }
  }
}

function addAssignment() // function to add column/assignment
{
  var table = document.getElementById("table");
  for(var i = 0; i<table.rows.length; i++) {
    var row = table.rows[i];
    row.insertCell(row.cells.length-1);
  }

  for(var x = 0; x<table.rows.length; x++) {
    var r = table.rows[x];
    for (var y = r.cells.length -2; y< r.cells.length -1; y++) {
      var cell = r.cells[y];
      if(x === 0) {
        cell.outerHTML = "<th>Assignment " + (y-1) + "</th>";
      }
      else {
        cell.innerHTML = "-";
        cell.setAttribute("contenteditable", "true");
      }
    }
  }
  average();
}





function average(){ //function to get average

    var result = 0; 
    var average = 0;
    var table = document.getElementById("table");
    var AssignmentsNotSubmitted = document.getElementById("AssignmentsNotSubmitted");
    var AssignmentsNotSubmittedcount = (table.rows.length - 1)*(table.rows[0].cells.length-3);

    for(var i = 1; i<table.rows.length; i++)
    {
    	result = 0;
    	var row = table.rows[i];
      
      for (var j = 2; j< row.cells.length -1; j++)
      {
        
        var cell = row.cells[j];
        
        if(cell.innerHTML > 100 || cell.innerHTML < 0 || cell.innerHTML === "")
        {
          cell.innerHTML = "-";
        }

        if(cell.innerHTML === "-"){
          cell.className = "dashes";
        }

        if(cell.innerHTML != "-" && cell.innerHTML != "")
        {
          
          cell.className = "numbers";
          result = result + parseInt(cell.innerHTML);
          AssignmentsNotSubmittedcount--;             
        }

      }
      
      average = Math.round(result/(row.cells.length-3));

      table.rows[i].cells[row.cells.length -1].innerHTML = average;



      for(var a = 1; a<table.rows.length; a++) {
        var r = table.rows[a];
          
        for (var b = r.cells.length-1; b< r.cells.length; b++) { 
          var c = r.cells[b];
          var avg = parseInt(c.innerHTML);
    
          if(avg<60 || c.innerHTML === "0") {
            c.className += (c.className ? " " : "")+"lowgrade";
          }
          else{
            c.className = "";
          }
        }
      }
      
      AssignmentsNotSubmitted.innerHTML = "Assignments Not Submitted are: " + AssignmentsNotSubmittedcount;


    }
    addAttributes();
    //return;
}

function addAttributes(){ //function to add attributes to make buttons clickable and to make new stuff content editable

  var table = document.getElementById("table");
  for(var i = 0; i<table.rows.length; i++){
    var row = table.rows[i];
      
    for (var j =  row.cells.length -1; j< row.cells.length; j++)
    {
        
      var cell = row.cells[j];
      cell.className += " clickable";
      // cell.setAttribute("class", "clickable");
      cell.setAttribute("onclick", "changeType()");
    }
  }
  //return;
}

function changeType(){ // function to change type of average score from percentage to letter to american 4.0 and back to percentage and so on
  
  var column = document.getElementsByClassName("clickable");
  var firstCellContent = column[0].textContent;
  
  if(firstCellContent === "Average [%]"){
    column[0].innerHTML = "Average [Letter]"
    for(var i = 1; i < column.length;i++)
    {
      var num = parseInt(column[i].innerHTML);
      console.log(num);
      if(num >= 93){column[i].innerHTML = "A";}

      if(num >= 90 && num <= 92){column[i].innerHTML = "A-";}

      if(num >= 87 && num <= 89){column[i].innerHTML = "B+";}
      
      if(num >= 83 && num <= 86){column[i].innerHTML = "B";}
      
      if(num >= 80 && num <= 82){column[i].innerHTML = "B-";}
      
      if(num >= 77 && num <= 79){column[i].innerHTML = "C+";}
      
      if(num >= 73 && num <= 76){column[i].innerHTML = "C";}
      
      if(num >= 70 && num <= 72){column[i].innerHTML = "C-";}
     
      if(num >= 67 && num <= 69){column[i].innerHTML = "D+";}
      
      if(num >= 63 && num <= 66){column[i].innerHTML = "D";}
      
      if(num >= 60 && num <= 62){column[i].innerHTML = "D-";}
      
      if(num < 60){column[i].innerHTML = "F";}
      
    }
  }
    // ---------------------

    if(firstCellContent === "Average [Letter]"){
      column[0].innerHTML = "Average [4.0]"
      for(var i = 1; i < column.length;i++)
      {
        console.log(i);
        var letter = column[i].innerHTML;
        console.log(letter);

        if(letter == "A"){column[i].innerHTML = "4.0";}
        
        if(letter == "A-"){column[i].innerHTML = "3.7";}
        
        if(letter == "B+"){column[i].innerHTML = "3.3";}
        
        if(letter == "B"){column[i].innerHTML = "3.0";}
        
        if(letter == "B-"){column[i].innerHTML = "2.7";}
        
        if(letter == "C+"){column[i].innerHTML = "2.3";}
        
        if(letter == "C"){column[i].innerHTML = "2.0";}
        
        if(letter == "C-"){column[i].innerHTML = "1.7";}
        
        if(letter == "D+"){column[i].innerHTML = "1.3";}
        
        if(letter == "D"){column[i].innerHTML = "1.0";}
        
        if(letter == "D-"){column[i].innerHTML = "0.7";}
        
        if(letter == "F"){column[i].innerHTML = "0.0";}
        
      }
    }

// ------------------

    if(firstCellContent === "Average [4.0]"){
      column[0].innerHTML = "Average [%]"
      average();
      
    }
    //return;
  }

function saveTable(){ // function to save table in its current state

  var table = document.getElementById("table");
  var numRows = table.rows.length;
  localStorage.setItem("numRows", numRows);
  var numColumns = table.rows[0].cells.length;
  localStorage.setItem("numColumns", numColumns);

  for(var i = 0; i<numRows; i++)
  {
    var row = table.rows[i];
    for (var j = 0; j< numColumns; j++)
    {
      var cell = row.cells[j];
      var label = i + "-" +j;
      localStorage.setItem(label, cell.outerHTML);
    }
  }

}

function loadTable(){ // function to load table in its previous state. to load previous table, you need to click save on the table you're happy with and then refresh page and then click load table from previously saved state. Your previously saved table should be there now.

  var table = document.getElementById("table");
  var numRows = localStorage.getItem('numRows');
  var numColumns = localStorage.getItem('numColumns');
  console.log(numRows + " " + numColumns);

  for(var i = 0; i<numRows; i++)
  {
    if(!table.rows[i]){
      table.insertRow(i);
    }
    var row = table.rows[i];

    for (var j = 0; j< numColumns; j++)
    {
      if(!row.cells[j]){
        row.insertCell(j)
      }
      var cell = row.cells[j];
      var label = i + "-" +j;
      cell.outerHTML = localStorage.getItem(label);
    }
  }
  average();

}