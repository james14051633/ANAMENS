document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anamnese-form');
  if (!form) return;

  function salvarDados() {
    const dados = {};
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        dados[input.name + '_' + input.value] = input.checked;
      } else {
        dados[input.name] = input.value;
      }
    });

    localStorage.setItem('fichaAnamneseDados', JSON.stringify(dados));
  }

  function carregarDados() {
    const dadosSalvos = localStorage.getItem('fichaAnamneseDados');
    if (!dadosSalvos) return;

    const dados = JSON.parse(dadosSalvos);
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        const key = input.name + '_' + input.value;
        input.checked = dados[key] || false;
      } else if (dados[input.name]) {
        input.value = dados[input.name];
      }
    });
  }

  carregarDados();

  form.addEventListener('submit', () => {
    salvarDados();
  });

  form.addEventListener('change', () => {
    salvarDados();
  });
});
