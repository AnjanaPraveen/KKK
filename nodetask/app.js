var http =  require('http')
var fs = require('fs')
 var url = require('url');
var qs = require('querystring')
var MongoClient = require('mongodb').MongoClient;
var u = "mongodb://localhost:27017/forms";
var port = 8080;
var firstname = [];
var lastname = [];
var country= [];
var result1 = [];
http.createServer(function(req, res) {
    if(req.url === '/') {
        fs.readFile('form.html', function(err, data) {
            res.writeHead(200, {"Content-Type": "text/html"});
            data=data.toString();
            var s = {name: 'Form', heading: 'Sign Up!!!'}
            data=change(data, s);
            res.write(data);
            res.end();
            
        });  
    }

    if(req.url === '/add') {
        collectRequestData(req, res);
    }
    
    switch(req.method) {
        case "GET":
            var q = url.parse(req.url, true).query;
            //console.log(q);
            break;
        case "POST":
        //console.log("POST METHOD");
            var data = "";
            req.on("data", function(chunk) {
                data +=chunk;
            });
            req.on("end", function(chunk) {
                
                MongoClient.connect(u, function(err, db) {
                    if(err) throw err;
                    var formdata = qs.parse(data);
                    var mydb= db.db('form');

                    mydb.collection('users').insertOne(formdata, function(err, res) {
                        if(err) throw err;
                       console.log("Data Inserted!!")
                        db.close();
                    })
                    
                })
                
            });
     break;
        default:
            break;
    }
    
    
}).listen(port);

function collectRequestData(req, res) {
    let body = [];
    var o = {};
    MongoClient.connect(u, function(err, db){
        if(err) throw err;
        var mydb= db.db('form');
       mydb.collection('users').find({}).toArray(function(err, result){
            if(err) throw err;
            // res.writeHead(200, {"Content-Type" : "text/html"});
            // res.end(JSON.stringify(result));
            //result = JSON.stringify(result);
            console.log("result", result);
            var length = result.length;
            fs.readFile('form1.html', function(err, data1) {
                res.writeHead(200, {"Content-Type": "text/html"});
                data1=data1.toString();
                for(var i =0; i<length; i++) {
                o = onchange(data1, result[i], i);
                }
                // console.log("data 1", data1)
                //  console.log("o", o)
                data1 = forchange(data1, o) 
                res.write(data1);
                res.end();
                
            });
        
            });
    

            })   
    }

    function change(data, s) {
        var r = /#{[A-Za-z]+}/gm;
        var k = [];
        var obj
        var i =0
        
        while((ob = r.exec(data))){
            
            // console.log("data1", r.lastIndex)
            // console.log("data", ob[0])
            k = ob[0];
            console.log(k)
            if(ob == '#{name}')
            var a =  data.replace(k , s.name)
            if(ob =='#{heading}')
            var b = a.replace(k, s.heading)
            console.log("number", i)
            i++
        }
        return(b)
            
    }  
                            // k = data.match(/#+{[A-Za-z]+}/);
                            // console.log('k',k)
                            
                            // var a = data.replace(k, s.title);
                            // var b =a.replace(k, s.heading)
                        
                            // return(b)
    function onchange(data1, result1, j) {
       
        console.log("\n\n\nresult on change", result1);
        // var length =  result.length;
        var i = 0;
        var r = /#{[A-Za-z]+}/gm;
        var k = [];
        var ob;
        console.log("abcd", result1.firstname);
        console.log("defef", result1.lastname);
        console.log("ghghg", result1.country);
            firstname[j] = '<li>' + result1.firstname + '</li>';
            
        console.log("name", firstname);   
            lastname[j] = '<li>' + result1.lastname + '</li>' ;
           
           
            country[j] = '<li>' + result1.country + '</li>';
          
            // console.log("abcd", c)
            


 var f = {firstname,lastname,country};
 return(f);

    console.log('while',i)
}

function forchange(data2, l)
{
    console.log("lll",l)
    console.log("data2", data2)
    var as = new RegExp('#{[A-Za-z]+}','gm');
    console.log("a", as)
    // if(ob1 = a.exec(data2))
    // console.log("gdfghfhjgfjhgk", ob1[0]);
   
    while(ob1 = as.exec(data2)){
    if(ob1[0] == '#{firstname}')
    var bq = data2.replace(ob1[0], l.firstname)
    console.log("eeee", bq)
    if(ob1[0] == '#{lastname}')
    var b1 = bq.replace(ob1[0], l.lastname)
    if(ob1[0] == '#{country}') 
    var c1 = b1.replace(ob1[0], l.country) 
    console.log("ccc", c1)
  

      }

        return(c1);
    }
