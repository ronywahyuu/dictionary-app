import _ from "lodash";

class MeaningResult extends HTMLElement{

  set results(results){
    this._results = results
    this.render()
  }

  connectedCallback(){
    // this.render()
  }
  render(){

    const definitions = this._results[0].meanings
    console.log('only definitions')
    console.log(definitions)

    console.log('all results')
    console.log(this._results)
    const filterNounDefinitions = definitions.filter(definition => definition.partOfSpeech === 'noun')
    const filterVerbDefinitions = definitions.filter(definition => definition.partOfSpeech === 'verb')

    const renderAllDefinitions = definitions.map(definition => {
        return definition.definitions.map(def => {
            return `
            <li>${def.definition}</li>
            `
        }).join("")
    })

    const renderDefinitionsByPartOfSpeech = (partOfSpeech) => {
        return definitions.map(definition => {
            if(definition.partOfSpeech === partOfSpeech){
                return definition.definitions.map(def => {
                    return `
                    <li>${def.definition}</li>
                    `
                }).join("")
            }
        }).join("")
    }

    const renderNounDefinitions = renderDefinitionsByPartOfSpeech('noun')
    const renderVerbDefinitions = renderDefinitionsByPartOfSpeech('verb')
    const renderAdjectiveDefinitions = renderDefinitionsByPartOfSpeech('adjective')
    const renderAdverbDefinitions = renderDefinitionsByPartOfSpeech('adverb')
    const renderPronounDefinitions = renderDefinitionsByPartOfSpeech('pronoun')

    this.innerHTML = `
       <div class="max-w-3xl  mx-auto mt-5">
         <div>
            <div id="divider" class="my-5  flex items-center gap-4 after:h-px after:flex-1 after:bg-gray-300  after:content-['']">Noun</div>
            <h1 id="meaningTitle" class="my-5 text-xl">Meaning</h1>
            <ul id="meaningList" class="list-disc list-inside marker:text-green-600   ">
              ${renderNounDefinitions}
            </ul>
            <div id="divider" class="my-5  flex items-center gap-4 after:h-px after:flex-1 after:bg-gray-300  after:content-['']">Verb</div>
            <h1 id="meaningTitle" class="my-5 text-xl">Meaning</h1>
            <ul id="meaningList" class="list-disc list-inside marker:text-green-600   ">
              ${renderVerbDefinitions}
            </ul>
            
            
         </div>
       </div>
    `
  }
}

customElements.define('meaning-result',MeaningResult)