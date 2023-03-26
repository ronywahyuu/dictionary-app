import _ from "lodash";

class MeaningResult extends HTMLElement {

  set results(results) {
    this._results = results
    this.render()
  }



  render() {

    const definitions = this._results[0].meanings

    console.log('only definitions')
    console.log(definitions)

    console.log('all results')
    console.log(this._results)


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
    const renderDefinitionsByPartOfSpeech = (partOfSpeech) => {
      return _.chain(definitions)
          .filter({'partOfSpeech': partOfSpeech})
          .flatMap('definitions')
          .map(def => {
            return `
            <li class="my-3">
                ${def.definition}
                ${def.example !== undefined ? (
                `
                    <div id="example" class="px-5 ">
                        <p class="text-green-700">Example : <span class="text-slate-600">${def?.example}</span></p>
                    </div>
                  `
            ) : ''}
            </li>`
          })
          .join('')
    };
    //
    // const renderDefinitions = definitions.map(result => {
    //   return (
    //       `
    //       <div id="divider" class="my-5  flex items-center gap-4 after:h-px after:flex-1 after:bg-gray-300  after:content-['']">${result.partOfSpeech}</div>
    //         <h1 id="meaningTitle" class="my-5 text-xl">Meaning</h1>
    //         <ul id="meaningList" class="list-disc list-inside marker:text-green-600   ">
    //             ${renderDefinitionsByPartOfSpeech(result.partOfSpeech)}
    //         </ul>
    //       `
    //
    //   )
    // })
    const renderDefinitions = _.map(definitions, result => {
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
       <div class="max-w-3xl  mx-auto mt-5">
         <div>
            ${renderDefinitions.join('')}
            </div>
       </div>
    `
  }
}

customElements.define('meaning-result', MeaningResult)