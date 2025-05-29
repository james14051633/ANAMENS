const modelos = {
  // Exemplo de modelo (adicione todos os modelos já enviados nas respostas anteriores)
  denver_ii: [
    { label: 'Nome da criança', type: 'text', name: 'nome_crianca', required: true },
    { label: 'Data de nascimento', type: 'date', name: 'data_nascimento', required: true },
    { label: 'Idade (anos, meses, dias)', type: 'text', name: 'idade', required: true },
    { label: 'Data do teste', type: 'date', name: 'data_teste', required: true },
    { label: 'Nome do avaliador', type: 'text', name: 'avaliador', required: true },
    { label: 'Responsável presente', type: 'text', name: 'responsavel', required: false },
    { label: 'Olha para o rosto', type: 'select', name: 'olha_rosto', required: true, options: ['Passou', 'Falhou', 'Sem oportunidade', 'Recusou'] },
    { label: 'Sorri em resposta', type: 'select', name: 'sorri_resposta', required: true, options: ['Passou', 'Falhou', 'Sem oportunidade', 'Recusou'] },
    { label: 'Observações gerais', type: 'textarea', name: 'observacoes' },
    { label: 'Interpretação do teste', type: 'select', name: 'interpretacao', required: true, options: ['Normal', 'Questionável', 'Não aplicável'] }
  ],
  // ... Adicione todos os outros modelos conforme as respostas anteriores ...
  // Exemplo: copm, sweaa, ebai, bpfas, alberta, escala_labirinto, seletividade_alimentar, triagem_ahs, chores_t12, ahemd_is etc.
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
    } else if (campo.type === 'select') {
      input = document.createElement('select');
      campo.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        input.appendChild(option);
      });
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
    if (el) dados[campo.name] = el.value;
  });
  localStorage.setItem('ficha_' + modelo, JSON.stringify(dados));
}

function carregarDados(modelo) {
  const dadosSalvos = localStorage.getItem('ficha_' + modelo);
  if (!dadosSalvos) return;
  const dados = JSON.parse(dadosSalvos);
  modelos[modelo].forEach(campo => {
    const el = document.getElementById(campo.name);
    if (el && dados[campo.name]) el.value = dados[campo.name];
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
  pdf.text('Ficha de Avaliação - ' + modeloSelect.options[modeloSelect.selectedIndex].text, 10, 20);

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
      columnStyles: { 0: { columnWidth: 70 }, 1: { columnWidth: 120 } }
    });

    y = pdf.autoTable.previous.finalY + 10;
  }

  adicionarSecao('Dados da Ficha', modelos[modelo]);

  // Nome do paciente para nome do arquivo
  let nomePaciente = '';
  if (document.getElementById('nome_crianca')) {
    nomePaciente = document.getElementById('nome_crianca').value.trim().replace(/\s+/g, '_');
  } else if (document.getElementById('nome')) {
    nomePaciente = document.getElementById('nome').value.trim().replace(/\s+/g, '_');
  } else if (document.getElementById('nome_cliente')) {
    nomePaciente = document.getElementById('nome_cliente').value.trim().replace(/\s+/g, '_');
  } else {
    nomePaciente = 'Paciente';
  }
  pdf.save(`Ficha_${modelo}_${nomePaciente}.pdf`);
}
