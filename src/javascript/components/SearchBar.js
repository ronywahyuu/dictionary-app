class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.querySelector('#termSearch').value;
  }

  render() {
    this.innerHTML = `
      <form id="formSearch" class="relative max-w-3xl mx-auto mt-5">
        <label for="termSearch" class="sr-only"> Term </label>
      
        <input
          type="text"
          id="termSearch"
          placeholder="Search for a term..."
          class="w-full  rounded-lg border-gray-200 pr-10 shadow-sm sm:text-sm p-3 md:p-5 "
          required
        />
      
        <span
          class="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center text-gray-500"
        >
          <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.375 42.2917L27.7083 30.625C26.6667 31.4583 25.4687 32.1181 24.1146 32.6042C22.7604 33.0903 21.3194 33.3333 19.7917 33.3333C16.0069 33.3333 12.8042 32.0229 10.1833 29.4021C7.56111 26.7799 6.25 23.5764 6.25 19.7917C6.25 16.0069 7.56111 12.8035 10.1833 10.1813C12.8042 7.56042 16.0069 6.25 19.7917 6.25C23.5764 6.25 26.7799 7.56042 29.4021 10.1813C32.0229 12.8035 33.3333 16.0069 33.3333 19.7917C33.3333 21.3194 33.0903 22.7604 32.6042 24.1146C32.1181 25.4687 31.4583 26.6667 30.625 27.7083L42.3438 39.4271C42.7257 39.809 42.9167 40.2778 42.9167 40.8333C42.9167 41.3889 42.7083 41.875 42.2917 42.2917C41.9097 42.6736 41.4236 42.8646 40.8333 42.8646C40.2431 42.8646 39.7569 42.6736 39.375 42.2917ZM19.7917 29.1667C22.3958 29.1667 24.6097 28.2556 26.4333 26.4333C28.2556 24.6097 29.1667 22.3958 29.1667 19.7917C29.1667 17.1875 28.2556 14.9736 26.4333 13.15C24.6097 11.3278 22.3958 10.4167 19.7917 10.4167C17.1875 10.4167 14.9736 11.3278 13.15 13.15C11.3278 14.9736 10.4167 17.1875 10.4167 19.7917C10.4167 22.3958 11.3278 24.6097 13.15 26.4333C14.9736 28.2556 17.1875 29.1667 19.7917 29.1667Z" fill="#808080"/>
          </svg>

        </span>
      </form>
    `;

    this.querySelector('#formSearch').addEventListener('submit', this._clickEvent);
  }
}

customElements.define('search-bar', SearchBar);
