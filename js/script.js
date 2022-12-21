const btn = document.querySelector('#inputButton');
btn.addEventListener('click', getImages);
const imgContainer = document.querySelector('#imgContainer');
const imgWaitingAnimation = document.querySelector('#imgWaitingAnimation');
const h1 = document.createElement('h1');
document.body.append(h1);
const divAnimation = {
    targets: '#imgWaitingAnimation',
    //gör så att objektet roterar. Anges i degrees
    rotate: '360deg',

    //anger hur länge animationen varar.
    duration: 900,

    //den ska loopa när man trycker på play
    loop: true,
    easing: 'linear',

    //den ska inte auto-playa för vi ska kunna styra den med kontrollen.
    autoplay: false,

}
const help = anime(divAnimation);


function getImages(event) {
    event.preventDefault();

    const textInput = document.querySelector('#textInput');
    const text = textInput.value.toLowerCase();
    console.log(text);

    const numberInput = document.querySelector('#numberInput');
    const number = numberInput.value;
    console.log(number);

    const radioButtons = document.querySelectorAll('input[name="size"]');

    let selectedSize;

    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }
    console.log(selectedSize);


    const sortInput = document.querySelector('#sortInput');
    const value = sortInput.value;
    console.log(value);


    if (text == '' && number == '' && selectedSize == undefined) {

        h1.innerText = "Du måste skriva in ett sökord, antal bilder som du vill visa, storleken på dem samt hur du vill visa dem!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }

    else if (number == '' && selectedSize == undefined && value == '') {

        h1.innerText = "Du måste skriva in antal bilder som du vill visa, storleken på dem samt hur du vill visa dem!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }

    if (number == '' && selectedSize == undefined) {

        h1.innerText = "Du måste skriva in antal bilder som du vill visa och storleken på dem!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (text == '' && number == '') {

        h1.innerText = "Du måste skriva in ett sökord och antal bilder som du vill visa!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }

    else if (text == '') {

        h1.innerText = "Du måste skriva in ett sökord!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (number == '') {

        h1.innerText = "Du måste ange antalet bilder som du vill söka på!";
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (selectedSize == undefined) {

        h1.innerText = "Du måste ange storleken på bilderna du vill få fram!";
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (value == '') {

        h1.innerText = "Du måste ange hur du vill att bilderna visas!";
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';
    }

    else {


        //anropar animationen
        help.play();


        //länkar en bild till img-elementet
        document.querySelector('#divAnimation');
        imgWaitingAnimation.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyn88EhwxQJmEzMJ4AO5jziF6N9Yt5EQFwen1ItI-dBvLTwmJB0fGcZv5O_xiKcsrq6bw&usqp=CAU";

        imgContainer.innerText = '';


        fetchUsersImage(text, number, selectedSize, value);
        textInput.value = '';
        numberInput.value = '';
        radioButtons.value = '';
        sortInput.value = '';
        h1.innerText = '';


    }

    function fetchUsersImage(textPar, numberPar, radioButtonsPar, value) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=80ca20d642298b335e7370364e1e2a2c&text=${textPar}&sort=${value}&per_page=${numberPar}&format=json&nojsoncallback=1`


        fetch(url).then(response => response.json())

            .then(results => {
                const photoArr = results.photos.photo;
                console.log(results);
                console.log(photoArr);

                help.pause();
                imgWaitingAnimation.src = '';


                photoArr.forEach(element => {
                    const flickrImages = document.createElement('img');
                    document.querySelector("img").naturalWidth;
                    flickrImages.setAttribute("class", "imagesInContainer")
                    imgContainer.append(flickrImages);
                    flickrImages.src = `https://live.staticflickr.com/${element.server}/${element.id}_${element.secret}_${radioButtonsPar}.jpg`;


                    // flickrImages.addEventListener("click", () => {
                    //     flickrImages.classList.add(".selectedImages");
                    //     flickrImages.classList.toggle("selectedImages");
                    //     console.log(flickrImages);


                })



                
                let leftBtn = document.getElementById('left');
                let rightBtn = document.getElementById('right');

                let img = document.querySelectorAll('#imgContainer img');

                console.log(img);
                let idx = 0;

                let interval = setInterval(run, 2000)

                function run() {
                    idx++
                    changeImage()
                }

                function changeImage() {
                    if (idx > photoArr.length - 1) {
                        idx = 0
                    } else if (idx < imgContainer.length) {
                        idx = photoArr.length - 1
                    }

                    imgContainer.style.transform = `translateX(${-idx * 500}px)`;
                }

                function resetInterval() {
                    clearInterval(interval)
                    interval = setInterval(run, 2000)
                }

                rightBtn.addEventListener('click', () => {
                    idx++
                    changeImage()
                    resetInterval()
                })

                leftBtn.addEventListener('click', () => {
                    idx--
                    changeImage()
                    resetInterval()
                })

            })

           //gömmer alla img-elementen först
            // $(".imagesInContainer").hide();


            // //sätter en SetTimeout på 500 (en halv sekund)
            // setTimeout(function () {

            //     //sätter en slideDown på 4 sekunder            
            //     $(".imagesInContainer").slideDown(4000);
            // }, 500)

            // })
 


            .catch(error => {

                console.log(error);
            });


    }




}

