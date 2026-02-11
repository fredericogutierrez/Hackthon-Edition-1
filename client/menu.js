document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');

  if (!menuBtn || !sideMenu) return;

  // Abre / fecha pelo botão
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // impede o clique de "vazar"
    sideMenu.classList.toggle('open');
  });

  // Impede clique dentro do menu de fechar
  sideMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Clique fora fecha o menu
  document.addEventListener('click', () => {
    if (sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
    }
  });
});
