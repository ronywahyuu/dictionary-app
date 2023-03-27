import _ from 'lodash';

class MainResult extends HTMLElement {
  constructor() {
    super();

    this._audioSrc = '';
  }

  set result(result) {
    this._result = result;
    this.render();
  }

  renderError() {
    this.innerHTML = '';
  }

  renderLoading() {
    this.innerHTML = '';
  }

  render() {
    const firstData = this._result;
    const {
      word, phonetic, phonetics,
    } = firstData[0];
    // const firstAudio = phonetics
    //   .filter((phonetic) => phonetic.audio !== '')
    //   .map((phonetic) => phonetic.audio);

    const firstAudio = _.chain(phonetics)
      .filter((phntc) => phntc.audio !== '')
      .map('audio')
      .value();

    const audioSrc = firstAudio[0] ? firstAudio[0] : '';

    this.innerHTML = `
       <div id="alertDiv" class="absolute top-0 right-0 p-5 transition-all duration-500 ease-in-out ">

       </div> 
       <div id="result" class="max-w-3xl  mx-auto mt-10 flex justify-between items-center">
          <div class="flex flex-col gap-2">
            <h1 class="font-semibold text-3xl md:text-5xl">${word}</h1>
            <p class="text-green-900 font-semibold ${!phonetic && 'hidden'} ">${phonetic}</p>
          </div>
          <button class="audioPlayBtn" >
            <audio class="audioElement" src="${audioSrc}" ></audio>
            <svg class="w-20 md:w-32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M50 87.5C54.9245 87.5 59.8009 86.53 64.3506 84.6455C68.9003 82.7609 73.0343 79.9987 76.5165 76.5165C79.9987 73.0343 82.7609 68.9003 84.6454 64.3506C86.53 59.8009 87.5 54.9246 87.5 50C87.5 45.0754 86.53 40.1991 84.6454 35.6494C82.7609 31.0997 79.9987 26.9657 76.5165 23.4835C73.0343 20.0013 68.9003 17.2391 64.3506 15.3545C59.8009 13.47 54.9245 12.5 50 12.5C40.0543 12.5 30.5161 16.4509 23.4835 23.4835C16.4508 30.5161 12.5 40.0544 12.5 50C12.5 59.9456 16.4508 69.4839 23.4835 76.5165C30.5161 83.5491 40.0543 87.5 50 87.5ZM50 95.8333C75.3125 95.8333 95.8333 75.3125 95.8333 50C95.8333 24.6875 75.3125 4.16667 50 4.16667C24.6875 4.16667 4.16663 24.6875 4.16663 50C4.16663 75.3125 24.6875 95.8333 50 95.8333Z" fill="${firstAudio[0] ? '#349C73' : 'gray'}"/>
              <path d="M66.6666 50L41.6666 68.0417V31.9583L66.6666 50Z" fill="${firstAudio[0] ? '#349C73' : 'gray'}"/>
            </svg>
          </button>
       </div>
    `;
    this.audioElement = this.querySelector('.audioPlayBtn');
    this.audioElement.addEventListener('click', () => {
      const audio = this.querySelector('.audioElement');
      if (audio.getAttribute('src') === '') {
        const alertDiv = document.querySelector('#alertDiv');
        alertDiv.innerHTML = `
          <div id="audioAlertMsg" class="flex rounded-md bg-red-50 p-4 text-sm  text-red-500 
            transition-all duration-500 ease-in-out">
            <div><b>Sorry, </b>no audio found for this word 😔</div>
            <button class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        `;

        const closeBtn = document.querySelector('#audioAlertMsg button');
        setTimeout(() => {
          alertDiv.innerHTML = '';
        }, 5000);
        closeBtn.addEventListener('click', () => {
          alertDiv.innerHTML = '';
        });
      }
      audio.play();
    });
  }
}

customElements.define('main-result', MainResult);
