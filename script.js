document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anamnese-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação simples dos campos obrigatórios
    const camposObrigatorios = ['nome', 'data-nascimento', 'hiperatividade-sensorial', 'hipoatividade-sensorial', 'comunicacao-verbal', 'emocao'];
    for (const id of camposObrigatorios) {
      const campo = document.getElementById(id);
      if (!campo.value) {
        alert(`Por favor, preencha o campo obrigatório: ${campo.previousElementSibling.innerText}`);
        campo.focus();
        return;
      }
    }

    gerarPDF();
  });

  function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.setTextColor(74, 63, 189);
    pdf.text('Ficha de Anamnese', 10, 20);

    let y = 30;

    function adicionarSecao(titulo, campos) {
      pdf.setFontSize(14);
      pdf.setTextColor(74, 63, 189);
      pdf.text(titulo, 10, y);
      y += 8;

      const data = [];

      campos.forEach(({ label, value }) => {
        data.push([label, value || 'Não preenchido']);
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

    adicionarSecao('1. Informações Pessoais', [
      { label: 'Nome completo', value: document.getElementById('nome').value },
      { label: 'Data de nascimento', value: document.getElementById('data-nascimento').value },
      { label: 'Telefone', value: document.getElementById('telefone').value },
      { label: 'Email', value: document.getElementById('email').value }
    ]);

    adicionarSecao('2. Histórico de Saúde', [
      { label: 'Doenças prévias ou atuais', value: document.getElementById('doencas').value },
      { label: 'Medicações em uso', value: document.getElementById('medicacoes').value },
      { label: 'Alergias', value: document.getElementById('alergias').value }
    ]);

    const dificuldades = Array.from(document.querySelectorAll('input[name="dificuldades"]:checked')).map(cb => cb.value).join(', ') || 'Nenhuma';
    adicionarSecao('3. Avaliação das AVDs e Habilidades', [
      { label: 'Dificuldades nas atividades', value: dificuldades },
      { label: 'Habilidades motoras finas e grossas', value: document.getElementById('habilidades-motoras').value },
      { label: 'Aspectos cognitivos relevantes', value: document.getElementById('aspectos-cognitivos').value }
    ]);

    adicionarSecao('4. Aspectos Psicossociais', [
      { label: 'Situação familiar', value: document.getElementById('situacao-familiar').value },
      { label: 'Rede de apoio', value: document.getElementById('rede-apoio').value }
    ]);

    adicionarSecao('5. Avaliação Sensorial', [
      { label: 'Hiperatividade sensorial', value: document.getElementById('hiperatividade-sensorial').value },
      { label: 'Hipoatividade sensorial', value: document.getElementById('hipoatividade-sensorial').value },
      { label: 'Sensibilidade tátil', value: document.getElementById('sensibilidade-tatil').value }
    ]);

    adicionarSecao('6. Comunicação e Linguagem', [
      { label: 'Comunicação verbal', value: document.getElementById('comunicacao-verbal').value },
      { label: 'Uso de tecnologias assistivas', value: document.getElementById('uso-tecnologias').value }
    ]);

    adicionarSecao('7. Comportamento e Emoções', [
      { label: 'Comportamento observado', value: document.getElementById('comportamento').value },
      { label: 'Expressão emocional', value: document.getElementById('emocao').value }
    ]);

    adicionarSecao('8. Histórico Familiar', [
      { label: 'Condições médicas na família', value: document.getElementById('condicoes-familiares').value },
      { label: 'Rede de apoio familiar', value: document.getElementById('apoio-familiar').value }
    ]);

    const protocolosSelecionados = Array.from(document.querySelectorAll('input[name="protocolos"]:checked')).map(cb => cb.value).join(', ') || 'Nenhum protocolo selecionado';
    adicionarSecao('9. Protocolos Utilizados', [
      { label: 'Protocolos selecionados', value: protocolosSelecionados }
    ]);

    adicionarSecao('10. Objetivos Terapêuticos', [
      { label: 'Objetivos do tratamento', value: document.getElementById('objetivos').value }
    ]);

    const nomePaciente = document.getElementById('nome').value.trim().replace(/\s+/g, '_') || 'Paciente';
    pdf.save(`Ficha_${nomePaciente}.pdf`);

    alert('Ficha salva na pasta Downloads do seu dispositivo.');
  }
});
