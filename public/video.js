
alert("test")

function get_url(){
    var url1 = window.location;
    var url2 = "/public/api/postID";
    var url =  url1.origin + '/' + url1.pathname.split('/')[1] + url2;
    alert("url :: "+url);
    }

    function initGetUserMedia() {
        navigator.mediaDevices = navigator.mediaDevices || {}
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || function(constraints) {
          let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia not supported by this browser'));
          } else {
            return new Promise((resolve, reject) => {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          }
        }
      }

      navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({  audio: true, video: true })
            .then(function (stream) {
                        //Display the video stream in the video object
            })
            .catch(function (e) { logError(e.name + ": " + e.message); });
        }
        else {
        navigator.getWebcam({ audio: true, video: true }, 
            function (stream) {
                    //Display the video stream in the video object
            }, 
            function () { logError("Web cam is not accessible."); });
        }