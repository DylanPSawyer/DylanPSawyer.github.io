

function getDataFromExcel(callbackdata , callbackprogress )
{
    /* set up XMLHttpRequesst */
var url = "TsaClaimsData.xls";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  console.log("In Onload");
  callbackprogress(25);
  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; i++) arr[i] = String.fromCharCode(data[i]);
  console.log("Made it through for loop");
  callbackprogress(50);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});
  console.log("Converted workbook");
  callbackprogress(75);
  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  console.log("Calling Callback");
  callbackdata(XLSX.utils.sheet_to_json(worksheet,{raw:false}));
}

oReq.send();
}