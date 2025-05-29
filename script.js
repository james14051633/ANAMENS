function montarFormulario(modelos, modelo, formContent, carregar = true) {
  formContent.innerHTML = '';
  if (!modelo || !modelos[modelo]) return;

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

  if (carregar) carregarDados(modelos, modelo, formContent);
}
