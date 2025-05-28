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

    function checkFormValidity() {
        let isValid = true;
        const currentSectionFields = sections[currentSection].querySelectorAll('input[required], textarea[required], select[required]');

        currentSectionFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });

        return isValid;
    }

    nextBtn.addEventListener('click', () => {
        if (!checkFormValidity()) {
            alert('Por favor, preencha todos os campos obrigatórios nesta seção.');
            return;
        }

        currentSection++;
        updateForm();

        if (currentSection === sections.length - 1) {
            submitBtn.style.display = 'inline-block';
            nextBtn.style.display = 'none';
        }
    });

    prevBtn.addEventListener('click', () => {
        currentSection--;
        updateForm();

        submitBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!checkFormValidity()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

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

            const inputs = section.querySelectorAll('input, textarea, select');
            let data = [];
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

                data.push([label, value]);
            });

            pdf.autoTable({
                head: [['Campo', 'Valor']],
                body: data,
                startY: y,
                theme: 'striped',
                styles: { overflow: 'linebreak', columnWidth: 'auto' },
                columnStyles: {
                    0: { columnWidth: 50 },
                    1: { columnWidth: 140 }
                }
            });

            y = pdf.autoTable.previous.finalY + 10;
        });

        pdf.save('ficha-anamnese.pdf');
    });

    updateForm();
});
