document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('anamnese-form');
    const sections = document.querySelectorAll('.form-section');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const printBtn = document.getElementById('print-btn');
    const progress = document.getElementById('progress');

    let currentSection = 0;

    function updateForm() {
        sections.forEach((section, index) => {
            section.classList.toggle('active', index === currentSection);
        });

        prevBtn.disabled = currentSection === 0;
        nextBtn.style.display = currentSection === sections.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = currentSection === sections.length - 1 ? 'inline-block' : 'none';
        printBtn.style.display = 'none';

        const progressPercent = (currentSection / (sections.length - 1)) * 100;
        progress.style.width = progressPercent + '%';
    }

    nextBtn.addEventListener('click', () => {
        currentSection++;
        updateForm();
    });

    prevBtn.addEventListener('click', () => {
        currentSection--;
        updateForm();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        alert('Ficha enviada com sucesso!');
        submitBtn.style.display = 'none';
        printBtn.style.display = 'inline-block';
    });

    printBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        pdf.setFontSize(18);
        pdf.setTextColor(74, 63, 189);
        pdf.text('Ficha de Anamnese - Terapia Ocupacional', 10, 20);

        let y = 30;

        sections.forEach(section => {
            const title = section.querySelector('h2').innerText;
            pdf.setFontSize(14);
            pdf.setTextColor(74, 63, 189);
            pdf.text(title, 10, y);
            y += 8;

            const inputs = section.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                let label = '';
                if (input.previousElementSibling && input.previousElementSibling.tagName === 'LABEL') {
                    label = input.previousElementSibling.innerText.replace(':', '');
                }
                let value = '';

                if (input.type === 'checkbox') {
                    if (input.checked) {
                        value = input.value;
                    } else {
                        return; // Ignora checkbox não marcado
                    }
                } else {
                    value = input.value || 'Não preenchido';
                }

                // Para checkboxes agrupados, vamos coletar todos os marcados e mostrar juntos
                if (input.type === 'checkbox') {
                    // Já tratado acima
                } else {
                    pdf.setFontSize(12);
                    pdf.setTextColor(0, 0, 0);
                    const text = `${label}: ${value}`;
                    const splitText = pdf.splitTextToSize(text, 180);
                    pdf.text(splitText, 12, y);
                    y += splitText.length * 7;
                }
            });

            // Para checkboxes, coletar todos marcados em grupo
            const checkboxes = section.querySelectorAll('input[type="checkbox"]:checked');
            if (checkboxes.length > 0) {
                const checkboxLabel = section.querySelector('label[for="dificuldades"]') ? section.querySelector('label[for="dificuldades"]').innerText : 'Dificuldades';
                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0);
                pdf.text('Dificuldades:', 12, y);
                y += 7;
                const values = Array.from(checkboxes).map(cb => `- ${cb.value}`).join('\n');
                const splitText = pdf.splitTextToSize(values, 180);
                pdf.text(splitText, 18, y);
                y += splitText.length * 7;
            }

            y += 10;
            if (y > 270) {
                pdf.addPage();
                y = 20;
            }
        });

        pdf.save('ficha-anamnese.pdf');
    });

    updateForm();
});
