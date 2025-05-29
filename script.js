const modelos = {
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
  checklist_denver: [
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
  copm: [
    {
      category: "Cuidados Pessoais",
      questions: [
        "Escolha uma atividade importante para você relacionada a cuidados pessoais",
        "Avalie seu desempenho nessa atividade (1 a 10)",
        "Avalie sua satisfação com seu desempenho nessa atividade (1 a 10)"
      ]
    },
    {
      category: "Lazer",
      questions: [
        "Escolha uma atividade importante para você relacionada a lazer",
        "Avalie seu desempenho nessa atividade (1 a 10)",
        "Avalie sua satisfação com seu desempenho nessa atividade (1 a 10)"
      ]
    },
    {
      category: "Trabalho",
      questions: [
        "Escolha uma atividade importante para você relacionada ao trabalho",
        "Avalie seu desempenho nessa atividade (1 a 10)",
        "Avalie sua satisfação com seu desempenho nessa atividade (1 a 10)"
      ]
    }
  ],
  anamnese_to: [
    { label: 'Nome completo', type: 'text', name: 'nome', required: true },
    { label: 'Idade (anos)', type: 'number', name: 'idade', min: 0, max: 120, required: true },
    { label: 'Sexo', type: 'select', name: 'sexo', required: true, options: ['Feminino', 'Masculino', 'Outro'] },
    { label: 'Peso (kg)', type: 'number', name: 'peso', min: 0, step: 0.1, required: true },
    { label: 'Altura (cm)', type: 'number', name: 'altura', min: 0, step: 0.1, required: true },
    { label: 'IMC (calculado)', type: 'text', name: 'imc', required: false, readonly: true },
    { label: 'Condições clínicas prévias', type: 'textarea', name: 'condicoes' },
    { label: 'Medicações atuais', type: 'textarea', name: 'medicacoes' },
    { label: 'Alergias', type: 'textarea', name: 'alergias' },
    { label: 'Atividades diárias com dificuldade', type: 'textarea', name: 'atividade_diaria' },
    { label: 'Escala de dor (0 a 10)', type: 'number', name: 'escala_dor', min: 0, max: 10 },
    { label: 'Nível de estresse (0 a 10)', type: 'number', name: 'estresse', min: 0, max: 10 },
    { label: 'Observações adicionais', type: 'textarea', name: 'observacoes' }
  ]
};

// Elementos do DOM
const sidebarButtons = document.querySelectorAll('.sidebar button');
const formContainer = document.getElementById('form-container');
const protocolTitle = document.getElementById('protocol-title');
const clearBtn = document.getElementById('clear-btn');

let currentProtocol = 'denver_ii';

// Cria formulário padrão (denver_ii, checklist_denver e anamnese_to)
function createStandardForm(fields) {
  formContainer.innerHTML = '';
  const form = document.createElement('form');
  form.id = 'standard-form';

  fields.forEach(field => {
    const label = document.createElement('label');
    label.htmlFor = field.name;
    label.textContent = field.label + (field.required ? ' *' : '');
    form.appendChild(label);

    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 4;
    } else if (field.type === 'select') {
      input = document.createElement('select');
      field.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        input.appendChild(option);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type;
      if (field.min !== undefined) input.min = field.min;
      if (field.max !== undefined) input.max = field.max;
      if (field.step !== undefined) input.step = field.step;
      if (field.readonly) input.readOnly = true;
    }
    input.name = field.name;
    input.id = field.name;
    if (field.required) input.required = true;

    form.appendChild(input);
  });

  // Para o protocolo anamnese_to, adiciona cálculo automático do IMC
  if (currentProtocol === 'anamnese_to') {
    const pesoInput = form.querySelector('input[name="peso"]');
    const alturaInput = form.querySelector('input[name="altura"]');
    const imcInput = form.querySelector('input[name="imc"]');

    function calculaIMC() {
      const peso = parseFloat(pesoInput.value);
      const alturaCm = parseFloat(alturaInput.value);
      if (peso > 0 && alturaCm > 0) {
        const alturaM = alturaCm / 100;
        const imc = peso / (alturaM * alturaM);
        imcInput.value = imc.toFixed(2);
      } else {
        imcInput.value = '';
      }
    }

    pesoInput.addEventListener('input', calculaIMC);
    alturaInput.addEventListener('input', calculaIMC);
  }

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Salvar';
  form.appendChild(submitBtn);

  formContainer.appendChild(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(fields, form)) return;
    saveFormData(currentProtocol, fields, form);

    if (currentProtocol === 'anamnese_to') {
      mostrarResumoAnamnese(form);
    } else {
      alert('Dados salvos com sucesso!');
    }
  });

  loadFormData(currentProtocol, fields, form);

  // Se for anamnese_to e já tem dados, mostra resumo
  if (currentProtocol === 'anamnese_to') {
    mostrarResumoAnamnese(form);
  }
}

