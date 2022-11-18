const { DOMParser } = require('xmldom');

//gpx related functions for api (parsing);
const parseGpx = (xmlStr) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, 'text/sml');
  const trkSegment = doc.getElementsByTagName('trkseg');
  let resultObj = {};

  //get track summary element data
  const name = doc.getElementsByTagName('name')[0].firstChild.data;
  resultObj['name'] = name;
  resultObj['data'] = [];

  // iterate through trksegments, then trkpoints
  for(let i = 0; i < trkSegment.length; i++) {
    for(let j = 0; j < trkSegment[i].childNodes.length; j++) {
      const trkPt = trkSegment[i].childNodes[j];

      if(trkPt.nodeType === 1) { // check for only elements, no text xml nodes
        const lat = trkPt.getAttribute('lat');
        const lon = trkPt.getAttribute('lon')
        const ele = trkPt.getElementsByTagName('ele')[0].firstChild.data;
        const time = trkPt.getElementsByTagName('time')[0].firstChild.data;
        const extensions = trkPt.getElementsByTagName('extensions')[0];
        const trkPtExtensions = extensions.getElementsByTagName('gpxtpx:TrackPointExtension')[0];
        let hr = trkPtExtensions.getElementsByTagName('gpxtpx:hr')[0];
        let cad = trkPtExtensions.getElementsByTagName('gpxtpx:cad')[0];
        let atemp = trkPtExtensions.getElementsByTagName('gpxtpx:atemp')[0];

        hr ? hr = hr.firstChild.data : "";  // eval if extensions exist
        cad ? cad = cad.firstChild.data : "";
        atemp ? atemp = atemp.firstChild.data : "";

        
        resultObj['data'].push({ //populate results
          'lat': lat, 
          'lon': lon, 
          'ele': ele, 
          'time': time, 
          'hr': hr, 
          'cad': cad,
          'atemp': atemp
        }); 

      }
    }
  }

  return resultObj;

}

module.exports = { 'parseGpx': parseGpx} 