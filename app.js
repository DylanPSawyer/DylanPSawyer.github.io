

function getDataFromExcel(callback)
{
    /* set up XMLHttpRequesst */
var url = "TsaClaimsData.xls";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  console.log("In Onload")
  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; i++) arr[i] = String.fromCharCode(data[i]);
  console.log("Made it through for loop");
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});
  console.log("Converted workbook");
  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  console.log("Calling Callback");
  callback(XLSX.utils.sheet_to_json(worksheet,{raw:false}));
}

oReq.send();
}