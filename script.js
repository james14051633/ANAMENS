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
  ]
};

const sidebarButtons = document.querySelectorAll('.sidebar button');
const formContainer = document.getElementById('form-container');
const protocolTitle = document.getElementById('protocol-title');
const clearBtn = document.getElementById('clear-btn');

let currentProtocol = 'denver_ii';

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
    }
    input.name = field.name;
    input.id = field.name;
    if (field.required) input.required = true;

    form.appendChild(input);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Salvar';
  form.appendChild(submitBtn);

  formContainer.appendChild(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(fields, form)) return;
    saveFormData(currentProtocol, fields, form);
    alert('Dados salvos com sucesso!');
  });

  loadFormData(currentProtocol, fields, form);
}

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

    // Activity text input
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

    // Performance number input
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

    // Satisfaction number input
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
    copm: 'COPM'
  }[protocol] || '';

  if (protocol === 'copm') {
    createCOPMForm();
  } else {
    createStandardForm(modelos[protocol]);
  }
}

sidebarButtons.forEach(button => {
  button.addEventListener('click', () => {
    sidebarButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderProtocol(button.dataset.protocol);
  });
});

clearBtn.addEventListener('click', () => {
  if (confirm('Deseja realmente limpar os dados deste protocolo?')) {
    localStorage.removeItem(`formData_${currentProtocol}`);
    renderProtocol(currentProtocol);
  }
});

// Inicializa com Denver II
renderProtocol(currentProtocol);
