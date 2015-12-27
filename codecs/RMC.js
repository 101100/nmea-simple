/*
 * === RMC - Recommended Minimum Navigation Information ===
 *
 * ------------------------------------------------------------------------------
 *                                                              12
 *        1         2 3       4 5        6 7   8   9      10  11|  13
 *        |         | |       | |        | |   |   |      |   | |  |
 * $--RMC,hhmmss.ss,A,llll.ll,a,yyyyy.yy,a,x.x,x.x,ddmmyy,x.x,a,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC Time
 * 2. Status
 *    V = Navigation receiver warning
 *    A = Valid
 * 3. Latitude
 * 4. N or S
 * 5. Longitude
 * 6. E or W
 * 7. Speed over ground, knots
 * 8. Track made good, degrees true
 * 9. Date, ddmmyy
 * 10. Magnetic Variation, degrees
 * 11. E or W
 * 12. FAA mode indicator (NMEA 2.3 and later)
 * 13. Checksum
 */

exports.ID = 'RMC';
exports.TYPE = 'nav-info';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    timestamp: fields[1],
    status: fields[2] == 'V' ? 'warning' : 'valid',
    lat: fields[3],
    latPole: fields[4],
    lon: fields[5],
    lonPole: fields[6],
    speedKnots: +fields[7],
    trackTrue: +fields[8],
    date: fields[9],
    variation: +fields[10],
    variationPole: fields[11]
  };
}
