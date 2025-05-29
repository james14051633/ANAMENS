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
  ],
  afls: [
    { label: 'RC1 - Identificar alimentos com talheres', type: 'select', name: 'RC1', options: ['0', '1', '2'], required: true },
    { label: 'RC2 - Usar colher com sólidos', type: 'select', name: 'RC2', options: ['0', '1', '2'], required: true },
    { label: 'RC3 - Usar colher com líquidos', type: 'select', name: 'RC3', options: ['0', '1', '2'], required: true },
    { label: 'RC4 - Usar o garfo', type: 'select', name: 'RC4', options: ['0', '1', '2', '3', '4'], required: true }
    // Adicione mais tarefas conforme necessário
  ],
  ahemd_is: [
    { label: 'Nome da criança', type: 'text', name: 'nome_crianca', required: true },
    { label: 'Nome do responsável', type: 'text', name: 'nome_responsavel', required: true },
    { label: 'Sexo', type: 'select', name: 'sexo', required: true, options: ['Masculino', 'Feminino'] },
    { label: 'Data de nascimento', type: 'date', name: 'data_nascimento', required: true },
    { label: 'Prematuro', type: 'select', name: 'prematuro', required: true, options: ['Sim', 'Não'] },
    { label: 'Peso ao nascer (gramas)', type: 'text', name: 'peso_nascimento' },
    { label: 'Idade gestacional (semanas)', type: 'text', name: 'idade_gestacional' },
    { label: 'Tempo na creche/escolinha', type: 'select', name: 'tempo_creche', options: ['Nunca', 'Menos de 3 meses', '3-6 meses', '7-12 meses', 'Acima de 12 meses'] },
    { label: 'Espaço externo seguro e amplo para brincar', type: 'select', name: 'espaco_externo', required: true, options: ['Sim', 'Não'] },
    { label: 'Mais de um tipo de piso externo', type: 'select', name: 'piso_externo_varios', options: ['Sim', 'Não'] },
    { label: 'Superfícies inclinadas externas', type: 'select', name: 'superficie_inclinada', options: ['Sim', 'Não'] },
    { label: 'Suporte seguro externo para apoio', type: 'select', name: 'suporte_externo', options: ['Sim', 'Não'] },
    { label: 'Degraus ou escadas externas', type: 'select', name: 'degraus_externos', options: ['Sim', 'Não'] },
    { label: 'Espaço interno suficiente para brincar', type: 'select', name: 'espaco_interno', required: true, options: ['Sim', 'Não'] },
    { label: 'Mais de um tipo de piso interno', type: 'select', name: 'piso_interno_varios', options: ['Sim', 'Não'] },
    { label: 'Suporte seguro interno para apoio', type: 'select', name: 'suporte_interno', options: ['Sim', 'Não'] },
    { label: 'Degraus ou escadas internas', type: 'select', name: 'degraus_internos', options: ['Sim', 'Não'] },
    { label: 'Lugar especial para guardar brinquedos', type: 'select', name: 'lugar_brinquedos', options: ['Sim', 'Não'] },
    { label: 'Brinca regularmente com outras crianças', type: 'select', name: 'brinca_criancas', options: ['Sim', 'Não'] },
    { label: 'Momento diário para brincar com o bebê', type: 'select', name: 'momento_brincar', options: ['Sim', 'Não'] },
    { label: 'Brinca regularmente com outros adultos', type: 'select', name: 'brinca_adultos', options: ['Sim', 'Não'] },
    { label: 'Brinquedos suspensos (móbiles)', type: 'select', name: 'num_brinquedos_suspensos', options: ['Nenhum', 'Um - dois', 'Três - quatro', 'Cinco ou mais'] },
    { label: 'Brinquedos manipuláveis', type: 'select', name: 'num_brinquedos_manipulaveis', options: ['Nenhum', 'Um - dois', 'Três - quatro', 'Cinco ou mais'] }
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
  pdf.text('Ficha de Terapia Ocupacional - ' + modelo.charAt(0).toUpperCase() + modelo.slice(1), 10, 20);

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

  const nomePaciente = document.getElementById('nome')?.value.trim().replace(/\s+/g, '_') || 'Paciente';
  pdf.save(`Ficha_${modelo}_${nomePaciente}.pdf`);
}
