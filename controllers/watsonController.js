
module.exports = function(app){

const AssistantV2 = require('watson-developer-cloud/assistant/v2');
const assistantUrl = "https://gateway-wdc.watsonplatform.net/assistant/api";
const assistantPassword = 'gM_MfsexHd8fvtR6KkgZ7GnoKKqbjsC2boHAnbl6cEnO';
const assistantId = 'e7e28cbb-43ba-4f9a-b7b1-246c3ef7efa2';
const userName = 'apikey';
var sessionId;



// create assistant
const assistant = new AssistantV2({
  version: '2018-12-00',
  username: userName,
  password: assistantPassword,
  url: assistantUrl
});

//create service
const service = assistant.createSession({
    assistant_id: assistantId
  })
    .then(res => {
      console.log(JSON.stringify(res, null, 2));
      console.log(res.session_id);
      sessionId = res.session_id;


    //   assistant.message({
    //     assistant_id: assistantId,
    //     session_id: sessionId,
        
    //     input: {
    //       'message_type': 'text',
    //       'text': 'hi'
    //       }
    //     })
    //     .then(res => {
    //       console.log(JSON.stringify(res, null, 2));
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    })
    .catch(err => {
      console.log(err);
    });


  var sendMessage =  function (msg){
        assistant.message({
            assistant_id: assistantId,
            session_id: sessionId,
            
            input: {
              'message_type': 'text',
              'text': msg
              }
            })
            .then(res => {
              console.log(JSON.stringify(res, null, 2));
            })
            .catch(err => {
              console.log(err);
            });
    }
    module.exports.sendMessage = sendMessage;
}
