document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anamnese-form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validação básica dos campos obrigatórios
    const obrigatorios = ['nome', 'data-nascimento', 'hiperatividade-sensorial', 'hipoatividade-sensorial', 'comunicacao-verbal', 'emocao'];
    for (const id of obrigatorios) {
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

    // Aqui você adiciona todas as seções e campos, como no HTML

    // Exemplo da primeira seção:
    adicionarSecao('1. Informações Pessoais', [
      { label: 'Nome completo', value: document.getElementById('nome').value },
      { label: 'Data de nascimento', value: document.getElementById('data-nascimento').value },
      { label: 'Telefone', value: document.getElementById('telefone').value },
      { label: 'Email', value: document.getElementById('email').value }
    ]);

    // Continue para as demais seções...

    // Para as checkboxes, junte os valores marcados
    const dificuldades = Array.from(document.querySelectorAll('input[name="dificuldades"]:checked')).map(cb => cb.value).join(', ') || 'Nenhuma';
    adicionarSecao('3. Avaliação das AVDs e Habilidades', [
      { label: 'Dificuldades nas atividades', value: dificuldades },
      { label: 'Habilidades motoras finas e grossas', value: document.getElementById('habilidades-motoras').value },
      { label: 'Aspectos cognitivos relevantes', value: document.getElementById('aspectos-cognitivos').value }
    ]);

    // Continue com as outras seções da mesma forma...

    const nomePaciente = document.getElementById('nome').value.trim().replace(/\s+/g, '_') || 'Paciente';
    pdf.save(`Ficha_${nomePaciente}.pdf`);
  }
});
