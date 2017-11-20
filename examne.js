db.products.aggregate(
	[
		{
			$group:
			{
				_id : "$productos.category"
				numero : {"$sum" : 1}
			}
		}
	]
 db.zips.insertMany([
	 { "city" : "PALO ALTO", "loc" : [ -122.149685, 37.444324 ], "pop" : 15965, "state" : "CA", "_id" : "94301" },
	 { "city" : "PALO ALTO", "loc" : [ -122.184234, 37.433424 ], "pop" : 1835, "state" : "CA", "_id" : "94304" },
	 { "city" : "PALO ALTO", "loc" : [ -122.127375, 37.418009 ], "pop" : 24309, "state" : "CA", "_id" : "94306" }])


{ "_id" : 3 } { "_id" : 2 }{ "_id" : 1 }

db.zips.find({state:"CA",city:"PALO ALTO"})
{ "city" : "PALO ALTO", "loc" : [ -122.149685, 37.444324 ], "pop" : 15965, "state" : "CA", "_id" : "94301" }
{ "city" : "PALO ALTO", "loc" : [ -122.184234, 37.433424 ], "pop" : 1835, "state" : "CA", "_id" : "94304" }
{ "city" : "PALO ALTO", "loc" : [ -122.127375, 37.418009 ], "pop" : 24309, "state" : "CA", "_id" : "94306" }


db.zips.aggregate([
    {
        $group:
        {

            zip: { "$addToSet": "zips._id" }
        }
    }
])
