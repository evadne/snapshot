//	Snapshot.jsx
//	Evadne Wu at Iridia, 2010










//	Date Formatting
//	Excerpt from monoDate (mono.dateAdditions)
//	http://github.com/monoceroi/monoDate

	Date.prototype.format = function (formatString) {
	
		//	e.g. "#{MONTH} / #{DATE}  #{HOURS}:#{MINUTES}";
		
		var templates = {
		
			"YEAR": this.getFullYear(),
			"MONTH": this.getMonth() + 1,
			"DAY": this.getDate(),			//	Why the day is called “date” is beyond imagination
	
			"HOURS": this.getHours(),
			"MINUTES": this.getMinutes(),
			"SECONDS": this.getSeconds(),
			
			"UTCHOURS": this.getUTCHours(),
			"UTCMINUTES": this.getUTCMinutes(),
			"UTCSECONDS": this.getUTCSeconds(),
			"UTCMILLISECONDS": this.getUTCMilliseconds(),
		
		}
		
		
		
		
		
		var responseString = String(formatString);
		
		//	Expressions:	
		//	#\\{MONTH(?:, )?(?:\\d+)?\\}	in JS strings
		//	#\{MONTH(?:, )?(?:\d+)?\}	in JS Regexs
		//	#{MONTH(?:, )?(?:\d+)?}		in actual values, matches particle parts e.g. #{MONTH, 24}, or #{MONTH}.
		
		
		
		
		
		var parseDigitPredicate = function (inputString) {
		
			if (!inputString) return undefined;
			
			var inputString = String(inputString);
			var pattern = /(\d+)(})/ig;
			var inputMatches = inputString.match(pattern);
		
			if (!inputMatches) return undefined;
			
			return parseInt(String(inputMatches[0]).replace(pattern, '$1'));
		
			
		}
		

		for (templateItemKey in templates) {
		
			if (!templates.hasOwnProperty(templateItemKey)) continue;
		
			var templateItemValue = templates[templateItemKey];
		
			var pattern = new RegExp("(#\\{)(" + templateItemKey + ")(?:, )?(?:\\d+)?(\\})", "ig");
			var templateTagOccurrances = formatString.match(pattern);
			
			if (!templateTagOccurrances) continue;
			
			for (templateTagOccurranceIndex in templateTagOccurrances) {
			
				if (!templateTagOccurrances.hasOwnProperty(templateTagOccurranceIndex)) continue;
			
				var templateTagOccurrance = templateTagOccurrances[templateTagOccurranceIndex];
			
				var templateItemOccurranceString = String(templateTagOccurrance);
				
				formatString = formatString.replace(
				
					templateItemOccurranceString,
	
					String(templateItemValue).pad(
					
						parseDigitPredicate(templateItemOccurranceString), 
						"0"
						
					)
				
				);
				
			}
		
		}
		
		return formatString;
		
	}










//	String Padding
//	Excerpt from monoString (mono.stringAdditions)
//	http://github.com/monoceroi/monoString

	String.prototype.pad = function (destinationLength, paddingString) {
	
		if (!destinationLength) return this;
		if (this.length >= destinationLength) return this;

		paddingString = paddingString || "0";
	
		var finalString = this.slice(0);
	
		for (var i = 0; i <= (destinationLength - this.length - 1); i++)
		finalString = (paddingString + finalString);
		
		return finalString;
		
	}










	function main (activeDocument) {
	
		if (activeDocument.artboards.length == 0) return;
				
		var plausibleFile = new File([
		
			unescape(String(activeDocument.fullName)).replace(/\s*\|.+/, ""),
			
			" | ",
			
			(new Date()).format("#{YEAR, 4} #{MONTH, 2}#{DAY, 2} #{HOURS, 2}#{MINUTES, 2} #{SECONDS, 2}"),
			
			".ai"
			
		].join(""));
		
		var saveOptions = new IllustratorSaveOptions();
		
		saveOptions.compatibility = Compatibility.ILLUSTRATOR15;
		saveOptions.compressed = true;
		saveOptions.embedICCProfile = true;
		saveOptions.embedLinkedFiles = true;
		saveOptions.pdfCompatible = true;
		
		activeDocument.saveAs(plausibleFile, saveOptions);
		
	}
	
	
	
	
	
	if (app.documents.length != 0) main(app.activeDocument);










