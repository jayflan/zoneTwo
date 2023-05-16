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



class Gpx {
  constructor(parsedGpxFile) {
    this.gpx = parsedGpxFile;
  }

  createSpeedTrkPtArr(distanceObj, distUnit = 'kilometers') {
    const workoutArr = this.gpx.data;
    const distArr = distanceObj.distArr;
    //edge case of NO trkPts
    if(!workoutArr[0].lat) return [];
      return distArr.reduce((accum, currTrkPt, Idx) => {
        const prevTrkPt = distArr[Idx - 1];
        //currTrkPt start is never first index of arr
        if(Idx === 0) return accum;
        // const prevLatLng = L.latLng(
        //   prevTrkPt.lat,
        //   prevTrkPt.lon
        // );
        // const currLatLng = L.latLng(
        //   currTrkPt.lat,
        //   currTrkPt.lon
        // );
        const prevTime = new Date(prevTrkPt.time).getTime(), currTime = new Date(currTrkPt.time).getTime();
        const elapsedSeconds = (currTime - prevTime) / 1000;
        const elapsedMinutes = elapsedSeconds / 60;
        const elapsedHrs = elapsedMinutes / 60;
        
        const distanceMeters = currTrkPt.distance;
        const speedKph = ((distanceMeters / 1000) / (elapsedHrs)); // in kilometers per hour
        const speedMph = speedKph / 1.60934;
        
        if(distUnit === 'miles') {
          accum.push(speedMph);
        } else accum.push(speedKph);
        return accum;
      }, []);
  }

  appendTrkPts(propStr, dataArr) {
    return dataArr.map((currTrkPt) => {
      currTrkPt[propStr] = currTrkPt
    });
  }

  speedAvg(speedArr) {
    let counterLength = 0;
    const speedSum = speedArr.reduce((accum, currElem) => {
      if(currElem > 0) {
        accum += currElem; 
        counterLength++
      }
      return accum;
    }, 0);
    return Math.round((speedSum / counterLength) * 10 ) / 10;
  }

  speedMax(speedArr) {
    //to be used with instance of speed trackPts
    let maxNum = speedArr[0];
    speedArr.map((currElem) => {
      currElem > maxNum ? maxNum = currElem : ""
    })
    return Math.round(maxNum * 10) / 10;
  }

  tempAvg() {
    const workoutArr = this.gpx.data;
    let counterLength = 0;
    const tmpSum = workoutArr.reduce((accum, trkPt) => {
      if(trkPt.atemp && +trkPt.atemp !== 0) {
        accum += +trkPt.atemp;
        counterLength++;
      }
      return accum;
    }, 0);
    if(!workoutArr[0].atemp) return 0;
    return Math.round(tmpSum / counterLength);
  }

  hrAvg() {
    const workoutArr = this.gpx.data;
    let counterLength = 0;
    const hrSum = workoutArr.reduce((accum, trkPt) => {
      if(trkPt.hr && +trkPt.hr !== 0) {
        accum = accum + +trkPt.hr;
        counterLength++;
      }
      return accum;
    }, 0);
    if(!workoutArr[0].hr) return 0;  // return 0 if no hr property exists
    return Math.round(hrSum / workoutArr.length);
  }

  hrMax() {
    const workoutArr = this.gpx.data;
    return workoutArr.reduce((maxNum, trkPt) => {
      const hrNum = +trkPt.hr;
      if(hrNum > maxNum) maxNum = hrNum;
      return maxNum;
    }, 0);
  }

  cadAvg() {
    const workoutArr = this.gpx.data;
    let counterLength = 0;
    const cadSum = workoutArr.reduce((accum, trkPt) => {
      if(trkPt.cad && +trkPt.cad !== 0) {
        accum += +trkPt.cad;
        counterLength++
      }
      return accum;
    }, 0);
    if(!workoutArr[0].cad) return 0;  //return 0 if no cad property exists
    return Math.round(cadSum / counterLength)
  }

