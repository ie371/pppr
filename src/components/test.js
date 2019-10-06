// showFile(blob){
//   // It is necessary to create a new blob object with mime-type explicitly set
//   // otherwise only Chrome works like it should
//   var newBlob = new Blob([blob], {type: "application/pdf"})

//   // IE doesn't allow using a blob object directly as link href
//   // instead it is necessary to use msSaveOrOpenBlob
//   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//     window.navigator.msSaveOrOpenBlob(newBlob);
//     return;
//   }

//   // For other browsers:
//   // Create a link pointing to the ObjectURL containing the blob.
//   const data = window.URL.createObjectURL(newBlob);
//   var link = document.createElement('a');
//   link.href = data;
//   link.download="file.pdf";
//   link.click();
//   setTimeout(function(){
//     // For Firefox it is necessary to delay revoking the ObjectURL
//     window.URL.revokeObjectURL(data);
//   }, 100);
// }

// fetch([url to fetch], {[options setting custom http-headers]})
// .then(r => r.blob())
// .then(showFile)

const showPDF = (function() {
	return function(blob, fileName) {
		var newBlob = new Blob([ blob ], { type: 'application/pdf' });
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(newBlob);
			return;
		}
		const data = window.URL.createObjectURL(newBlob);
		var link = document.createElement('a');
		link.href = data;
		link.click();
		window.open(data);
		setTimeout(function() {
			// document.body.removeChild(link);
			window.URL.revokeObjectURL(data);
			100;
		});
	};
})();
