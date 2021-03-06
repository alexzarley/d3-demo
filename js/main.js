//execute script when window is loaded
window.onload = function(){
    //adds dimensions of container as variables
    var w = 950, h = 500;
    //selects the body HTML element and sets as variable container
    var container = d3.select("body")
        //some comments
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "container");
    //creates inner rectangle and adds to container
    var innerRect = container.append("rect")
        .datum(410)//sets numerical value as datum to be used to set other dimensions
        //sets width to twice datum value
        .attr("width", function(d){
            return d * 2;
        })
        //sets height to datum value
        .attr("height", function(d){
            return d;
        })
        .attr("class", "innerRect")//adds class to innerRect code block
        .attr("x", 65)//x offset in pixels from left
        .attr("y", 40)//y offset in pixels from top
        .style("fill", "white")

    //defines array containing an object for each city with properties for the city's name and population
    cityPop = [
        {
            city: 'Eugene',
            population: 159190
        },
        {
            city: 'Portland',
            population: 609456
        },
        {
            city: 'Salem',
            population: 160614
        },
        {
            city: 'Gresham',
            population: 109397
        }
    ];

    //find min value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find max value of array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });
    //scales Y values
    var y = d3.scale.linear()
        .range([450, 40])//range of pixels on screen to be taken up by variable
        .domain([0, 700000]);//data values to be represented in variable

    var x = d3.scale.linear()
        //output min/max
        .range([100, 750])//range of pixels on screen to be taken up by variable
        //input min/max
        .domain([0,3])//data values to be represented in variable

    //color scale generator
    var color = d3.scale.linear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ])
    //y axis generator
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    //create axis group element and add axis to it
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(65, 0)")//determines where axis goes based on x,y values
        .call(yAxis);

    //create title
    var title = container.append("text")
        //adds a class and determines position of title
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 475)
        .attr("y", 30)
        .text("Populations of Oregon Cities")

    //create circle labels
    var labels = container.selectAll(".labels")
        .data(cityPop)//access cityPop array
        .enter()
        .append("text")
        .attr("class", "labels")//adds class of labels
        .attr("text-anchor", "left")//defines position of text anchor
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population);
        });

    //create first line of labels
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d, i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });

    //create format generator to be used with popLine
    var format = d3.format(",");

    //create second line of labels
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d, i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15")//set spacing between label lines
        .text(function(d){
            return "Pop. " + format(d.population);
        });

    var circles = container.selectAll(".circles")
        .data(cityPop)//access cityPop data
        .enter()
        .append("circle")
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function (d){
            //calculate radius based on population value
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            //use popuplation to determine y placement of circles
            return y(d.population);
        })
        .style("fill", function(d, i){
            //add fill based on color scale generator
            return color(d.population);
        })
        .style("stroke", "#000");
}
