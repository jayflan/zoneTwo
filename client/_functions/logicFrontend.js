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

export const getLatLonArr = (arrLatLon) => {
  return arrLatLon.reduce((accum, elem) => {
    accum.push([+elem.lat, +elem.lon])
    return accum;
  }, []);
}

export const displayMilesOrKilos = (dist,userDistUnit) => {
  if(userDistUnit === 'miles') return dist; //default calc in miles
  else return Math.round((dist * 1.60934) *10) / 10;
}

export const displayFeetOrMeters = (elev,userDistUnit) => {
  if(userDistUnit === 'kilometers') return elev; //default calc in meters
  else return Math.round((elev * 3.2808));
}

export const displayFahrenheit = (celciusNum) => {
  return (Math.round((celciusNum * (9/5)) + 32))
}
