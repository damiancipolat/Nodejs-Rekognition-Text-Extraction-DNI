//Import parser data functions.
const {
  cuil,
  dni,
  birthPlace,
  address,
  name,
  surname
} = require('./model_parser.js');

const {
  getRecognized
} = require('./model_foo.js');

//Parse and return the model data.
const getData = (recognized)=>{  

  //Parse and add array index.
  const detections = getRecognized(recognized);

  return {
    CUIL: cuil(detections)||'',
    DNI:  dni(detections)||'',
    BIRTHPLACE: birthPlace(detections)||'',
    ADDRESS: address(detections)||'',
    NAME: name(detections)||'',
    SURNAME: surname(detections)||''
  };  

}

module.exports = {
  getData
};