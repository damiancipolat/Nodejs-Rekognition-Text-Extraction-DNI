//Import parser data functions.
const {
  name,
  surname,
  sex,
  nationality,
  birthDate
} = require('./model_parser.js');

const {
  getRecognized
} = require('./model_foo.js');

//Parse and return the model data.
const getData = (recognized)=>{  

  //Parse and add array index.
  const detections = getRecognized(recognized);

  return {
    NAME: name(detections)||'',
    SURNAME: surname(detections)||'',
    SEX: sex(detections)||'',
    NATIONALITY: nationality(detections)||'',
    BIRTHDATE: birthDate(detections)||''
  };  

}

module.exports = {
  getData
};