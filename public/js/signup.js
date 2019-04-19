
$(document).ready(function(){

    $('.validate-form').on('submit', function(){
        var un = $('#username').val();
            var pw = $('#password').val();
            var user = {username : un, password: pw, questions: [] };

            $.ajax({
                type: 'POST',
                url: '/signup',
                data: user,
                success: function(data){
                  //do something with the data via front-end framework
                  console.log("hi");
                  alert();
                  //location.reload();
                }
              });
            // }
        return false;
  
    });

  
  });
