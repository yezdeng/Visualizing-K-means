// 1. Initialize the Dataset and the Ks
//     Add dots
//     Add Ks (on click)
// 2. Create Groups
//     Based on the distance to the K, assign a group to each dot
//     Assign a color to each group
// 3. Update Groups: Iteration
//     Update group center by calculation --> Move the centers to new positions (on click)
//     Based on the distance to the new center, assign the dots to new Groups --> change dots colors (on click)

//     Input K & N

// Button:
d3.select("#reset")
.on('click', function() { init(); drawCenters(); });

d3.select("#reset2")
.on('click', function() { initOutlier(); drawOutlierCenters(); });

var color = ['#3F999B', '#F6964B', '#D33044','#4A90E2','blue', 'green', 'red','yellow'];
// 0. Initialize the background
var svg = d3.select("#kmeans svg")
.attr('width', 500)
.attr('height', 300)
.style('cursor', 'pointer')
var dotg = svg.append('g');
var centerg = svg.append('g');

function generateDots() {
// Initialize dots
var N = parseInt(d3.select('#N')[0][0].value, 10);
var K = parseInt(d3.select('#K')[0][0].value, 10);
    dots = [];
    for (i = 0; i < N; i++) {
            var dot = {
                x: Math.random() * 480 + 10,
                y: Math.random() * 280 + 10,
                group: undefined
            };
            dot.init = {
                x: dot.x,
                y: dot.y,
                group: dot.group
            };
            dots.push(dot);
        }   
}




// 0. Initialize the background
var svg2 = d3.select("#outlier svg")
.attr('width', 500)
.attr('height', 300)
.style('cursor', 'pointer')

var dotg2 = svg2.append('g');
var centerg2 = svg2.append('g');


function generateDots2() {
// Initialize dots
var K2 = parseInt(d3.select('#K2')[0][0].value, 10);
    dots2 = [];
    for (i = 0; i < 30; i++) {
            var dot = {
                x: Math.random() * 480 + 10,
                y: Math.random() * 280 + 10,
                group: undefined
            };
            dot.init = {
                x: dot.x,
                y: dot.y,
                group: dot.group
            };
            dots2.push(dot);
        }   
}


// 1. Initialize the Dataset and the Ks

//     Add Ks (on click)
function init(){
var N = parseInt(d3.select('#N')[0][0].value, 10);
var K = parseInt(d3.select('#K')[0][0].value, 10);
var K2 = parseInt(d3.select('#K2')[0][0].value, 10);
generateDots();
generateDots2();
drawDots();
drawDots2();
update();
update2();

}

function update(){
var N = parseInt(d3.select('#N')[0][0].value, 10);
var K = parseInt(d3.select('#K')[0][0].value, 10);
var K2 = parseInt(d3.select('#K2')[0][0].value, 10);
// Add Ks
        var j = 0;
        groups = [];
        // on click: Add a K as user input
        d3.select("#kmeans svg").on("click", function() {
            if (j < K ) {
                coords = d3.mouse(this);
                // store the K coordinates into groups[]
                   var g = {
                    dots: [],
                    color: color[j],
                    center: {
                        x: coords[0],
                        y: coords[1]
                     },
                    init: {
                        center: {}
                    }
                };
                g.init.center = {
                    x: g.center.x,
                    y: g.center.y
                }; 
                groups.push(g);

                drawCenters(); //on click: draw the K(center) as user clicked
                j++;
            } 

           else if (K % 2 == 1) {
                if (j % 2 == 1) {
                      updateGroups();
                      drawDots();
                      j++; 

              //   if (old.forEach(function(g) { g.dots = []; })) {
              //       finishGrouping = true;
              //       alert("Finished!");
              // }                   
                }
                else {
                      updateCenters();
                      drawCenters();
                      j++;                    
                }                

            }
            else if (K % 2 == 0) {
                if (j % 2 == 0) {
                      // old = groups.dots;
                      updateGroups();
                      drawDots();
                      j++;  
                  
                }
                else {

                      updateCenters();
                      drawCenters();
                      j++;                    
                }                                

            }

 
        });
}



