/*
 * === GSV - Satellites in View ===
 *
 * ------------------------------------------------------------------------------
 *         1 2 3  4  5  6  7   8  9  10 11  12 13 14 15  16 17 18 19  20 21
 *         | | |  |  |  |  |   |  |  |  |   |  |  |  |   |  |  |  |   |  |
 *  $--GSA,x,x,xx,xx,xx,xx,xxx,xx,xx,xx,xxx,xx,xx,xx,xxx,xx,xx,xx,xxx,xx*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Number of sentences for full data
 * 2. Sentence number out of total
 * 3. Number of satellites in view
 * 4. PRN of satellite used for fix (may be blank)
 *
 * 5. Satellite PRN number     \
 * 6. Elevation, degrees       +- Satellite 1
 * 7. Azimuth, degrees         |
 * 8. Signal to noise ratio    /
 *
 * 9. Satellite PRN number     \
 * 10. Elevation, degrees      +- Satellite 2
 * 11. Azimuth, degrees        |
 * 12. Signal to noise ratio   /
 *
 * 13. Satellite PRN number    \
 * 14. Elevation, degrees      +- Satellite 3
 * 15. Azimuth, degrees        |
 * 16. Signal to noise ratio   /
 *
 * 17. Satellite PRN number    \
 * 18. Elevation, degrees      +- Satellite 4
 * 19. Azimuth, degrees        |
 * 20. Signal to noise ratio   /
 *
 * 21. Checksum
 */

exports.ID = 'GSV';
exports.TYPE = 'satellite-list-partial';

exports.decode = function(fields) {
  var numRecords = (fields.length - 4) / 4,
      sats = [];

  for (var i = 0; i < numRecords; i++) {
    var offset = i * 4 + 4;

    sats.push({
        id: +fields[offset],
        elevationDeg: +fields[offset + 1],
        azimuthTrue: +fields[offset + 2],
        SNRdB: +fields[offset + 3]
    });
  };

  return {
    sentence: exports.ID,
    type: exports.TYPE,
    numMsgs: +fields[1],
    msgNum: +fields[2],
    satsInView: +fields[3],
    satellites: sats
  };
}
