/**
 * Created by LI YUAN XIN on 16/12/2017.
 */
module.exports = {
  log: function(err, rowCount) {
    console.log('Reading rows from the Table...');
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }
  }
};
