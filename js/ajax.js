// ===============================
// Serialize form data
// Send via ajax
// Await server response

function sendEmail(){
  var form = document.querySelector('#contactForm');
  var data = new FormData(form);
  var method = 'POST';
  var url = 'php/send_email.php';

  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send(data);
  xhr.onreadystatechange = function(){serverResponse()};

  function serverResponse() {
    var DONE = 4;
    var OK = 200;
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log('---XHR DONE---');
        var contentType = xhr.getResponseHeader("Content-type");
        console.log(contentType);
        if (contentType === 'application/json') {
          try {
            var response = JSON.parse(xhr.responseText);
            var msg = response.msg;
            console.log(msg);
            emailAlert(msg);
          }
          catch (e) {
            var response = xhr.responseText;
            console.log(
              'There was an error: \n ->'
              + e + '\n'
              + 'Complete server response: \n ->'
              + response
            );
          }
        }
        else {
          console.log('Invalid content type.');
          console.log('Server response: ' + xhr.responseText);
        }
      }
    }
    else {
      console.log('---XHR not DONE---Status: ' + xhr.status);
    }
  }
}
