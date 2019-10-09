//Parse aws rekognition structure and add array index.
const getRecognized = (recognized)=> recognized.TextDetections.map((elem,i)=>({...elem,...{ix:i}}));

module.exports = {
  getRecognized
};