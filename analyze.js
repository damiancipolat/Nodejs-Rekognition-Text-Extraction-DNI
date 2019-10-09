const {
	loadFile
} = require('./lib/lib.js');

const AWS 	 = require('aws-sdk');
const config = require('config');
const assert = require('assert');

//Load parser modules.
const dorsoDni  = require('./models/dni/dorso/model_data.js');
const frenteDni = require('./models/dni/frente/model_data.js');

//Get credentials.
const creds = config.get('aws');

//Set aws credentials.
const rekognition = new AWS.Rekognition(creds);

//Check response format.
const check = (obj)=>{

  assert(obj&&obj.TextDetections&&obj.TextDetections.length!=undefined);
  return obj.TextDetections;
  
}
  
//Analyze DNI back
const analyzeDorso = async (file)=>{

  console.log('Analizando dorso DNI - img:',file,'...');

  //Load file from disk.
  const image  = await loadFile(file);

  //Process in aws REKOGNITION.
  const result = check(await rekognition.detectText(image).promise());

  //Parse data.
  return dorsoDni.getData(result);

}

//Analyze DNI front
const analyzeFrente = async (file)=>{

  console.log('Analizando Frente DNI - img:',file,'...');

  //Load file from disk.
  const image  = await loadFile(file);

  //Process in aws REKOGNITION.
  const result = check(await rekognition.detectText(image).promise());

  //Parse data.
  return frenteDni.getData(result);

}

//Set image paths.
const paths = {
  dorso:'./dorso-dni.jpg',
  frente:'./frente-dni.jpg'
};

const dniAll = Promise.all([
  analyzeFrente(paths.frente),
  analyzeDorso(paths.dorso)
]).then((data)=>{

  console.log('DNI ANALISIS',data);

}).catch((err)=>{
  console.log(err);
});