#include "Extendables/extendables.jsx";
var http = require("http");

var Daily = Daily || {};

Daily.DownloadXMLDialog = function() {

	var XML_SERVICE_BASE = "http://localhost/Projects/Tufts/Daily/office/daily-xml-service/";

	// Categories to Programmatically Generate Dropdown Menu
	var sections = [
		{ label: "News", name: "news" },
		{ label: "Features", name: "features" },
		{ label: "Arts", name: "arts" },
		{ label: "Opinion", name: "opinion" },
		{ label: "Sports", name: "sports" }
	];

	// Tiny Function to Prepend Leading Zeros
	var z = function(i) {
		return (i < 10) ? "0"+i : i;
	}

	// Default to Tomorrow
	var now = new Date();
	var defaultDateStr = now.getFullYear()+'-'+z(now.getMonth()+1)+'-'+z(now.getDate()+1);

	var myDialog = app.dialogs.add({
		name: "Download Articles from Web",
		canCancel: true
	});

	with(myDialog) {

		with(dialogColumns.add()) {
			
			with(borderPanels.add()) {

				with(dialogColumns.add()) {
					staticTexts.add({ staticLabel:"Print Date:" });
				}

				with(dialogColumns.add()) {
					var printDateField = textEditboxes.add({
						editContents: defaultDateStr, 
						minWidth: 90
					});
				}
			}
			
			with(borderPanels.add()) {
				with(dialogColumns.add()) {
					staticTexts.add({ staticLabel: "Section:" });
				}
				with(dialogColumns.add()) {
					var sectionField = dropdowns.add({
						stringList: sections.map(function(obj) {
							return obj.label
						}),
						selectedIndex: 0
					});
				}
			}

		}

	}

	if (myDialog.show()) {

		var date = printDateField.editContents;
		var section = sections[sectionField.selectedIndex].name;

		var req = new http.HTTPRequest("GET", XML_SERVICE_BASE + "?section="+section+"&pubdate="+date);
		req.follow_redirects(false);
		var timeout = req.timeout();
		req.timeout(10);

		try {
			var res = req.do();

			if (res.status == 200) {
				alert("Articles Downloaded!");
				// TODO Auto-Import XML
			} else {
				alert(res.body);
			}

		} catch (e) {
			alert("Could Not Load Articles from Server (Error #1)");
		}

	}

	myDialog.destroy()

}