const main_video_1 = document.getElementById('main_video_1');
const modal_video_1 = document.getElementById('modal_video_1');
const select_1 = document.getElementById('select_1');
const main_video_2 = document.getElementById('main_video_2');
const modal_video_2 = document.getElementById('modal_video_2');
const select_2 = document.getElementById('select_2');
// let currentStream;
let modal_stream_1;
let main_stream_1;
let modal_stream_2;
let main_stream_2;
const global_stream_obj = {
  'one' : [],
  'two' : []
};

document.querySelector('#btn_video_confirm').addEventListener('click', function(){
  // modal_video_1.pause();
  // modal_video_2.pause();
  // modal_video_2.addEventListener('pause', function(){
  //   console.log('modal video 2 paused');
  //   document.querySelector('.modal_selector').style.display = "none";
  // })
  document.querySelector('#select_1').style.display = "none";
  document.querySelector('#select_2').style.display = "none";
  document.querySelector('#btn_video_confirm').style.display = "none";
  document.querySelector('#btn_setting').style.display = "none";
  // document.querySelector('.button').style.top = "90%";
})

document.querySelector('#button_1').addEventListener('click', (event) => {
  if (typeof modal_stream_1 !== 'undefined'){
    stopMediaTracks(modal_stream_1);
  };

  if (typeof main_stream_1 !== 'undefined' ) {
    stopMediaTracks(main_stream_1);
  }

  streamVideo(select_1, main_video_1, modal_video_1, global_stream_obj, 'one');
});

document.querySelector('#button_2').addEventListener('click', (event) => {
  if (typeof modal_stream_2 !== 'undefined'){
    stopMediaTracks(modal_stream_2);
  };

  if (typeof main_stream_2 !== 'undefined' ) {
    stopMediaTracks(main_stream_2);
  }

  streamVideo(select_2, main_video_2, modal_video_2, global_stream_obj, 'two');
});

function streamVideo(select_el, main_video_el, modal_video_el, stream_obj, video_num){
  const videoConstraints = {};
  const select = select_el;
  const main_video = main_video_el;
  const modal_video = modal_video_el;
  if (select.value === '') {
    videoConstraints.facingMode = 'environment';
  } else {
    videoConstraints.deviceId = { exact: select.value };
  }
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      stream_obj[video_num].main_stream = stream;
      stream_obj[video_num].modal_stream = stream;
      main_video.srcObject = stream;
      modal_video.srcObject = stream;
      console.log(stream_obj);
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error);
    });
}
// function streamVideo(select_el, main_video_el, modal_video_el, main_stream, modal_stream){
//   const videoConstraints = {};
//   const select = select_el;
//   const main_video = main_video_el;
//   const modal_video = modal_video_el;
//   if (select.value === '') {
//     videoConstraints.facingMode = 'environment';
//   } else {
//     videoConstraints.deviceId = { exact: select.value };
//   }
//   const constraints = {
//     video: videoConstraints,
//     audio: false
//   };
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(stream => {
//       main_stream = stream;
//       modal_stream = stream;
//       main_video.srcObject = stream;
//       modal_video.srcObject = stream;
//       console.log(main_stream);
//       console.log(modal_stream);
//       return navigator.mediaDevices.enumerateDevices();
//     })
//     .then(gotDevices)
//     .catch(error => {
//       console.error(error);
//     });
// }

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function gotDevices(mediaDevices) {
  document.querySelectorAll('select').forEach((select)=>{
    select.innerHTML = '';
    select.appendChild(document.createElement('option'));
    let count = 1;
    mediaDevices.forEach(mediaDevice => {
      if (mediaDevice.kind === 'videoinput') {
        const option = document.createElement('option');
        option.value = mediaDevice.deviceId;
        const label = mediaDevice.label || `Camera ${count++}`;
        const textNode = document.createTextNode(label);
        option.appendChild(textNode);
        select.appendChild(option);
      }
    });
  })
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);