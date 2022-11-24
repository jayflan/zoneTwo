const monthNameMap = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
  };

export class DateTime {
  constructor(str) {
    this.data = new Date(str);
  }
  monthName() {
    const numToName = this.data.getMonth() + 1; // += 1 since getMonth method has zero index
    return monthNameMap[numToName];
  }
  dateNum() {
    return this.data.getDate();
  }
  dateFullYear() {
    return this.data.getFullYear();
  }
  dateTime() {
    return this.data.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
}

export const wrkoutDist = (workout, unit = 'miles') => { // miles or kilometers
  //using haversine formula - reference: https://web.archive.org/web/20180705004706/http://mathforum.org/library/drmath/view/51879.html
  const data = workout.data;
  const DtoR = 0.017453293 // converts degrees to radians: pi/180
  
  let R = 3956; // radius of earth in miles
  if(unit === 'kilometers') R = 6367; // radius of earth in kilometers
  
  let resultDist = 0;
  if(data[0]) { // happy path
    let prevIdx = 0;
    resultDist = data.reduce((accum, currCoords, idx) => {

      const currLat = +currCoords.lat, currLon = +currCoords.lon;
      const prevLat = +workout.data[prevIdx].lat, prevLon = +workout.data[prevIdx].lon;
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

  return `
      ${Math.round((R * resultDist) * 10) / 10} 
      ${unit === 'miles' ? 'mi' : 'mtr'}
      `;
}

export const wrkoutElevGain = (workout, unitMeasure = 'meter') => { // default elev unit is in meters
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
  }; 
  if(unitMeasure === 'meter') return `${Math.round(elevResult)} mtr`;
  if(unitMeasure === 'feet') return `${Math.round(metersToFeet(elevResult))} ft`;
}

export const metersToFeet = (meters) => {
  return `${(meters * 3.2)}`
}

export const hrsMinsSecs = (workout) => {
  let startTime = workout.data[0];
  let endTime = workout.data[workout.data.length - 1]; 
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
    'seconds': timeTo2Digits(seconds),
    'minutes': timeTo2Digits(minutes),
    'hours': timeTo2Digits(hours)
  };

}

const timeTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}

export const getLatLonArr = (arrLatLon) => {
  return arrLatLon.reduce((accum, elem) => {
    accum.push([+elem.lat, +elem.lon])
    return accum;
  }, []);
}
