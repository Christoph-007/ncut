import { debounce, throttle, prefersReducedMotion } from './utilities.js';

const SCROLL_END_TIMEOUT = 50;

export class Scroller {
  element;
  #promise = undefined;
  #resolve = undefined;
  #throttledCallback;
  #endCallback;
  #onScrollInit;
  #onScrollEnd;
  #userEvent = true;
  #ignore = false;
  #isScrolling = false;

  constructor(element, options) {
    this.#throttledCallback = throttle(options.onScroll, SCROLL_END_TIMEOUT);
    this.#endCallback = options.onScroll;
    this.#onScrollInit = options.onScrollStart;
    this.#onScrollEnd = options.onScrollEnd;
    this.element = element;
    this.element.addEventListener('scroll', this.#handleScroll);
  }

  async to(input, options) {
    let value;
    if (input instanceof HTMLElement) {
      const paddingStart = calculatePaddingStart(this.element, this.axis);
      value = input[`offset${this.#edge}`] - paddingStart;
    } else {
      value = input;
    }
    const currentPosition = this.element[`scroll${this.#edge}`];
    const willChange = currentPosition !== value;
    if (willChange) {
      this.#scroll({ ...options, method: 'scrollTo', value });
    } else if (this.#isScrolling) {
      this.#handleScrollEnd(false);
    }
  }

  by(value, options) {
    this.#scroll({ ...options, method: 'scrollBy', value });
  }

  #scroll(options) {
    const { method, value, instant = prefersReducedMotion() } = options;
    this.#reset();
    this.#ignore = instant;
    this.#userEvent = false;
    const currentPosition = this.element[`scroll${this.#edge}`];
    const targetPosition = method === 'scrollBy' ? currentPosition + value : value;
    const scrollDistance = Math.abs(targetPosition - currentPosition);
    if (scrollDistance < 1) return Promise.resolve();
    if (!instant) this.#setup();
    this.element[method]({ [this.#edge.toLowerCase()]: value, behavior: instant ? 'instant' : 'smooth' });
  }

  get axis() {
    return getScrollAxis(this.element);
  }

  get finished() {
    return this.#promise ?? Promise.resolve();
  }

  get #edge() {
    return this.axis === 'x' ? 'Left' : 'Top';
  }

  #setup() {
    if (this.#promise) return;
    this.#promise = new Promise((resolve) => (this.#resolve = resolve));
  }

  #reset = () => {
    this.#handleScrollEnd.cancel();
    this.#resolve?.();
    this.#promise = undefined;
    this.#resolve = undefined;
    this.#userEvent = true;
    this.#ignore = false;
  };

  #handleScroll = () => {
    if (!this.#isScrolling) {
      this.#onScrollInit?.();
      this.#isScrolling = true;
    }
    if (this.#ignore) {
      this.#reset();
      this.#handleScrollEnd(false);
      return;
    }
    const userEvent = this.#userEvent;
    this.#setup();
    if (userEvent) this.#throttledCallback();
    this.#handleScrollEnd(userEvent);
  };

  #handleScrollEnd = debounce((userEvent) => {
    this.#resolve?.();
    if (userEvent) this.#endCallback();
    this.#reset();
    if (this.#isScrolling) {
      this.#onScrollEnd?.();
      this.#isScrolling = false;
    }
  }, SCROLL_END_TIMEOUT);

  set snap(value) {
    this.#ignore = true;
    this.element.style.setProperty('scroll-snap-type', value ? `${this.axis} mandatory` : 'none');
  }

  destroy() {
    this.element.removeEventListener('scroll', this.#handleScroll);
  }
}

function getScrollAxis(el) {
  if (el.scrollHeight > el.clientHeight && el.scrollWidth === el.clientWidth) return 'y';
  if (el.scrollWidth > el.clientWidth && el.scrollHeight === el.clientHeight) return 'x';
  return el.scrollWidth > el.scrollHeight ? 'x' : 'y';
}

function calculatePaddingStart(element, axis) {
  const computedStyle = getComputedStyle(element);
  const value = axis === 'x' ? computedStyle.paddingInlineStart : computedStyle.paddingBlockStart;
  return parseFloat(value);
}

export function scrollIntoView(element, { ancestor, behavior = 'smooth', block = 'start', inline = 'start' } = {}) {
  if (!ancestor) {
    return element.scrollIntoView({ behavior, block, inline });
  }

  const elemRect = element.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();

  const calculateScrollOffset = (alignment, ancestorStart, ancestorLength, elemStart, elemLength, currentScroll) => {
    switch (alignment) {
      case 'start': return currentScroll + elemStart - ancestorStart;
      case 'center': return currentScroll + elemStart - ancestorStart - ancestorLength / 2 + elemLength / 2;
      case 'end': return currentScroll + elemStart - ancestorStart - ancestorLength + elemLength;
      default: return currentScroll;
    }
  };

  const scrollTop = ancestor.scrollHeight > ancestor.clientHeight
    ? calculateScrollOffset(block, ancestorRect.top, ancestor.clientHeight, elemRect.top, elemRect.height, ancestor.scrollTop)
    : ancestor.scrollTop;

  const scrollLeft = ancestor.scrollWidth > ancestor.clientWidth
    ? calculateScrollOffset(inline, ancestorRect.left, ancestor.clientWidth, elemRect.left, elemRect.width, ancestor.scrollLeft)
    : ancestor.scrollLeft;

  ancestor.scrollTo({ top: scrollTop, left: scrollLeft, behavior });
}