// Função para exibir resumo da anamnese
function mostrarResumoAnamnese(form) {
  const dados = {};
  modelos.anamnese_to.forEach(field => {
    const input = form[field.name];
    dados[field.name] = input ? input.value : '';
  });

  const resultDiv = document.getElementById('result') || document.createElement('div');
  resultDiv.id = 'result';
  resultDiv.style.marginTop = '20px';
  resultDiv.style.padding = '15px';
  resultDiv.style.border = '1px solid #4a3fbd';
  resultDiv.style.backgroundColor = '#eef1fc';

  resultDiv.innerHTML = `
    <h3>Resumo da Anamnese</h3>
    <p><strong>Nome:</strong> ${dados.nome}</p>
    <p><strong>Idade:</strong> ${dados.idade} anos</p>
    <p><strong>Sexo:</strong> ${dados.sexo}</p>
    <p><strong>Peso:</strong> ${dados.peso} kg</p>
    <p><strong>Altura:</strong> ${dados.altura} cm</p>
    <p><strong>IMC:</strong> ${dados.imc}</p>
    <hr />
    <p><strong>Condições clínicas prévias:</strong> ${dados.condicoes || 'Nenhuma'}</p>
    <p><strong>Medicações atuais:</strong> ${dados.medicacoes || 'Nenhuma'}</p>
    <p><strong>Alergias:</strong> ${dados.alergias || 'Nenhuma'}</p>
    <hr />
    <p><strong>Atividades diárias com dificuldade:</strong> ${dados.atividade_diaria || 'Nenhuma'}</p>
    <p><strong>Escala de dor:</strong> ${dados.escala_dor || 'Não informada'}</p>
    <p><strong>Nível de estresse:</strong> ${dados.estresse || 'Não informado'}</p>
    <hr />
    <p><strong>Observações adicionais:</strong> ${dados.observacoes || 'Nenhuma'}</p>
  `;

  if (!document.getElementById('result')) {
    formContainer.appendChild(resultDiv);
  }
}

// As funções validateForm, saveFormData, loadFormData, createCOPMForm e validações/copm continuam iguais:

function validateForm(fields, form) {
  let valid = true;
  let messages = [];
  fields.forEach(field => {
    const input = form[field.name];
    if (!input) return;
    if (field.required && !input.value.trim()) {
      valid = false;
      input.classList.add('invalid');
      messages.push(`O campo "${field.label}" é obrigatório.`);
    } else {
      input.classList.remove('invalid');
    }
    if (field.type === 'number' && input.value) {
      const val = Number(input.value);
      if (field.min !== undefined && val < field.min) {
        valid = false;
        input.classList.add('invalid');
        messages.push(`O campo "${field.label}" deve ser maior ou igual a ${field.min}.`);
      }
      if (field.max !== undefined && val > field.max) {
        valid = false;
        input.classList.add('invalid');
        messages.push(`O campo "${field.label}" deve ser menor ou igual a ${field.max}.`);
      }
    }
  });
  if (!valid) alert(messages.join('\n'));
  return valid;
}

function saveFormData(protocol, fields, form) {
  const data = {};
  fields.forEach(field => {
    const input = form[field.name];
    if (input) data[field.name] = input.value;
  });
  localStorage.setItem(`formData_${protocol}`, JSON.stringify(data));
}

function loadFormData(protocol, fields, form) {
  const dataRaw = localStorage.getItem(`formData_${protocol}`);
  if (!dataRaw) return;
  const data = JSON.parse(dataRaw);
  fields.forEach(field => {
    const input = form[field.name];
    if (input && data[field.name]) {
      input.value = data[field.name];
    }
  });
}

// Funções do COPM (mantém seu código atual)

