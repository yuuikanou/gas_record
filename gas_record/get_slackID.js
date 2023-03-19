function 試し() {
    var members = userID取得();
    //const slack_app_token = "xoxp-710782775329-2572465998307-3228191373301-edf5d8e26dd65e6c3d268cd159aef527";
    
    var options = {
      "headers":{
        "Authorization": "Bearer xoxp-710782775329-2572465998307-3228191373301-edf5d8e26dd65e6c3d268cd159aef527"
        },
      "method" : "get",
      "contentType": "application/x-www-form-urlencoded"
    };
    //S02KQKERQPM
    var membersList = []
    for(i=0;i<members.length;i++){
      const url = "https://slack.com/api/users.info?user=" +members[i]+ "&pretty=1";
      const response2 = UrlFetchApp.fetch(url, options).getContentText();
      //console.log(response2);
      const memberName = JSON.parse(response2).user.profile.real_name;
      console.log(memberName);
      const memberId = JSON.parse(response2).user.id;
      membersList.push([memberName,memberId])
    }
    
    
    console.log(membersList)
    var shHere = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    shHere.getRange(3,1,shHere.getLastRow(),2).clearContent();
    shHere.getRange(3,1,membersList.length,2).setValues(membersList);
  }
  
  function userID取得(){
    //const slack_app_token = "xoxp-710782775329-2572465998307-3228191373301-edf5d8e26dd65e6c3d268cd159aef527";
    const url = "https://slack.com/api/usergroups.users.list?usergroup=S02KQKERQPM&pretty=1";
    var options = {
      "headers":{
        "Authorization": "Bearer xoxp-710782775329-2572465998307-3228191373301-edf5d8e26dd65e6c3d268cd159aef527"
        },
      "method" : "get",
      "contentType": "application/x-www-form-urlencoded"
    };
  
    const response = UrlFetchApp.fetch(url, options).getContentText();
    const members = JSON.parse(response).users;
    return members;
  }
  