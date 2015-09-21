#targetengine "session"

// Keep All Functions Daily Namespace
var Daily = {}
#include "Separator.jsx"
#include "DownloadXML.jsx"
// #include "ExportPDF.jsx"

// Create Top-Level Menu
var appMenu = app.menus.item("$ID/Main");
// Get Rid of Old Menu First, If Exists
try {
	var oldTdMenu = appMenu.submenus.item("Tufts Daily");
	oldTdMenu.remove();
} catch(e) {
	alert(e);
}
var tdMenu = appMenu.submenus.add("Tufts Daily")

// Populate the New Menu
var addMenuItem = function(parent, label, callback) {

	var sma = app.scriptMenuActions.add(label);
	sma.addEventListener('onInvoke', callback);
	parent.menuItems.add(sma);

}

addMenuItem(tdMenu, "Break into Sections", function() {
	Daily.Separator();
});

addMenuItem(tdMenu, "Download Articles...", function() {    
    Daily.ImportXMLInit();
	Daily.DownloadXMLDialog();
});

addMenuItem(tdMenu, "Export Pages", function() {
	alert("Coming Soon!");
	// Daily.ExportPDF();
});