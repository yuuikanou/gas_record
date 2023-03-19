const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheetList = ss.getSheetByName('シート1');
const sheetNewsletter = ss.getSheetByName('メール文章')
const sheetWriteHistory = ss.getSheetByName('メール履歴')

function do_email(){
  sendEmail()
}



function getSubscrivers() {

  let lastRow = sheetList.getLastRow();
  
  let _subscribers = sheetList.getRange(3, 2, lastRow-2, 3).getValues();
  const columnName = sheetList.getRange(2, 2, 1, 3).getValues()[0];
  //console.log(_subscribers);

  let subscribers = []
  for(let _subscriber of _subscribers){
    //console.log(_subscriber);
    let subscriber = {};
    for(let index in _subscriber){
      subscriber[columnName[index]] = _subscriber[index];
    }
    
    subscribers.push(subscriber);
  }
 return subscribers;
}

function sendEmail(){
  let subscribers = getSubscrivers();
  let subject = sheetNewsletter.getRange('C2').getValue();
  let _body = sheetNewsletter.getRange('C3').getValue();
  for(let subscriber of subscribers){
    //console.log(subscriber);
    let subject = sheetNewsletter.getRange('C2').getValue();
    let _body = sheetNewsletter.getRange('C3').getValue();
    let gazou_ID = sheetList.getRange('E3').getValue();
    let attachImg = DriveApp.getFileById(gazou_ID).getBlob();
    
    let name = "E"


    let body = _body.replace(/\${company}/g, subscriber['company'])
                    //.replace(/\${last_name}/g, subscriber['last_name'])
                    .replace(/\${name}/g, subscriber['name'])
    //console.log(body);
    let to = subscriber['email'];
    let options = {
      //"attachments":attachImg,
      name:"A",
      "htmlBody":body,
      "inlineImages": {inlineImg:attachImg}
    };
   
    GmailApp.sendEmail(to, subject, body,options);
    console.log(subscriber['name'], 'さんにメールを送信しました');
  }

  writeHistory(subject, _body);
}

function writeHistory(subject, body){
  //let subject = 'テスト件名';
  //let body = 'テスト本文';
  let date = new Date();
  let lastRow = sheetWriteHistory.getLastRow();

  console.log(date);
  console.log(lastRow);
  let history = [date, subject, body]
  sheetWriteHistory.getRange(lastRow+1, 2, 1, 3).setValues([history]);
}

