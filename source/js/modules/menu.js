import {FocusLock} from '../utils/focus-lock.js';
import {ScrollLock} from '../utils/scroll-lock.js';

const mainNav = document.querySelector('.main-nav');
const mainElement = document.querySelector('main');
const breakpointNotMbile = window.matchMedia('(min-width: 768px)');
const isEscapeKey = (evt) => evt.key === 'Escape';

const focusLock = new FocusLock();
const scrollLock = new ScrollLock();

const lockFocusScroll = () => {
  focusLock.lock('.main-nav');
  scrollLock.disableScrolling();
};

const unlockFocusScroll = () => {
  focusLock.unlock();
  scrollLock.enableScrolling();
};

const closeMenu = () => {
  mainNav.classList.remove('main-nav--opened');
  mainNav.classList.add('main-nav--closed');
  unlockFocusScroll();
  mainElement.removeEventListener('click', closeMenu);
};

const closeMenulOnEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMenu();
    document.removeEventListener('keydown', closeMenulOnEscape);
  }
};

const applySettings = () => {
  const textContainer = mainNav.querySelector('span');

  if (mainNav.classList.contains('main-nav--opened')) {
    lockFocusScroll();
    document.addEventListener('keydown', closeMenulOnEscape);
    mainElement.addEventListener('click', closeMenu);
    textContainer.textContent = 'Закрыть меню';
  } else {
    unlockFocusScroll();
    mainElement.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', closeMenulOnEscape);
    textContainer.textContent = 'Открыть меню';
  }
};

const menuHandler = () => {
  if (!breakpointNotMbile.matches) {
    const button = mainNav.querySelector('button');
    button.setAttribute('tabIndex', 2);

    mainNav.classList.toggle('main-nav--opened');
    mainNav.classList.toggle('main-nav--closed');

    applySettings();
  }
};

const initNav = () => {
  mainNav.addEventListener('click', menuHandler);
};

const navBreakpointChecker = () => {
  if (breakpointNotMbile.matches && mainNav.classList.contains('main-nav__list--opened')) {
    closeMenu();
  }
};

breakpointNotMbile.addEventListener('change', navBreakpointChecker);

export {initNav};
