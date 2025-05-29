
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
<script>
    // Perguntas do protocolo (adicione mais conforme necessário)
    const perguntas = [
      "Prefere comer sozinho(a):",
      "Sente-se desconfortável ao comer com outras pessoas:",
      "Evita certos alimentos por causa da textura:",
      "Mastiga os alimentos por muito tempo:",
      "Come sempre no mesmo horário:",
      "Segue uma ordem específica ao comer:"
    ];

    // Opções de resposta
    const opcoes = [
      { texto: "Nunca", valor: 0 },
      { texto: "Raramente", valor: 1 },
      { texto: "Às vezes", valor: 2 },
      { texto: "Frequentemente", valor: 3 },
      { texto: "Sempre", valor: 4 }
    ];

    // Criação dinâmica do formulário
    function criarFormulario() {
      const container = document.getElementById('formContainer');
      const form = document.createElement('form');
      form.id = "sweaaForm";
      form.autocomplete = "off";

      // Dados gerais
      const fieldsetDados = document.createElement('fieldset');
      const legendDados = document.createElement('legend');
      legendDados.innerText = "Dados Gerais";
      fieldsetDados.appendChild(legendDados);

      fieldsetDados.innerHTML += `
        <label for="codigo">Código do participante:</label>
        <input type="text" id="codigo" name="codigo" required><br><br>
        <label for="idade">Idade:</label>
        <input type="number" id="idade" name="idade" min="1" required><br><br>
        <label for="sexo">Sexo:</label>
        <select id="sexo" name="sexo" required>
          <option value="">Selecione</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="outro">Outro</option>
        </select>
      `;
      form.appendChild(fieldsetDados);

      // Perguntas
      const fieldsetPerguntas = document.createElement('fieldset');
      const legendPerguntas = document.createElement('legend');
      legendPerguntas.innerText = "Perguntas";
      fieldsetPerguntas.appendChild(legendPerguntas);

      perguntas.forEach((pergunta, idx) => {
        const label = document.createElement('label');
        label.innerText = `${idx + 1}. ${pergunta}`;
        fieldsetPerguntas.appendChild(label);

        opcoes.forEach(opcao => {
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = 'q' + (idx + 1);
          radio.value = opcao.valor;
          radio.id = `q${idx + 1}_${opcao.valor}`;
          radio.onclick = calcularPontuacao;

          const radioLabel = document.createElement('label');
          radioLabel.style.display = "inline";
          radioLabel.htmlFor = radio.id;
          radioLabel.innerText = opcao.texto;

          fieldsetPerguntas.appendChild(radio);
          fieldsetPerguntas.appendChild(radioLabel);
        });
        fieldsetPerguntas.appendChild(document.createElement('br'));
      });

      form.appendChild(fieldsetPerguntas);

      // Botão de cálculo
      const btn = document.createElement('button');
      btn.type = "button";
      btn.className = "btn";
      btn.innerText = "Calcular Pontuação";
      btn.onclick = calcularPontuacao;
      form.appendChild(btn);

      container.appendChild(form);
    }

    // Função de cálculo automático
    function calcularPontuacao() {
      let total = 0;
      let respondidas = 0;

      for (let i = 1; i <= perguntas.length; i++) {
        const radios = document.getElementsByName('q' + i);
        let marcada = false;
        for (let j = 0; j < radios.length; j++) {
          if (radios[j].checked) {
            total += parseInt(radios[j].value);
            marcada = true;
            break;
          }
        }
        if (marcada) respondidas++;
      }

      if (respondidas < perguntas.length) {
        document.getElementById('resultadoScore').innerHTML = "<span style='color:red;'>Por favor, responda todas as perguntas.</span>";
      } else {
        document.getElementById('resultadoScore').textContent = "Pontuação total: " + total;
      }
    }

    // Inicializa o formulário ao carregar a página
    window.onload = criarFormulario;
  </script>



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
