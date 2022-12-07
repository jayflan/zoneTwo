class Gpx {
  constructor(parsedGpxFile) {
    this.gpx = parsedGpxFile;
  }

  speedAvg() {

  }

  speedMax() {

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
    console.log('counter-->;', counterLength, 'workoutArrLength--->:', workoutArr.length)
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

  distance(unit = 'miles') {  // miles or kilometers
    //using haversine formula - reference: https://web.archive.org/web/20180705004706/http://mathforum.org/library/drmath/view/51879.html
    const data = this.gpx.data;
    const DtoR = 0.017453293 // converts degrees to radians: pi/180
    
    let R = 3956; // radius of earth in miles
    if(unit === 'kilometers') R = 6367; // radius of earth in kilometers
    
    let resultDist = 0;
    if(data[0]) { // happy path
      let prevIdx = 0;
      resultDist = data.reduce((accum, currCoords, idx) => {

        const currLat = +currCoords.lat, currLon = +currCoords.lon;
        const prevLat = +data[prevIdx].lat, prevLon = +data[prevIdx].lon;
        const currRLat = currLat * DtoR, currRLon = currLon * DtoR;
        const prevRLat = prevLat * DtoR, prevRLon = prevLon * DtoR;  
        const dLat = currRLat - prevRLat, dLon = currRLon - prevRLon;

        const a = Math.pow(Math.sin(dLat/2),2) 
          + Math.cos(currRLat) 
          * Math.cos(prevRLat) 
          * Math.pow(Math.sin(dLon/2),2);
          
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          accum = accum + c; 
          prevIdx = idx;
          return accum;
        },0);
      }
      return Math.round((R * resultDist) * 10) / 10;
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
      'hours': this.timeTo2Digits(hours)
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
  Gpx
}

