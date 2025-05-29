// Corrija os modelos conforme abaixo
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
    { label: 'Nome do Cliente', type: 'text', name: 'nome_cliente', required: true },
    { label: 'Data', type: 'date', name: 'data', required: true },
    { label: 'Idade', type: 'number', name: 'idade', required: true, min: 0 },
    { label: 'Sexo', type: 'select', name: 'sexo', required: true, options: ['Feminino', 'Masculino', 'Outro'] },
    { label: 'Ocupação Principal', type: 'text', name: 'ocupacao', required: true },
    { label: 'Problemas de Desempenho (descreva até 5)', type: 'textarea', name: 'problemas', required: true },
    { label: 'Importância (0 a 10)', type: 'number', name: 'importancia', required: true, min: 0, max: 10 },
    { label: 'Desempenho (0 a 10)', type: 'number', name: 'desempenho', required: true, min: 0, max: 10 },
    { label: 'Satisfação (0 a 10)', type: 'number', name: 'satisfacao', required: true, min: 0, max: 10 },
    { label: 'Observações', type: 'textarea', name: 'observacoes', required: false }
  ],
  // ... continue os outros modelos normalmente, sem duplicidade ...
};

// Aguarde o carregamento do DOM antes de executar
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
