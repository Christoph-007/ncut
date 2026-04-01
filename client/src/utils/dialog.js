import { debounce, isClickedOutside, onAnimationEnd } from './utilities.js';
import { Component } from './component.js';

export class DialogComponent extends Component {
  requiredRefs = ['dialog'];
  #previousScrollY = 0;

  connectedCallback() {
    super.connectedCallback();
    if (this.minWidth || this.maxWidth) {
      window.addEventListener('resize', this.#handleResize);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.minWidth || this.maxWidth) {
      window.removeEventListener('resize', this.#handleResize);
    }
  }

  #handleResize = debounce(() => {
    const { minWidth, maxWidth } = this;
    if (!minWidth && !maxWidth) return;
    const windowWidth = window.innerWidth;
    if (windowWidth < minWidth || windowWidth > maxWidth) this.closeDialog();
  }, 50);

  showDialog() {
    const { dialog } = this.refs;
    if (dialog.open) return;
    const scrollY = window.scrollY;
    this.#previousScrollY = scrollY;
    requestAnimationFrame(() => {
      document.body.style.width = '100%';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      dialog.showModal();
      this.dispatchEvent(new DialogOpenEvent());
      this.addEventListener('click', this.#handleClick);
      this.addEventListener('keydown', this.#handleKeyDown);
    });
  }

  closeDialog = async () => {
    const { dialog } = this.refs;
    if (!dialog.open) return;
    this.removeEventListener('click', this.#handleClick);
    this.removeEventListener('keydown', this.#handleKeyDown);
    dialog.style.animation = 'none';
    void dialog.offsetWidth;
    dialog.classList.add('dialog-closing');
    dialog.style.animation = '';
    await onAnimationEnd(dialog, undefined, { subtree: false });
    document.body.style.width = '';
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo({ top: this.#previousScrollY, behavior: 'instant' });
    dialog.close();
    dialog.classList.remove('dialog-closing');
    this.dispatchEvent(new DialogCloseEvent());
  };

  toggleDialog = () => {
    if (this.refs.dialog.open) this.closeDialog();
    else this.showDialog();
  };

  #handleClick(event) {
    if (isClickedOutside(event, this.refs.dialog)) this.closeDialog();
  }

  #handleKeyDown(event) {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    this.closeDialog();
  }

  get minWidth() {
    return Number(this.getAttribute('dialog-active-min-width'));
  }

  get maxWidth() {
    return Number(this.getAttribute('dialog-active-max-width'));
  }
}

if (!customElements.get('dialog-component')) customElements.define('dialog-component', DialogComponent);

export class DialogOpenEvent extends CustomEvent {
  constructor() {
    super(DialogOpenEvent.eventName);
  }
  static eventName = 'dialog:open';
}

export class DialogCloseEvent extends CustomEvent {
  constructor() {
    super(DialogCloseEvent.eventName);
  }
  static eventName = 'dialog:close';
}

document.addEventListener(
  'toggle',
  (event) => {
    if (event.target instanceof HTMLDetailsElement) {
      if (event.target.hasAttribute('scroll-lock')) {
        if (event.target.open) document.documentElement.setAttribute('scroll-lock', '');
        else document.documentElement.removeAttribute('scroll-lock');
      }
    }
  },
  { capture: true }
);
