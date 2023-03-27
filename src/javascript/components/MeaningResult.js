import _ from 'lodash';

class MeaningResult extends HTMLElement {
  set results(results) {
    this._results = results;
    this.render();
  }

  renderEmptyPage(title, message, resolution) {
    this.innerHTML = `
        <div id="emptyPage" class=" flex flex-col justify-center   mt-16">
          <img src="../images/notfound.svg" class="w-64 mx-auto" alt="" />
          <h1 class="text-center text-xl my-5">${title}</h1>
          <p class="text-center  text-gray-500">${message}</p>
          <p class="text-center text-gray-500">${resolution}</p>
        </div>
    `;
  }

  renderLoading() {
    this.innerHTML = `
        <div id="loading" class=" flex flex-col justify-center   mt-16">
          <h1 class="text-center text-xl mt-5">Loading...</h1>
        </div>
    `;
  }

  render() {
    const definitions = this._results[0].meanings;

    // const renderDefinitionsByPartOfSpeech = (partOfSpeech) => {
    //     return definitions.map(definition => {
    //         if(definition.partOfSpeech === partOfSpeech){
    //             return definition.definitions.map(def => {
    //                 return `
    //                 <li>${def.definition}</li>
    //                 `
    //             }).join('')
    //         }
    //     }).join('')
    // }
    const renderDefinitionsByPartOfSpeech = (partOfSpeech) => _.chain(definitions)
      .filter({ partOfSpeech })
      .flatMap('definitions')
      .map((def) => `
            <li class="my-3">
                ${def.definition}
                ${def.example !== undefined ? (
    `
                    <div id="example" class="px-5 ">
                        <p class="text-green-700">Example : <span class="text-slate-600">${def?.example}</span></p>
                    </div>
                  `
  ) : ''}
            </li>`)
      .join('');

    const renderDefinitions = _.map(definitions, (result) => {
      const meaningHtml = renderDefinitionsByPartOfSpeech(result.partOfSpeech);
      return `
        <div id="divider" class="my-5  flex items-center gap-4 after:h-px after:flex-1 after:bg-gray-300  after:content-['']">${result.partOfSpeech}</div>
        <h1 id="meaningTitle" class="my-5 text-xl">Meaning</h1>
        <ul id="meaningList" class="list-disc list-inside marker:text-green-600">
            ${meaningHtml}
        </ul>
    `;
    });

    this.innerHTML = `
       <div id="meaningDiv" class="max-w-3xl  mx-auto mt-5">
         <div>
            ${renderDefinitions.join('')}
            </div>
       </div>
    `;
    this.meaningDiv = this.querySelector('#meaningDiv');
  }
}

customElements.define('meaning-result', MeaningResult);
