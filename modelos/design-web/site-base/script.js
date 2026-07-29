const themeButton = document.querySelector('#themeButton');
const form = document.querySelector('.contact-form');
const formStatus = document.querySelector('#formStatus');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

themeButton.addEventListener('click', () => {
  const active = document.body.classList.toggle('dark-theme');
  themeButton.setAttribute('aria-pressed', String(active));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name');
  formStatus.textContent = `Obrigado, ${name}. Esta demonstração terminou na própria página e não enviou dados.`;
});
