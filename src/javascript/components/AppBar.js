class App extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="flex justify-center">
        <h1 class=" underline font-bold">My App</h1>
      </div>
    `;
  }
}

customElements.define('app-bar', App);
