$(document).ready(function() {

    $(".article").click(function(event) {
        // console.log(event.target);
        $('.ingress', this).toggle("fast", function() {
            
        })
    })

    $(".burger").click(function(event) {
        $('.sidebar').toggleClass("show");
    });
    $(".sidebar_togglebtn").click(function(event) {
        $('.sidebar').toggleClass("show");
    });



    // $(function() {
    //     $('.textToSpeech').on('click', function(event) {
    //         event.preventDefault();
    //         let text = "Hej my name is Simpanio. I was born in Italy but now I live in Kalmar, Smaland";
    
    //         text = encodeURIComponent(text);
    //         let url = "https://translate.google.com/translate_tts?ie=UTF-8&tl=tr-TR&client=tw-ob&q=The+players+name";
    //         $('audio').attr('src', url).get(0).play();
    //     })
    // });


    let flag = true;

    let allTexts = $('.article').text();

    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = allTexts;
    msg.lang = 'sv-SE';

    msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(msg);
    speechSynthesis.pause();

    $(".textToSpeech").click(function (event) {
        if (flag)
        {
            speechSynthesis.resume();
            flag = false;
        }
        else
        {
            speechSynthesis.pause();
            flag = true;
        }
    })
    $(".play_btn").click(function (event) {
        if (flag)
        {
            speechSynthesis.resume();
            flag = false;
        }
        else
        {
            speechSynthesis.pause();
            flag = true;
        }
    })


})








// for(let i = 0; i < articles.length; i++) {
//     articles[i].addEventListener("click", function(event) {
//         // articles[i].toggle();


//         event.target.toggle();
//     })
// }