var productionRoot = "C:/Dropbox/CurrentDay/Production/";
var masterName = "masterfile";

// JavaScript Document
// Separates the Newspaper
// By Joel Harley

Daily.Separator = function() {

	var sections = findSections();

	// Save Master Document
	saveSection(masterName, productionRoot, productionRoot, "NA", 0);

	// Reopen Master Document
	openMaster(productionRoot, masterName);

	for (var i = sections.length - 1; i >= 0; i--) {
		singleSection(sections[i].name);
		saveSection(sections[i].name, productionRoot, productionRoot, sections[i].pages[0]);
		openMaster(productionRoot, masterName);
	}

	app.documents.item(0).close();

}


// JavaScript Document
// Opens Master File
// By Joel Harley

function openMaster (root, fileName) {
	app.open(root + fileName + ".indd");
}


// JavaScript Document
// Saves Document As a Section
// By Joel Harley

function saveSection(sectionName, root, templateRoot, page) {

	// Save Document	
	
	var prefix = "";
	if (page < 10) prefix = "0";
	var myDocument = app.activeDocument;
	
	// Save document with no page nums
	if(page == "NA") {
		myDocument.save(new File(root + sectionName + ".indd"));
	}
	else {
		// Save Document
		myDocument.save(new File(root + prefix + (page+1) + "-" + sectionName + ".indd"));
	}

	// Save as Template	

	//if(page == "NA") {
		// Save Document with no page number as Template
		//var myDocument = app.activeDocument;
		//myDocument.save(new File(templateRoot + sectionName + ".indt"));
		//if (debug) alert(templateRoot + sectionName + ".indt saved.");
	//}
	//else {
		// Save Document as Template
		//var myDocument = app.activeDocument;
		//myDocument.save(new File(templateRoot + prefix + (page+1) + "-" + sectionName + ".indt"));
		//if (debug) alert(templateRoot + prefix + (page+1) + "-" + sectionName + ".indd");
	//}	

	// close Document
	app.activeDocument.close();
}


// JavaScript Document
// Find Sections Script
// By Joel Harley

function findSections() {
	
	var myDocument = app.activeDocument;
	var myPageCount = myDocument.pages.length;
	var currentSection = "";
	var sectionCount = -1;
	var sections = [];
	
	for ( var i = 0; i < myPageCount; i++) {
		
		var mySection = myDocument.pages.item(i).appliedSection.name;
		if (currentSection != mySection) {
			sectionCount++;
			sections[sectionCount] = new Object;
			sections[sectionCount].name = mySection;
			sections[sectionCount].pages = [];
			sections[sectionCount].pageCount = 0;
			currentSection = mySection;
		}
		sections[sectionCount].pages[sections[sectionCount].pageCount] = i;
		sections[sectionCount].pageCount++;
		
	}
	return sections;
}


// Cut out a Section
// Script by Joel Harley

function singleSection(sectionName) {
	
	var extractSection = sectionName;
	var myDocument = app.activeDocument;
	var myPageCount = myDocument.pages.length;
	
	// Set current starting page as sections starting page number
	myDocument.sections.itemByName(sectionName).continueNumbering = false;
	
	// Delete pages of sections not chosen
	var i = myPageCount ;
	
	while  (i > 0) {
		
		i--;
			
		var mySection = myDocument.pages.item(i).appliedSection.name;
		
		if (mySection != extractSection) {
			myDocument.pages.item(i).remove();
			myPageCount--;
		}
		
	}
}
