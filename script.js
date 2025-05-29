const modelos = {
  pediatrica: [
    { label: 'Nome da Criança', type: 'text', name: 'nome', required: true },
    { label: 'Data de Nascimento', type: 'date', name: 'data_nascimento', required: true },
    { label: 'Desenvolvimento Motor', type: 'textarea', name: 'desenvolvimento_motor' },
    { label: 'Habilidades Sociais', type: 'textarea', name: 'habilidades_sociais' },
    { label: 'Observações', type: 'textarea', name: 'observacoes' }
  ],
  adulto: [
    { label: 'Nome Completo', type: 'text', name: 'nome', required: true },
    { label: 'Data de Nascimento', type: 'date', name: 'data_nascimento', required: true },
    { label: 'Atividades de Vida Diária', type: 'textarea', name: 'avd' },
    { label: 'Trabalho', type: 'textarea', name: 'trabalho' },
    { label: 'Objetivos Terapêuticos', type: 'textarea', name: 'objetivos' }
  ],
  especial: [
    { label: 'Nome Completo', type: 'text', name: 'nome', required: true },
    { label: 'Data de Nascimento', type: 'date', name: 'data_nascimento', required: true },
    { label: 'Tecnologias Assistivas Usadas', type: 'textarea', name: 'tecnologias_assistivas' },
    { label: 'Suporte Familiar', type: 'textarea', name: 'suporte_familiar' },
    { label: 'Necessidades Especiais', type: 'textarea', name: 'necessidades_especiais' }
  ]
};

const modeloSelect = document.getElementById('modelo');
const form = document.getElementById('ficha-form');
const formContent = document.getElementById('form-content');
const limparBtn = document.getElementById('limpar-btn');

modeloSelect.addEventListener('change', () => {
  const modelo = modeloSelect.value;
  formContent.innerHTML = '';
  if (!modelo) {
    form.style.display = 'none';
    limparBtn.style.display = 'none';
    return;
  }
  form.style.display = 'block';
  limparBtn.style.display = 'inline-block';

  modelos[modelo].forEach(campo => {
    const label = document.createElement('label');
    label.htmlFor = campo.name;
    label.textContent = campo.label + (campo.required ? '*' : '');
    formContent.appendChild(label);

    let input;
    if (campo.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 4;
    } else {
      input = document.createElement('input');
      input.type = campo.type;
    }
    input.name = campo.name;
    input.id = campo.name;
    if (campo.required) input.required = true;
    formContent.appendChild(input);
  });

  carregarDados(modelo);
});

function salvarDados(modelo) {
  const dados = {};
  modelos[modelo].forEach(campo => {
    const el = document.getElementById(campo.name);
    if (el) {
      dados[campo.name] = el.value;
    }
  });
  localStorage.setItem('ficha_' + modelo, JSON.stringify(dados));
}

function carregarDados(modelo) {
  const dadosSalvos = localStorage.getItem('ficha_' + modelo);
  if (!dadosSalvos) return;
  const dados = JSON.parse(dadosSalvos);
  modelos[modelo].forEach(campo => {
    const el = document.getElementById(campo.name);
    if (el && dados[campo.name]) {
      el.value = dados[campo.name];
    }
  });
}

limparBtn.addEventListener('click', () => {
  const modelo = modeloSelect.value;
  if (!modelo) return;
  localStorage.removeItem('ficha_' + modelo);
  carregarDados(modelo);
  alert('Dados limpos!');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const modelo = modeloSelect.value;
  if (!modelo) {
    alert('Selecione um modelo de ficha.');
    return;
  }

  // Validação visual simples
  let valido = true;
  modelos[modelo].forEach(campo => {
    if (campo.required) {
      const el = document.getElementById(campo.name);
      if (!el.value.trim()) {
        el.classList.add('invalid');
        valido = false;
      } else {
        el.classList.remove('invalid');
      }
    }
  });
  if (!valido) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  salvarDados(modelo);
  gerarPDF(modelo);
});

function gerarPDF(modelo) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.setTextColor(74, 63, 189);
  pdf.text('Ficha de Anamnese - ' + modelo.charAt(0).toUpperCase() + modelo.slice(1), 10, 20);

  let y = 30;

  function adicionarSecao(titulo, campos) {
    pdf.setFontSize(14);
    pdf.setTextColor(74, 63, 189);
    pdf.text(titulo, 10, y);
    y += 8;

    const data = [];

    campos.forEach(({ label, name }) => {
      const el = document.getElementById(name);
      const valor = el ? el.value : '';
      data.push([label, valor || 'Não preenchido']);
    });

    pdf.autoTable({
      head: [['Campo', 'Valor']],
      body: data,
      startY: y,
      theme: 'striped',
      styles: { overflow: 'linebreak', columnWidth: 'auto' },
      columnStyles: { 0: { columnWidth: 50 }, 1: { columnWidth: 140 } }
    });

    y = pdf.autoTable.previous.finalY + 10;
  }

  adicionarSecao('Dados da Ficha', modelos[modelo]);

  const nomePaciente = document.getElementById('nome').value.trim().replace(/\s+/g, '_') || 'Paciente';
  pdf.save(`Ficha_${modelo}_${nomePaciente}.pdf`);
}