  cadMax() {
    const workoutArr = this.gpx.data;
    return workoutArr.reduce((maxNum, trkPt) => {
      const cadNum = +trkPt.cad;
      if(cadNum > maxNum) maxNum = cadNum;
      return maxNum;
    }, 0);
  }

  distance(unit = 'kilometers') {  // miles or kilometers
    //using haversine formula - reference: https://www.movable-type.co.uk/scripts/latlong.html
    const data = this.gpx.data;
    const DtoR = 0.017453293 // converts degrees to radians: pi/180
    
    let R = 3956; // radius of earth in miles
    if(unit === 'kilometers') R = 6367; // radius of earth in kilometers
    
    // let resultDist = 0;
    let distArr = [], resultObj = {}, resultDist = 0, prevIdx = 0;
    if(!data[0]) return {};
    if(data[0]) { // happy path

    resultDist = data.reduce((accum, currCoords, idx) => {

      const currLat = +currCoords.lat, currLon = +currCoords.lon;
      const prevLat = +data[prevIdx].lat, prevLon = +data[prevIdx].lon;
      const currRLat = currLat * DtoR, currRLon = currLon * DtoR;
      const prevRLat = prevLat * DtoR, prevRLon = prevLon * DtoR;  
      const dLat = currRLat - prevRLat, dLon = currRLon - prevRLon;
      const currTime = currCoords.time, prevTime = data[prevIdx].time;

      // haversine formula for distance
      const a = Math.pow(Math.sin(dLat/2),2) 
        + Math.cos(currRLat) 
        * Math.cos(prevRLat) 
        * Math.pow(Math.sin(dLon/2),2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      //!Why is each d 'trkpt' NOT > 0, if in R meters?
        //!Answer - trkpts are in mi/km, need to 'un-dilute' them
      const d = R * c;
      let dTrkPt = d;

      //rate of speed formula
      const seconds = currTime - prevTime;
      const speed = dTrkPt / seconds;
      if(speed > 0) {
        speed = Math.round(speed * 10) / 10;
      };  

      distArr.push({'distance': dTrkPt, 'time': currCoords.time, 'speed': speed});
      accum = accum + d;
      prevIdx = idx;
      return accum;

    },0);
  }

    resultObj.totalDist = Math.round(resultDist * 10) / 10
    resultObj.distArr = distArr; 
    
    return resultObj;
  }

  distAccumArr = () => {
    const distArr = this.distance().distArr;
    let accumArr = [];
    let accum = 0;
    distArr.map((currObj) => {
      accum = accum + currObj.distance;
      accumArr.push(accum);
    })
    return accumArr;
  }

  elevation(unitMeasure = 'meter') {  // default elev unit is in meters
    const workout = this.gpx;
    let elevResult = 0;
    let prevIdx = 0;
    if(workout.data.length > 3) { // happy path 
      elevResult = workout.data.reduce((accum, trkPt, currIdx) => {
        let currElev = +trkPt.ele;
        let prevElev = +workout.data[prevIdx].ele;
        if(currElev > prevElev) {
          const diff = (currElev - prevElev);
          accum = diff + accum; // add only pos nums
        }
        prevIdx = currIdx;
        return accum;
      }, 0);
    } else return 0; 
    return Math.round(elevResult);
  }

  time() {
    const workoutArr = this.gpx.data;
    let startTime = workoutArr[0];
    let endTime = workoutArr[workoutArr.length - 1]; 
    if(!startTime) { // unhappy path
      startTime = 0;
      endTime = 0;
    } else { //happy path
      startTime = startTime.time;
      endTime = endTime.time;
    }
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    let seconds = Math.floor((end - start) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return {
      'seconds': this.timeTo2Digits(seconds),
      'minutes': this.timeTo2Digits(minutes),
      'hours': this.timeTo2Digits(hours),
      'totalSecs': (end - start) / 1000
    };
  }

  timeTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  metersToFeet(mtrsNum) {
    return `${(mtrsNum * 3.2)}`
  }

}


module.exports = {
  Gpx,
  'parseGpx': parseGpx
}

