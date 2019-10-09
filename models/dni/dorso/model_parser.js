String.prototype.trim = function() {
  return this.trimLeft().trimRight();
}

//Declare data extractor functions.
const cuil = (items)=>{

  const regex  = /\d{2}-\d{8}-\d{1}/;
  const result = items.find(item=>(item.Type=="LINE"&&item.Confidence>=90&&item.DetectedText.match(regex)!=null));

  return (result)?result.DetectedText.replace(/\D+/g, ''):undefined;

}
  
const dni = (items)=>{

  const regex  = /IDARG(.*)/;  
  const result = items.find(item=>(item.Type=="LINE"&&item.Confidence>=90&&item.DetectedText.match(regex)!=null));

  if (result){

    const  numbers = result.DetectedText.replace(/\D+/g, '');
    return numbers.substring(0,numbers.length-1);

  }
  
  return undefined;

}

const birthPlace = (items)=>{
  
  const regex  = /LUGAR DE NACIMENTO:(.*)/;
  const result = items.find(item=>(item.Type=="LINE"&&item.Confidence>=90&&item.DetectedText.match(regex)!=null));

  if (result){

    const dotsIx    = result.DetectedText.indexOf(':');
    const placeText = result.DetectedText;

    return (dotsIx>0)?placeText.substring(dotsIx+1,placeText.length).trimLeft():undefined;

  }
  
  return undefined;

}

const address = (items)=>{

  const regex  = /DOMICILIO:(.*)/;
  const line1  = items.find(item=>(item.Type=="LINE"&&item.Confidence>=90&&item.DetectedText.match(regex)!=null));
  const line2  = items.find(item=>(item.Type=="LINE"&&item.Confidence>=90&&typeof item.DetectedText ==='string'&&line1&&item.ix==line1.ix+1));

  //Get the two address lines.
  if (line1&&line2){

    const dotsIx   = line1.DetectedText.indexOf(':');
    const line1Txt = line1.DetectedText;

    return line1Txt.substring(dotsIx+1,line1Txt.length).trimLeft()+' '+line2.DetectedText;

  }
  
  return undefined;

}

const name = (items)=>{

  const regex  = /[A-Za-z]+<<[A-Za-z]+/;
  const result = items.find(item=>(item.Type=="LINE"&&item.Confidence>=90&&item.DetectedText.match(regex)!=null));

  if (result){

    const parts = result.DetectedText.split('<<');    
    return parts.slice(1,parts.length)[0].replace(/</g,' ').trimRight();

  }

  return undefined;

}

const surname = (items)=>{

  const regex  = /[A-Za-z]+<<[A-Za-z]+/;
  const result = items.find(item=>(item.Type=="LINE"&&item.Confidence>=90&&item.DetectedText.match(regex)!=null));
  
  return (result)?result.DetectedText.split('<<')[0]:undefined;

}

module.exports = {
  cuil,
  dni,
  birthPlace,
  address,
  name,
  surname
};