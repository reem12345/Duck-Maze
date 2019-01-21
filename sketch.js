// global variables & functions call
var img, img1;
var m = new MMaze();
m.selectMaze();
m.agent_place();
m.goal_place();
m.generate_nodes();



//---------------------------------------------------------------------------
//--------------------------Interface code section---------------------------
//---------------------------------------------------------------------------

function preload()
{
 // load duck and lake images
 img = loadImage("Picture1.jpg");
 img1 = loadImage("lake.jpg");
}

// --------------------
function setup()
{
 createCanvas(800, 600);
 frameRate(5);
}

// --------------------
function draw()
{

 background(255, 255, 255);
 var block = color(2, 21, 40);
 var open = color(101, 175, 178);

 for (var i = 0; i < 11; i++)
 {
 for (var j = 0; j < 15; j++)
 {
 var x = i * 50;
 var y = j * 50;
 image(img, y, x, 50, 50);
 frameRate(5);
 if (m.nodes[i][j].text == "0")
 m.nodes[i][j].show(i, j, block);
 else if (m.nodes[i][j].text == "1")
 m.nodes[i][j].show(i, j, open);
 else if (m.nodes[i][j].text == "2")
 {
 image(img1, y, x, 50, 50);
 }

 }
 }

  //This statement to run A* search 1 in interface 
  m.A_starSearch();
  m.getPathToRoot(m.r_g, m.c_g);

 // This statements to run DFS in interface 
 // m.generate_nodes();
 // m.DFS (m.r_a,m.c_a);


}


/* This section to compare between heuristic functions through the number of expand nodes 
represented by number 3 and number 1 for open nodes and 0 for block nodes and 8 for the true path .
and to show the result remove the comment symbol from statements in A_star search 1 and 2 methods 



document.write("The start palce: [",m.r_a,",",m.c_a,"]","</br>");
document.write("The goal palce: [",m.r_g,",",m.c_g,"]","</br>");
document.write("</br>");
m.A_starSearch();
for (var row=0; row < m.nodes.length; row++) {
 for (var column=0; column < m.nodes[row].length; column++){
 document.write(m.nodes[row][column].text," ");}
 
 document.write("</br>");
}
document.write("</br>");
m.generate_nodes();
m.A_starSearch2();

for (var row=0; row < m.nodes.length; row++) {
 for (var column=0; column < m.nodes[row].length; column++){
 document.write(m.nodes[row][column].text," ");}
 
 document.write("</br>");
}
document.write("</br>");
m.generate_nodes();
m.DFS (m.r_a,m.c_a);
for (var row=0; row < m.nodes.length; row++) {
    for (var column=0; column < m.nodes[row].length; column++){
    document.write(m.nodes[row][column].text," ");}
    
    document.write("</br>");
   }

   document.write("</br>");
   m.generate_nodes();
   m.A_starSearch3();
   
   for (var row=0; row < m.nodes.length; row++) {
    for (var column=0; column < m.nodes[row].length; column++){
    document.write(m.nodes[row][column].text," ");}
    
    document.write("</br>");
   }

*/


//---------------------------------------------------------------------------
//------------------------------Maze section---------------------------------
//---------------------------------------------------------------------------

function MMaze()
{
 this.r_a = 0;
 this.c_a = 0;
 this.r_g = 0;
 this.c_g = 0;
 this.grid;
 this.nodes = [];
 this.performance1 = 0;
 this.selectMaze = selectMaze;
 this.agent_place = agent_place;
 this.goal_place = goal_place;
 this.generate_nodes = generate_nodes;
 this.A_starSearch = A_starSearch;
 this.distance = distance;
 this.A_starSearch2 = A_starSearch2;
 this.A_starSearch3 = A_starSearch3;
 this.DFS = DFS;
 this.valid = valid;
 this.distance2 = distance2;
 this.getPathToRoot = getPathToRoot;
 this.jump = jump;
}


//---------------------------------------------------------------------------
//--------------------------------node section-------------------------------
//---------------------------------------------------------------------------

