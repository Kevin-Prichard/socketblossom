// producer: OpenJSCAD Compatibility (1.0.1) STL Binary Importer
// date: Mon Oct 02 2017 21:14:08 GMT-0700 (PDT)
// source: bulb_base_test.stl

// objects: 1
// object #1: triangles: 13666

function sectorSlices () {
    var cen = {x: 13.5, y: 13.5};
    var cir = circle({start:[cen.x, cen.y, 0], end:[cen.x, cen.y, 0.01], r: 14, fn: 16});
    var cl=function(){};
    
    var slicerDicer = function(side) {
        cl("side", side);
        var leftSide = new CSG.Polygon([
                new CSG.Vertex(new CSG.Vector3D(side.vertex0.pos._x, side.vertex0.pos._y, 0)),
                new CSG.Vertex(new CSG.Vector3D(cen.x, cen.y, 0)),
                new CSG.Vertex(new CSG.Vector3D(cen.x, cen.y, 1)),
                new CSG.Vertex(new CSG.Vector3D(side.vertex0.pos._x, side.vertex0.pos._y, 1))
            ]);
        cl("leftSide", leftSide);
        var rightSide = new CSG.Polygon([
                new CSG.Vertex(new CSG.Vector3D(side.vertex1.pos._x, side.vertex1.pos._y, 0)),
                new CSG.Vertex(new CSG.Vector3D(cen.x, cen.y, 0)),
                new CSG.Vertex(new CSG.Vector3D(cen.x, cen.y, 1)),
                new CSG.Vertex(new CSG.Vector3D(side.vertex1.pos._x, side.vertex1.pos._y, 1))
            ]);
        cl("rightSide", rightSide);
        var topSide = new CSG.Polygon([
                new CSG.Vertex(new CSG.Vector3D(side.vertex0.pos._x, side.vertex0.pos._y, 0)),
                new CSG.Vertex(new CSG.Vector3D(cen.x, cen.x, 0)),
                new CSG.Vertex(new CSG.Vector3D(side.vertex1.pos._x, side.vertex1.pos._y, 0))
            ]);
        cl("topSide", topSide);
        var bottomSide = new CSG.Polygon([
                new CSG.Vertex(new CSG.Vector3D(side.vertex0.pos._x, side.vertex0.pos._y, 1)),
                new CSG.Vertex(new CSG.Vector3D(cen.x, cen.y, 1)),
                new CSG.Vertex(new CSG.Vector3D(side.vertex1.pos._x, side.vertex1.pos._y, 1))
            ]);
        cl("bottomSide", bottomSide)
        var wallSectorSide = new CSG.Polygon([
                new CSG.Vertex(new CSG.Vector3D(side.vertex0.pos._x, side.vertex0.pos._y, 0)),
                new CSG.Vertex(new CSG.Vector3D(side.vertex0.pos._x, side.vertex0.pos._y, 1)),
                new CSG.Vertex(new CSG.Vector3D(side.vertex1.pos._x, side.vertex1.pos._y, 1)),
                new CSG.Vertex(new CSG.Vector3D(side.vertex1.pos._x, side.vertex1.pos._y, 0))
            ]);
        cl("wallSectorSide", wallSectorSide);
        var polygons = [leftSide, rightSide, topSide, bottomSide, wallSectorSide];
        var final = CSG.fromPolygons(polygons);
        // console.log("polygons", polygons);
        // console.log("final", final);
        return final;
    }
    // Transform a circle into 3D cheese slices
    var slices = [], i=0;
    for(i=0; i<cir.sides.length; i+=2) {
        var side = cir.sides[i]
        console.log(i);
        slices.push(slicerDicer(side));
    }
    // console.log(slices);
    return slices;
    // return CSG.fromPolygons(slices);
}

function slots() {
    var radius = 8, size = 6;
    return union([
        new cube(size).rotateZ(45).translate([radius,radius-size/2,0]).setColor(css2rgb("red")),
        new cube(size).rotateZ(45).translate([-radius,radius-size/1.5,0]).setColor(css2rgb("blue")),
        new cube(size).rotateZ(45).translate([-radius-size/4,-radius-size/2,0]).setColor(css2rgb("purple")),
        new cube(size).rotateZ(45).translate([radius-size/5,-radius-size/1,0]).setColor(css2rgb("yellow"))
    ])
}

function main() {
    var faces = 25, cl = function(){}; //console.log;

    var bulb = 
        difference([
            union([
                difference(
                    cylinder({start:[0,0,0], end:[0,0,2.25],  r1: 13.5, r2: 12, fn: faces}),
                    cylinder({start:[0,0,0], end:[0,0,2.25],  r1: 11.5, r2: 10, fn: faces})
                ),
                difference(
                    cylinder({start:[0,0,2.25], end:[0,0,4.5],  r1: 12, r2: 13, fn: faces}),
                    cylinder({start:[0,0,2.25], end:[0,0,4.5],  r1: 10, r2: 11, fn: faces})
                ),
                // linear_extrude({ height: 4.5, twist: 360, slices: 100}, circle({r:3}) ),
                difference(
                    cylinder({start:[0,0,4.5], end:[0,0,9], r1: 13, r2: 10, fn: faces}),
                    cylinder({start:[0,0,4.5], end:[0,0,9], r1: 11, r2: 5, fn: faces})
                ),
                difference(
                    cylinder({start:[0,0,9], end:[0,0,13.5], r1: 7.5, r2: 3.5, fn: faces}),
                    cylinder({start:[0,0,9], end:[0,0,11.5], r1: 5.5, r2: 1.5, fn: faces})
                ),
                difference(
                    cylinder({start:[0,0,5], end:[0,0,11.5], r1:4.5, r2: 4.5, fn: faces}),
                    cylinder({start:[0,0,5], end:[0,0,11.5], r1:2.75, r2: 2.75, fn: faces})
                ) //.setColor([0.75, 0.3, 0.3, 0.33])
    //            ).setColor([0.75, 0.5, 0.5, 0.33])
            ]), //.setColor([0.7,0.5,0.7,0.33]),
            union([
                cylinder({start:[0, 0, 11.5], end:[0, 0, 13.5], r1:1, r2:1, fn:faces}),
                cylinder({start:[1, 0, 6], end:[15, 0, 8], r1:1, r2:1, fn:faces})
            ])
        ]);
    var bulb_slices = sectorSlices();
    // var bulb_cut = difference([bulb, bulb_slices]);
    // return bulb_cut;
    // return bulb;
    // console.log(bulb_slices);
    // return bulb_slices;
    return difference(bulb, slots());
}

