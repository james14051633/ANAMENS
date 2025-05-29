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
