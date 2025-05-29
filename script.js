document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anamnese-form');
  const submitBtn = document.getElementById('submit-btn');
  const printBtn = document.getElementById('print-btn');

  // Função para gerar e salvar o PDF com nome personalizado
  function gerarSalvarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let nomePaciente = document.getElementById('nome').value.trim();
    if (!nomePaciente) nomePaciente = 'Paciente';
    const nomeArquivo = 'Ficha_' + nomePaciente.replace(/\s+/g, '_') + '.pdf';

    pdf.setFontSize(18);
    pdf.setTextColor(74, 63, 189);
    pdf.text('Ficha de Anamnese', 10, 20);

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Nome: ${document.getElementById('nome').value}`, 10, 40);
    pdf.text(`Data de nascimento: ${document.getElementById('data-nascimento').value}`, 10, 50);
    pdf.text(`Telefone: ${document.getElementById('telefone').value}`, 10, 60);
    pdf.text(`Email: ${document.getElementById('email').value}`, 10, 70);

    pdf.save(nomeArquivo);

    alert(`Arquivo salvo na pasta Downloads do seu dispositivo com o nome: ${nomeArquivo}.\n\nPara localizar, abra a pasta Downloads no seu computador ou celular.`);
  }

  // Evento submit do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!document.getElementById('nome').value.trim()) {
      alert('Por favor, preencha o nome do paciente.');
      return;
    }

    alert('Ficha enviada com sucesso!');

    submitBtn.style.display = 'none';
    printBtn.style.display = 'inline-block';
  });

  // Evento do botão imprimir para gerar e salvar PDF
  printBtn.addEventListener('click', () => {
    gerarSalvarPDF();
  });

  // Inicialização: esconde botão imprimir
  printBtn.style.display = 'none';
});