function update2(){
var N = parseInt(d3.select('#N')[0][0].value, 10);
var K = parseInt(d3.select('#K')[0][0].value, 10);
var K2 = parseInt(d3.select('#K2')[0][0].value, 10);
// Add Ks
        var j = 0;
        groups2 = [];
        // on click: Add a K as user input
        d3.select("#outlier svg").on("click", function() {
            if (j < K2 ) {
                coords = d3.mouse(this);
                // store the K coordinates into groups[]
                   var g = {
                    dots2: [],
                    color: color[j],
                    center: {
                        x: coords[0],
                        y: coords[1]
                     },
                    init: {
                        center: {}
                    }
                };
                g.init.center = {
                    x: g.center.x,
                    y: g.center.y
                }; 
                groups2.push(g);

                drawCenters(); //on click: draw the K(center) as user clicked
                j++;
            } 

           else if (K2 % 2 == 1) {
                if (j % 2 == 1) {
                      updateGroups();
                      drawDots();
                      j++; 

              //   if (old.forEach(function(g) { g.dots = []; })) {
              //       finishGrouping = true;
              //       alert("Finished!");
              // }                   
                }
                else {
                      updateCenters();
                      drawCenters();
                      j++;                    
                }                

            }
            else if (K2 % 2 == 0) {
                if (j % 2 == 0) {
                      // old = groups.dots;
                      updateGroups();
                      drawDots();
                      j++;  
                  
                }
                else {
                      updateCenters();
                      drawCenters();
                      j++;                    
                }                                

            }

 
        });
}




function updateGroups(){
        // Update groups: udpate dot.group
        groups.forEach(function(g) { g.dots = []; });
        dots.forEach(function(dot) {
        // find the nearest group
        var min = Infinity;
        var group;
        groups.forEach(function(g) {
            var d = Math.pow(g.center.x - dot.x, 2) + Math.pow(g.center.y - dot.y, 2);
            if (d < min) {
                min = d;
                group = g;
            }
        });
        // update group
        group.dots.push(dot);
        dot.group = group;
    });    

}



function updateCenters(){
        // Update center: update the number in groups.center
        groups.forEach(function(group, i) {
            if (group.dots.length == 0) return;
            // get center of gravity
            var x = 0, y = 0;
            group.dots.forEach(function(dot) {
                x += dot.x;
                y += dot.y;
            });

            group.center = {
                x: x / group.dots.length,
                y: y / group.dots.length
            };
        });        
}





// draw dots: based on the data from dots[]

function drawDots() {
    var circles = dotg.selectAll('circle')
        .data(dots);
    circles.enter()
        .append('circle');
    circles.exit().remove();
    circles
        .transition()
        .duration(200)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        //Initialize dot color
        .attr('fill', function(d) { return d.group ? d.group.color : '#BDBDBD'; })
        .attr('r', 8);
}


// draw dots: based on the data from dots[]

function drawDots2() {
    var circles = dotg2.selectAll('circle')
        .data(dots2);
    circles.enter()
        .append('circle');
    circles.exit().remove();
    circles
        .transition()
        .duration(200)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        //Initialize dot color
        .attr('fill', function(d) { return d.group ? d.group.color : '#BDBDBD'; })
        .attr('r', 8);
}




// draw center: transform the center to the new position based on the updated list
// c: groups.center

function drawCenters(){
    var c = centerg.selectAll('path')
        .data(groups);

    var drawCenters = function(centers) {
        centers
            // update the center's position, fill, stroke
            .attr('transform', function(d) { return "translate(" + d.center.x + "," + d.center.y + ") rotate(45)";})
            .attr('fill', function(d,i) { return d.color; })
            .attr('stroke', 'white');

    };
    c.exit().remove();
    drawCenters(
        c.enter()
         .append('path')
         .attr('d', d3.svg.symbol().type('cross'))
         .attr('stroke', 'white'));
    drawCenters(
            c
            .transition()
            .duration(200));

}


init();




