function node()
{
 this.text = " ";
 this.visited = false;
 this.block = false;
 this.goal = false;
 this.r = 0;
 this.c = 0;
 this.parent = null;
 this.huristic = null;
 this.g = 0;
 this.cost = 0;
 this.show = show;

}

//---------------------------------------------------------------------------
//--------------------------node functions section---------------------------
//---------------------------------------------------------------------------

function show(r1, c1, color)
{


 fill(color);
 noStroke();
 var x = r1 * 50;
 var y = c1 * 50;
 rect(y, x, 50, 50);


}

//---------------------------------------------------------------------------
//--------------------------maze functions section---------------------------
//---------------------------------------------------------------------------

function selectMaze()
{

 var x = Math.floor((Math.random() * ((4 - 1) + 1) + 1));
 switch (x)
 {

 case 1:
 {
 this.grid = [
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
 ['0', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '0'],
 ['0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0'],
 ['0', '1', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0'],
 ['0', '1', '0', '1', '0', '0', '1', '1', '0', '0', '0', '1', '0', '1', '0'],
 ['0', '1', '1', '1', '0', '1', '1', '1', '1', '1', '0', '1', '1', '1', '0'],
 ['0', '1', '0', '1', '0', '0', '0', '1', '1', '0', '0', '1', '0', '1', '0'],
 ['0', '1', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0'],
 ['0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0'],
 ['0', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '0'],
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
 ];
 break;
 }
 case 2:
 {
 this.grid = [
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
 ['0', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '0'],
 ['0', '1', '0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0', '1', '0'],
 ['0', '1', '1', '1', '1', '0', '1', '1', '1', '0', '1', '1', '1', '1', '0'],
 ['0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '0', '1', '0'],
 ['0', '1', '1', '1', '1', '0', '1', '1', '1', '0', '1', '1', '1', '1', '0'],
 ['0', '1', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '0'],
 ['0', '1', '1', '1', '1', '0', '1', '1', '1', '0', '1', '1', '1', '1', '0'],
 ['0', '1', '0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0', '1', '0'],
 ['0', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '0'],
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
 ];
 break;
 }
 case 3:
 {
 this.grid = [
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
 ['0', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '1', '0'],
 ['0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '0', '1', '0'],
 ['0', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '0', '1', '0'],
 ['0', '1', '0', '0', '0', '0', '0', '0', '0', '1', '0', '1', '0', '1', '0'],
 ['0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '0', '1', '0', '1', '0'],
 ['0', '1', '0', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '1', '0'],
 ['0', '1', '0', '1', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '0'],
 ['0', '1', '0', '1', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1', '0'],
 ['0', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '1', '1', '0'],
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
 ];
 break;
 }
 case 4:
 this.grid = [
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
 ['0', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '0', '1', '1', '0'],
 ['0', '1', '0', '0', '1', '0', '1', '0', '0', '0', '1', '0', '0', '1', '0'],
 ['0', '1', '0', '1', '1', '0', '1', '1', '1', '0', '1', '1', '0', '1', '0'],
 ['0', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0', '1', '0', '1', '0'],
 ['0', '1', '1', '1', '0', '1', '1', '1', '1', '1', '0', '1', '1', '1', '0'],
 ['0', '1', '0', '1', '0', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0'],
 ['0', '1', '0', '1', '1', '0', '1', '1', '1', '0', '1', '1', '0', '1', '0'],
 ['0', '1', '0', '0', '1', '0', '0', '1', '1', '0', '1', '0', '0', '1', '0'],
 ['0', '1', '1', '0', '1', '1', '1', '1', '1', '0', '1', '1', '1', '1', '0'],
 ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
 ];
 break;
 }

}

// --------------------
function agent_place()
{



 var x = Math.floor((Math.random() * ((4 - 1) + 1) + 1));

 switch (x)
 {

 case 1:
 this.grid[1][1] = '$';
 this.r_a = 1;
 this.c_a = 1;
 break;
 case 2:
 this.grid[9][1] = '$';
 this.r_a = 9;
 this.c_a = 1;
 break;
 case 3:
 this.grid[1][13] = '$';
 this.r_a = 1;
 this.c_a = 13;
 break;
 case 4:
 this.grid[9][13] = '$';
 this.r_a = 9;
 this.c_a = 13;
 break;

 }

}


function goal_place()
{



 do {
 var x = Math.floor((Math.random() * ((9 - 1) + 1) + 1));
 var y = Math.floor((Math.random() * ((13 - 1) + 1) + 1));

 if (this.grid[x][y] == '1')
 {
 this.grid[x][y] = '2';
 this.r_g = x;
 this.c_g = y;
 break;
 }

 } while (true);

}

// --------------------
function generate_nodes()
{

 for (var i = 0; i < this.grid.length; i++)
 {
 this.nodes[i] = [];
 for (var j = 0; j < this.grid[0].length; j++)
 {
 if (this.grid[i][j] == '1')
 {
 this.nodes[i][j] = new node();

 this.nodes[i][j].text = "1";
 this.nodes[i][j].visited = false;
 this.nodes[i][j].block = false;
 this.nodes[i][j].goal = false;
 this.nodes[i][j].r = i;
 this.nodes[i][j].c = j;
 this.nodes[i][j].parent = null;
 this.nodes[i][j].huristic = 0;
 this.nodes[i][j].g = 0;
 this.nodes[i][j].cost = 0;


 }
 else if (this.grid[i][j] == '0')
 {
 this.nodes[i][j] = new node();

 this.nodes[i][j].text = "0";
 this.nodes[i][j].visited = false;
 this.nodes[i][j].block = true;
 this.nodes[i][j].goal = false;
 this.nodes[i][j].r = i;
 this.nodes[i][j].c = j;
 this.nodes[i][j].parent = null;
 this.nodes[i][j].huristic = 0;
 this.nodes[i][j].g = 0;
 this.nodes[i][j].cost = 0;


 }
 else if (this.grid[i][j] == '2')
 {
 this.nodes[i][j] = new node();

 this.nodes[i][j].text = "2";
 this.nodes[i][j].visited = false;
 this.nodes[i][j].block = false;
 this.nodes[i][j].goal = true;
 this.nodes[i][j].r = i;
 this.nodes[i][j].c = j;
 this.nodes[i][j].parent = null;
 this.nodes[i][j].huristic = 0;
 this.nodes[i][j].g = 0;
 this.nodes[i][j].cost = 0;


 }
 else
 {
 this.nodes[i][j] = new node();
 this.nodes[i][j].text = "$";
 this.nodes[i][j].visited = false;
 this.nodes[i][j].block = false;
 this.nodes[i][j].goal = false;
 this.nodes[i][j].r = i;
 this.nodes[i][j].c = j;
 this.nodes[i][j].parent = null;
 this.nodes[i][j].huristic = 0;
 this.nodes[i][j].g = 0;
 this.nodes[i][j].cost = 0;


 }
 }
 }
}

// --------------------
function DFS(row, column)
{

 var done = false;


 if (this.valid(row, column))
 {

if (this.nodes[row][column].goal == true){
done = true;
//document.write("The goal reached by DFS [",row," ",column,"] </br>");
//document.write("The number of expand nodes in DFS = ",this.performance1,"</br>");
}


 else
 {
 //if (this.nodes[row][column].goal == false){
 this.nodes[row][column].text = "3"; // cell has been tried
 this.performance1++;
 done = this.DFS(row + 1, column); // down
 if (!done)
 done = this.DFS(row, column + 1); // right
 if (!done)
 done = this.DFS(row - 1, column); // up
 if (!done)
 done = this.DFS(row, column - 1); // left
 }
 //if ( this.nodes[row][column].text != "2" && this.nodes[row][column].text != "$") 
 //if (this.nodes[row][column].goal == false)
 this.nodes[row][column].text = "*";
 
 }

 return done;

}

// -------------------- 
function valid(row, column)
{

 var result = false;

 if (row >= 0 && row < 11 && column >= 0 && column < 19)
 if (this.nodes[row][column].text == "1" ||
 this.nodes[row][column].text == "$" ||
 this.nodes[row][column].text == "2")
 result = true;

 return result;

}

// -------------------- 
function A_starSearch()
{

 //initialize pq with the first node 
 var performance =0;
 var open_list = new PQueue();
 this.nodes[this.r_a][this.c_a].cost = 0;
 this.nodes[this.r_a][this.c_a].huristic = this.distance(this.r_a, this.c_a, this.r_g, this.c_g);
 this.nodes[this.r_a][this.c_a].g = this.nodes[this.r_a][this.c_a].cost + this.nodes[this.r_a][this.c_a].huristic;
 open_list.insert(this.nodes[this.r_a][this.c_a], this.nodes[this.r_a][this.c_a].g);

 
 while (!open_list.isEmpty())
 {
 //remove the node with the least (h + cost) value 
 var node = open_list.deleteMin();
 //this.nodes[node.r][node.c].text = "3";
 performance++;
 // if the node is goal return the solution 
 if (node.goal == true)
 {
 //document.write("The goal reached by A* search with Euclidean distance method [",node.r," ",node.c,"]  reached by distance :  ",node.g,"</br>");
 //document.write("The number of expand nodes in  A* search with Euclidean distance  = ",performance,"</br>");
 return;
 }
 
 // mark the node visited
 node.visited = true;

 // expand the four adjacent nodes to the current node 
 var offsets = [1, 0, 0, -1, -1, 0, 0, 1];

 for (var i = 0; i < offsets.length; i += 2)
 {
 //right - up - left - down 
 var tr = node.r + offsets[i];
 var tc = node.c + offsets[i + 1];

 // if the successor node is not block and not visited add it to the pq 
 if (tr >= 0 && tr < 11 && tc >= 0 && tc < 15 && this.nodes[tr][tc].block == false && this.nodes[tr][tc].visited == false)
 {
 var cost = node.cost + this.distance(node.r, node.c, tr, tc);
 this.nodes[tr][tc].cost = cost;
 this.nodes[tr][tc].visit = true;
 this.nodes[tr][tc].huristic = this.distance(tr, tc, this.r_g, this.c_g);
 this.nodes[tr][tc].g = this.nodes[tr][tc].cost + this.nodes[tr][tc].huristic;
 this.nodes[tr][tc].parent = {
 r: node.r,
 c: node.c
 };

 
 open_list.insert(this.nodes[tr][tc], this.nodes[tr][tc].g);
 open_list.decrease(this.nodes[tr][tc], this.nodes[tr][tc].g);
 }




 }



 }
}

function A_starSearch3()
{

 //initialize pq with the first node 
 var performance =0;
 var open_list = new PQueue();
 this.nodes[this.r_a][this.c_a].cost = 0;
 this.nodes[this.r_a][this.c_a].huristic = this.distance2(this.r_a, this.c_a, this.r_g, this.c_g);
 this.nodes[this.r_a][this.c_a].g = this.nodes[this.r_a][this.c_a].cost + this.nodes[this.r_a][this.c_a].huristic;
 open_list.insert(this.nodes[this.r_a][this.c_a], this.nodes[this.r_a][this.c_a].g);

 
 while (!open_list.isEmpty())
 {
 //remove the node with the least (h + cost) value 
 var node = open_list.deleteMin();
 //this.nodes[node.r][node.c].text = "3";
 performance++;
 // if the node is goal return the solution 
 if (node.goal == true)
 {
 //document.write("The goal reached by A* search with Chebyshev distance [",node.r," ",node.c,"]  reached by distance :  ",node.g,"</br>");
 //document.write("The number of expand nodes in  A* search with Chebyshev distance = ",performance,"</br>");
 return;
 }
 
 // mark the node visited
 node.visited = true;

 // expand the four adjacent nodes to the current node 
 var offsets = [1, 0, 0, -1, -1, 0, 0, 1];

 for (var i = 0; i < offsets.length; i += 2)
 {
 //right - up - left - down 
 var tr = node.r + offsets[i];
 var tc = node.c + offsets[i + 1];

 // if the successor node is not block and not visited add it to the pq 
 if (tr >= 0 && tr < 11 && tc >= 0 && tc < 15 && this.nodes[tr][tc].block == false && this.nodes[tr][tc].visited == false)
 {
 var cost = node.cost + this.distance2(node.r, node.c, tr, tc);
 this.nodes[tr][tc].cost = cost;
 this.nodes[tr][tc].visit = true;
 this.nodes[tr][tc].huristic = this.distance2(tr, tc, this.r_g, this.c_g);
 this.nodes[tr][tc].g = this.nodes[tr][tc].cost + this.nodes[tr][tc].huristic;
 this.nodes[tr][tc].parent = {
 r: node.r,
 c: node.c
 };

 
 open_list.insert(this.nodes[tr][tc], this.nodes[tr][tc].g);
 open_list.decrease(this.nodes[tr][tc], this.nodes[tr][tc].g);
 }




 }



 }
}





// Euclidean distance
function distance(r1, c1, r2, c2)
{
 return Math.floor(Math.sqrt(((r1 - r2) * (r1 - r2)) + ((c1 - c2) * (c1 - c2))));
}

function A_starSearch2()
{

var performance = 0; 
 //initialize pq with the first node 
 var open_list = new PQueue();
 this.nodes[this.r_a][this.c_a].cost = 0;
 this.nodes[this.r_a][this.c_a].huristic = this.distance2(this.r_a, this.c_a, this.r_g, this.c_g);
 this.nodes[this.r_a][this.c_a].g = this.nodes[this.r_a][this.c_a].cost + this.nodes[this.r_a][this.c_a].huristic;
 open_list.insert(this.nodes[this.r_a][this.c_a], this.nodes[this.r_a][this.c_a].g);

 while (!open_list.isEmpty())
 {
 //remove the node with the least (h + cost) value 
 var node = open_list.deleteMin();
 //this.nodes[node.r][node.c].text = "3";
 performance++;
 // if the node is goal return the solution 
 if (node.goal == true)
 {
 //document.write("The goal reached by A* search with new hueristic method [",node.r," ",node.c,"]  reached by distance :  ",node.g,"</br>");
 //document.write("The number of expand nodes in  A* search with new hueristic method = ",performance,"</br>");
 return;
 }
 
 // mark the node visited
 node.visited = true;

 // expand the four adjacent nodes to the current node 
 var offsets = [1, 0, 0, -1, -1, 0, 0, 1];

 for (var i = 0; i < offsets.length; i += 2)
 {
 //right - up - left - down 
 var tr = node.r + offsets[i];
 var tc = node.c + offsets[i + 1];

 /* Inspecting thw whole direction not just adjcent node
 if met the node and was it can be turn left or right
 */
 var x = this.jump(this.nodes[tr][tc], i);
 if (x.goal == true)
 {
 //document.write("The goal reached by A* search with new hueristic method [",x.s," ",x.e,"] reached by distance : ",this.nodes[x.s][x.e].g,"</br>");
 //document.write("The number of expand nodes in  A* search with new hueristic method = ",performance,"</br>");
 return;
 }
 else if (x.goal == false)
 {
 tr = x.s;
 tc = x.e;
 }

 // if the successor node is not block and not visited add it to the pq
 if (tr >= 0 && tr < 11 && tc >= 0 && tc < 15 && this.nodes[tr][tc].block == false && this.nodes[tr][tc].visited == false)
 {
 var cost = node.cost + this.distance2(node.r, node.c, tr, tc);
 this.nodes[tr][tc].cost = cost;
 this.nodes[tr][tc].huristic = this.distance2(tr, tc, this.r_g, this.c_g);
 this.nodes[tr][tc].g = this.nodes[tr][tc].cost + this.nodes[tr][tc].huristic;
 this.nodes[tr][tc].parent = {
 r: node.r,
 c: node.c
 };

 
 open_list.insert(this.nodes[tr][tc], this.nodes[tr][tc].g);
 open_list.decrease(this.nodes[tr][tc], this.nodes[tr][tc].g);


 }

 }
 }
}

//Chebyshev distance
function distance2(r1, c1, r2, c2)
{
 var x = Math.abs(r2 - r1);
 var y = Math.abs(c2 - c1);

 if (x > y)
 return x;
 else return y;

}

// --------------------
function getPathToRoot(r, c)
{

 var g = [];
 var current = this.nodes[r][c];
 while (current)
 {
 g.push(current);
 current = current.parent ? this.nodes[current.parent.r][current.parent.c] : null;
 }

 for (var i = g.length - 2; i >= 1; i--)
 {
 this.nodes[g[i].r][g[i].c].text = "8";

 }

}

// --------------------
function jump(node, i)
{
 if (i == 0)
 {

 var x = node.r;
 while (x >= 0 && x < 11 && node.r >= 0 && node.r < 15 && this.nodes[x][node.c].block == false)
 {
 // document.write(" Reem ","</br>");
 if (x >= 0 && x < 11 && node.r >= 0 && node.r < 15 && this.nodes[x][node.c].goal == true)
 return {
 goal: true,
 s: x,
 e: node.c
 };
 x++;

 }
 if (x - 1 >= 0 && x - 1 < 11 && node.c + 1 >= 0 && node.c + 1 < 15 && this.nodes[x - 1][node.c + 1].block == false)
 {
 //document.write(" Reem ","</br>");
 return {
 goal: false,
 s: x - 1,
 e: node.c + 1
 };
 }
 else if (x - 1 >= 0 && x - 1 < 11 && node.c - 1 >= 0 && node.c - 1 < 15 && this.nodes[x - 1][node.c - 1].block == false)
 {
 return {
 goal: false,
 s: x - 1,
 e: node.c - 1
 };
 }
 else return false;
 }
 else if (i == 2)
 {
 var x = node.c;
 while (node.r >= 0 && node.r < 11 && x >= 0 && x < 15 && this.nodes[node.r][x].block == false)
 {
 if (node.r >= 0 && node.r < 11 && x >= 0 && x < 15 && this.nodes[node.r][x].goal == true)
 return {
 goal: true,
 s: node.r,
 e: x
 };
 x--;

 }
 if (node.r + 1 >= 0 && node.r + 1 < 11 && x + 1 >= 0 && x + 1 < 15 && this.nodes[node.r + 1][x + 1].block == false)
 {
 return {
 goal: false,
 s: node.r + 1,
 e: x + 1
 };
 }
 else if (node.r - 1 >= 0 && node.r - 1 < 11 && x + 1 >= 0 && x + 1 < 15 && this.nodes[node.r - 1][x + 1].block == false)
 {
 return {
 goal: false,
 s: node.r - 1,
 e: x + 1
 };
 }
 else return false;
 }
 else if (i == 4)
 {
 var x = node.r;
 while (x >= 0 && x < 11 && node.r >= 0 && node.r < 15 && this.nodes[x][node.c].block == false)
 {
 if (x >= 0 && x < 11 && node.r >= 0 && node.r < 15 && this.nodes[x][node.c].goal == true)
 return {
 goal: true,
 s: x,
 e: node.c
 };
 x--;

 }
 if (x + 1 >= 0 && x + 1 < 11 && node.c + 1 >= 0 && node.c + 1 < 15 && this.nodes[x + 1][node.c + 1].block == false)
 {
 return {
 goal: false,
 s: x + 1,
 e: node.c + 1
 };
 }
 else if (x + 1 >= 0 && x + 1 < 11 && node.c - 1 >= 0 && node.c - 1 < 15 && this.nodes[x + 1][node.c - 1].block == false)
 {
 return {
 goal: false,
 s: x + 1,
 e: node.c - 1
 };
 }
 else return false;
 }
 else if (i == 6)
 {
 var x = node.c;
 while (node.r >= 0 && node.r < 11 && x >= 0 && x < 15 && this.nodes[node.r][x].block == false)
 {
 if (node.r >= 0 && node.r < 11 && x >= 0 && x < 15 && this.nodes[node.r][x].goal == true)
 return {
 goal: true,
 s: node.r,
 e: x
 };
 x++;

 }
 if (node.r + 1 >= 0 && node.r + 1 < 11 && x - 11 >= 0 && x - 1 < 15 && this.nodes[node.r + 1][x - 1].block == false)
 {
 return {
 goal: false,
 s: node.r + 1,
 e: x - 1
 };
 }
 else if (node.r - 1 >= 0 && node.r - 1 < 11 && x - 1 >= 0 && x - 1 < 15 && this.nodes[node.r - 1][x - 1].block == false)
 {
 return {
 goal: false,
 s: node.r - 1,
 e: x - 1
 };
 }
 else return false;
 }
}

//---------------------------------------------------------------------------
//--------------------------Priority Queue section---------------------------
//---------------------------------------------------------------------------

function PQueue()
{

 this.pq = new List();

 this.isEmpty = pqEmpty;

 this.deleteMin = deleteMin;

 this.insert = pqinsert;

 this.decrease = decrease;

 this.search = search;




}

// --------------------
function PQNode(item, key)
{

 this.item = item;


 this.prior = key;

}

// --------------------
function pqEmpty()
{

 return this.pq.isEmpty();
}

// --------------------
function deleteMin()
{
 if (!this.isEmpty())
 {
 var l = this.pq.first;
 var minItem = l.item;

 while (l != null)
 {
 if (l.item.prior <= minItem.prior)
 {
 minItem = l.item;
 }
 l = l.next;
 }

 l = this.pq.first;
 var prev = l;
 while (l != null)
 {
 if (l.item.item === minItem.item)
 {
 if (l === prev)
 {
 prev = l = l.next;
 this.pq.deleteFirst();
 }
 else
 {
 prev.next = l.next;
 l = prev.next;
 }
 }
 else
 {
 prev = l;
 l = l.next;
 }

 }

 return minItem.item;
 }
}

// --------------------
function pqinsert(item, key)
{

 if (this.isEmpty())
 {
 this.pq.insert(new PQNode(item, key));
 }

 else
 {
 var temp = this.pq.first;
 this.pq.first = new LNode(new PQNode(item, key));
 this.pq.first.next = temp;
 }
}

// --------------------
function decrease(item, key)
{

 if (!this.isEmpty())
 {
 var l = this.pq.first;
 while (l != null)
 {
 if (l.item.item === item)
 {
 if (l.item.prior > key)
 {
 l.item.prior = key;
 break;
 }
 }
 l = l.next;
 }
 }
}

// --------------------
function search(item)
{
 if (!this.isEmpty())
 {
 var l = this.pq.first;
 while (l != null)
 {
 if (l.item.item === item)
 {
 return true;
 }
 else return false;
 }
 }

}

//---------------------------------------------------------------------------
//-----------------------------Link list section-----------------------------
//---------------------------------------------------------------------------

function LNode(item)
{
 this.item = item;
 this.next = null;
}

// --------------------
function List()
{
 this.first = null;
 this.insert = insert;
 this.traverse = traverse;
 this.isEmpty = lEmpty;
 this.deleteFirst = deleteFirst;

}

// --------------------
function lEmpty()
{
 return (this.first == null);
}

// --------------------
function insert(item)
{
 if (this.isEmpty())
 this.first = new LNode(item);
 else
 {
 var l = this.first;
 while (l.next != null)
 l = l.next;
 l.next = new LNode(item);
 }
}

// --------------------
function traverse()
{
 var out = [];

 for (var i = 0, l = this.first; l != null; l = l.next)
 out[i++] = l.item;
 return out;
}


function deleteFirst()
{
 var item = this.first.item;
 this.first = this.first.next;
 return item;
}