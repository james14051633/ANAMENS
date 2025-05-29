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

// Função para criar o formulário COPM dinamicamente e validar
function createCOPMForm(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Elemento com id "${containerId}" não encontrado.`);
    return;
  }

  // Limpa container
  container.innerHTML = '';

  // Criar o formulário
  const form = document.createElement("form");
  form.id = "copmForm";

  modelos.copm.forEach((section, i) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.style.border = "1px solid #ddd";
    sectionDiv.style.padding = "10px";
    sectionDiv.style.marginBottom = "15px";

    const title = document.createElement("h2");
    title.textContent = section.category;
    sectionDiv.appendChild(title);

    // Pergunta 1 - texto
    const q1Label = document.createElement("label");
    q1Label.setAttribute("for", `activity_${i}`);
    q1Label.textContent = section.questions[0];
    sectionDiv.appendChild(q1Label);

    const q1Input = document.createElement("input");
    q1Input.type = "text";
    q1Input.id = `activity_${i}`;
    q1Input.name = `activity_${i}`;
    q1Input.required = true;
    sectionDiv.appendChild(q1Input);

    // Pergunta 2 - número
    const q2Label = document.createElement("label");
    q2Label.setAttribute("for", `performance_${i}`);
    q2Label.textContent = section.questions[1];
    sectionDiv.appendChild(q2Label);

    const q2Input = document.createElement("input");
    q2Input.type = "number";
    q2Input.id = `performance_${i}`;
    q2Input.name = `performance_${i}`;
    q2Input.min = 1;
    q2Input.max = 10;
    q2Input.required = true;
    sectionDiv.appendChild(q2Input);

    // Pergunta 3 - número
    const q3Label = document.createElement("label");
    q3Label.setAttribute("for", `satisfaction_${i}`);
    q3Label.textContent = section.questions[2];
    sectionDiv.appendChild(q3Label);

    const q3Input = document.createElement("input");
    q3Input.type = "number";
    q3Input.id = `satisfaction_${i}`;
    q3Input.name = `satisfaction_${i}`;
    q3Input.min = 1;
    q3Input.max = 10;
    q3Input.required = true;
    sectionDiv.appendChild(q3Input);

    form.appendChild(sectionDiv);
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Enviar";
  form.appendChild(submitBtn);

  const resultDiv = document.createElement("div");
  resultDiv.id = "result";
  resultDiv.style.marginTop = "20px";
  resultDiv.style.padding = "15px";
  resultDiv.style.border = "1px solid #ccc";
  resultDiv.style.background = "#f9f9f9";
  resultDiv.style.display = "none";

  container.appendChild(form);
  container.appendChild(resultDiv);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const errors = [];

    modelos.copm.forEach((section, i) => {
      const activity = form[`activity_${i}`].value.trim();
      const performance = Number(form[`performance_${i}`].value);
      const satisfaction = Number(form[`satisfaction_${i}`].value);

      if (!activity) {
        valid = false;
        errors.push(`Atividade em "${section.category}" é obrigatória.`);
      }
      if (!(performance >= 1 && performance <= 10)) {
        valid = false;
        errors.push(`Desempenho em "${section.category}" deve ser entre 1 e 10.`);
      }
      if (!(satisfaction >= 1 && satisfaction <= 10)) {
        valid = false;
        errors.push(`Satisfação em "${section.category}" deve ser entre 1 e 10.`);
      }
    });

    if (!valid) {
      resultDiv.style.display = "block";
      resultDiv.style.color = "red";
      resultDiv.innerHTML = errors.map(e => `<p>${e}</p>`).join("");
      return;
    }

    let output = "<h3>Resultados da Ficha COPM:</h3>";
    modelos.copm.forEach((section, i) => {
      output += `<h4>${section.category}</h4>`;
      output += `<p><strong>Atividade:</strong> ${form[`activity_${i}`].value}</p>`;
      output += `<p><strong>Desempenho:</strong> ${form[`performance_${i}`].value}</p>`;
      output += `<p><strong>Satisfação:</strong> ${form[`satisfaction_${i}`].value}</p>`;
    });

    resultDiv.style.display = "block";
    resultDiv.style.color = "black";
    resultDiv.innerHTML = output;
  });
}

// Controle dos outros modelos dinâmicos
document.addEventListener('DOMContentLoaded', function() {
  const modeloSelect = document.getElementById('modelo');
  const form = document.getElementById('ficha-form');
  const formContent = document.getElementById('form-content');
  const limparBtn = document.getElementById('limpar-btn');

  modeloSelect.addEventListener('change', () => {
    const modelo = modeloSelect.value;
    formContent.innerHTML = '';
    if (!modelo || !modelos[modelo]) {
      form.style.display = 'none';
      limparBtn.style.display = 'none';
      return;
    }

    // Se o modelo for COPM, cria o formulário COPM separado
    if(modelo === 'copm') {
      form.style.display = 'none'; // esconde o form padrão
      limparBtn.style.display = 'inline-block';
      createCOPMForm('form-content');
      return;
    }

    // Para os outros modelos (denver_ii e checklist_denver)
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
        if (campo.min !== undefined) input.min = campo.min;
        if (campo.max !== undefined) input.max = campo.max;
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
    modelos[modelo].forEach(campo => {
      const el = document.getElementById(campo.name);
      if (el) el.value = '';
    });
    alert('Dados limpos!');
  });

  // Para submissão dos formulários padrão (denver_ii e checklist_denver)
  form.addEventListener('submit', e => {
    e.preventDefault();
    const modelo = modeloSelect.value;
    if (!modelo) {
      alert('Selecione um modelo de ficha.');
      return;
    }

    let valido = true;
    let mensagensErro = [];

    modelos[modelo].forEach(campo => {
      const el = document.getElementById(campo.name);
      if (campo.required && el) {
        if (!el.value.trim()) {
          el.classList.add('invalid');
          valido = false;
          mensagensErro.push(`O campo "${campo.label}" é obrigatório.`);
        } else {
          el.classList.remove('invalid');
        }
      }
      // Validação de min/max para campos numéricos
      if (campo.type === 'number' && el && el.value) {
        const valor = Number(el.value);
        if (campo.min !== undefined && valor < campo.min) {
          el.classList.add('invalid');
          valido = false;
          mensagensErro.push(`O campo "${campo.label}" deve ser maior ou igual a ${campo.min}.`);
        }
        if (campo.max !== undefined && valor > campo.max) {
          el.classList.add('invalid');
          valido = false;
          mensagensErro.push(`O campo "${campo.label}" deve ser menor ou igual a ${campo.max}.`);
        }
      }
    });

    if (!valido) {
      alert(mensagensErro.join('\n'));
      return;
    }

    salvarDados(modelo);
    alert('Dados salvos com sucesso!');
  });
});