function createCOPMForm() {
  formContainer.innerHTML = '';

  const form = document.createElement('form');
  form.id = 'copm-form';

  modelos.copm.forEach((section, i) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('copm-section');

    const title = document.createElement('h2');
    title.textContent = section.category;
    sectionDiv.appendChild(title);

    const activityLabel = document.createElement('label');
    activityLabel.htmlFor = `activity_${i}`;
    activityLabel.textContent = section.questions[0];
    sectionDiv.appendChild(activityLabel);

    const activityInput = document.createElement('input');
    activityInput.type = 'text';
    activityInput.id = `activity_${i}`;
    activityInput.name = `activity_${i}`;
    activityInput.required = true;
    sectionDiv.appendChild(activityInput);

    const perfLabel = document.createElement('label');
    perfLabel.htmlFor = `performance_${i}`;
    perfLabel.textContent = section.questions[1];
    sectionDiv.appendChild(perfLabel);

    const perfInput = document.createElement('input');
    perfInput.type = 'number';
    perfInput.id = `performance_${i}`;
    perfInput.name = `performance_${i}`;
    perfInput.min = 1;
    perfInput.max = 10;
    perfInput.required = true;
    sectionDiv.appendChild(perfInput);

    const satLabel = document.createElement('label');
    satLabel.htmlFor = `satisfaction_${i}`;
    satLabel.textContent = section.questions[2];
    sectionDiv.appendChild(satLabel);

    const satInput = document.createElement('input');
    satInput.type = 'number';
    satInput.id = `satisfaction_${i}`;
    satInput.name = `satisfaction_${i}`;
    satInput.min = 1;
    satInput.max = 10;
    satInput.required = true;
    sectionDiv.appendChild(satInput);

    form.appendChild(sectionDiv);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Enviar';
  form.appendChild(submitBtn);

  const resultDiv = document.createElement('div');
  resultDiv.id = 'result';
  resultDiv.style.display = 'none';
  form.appendChild(resultDiv);

  formContainer.appendChild(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = validateCOPMForm(form);
    if (!valid) return;
    saveCOPMForm(form);
    alert('Dados salvos com sucesso!');
  });

  loadCOPMForm();
}

function validateCOPMForm(form) {
  let valid = true;
  let messages = [];
  modelos.copm.forEach((section, i) => {
    const activity = form[`activity_${i}`];
    const performance = form[`performance_${i}`];
    const satisfaction = form[`satisfaction_${i}`];

    if (!activity.value.trim()) {
      valid = false;
      activity.classList.add('invalid');
      messages.push(`Atividade em "${section.category}" é obrigatória.`);
    } else {
      activity.classList.remove('invalid');
    }
    const perfVal = Number(performance.value);
    if (!(perfVal >= 1 && perfVal <= 10)) {
      valid = false;
      performance.classList.add('invalid');
      messages.push(`Desempenho em "${section.category}" deve ser entre 1 e 10.`);
    } else {
      performance.classList.remove('invalid');
    }
    const satVal = Number(satisfaction.value);
    if (!(satVal >= 1 && satVal <= 10)) {
      valid = false;
      satisfaction.classList.add('invalid');
      messages.push(`Satisfação em "${section.category}" deve ser entre 1 e 10.`);
    } else {
      satisfaction.classList.remove('invalid');
    }
  });
  if (!valid) alert(messages.join('\n'));
  return valid;
}

function saveCOPMForm(form) {
  const data = {};
  modelos.copm.forEach((section, i) => {
    data[`activity_${i}`] = form[`activity_${i}`].value;
    data[`performance_${i}`] = form[`performance_${i}`].value;
    data[`satisfaction_${i}`] = form[`satisfaction_${i}`].value;
  });
  localStorage.setItem('formData_copm', JSON.stringify(data));
}

function loadCOPMForm() {
  const dataRaw = localStorage.getItem('formData_copm');
  if (!dataRaw) return;
  const data = JSON.parse(dataRaw);
  const form = document.getElementById('copm-form');
  if (!form) return;
  modelos.copm.forEach((section, i) => {
    if (data[`activity_${i}`]) form[`activity_${i}`].value = data[`activity_${i}`];
    if (data[`performance_${i}`]) form[`performance_${i}`].value = data[`performance_${i}`];
    if (data[`satisfaction_${i}`]) form[`satisfaction_${i}`].value = data[`satisfaction_${i}`];
  });
}

function renderProtocol(protocol) {
  currentProtocol = protocol;
  protocolTitle.textContent = {
    denver_ii: 'Denver II',
    checklist_denver: 'Checklist Denver',
    copm: 'COPM',
    anamnese_to: 'Anamnese TO'
  }[protocol] || '';

  if (protocol === 'copm') {
    createCOPMForm();
  } else if (protocol === 'anamnese_to') {
    createStandardForm(modelos.anamnese_to);
  } else {
    createStandardForm(modelos[protocol]);
  }
}

sidebarButtons.forEach(button => {
  button.addEventListener('click', () => {
    sidebarButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderProtocol(b
