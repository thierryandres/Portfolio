document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navigation = document.querySelector('.main-nav');

  if (!burger || !navigation) {
    return;
  }

  const navLinks = navigation.querySelectorAll('a');

  const closeNavigation = () => {
    navigation.classList.remove('is-open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  burger.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    burger.classList.toggle('is-active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navigation.classList.contains('is-open')) {
        closeNavigation();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && navigation.classList.contains('is-open')) {
      closeNavigation();
    }
  });
});
