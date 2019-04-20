
module.exports = async function(app){

const AssistantV2 = require('watson-developer-cloud/assistant/v2');
const assistantUrl = "https://gateway-wdc.watsonplatform.net/assistant/api";
const assistantPassword = 'gM_MfsexHd8fvtR6KkgZ7GnoKKqbjsC2boHAnbl6cEnO';
const assistantId = 'e7e28cbb-43ba-4f9a-b7b1-246c3ef7efa2';
const userName = 'apikey';
var sessionId;

const ModelItem = require('../models/item');

// create assistant
const assistant = new AssistantV2({
  version: '2018-12-00',
  username: userName,
  password: assistantPassword,
  url: assistantUrl
});

var setSessionId = async function(sesId){
  sessionId = sesId;
}

//create service
const service = assistant.createSession({
    assistant_id: assistantId
  })
    .then(async res => {
     await setSessionId(res.session_id);
    })
    .catch(err => {
      console.log(err);
    });
// TODO let assistant send message first

  var sendMessage = async function (msg, callBack){
    var arr = new Array();

        if(sessionId==undefined){
          setTimeout(() => {
            sendMessage(msg, callBack);
            return;
          }, 1500);
        }

        assistant.message({
            assistant_id: assistantId,
            session_id: sessionId,
            
            input: {
              'message_type': 'text',
              'text': msg,
              options: {
                'return_context': true
              }
              }
            })
            .then(res => {
              console.log(JSON.stringify(res, null, 2));
              var didntUnderstand;
                var arrResponse = res.output.generic;
                arrResponse.forEach(element => {
                    switch(element.response_type)
                    {
                        //if response type is text
                        case 'text':
                        var item = new ModelItem();
                            item.response_type = 'text';
                            item.text = element.text;
                            arr.push(item);
                            if(element.text == "I didn\'t understand. You can try rephrasing."){
                              console.log('didnt understand');
                              didntUnderstand = msg;
                            }
                            break;
                        case 'option':
                        var item = new ModelItem();
                            item.response_type = 'option';
                            item.title = element.title;
                            item.option = element.options;
                            arr.push(item);
                            break;
                        default:
                        var item = new ModelItem();
                            item.response_type = 'empty';
                            arr.push(item);
                    }
                    
                });

                callBack(arr, didntUnderstand);
            })
            .catch(err => {
              console.log(err);
            });
    }
    module.exports.sendMessage = sendMessage;
}
