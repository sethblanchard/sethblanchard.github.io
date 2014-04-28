
			/*
			TODO: 
				1. Clean up when you are done.
			*/


		var teamInfo = {
				"DEN": { "PrimaryColor":	"#FB4F14", "SecondaryColor":	"#002244"},
				"ATL": { "PrimaryColor":	"#BD0D18", "SecondaryColor":	"#000000"},
				"NE": { "PrimaryColor":	"#0D254C", "SecondaryColor":	"#C80815"},
				"SF": { "PrimaryColor":	"#AF1E2C", "SecondaryColor":	"#E6BE8A"},
				"HOU": { "PrimaryColor":	"#02253A", "SecondaryColor":	"#B31B34"},
				"GB": { "PrimaryColor":	"#213D30", "SecondaryColor":	"#FFCC00"},
				"BAL": { "PrimaryColor":	"#280353", "SecondaryColor":	"#000000"},
				"WAS": { "PrimaryColor":	"#773141", "SecondaryColor":	"#FFB612"},
				"IND": { "PrimaryColor":	"#003B7B", "SecondaryColor":	"#FFFFFF"},
				"SEA": { "PrimaryColor":	"#06192E", "SecondaryColor":	"#4EAE47"},
				"CIN": { "PrimaryColor":	"#FB4F14", "SecondaryColor":	"#000000"},
				"MIN": { "PrimaryColor":	"#3B0160", "SecondaryColor":	"#F0BF00"},
				"CHI": { "PrimaryColor":	"#03202F", "SecondaryColor":	"#DD4814"},
				"NYG": { "PrimaryColor":	"#192F6B", "SecondaryColor":	"#CA001A"},
				"PIT": { "PrimaryColor":	"#000000", "SecondaryColor":	"#F2C800"},
				"DAL": { "PrimaryColor":	"#002244", "SecondaryColor":	"#8C8B8A"},
				"MIA": { "PrimaryColor":	"#006666", "SecondaryColor":	"#DF6108"},
				"SD": { "PrimaryColor":	"#5B92E5", "SecondaryColor":	"#EEC607"},
				"NO": { "PrimaryColor":	"#D2B887", "SecondaryColor":	"#000000"},
				"STL": { "PrimaryColor":	"#13264B", "SecondaryColor":	"#C9AF74"},
				"TB": { "PrimaryColor":	"#B20032", "SecondaryColor":	"#89765F"},
				"CAR": { "PrimaryColor":	"#000000", "SecondaryColor":	"#0088CE"},
				"NYJ": { "PrimaryColor":	"#0C371D", "SecondaryColor":	"#FFFFFF"},
				"TEN": { "PrimaryColor":	"#648FCC", "SecondaryColor":	"#000080"},
				"BUF": { "PrimaryColor":	"#00338D", "SecondaryColor":	"#C60C30"},
				"CLE": { "PrimaryColor":	"#E34912", "SecondaryColor":	"#26201E"},
				"ARI": { "PrimaryColor":	"#870619", "SecondaryColor":	"#000000"},
				"OAK": { "PrimaryColor":	"#000000", "SecondaryColor":	"#C4C8CB"},
				"PHI": { "PrimaryColor":	"#003B48", "SecondaryColor":	"#C0C0C0"},
				"DET": { "PrimaryColor":	"#006DB0", "SecondaryColor":	"#C5C7CF"},
				"JAC": { "PrimaryColor":	"#007198", "SecondaryColor":	"#D0B239"},
				"KC": { "PrimaryColor":	"#B20032", "SecondaryColor":	"#F2C800"}
			};


			var xdiffs = [],
				ydiffs =[];
			
			var teamColor = function(teamName){
				return teamInfo[teamName].PrimaryColor;
			}

			var teamSColor = function(teamName){
				return teamInfo[teamName].SecondaryColor;
			}

			//Sort by Wins and then point differential descending
			var sortTeams = function(a,b){
				return (parseFloat(b.W) == parseFloat(a.W)) ? 
					 	parseFloat(b.PtDif) - parseFloat(a.PtDif) :
					 	parseFloat(b.W) - parseFloat(a.W);
			}

			var plotRegression = function(seasonData){
			
				//Tm,shortname,Year,W,L,T,WLPct,Pts,PtsO,PtDif,PW,PWDiff
				allTheDatas = seasonData; // just for debugging
				console.log(seasonData);

				//Generate a hash of arrays for each year
				var yearData = d3.nest().key(function(d){ return +d.Year; }).sortValues(sortTeams).map(allTheDatas, d3.map);

				var width = 155, //should be based on the width of the row (we even overwrite it in the CSS) also do something here for media queries... 
			    	height = 130, //I'm cool with set height
			    	domainWidth = 500, //should be dynamic with sliders - set size of pennats (up and down etc)
			    	domainHieght = 500, //should be dynamic with sliders
			    	margin = 50;

				var x= d3.scale.linear().domain([0,600]).range([margin,domainWidth-margin]); //points scored -- diff
				var y= d3.scale.linear().domain([0,16]).range([height-domainHieght,margin]); //pythagreon diff
				

				//Funciton Calculates the offsets from center to plot the pennenats
				//and values used to locate the hover labels
				//The only thing that changes is the order you pass in the values
				//and the scale function you use
				//This funciton is way less readable at first... maybe not worth the refactor
				//x used to be
				//	var x1 = x(d.ptso),
				// 		x2 = x(d.pts),
				// 		xDiff = x2 - x1,
				// 		xA = xCenter - xDiff/2,
				//		xB = xCenter + xDiff/2;
				var locationPoints = function(scale, center, value1, value2){

					var pos1 = scale(value1),
						pos2 = scale(value2),
						posDiff = pos2 - pos1,
						posA = center - posDiff/2,
						posB = center + posDiff/2;

					return([posA, posB]);
				};

				//convenience functions to encode the change in order of values
				var xPoints = function(d){
					return locationPoints(x, width/2, d.PtsO, d.Pts);
				};
				

				var yPoints = function(d){

					return locationPoints(y, height/2, d.PW, d.W)
					/*
					// var y1 = y(d.w),
					// 	//y2 = y(d.w + mapWinDifference(d.wdiff)); //Show likley regression for next year
					// 	y2 = y(d.pw), //or how many games the team should have one this year.. 
					// 	yDiff = y1 - y2,
					// 	yA = yCenter - yDiff/2,
					// 	yB = yCenter + yDiff/2  
					// 	return [yA,yB];
					*/
				};


				var triangle = function(d){

					var xPts = xPoints(d),
						yPts = yPoints(d);


					var path = "M " + xPts[0] + " " + yPts[0] + " L " + xPts[1] + " " + yPts[0] + " L " + xPts[1] + " " + yPts[1] + " z";

						return path;
				};

				//mapping from the table from Barnwell's article
				var mapWinDifference = function(winDelta){

						if(winDelta < -2){
								return 2.6;
						}else if(winDelta < -1.5){
								return 2.5;

						}else if(winDelta < -1){
								return 2.0;

						}else if(winDelta < -0.5){
								return 0.6;

						}else if(winDelta < 0.5){
								return 0;

						}else if(winDelta < 1){
								return -0.9;

						}else if(winDelta < 1.5){
								return -1.5;

						}else if(winDelta < 2){
								return -1.8;

						}else{
								return -2.5;
						}
				};


		  	 	var svg = d3.select("#Chart").selectAll(".team")
				      .data(yearData.get(2013)) //this could be updated to take let you pick the year
					    .enter().append("svg")
					      .attr("class", "team")
					      .attr("width", width)
					      .attr("height", height)
					    .append("g")


		  		svg.append("path")
				    .attr("d", triangle)
					.style("fill",function(d) {return teamInfo[d.shortname].PrimaryColor;})
				    .style("stroke",function(d) {return teamInfo[d.shortname].SecondaryColor;})
				    .style("stroke-width",function(d) {return 1;})
				    .attr("fill-opactiy", function(d){return 0.5;})
				    .style("opactiy", function(d){return 0.5;})
				    .append("title")
				    .text(function(d) {return d.Tm;});
			    
		    		
			    //Team Labels
			    svg.append("text")
			    		.text(function(d) {return d.shortname + ' ('+ d.W +'-'+d.L+')';})
			    		.style("text-anchor", "middle")
			    		.attr('class','team--label')
			    		.attr('y', 20)
			    		.attr('x', 38);




    			/********************
				*Parallel Coordinates Chart Starts Here
    			*********************/
    			//Move into seperate function.


			}

			

			/********************
			*Parallel Coordinates Chart Starts Here
			*********************/
			var parallelCoordinates = function(seasonData){


				//Tm,shortname,Year,W,L,T,WLPct,Pts,PtsO,PtDif,PW,PWDiff
				allTheDatas = seasonData; // just for debugging
				//console.log(seasonData);



				//Generate a hash of arrays for each year
				var teams = d3.nest()
				.key(function(d) { return d.shortname; })
				.sortValues(function(a,b) { return parseFloat(a.Year) - parseFloat(b.Year); } )
				.map(seasonData, d3.map);




				var baseWidth = 1080,
					baseHeight = 540,
					m = {top:100, right: 50, bottom: 50, left: 50, legend: 2},
					w = baseWidth - m.left - m.right,
					h = baseHeight - m.top - m.bottom,
					axisT = baseHeight - m.top + m.bottom,
					axisH = h ,
					yrs = d3.range([2003,2013],1);


				var x = d3.scale.linear()
							.domain([2003,2013]) //11 seasons...
							.range([0, w]);


				var y = d3.scale.linear()
							.domain([0,16]) //Win totals
							.range([h, 0]);


				var xAxis = d3.svg.axis()
								.scale(x)
								.tickSize(axisH)
								.tickPadding(7)
								.tickFormat(d3.format("f"))
								.orient("top");


				var yAxis = d3.svg.axis()
								.scale(y)
								.tickValues([4,8,12])
								.tickPadding(5)
								.tickSize(5)
								.orient("left");


				var line = d3.svg.line()
								.x(function(d) { return x(d.Year); })
								.y(function(d) { return y(d.W); });

				var pyArea = d3.svg.area()
					          	//.interpolate('cardinal')
					          	.x(function(d,i) { return x(d.Year); })
					          	.y0(function(d) { 
					          		var W = parseFloat(d.W),
					          		PW = parseFloat(d.PW);
					          		return (W >= PW) ? y(PW) : y(W); 
					          	})
					          	.y1(function(d) { 
					          		var W = parseFloat(d.W),
					          		PW = parseFloat(d.PW);
					          		return (W <= PW) ?  y(PW) : y(W); 
					          	});



	          	var svg = d3.select("#parallelCoordinates").append("svg")
					          	.attr("width", baseWidth)
					          	.attr("height", baseHeight);
	          	
					
	          	svg.on("mouseleave", function(){ 
					d3.select(".line--hover").classed("line--hover", false);
	          		d3.select("#parallelCoordinates").classed("hovering", false); 
	          	});

	          	var team = svg.selectAll(".team--line")
					          	.data(teams.values())
					          	.enter().append("g")
					          	.attr("transform", "translate("+m.left +"," + m.top + ")")
					          	.attr("class", "team--line");

				  //Team Lines
			  	var teamLines = team.append("path")
									  .attr("class", "line")
									  //http://bl.ocks.org/mbostock/8033015
									  .attr("d", function(d) { d.line=this; return line(d); })
									  .attr("id", function(d){ return "line-"+d[0].shortname;})
									  .style("stroke", function(d) { return teamColor(d[0].shortname); });



		      	  //Team Pythagorean win Differences.
	      	  	var teamAreas = team.append("path")
							      	  .attr("d", function(d){ return pyArea(d);})
							      	  .attr("class", "team--area")
							      	  .attr("fill", function(d){ return teamColor(d[0].shortname); });

	      	  	var teamLabels = team.append("text")
							      	  .datum(function(d) {
							      	  	return {shortname: d[0].shortname, value: d[d.length - 1]}; })
							      	  .attr("transform", function(d) { return "translate(" + x(d.value.Year) + "," + y(d.value.W) + ")"; })
							      	  .attr("x", 3)
							      	  .attr("dy", ".35em")
							      	  .attr('class', 'team--name')
							      	  .text(function(d) { return d.shortname; });

	      	  	//Axis
	      	  	svg.append("g")
		      	  		.attr("class", "x axis")
			      	  	.attr("transform", "translate("+m.left +"," + axisT + ")")
			      	  	.call(xAxis);

	      	  	svg.append("g")
		      	  		.attr("class", "y axis")
		      	  		.attr("transform", "translate("+m.left +"," + m.top + ")")
			      	  	.call(yAxis)
		      	  	.append("text")
		      	  		.attr("transform", "rotate(-90)")
		      	  		.attr("x", -h+m.top-m.bottom)
		      	  		.attr("y", 6)
		      	  		.attr("dy", "-.71em")
		      	  		.style("text-anchor", "end")
		      	  		.text("Wins");

				//legend
				m.legendLeft = w - m.right,
				m.legendTop = 20;
				var lWidth = 60,
					lHeight = 30,
					textoffset = 5,
					x1 = m.legendLeft, 
					x2 = m.legendLeft + lWidth,
					y1 = m.legendTop ,
					y2 = m.legendTop  + lHeight,
					lineAdj = 2;

				//Main Rext
				var legend = svg.append("g")
									.attr("class", "legendWrap");
				legend.append("rect")
						.attr("width", lWidth)
						.attr("height", lHeight)
						.attr("transform", "translate("+ m.legendLeft + ","+ m.legendTop+ ")")
						.attr("class", "legend--rect");

				//Diagonal Line
				legend.append("line")
						.attr("x1", x1+lineAdj)
						.attr("y1", y1+lineAdj)
						.attr("x2", x2-lineAdj)
						.attr("y2", y2-lineAdj)
						.attr("class", "legend--line")
						.style("stroke-linecap", "round");


				//Legend Labels
				legend.append("text")
						.text("- Expected Wins")
						.attr("x", x1 - textoffset)
						.attr("y", y2)
						.style("text-anchor", "end");

				legend.append("text")
						.text("Wins")
						.attr("x", x1 - textoffset)
						.attr("y", y1)
						.style("text-anchor", "end");

					legend.append("text")
						.text("Wins")
						.attr("x", x2 + textoffset)
						.attr("y", y2);
					legend.append("text")
						.text("+ Expected Wins")
						.attr("x", x2 + textoffset)
						.attr("y", y1);

		      	  //Getting the right hover line
		      	  //http://bl.ocks.org/mbostock/8027637
		      	  svg.append("rect")
		      	  .attr("width", w)
		      	  .attr("height", h)
		      	  .attr("transform", "translate("+m.left +"," + m.top + ")")
		      	  .attr("class", "mouse--over")
		      	  .on("mousemove", mousemoved);


		      	  function mousemoved() {
		      	  	var m = d3.mouse(this),
		      	  		shortestDist = Infinity,
		      	  		sp = [],
		      	  		selectedIndex = 0;
		      	  	for(var i = 0; i < teamLines[0].length; i++){
			      	  	var p = closestPoint(teamLines[0][i], m);
			      	  	if(p.distance < shortestDist){
			      	  		shortestDist =  p.distance;
			      	  		selectedIndex = i;
			      	  		sp = p;
			      	  	}
			      	  }

		      	  	d3.select("#parallelCoordinates").classed("hovering", true);;
					d3.select(".line--hover").classed("line--hover", false);
	      	  		d3.select(teamLines[0][selectedIndex]).classed("line--hover", true);
		      	  }

		      	  function closestPoint(pathNode, point) {
		      	  	var pathLength = pathNode.getTotalLength(),
		      	  	precision = pathLength / pathNode.pathSegList.numberOfItems * .125,
		      	  	best,
		      	  	bestLength,
		      	  	bestDistance = Infinity;

					  // linear scan for coarse approximation
					  for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
					  	if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
					  		best = scan, bestLength = scanLength, bestDistance = scanDistance;
					  	}
					  }

					  // binary search for precise estimate
					  precision *= .5;
					  while (precision > .5) {
					  	var before,
					  	after,
					  	beforeLength,
					  	afterLength,
					  	beforeDistance,
					  	afterDistance;
					  	if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
					  		best = before, bestLength = beforeLength, bestDistance = beforeDistance;
					  	} else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
					  		best = after, bestLength = afterLength, bestDistance = afterDistance;
					  	} else {
					  		precision *= .5;
					  	}
					  }

					  best = [best.x, best.y];
					  best.distance = Math.sqrt(bestDistance);
					  return best;

					  function distance2(p) {
					  	var dx = p.x - point[0],
					  	dy = p.y - point[1];
					  	return dx * dx + dy * dy;
					  }
					}

			}


			d3.csv('/data/NFL-PTSDiff-10yrs.csv', function(d){
				plotRegression(d);
				parallelCoordinates(d);
			} );