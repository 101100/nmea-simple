/*
 * === VHW – Water Speed and Heading ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3   4 5   6 7   8 9
 *        |   | |   | |   | |   | |
 * $--VHW,x.x,T,x.x,M,x.x,N,x.x,K*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Degress True
 * 2. T = True
 * 3. Degrees Magnetic
 * 4. M = Magnetic
 * 5. Knots (speed of vessel relative to the water)
 * 6. N = Knots
 * 7. Kilometers (speed of vessel relative to the water)
 * 8. K = Kilometers
 * 9. Checksum
 */

exports.ID = 'VHW';
exports.TYPE = 'water-heading-speed';

exports.decode = function(fields) {
    return {
        sentence: exports.ID,
        type: exports.TYPE,
        degreesTrue: +fields[1],
        degreesMagnetic: +fields[3],
        speedKnots: +fields[5],
        speedKmph: +fields[7]
    }
}
