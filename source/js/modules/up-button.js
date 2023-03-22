const button = document.querySelector('.up-button__button');

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

button.addEventListener('click', scrollToTop);

export {scrollToTop};
