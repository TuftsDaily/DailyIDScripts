#include "Extendables/extendables.jsx";
var http = require("http");

var req = new http.HTTPRequest("GET", "http://localhost/Projects/Tufts/Daily/public_html/xml/category/sports/date/2015-06-22/");
req.follow_redirects(false);
var timeout = req.timeout();
req.timeout(10);
var res = req.do();
alert("Status: "+ res.status);
$.writeln("Time: " + res.response_time);
//$.writeln(res.body);

var myMainMenu = app.menus.item("$ID/Main");
try{
var mySpecialFontMenu = myMainMenu.submenus.item("Kozuka Mincho Pro");
mySpecialFontMenu.remove();
var mySpecialFontMenu2 = myMainMenu.submenus.item("Tufts Daily");
mySpecialFontMenu2.remove();

}catch(myError){}