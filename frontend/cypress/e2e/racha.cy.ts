describe('Fluxo Principal do Racha', () => {
  it('Deve preencher a lista principal, os nomes extras e organizar os nomes', () => {
    // Banco de nomes genéricos
    const bancoDeNomes = [
      'João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Lucas', 'Marcos', 'Julia', 'Fernando', 'Tiago',
      'Roberto', 'Aline', 'Beatriz', 'Felipe', 'Carla', 'Eduardo', 'Mariana', 'Rafael', 'Camila', 'Bruno',
      'Amanda', 'Diego', 'Letícia', 'Gabriel', 'Fernanda', 'Rodrigo', 'Juliana', 'Gustavo', 'Patrícia', 'Marcelo'
    ];

    // Embaralha o array de forma simples
    const nomesEmbaralhados = [...bancoDeNomes].sort(() => 0.5 - Math.random());
    
    // Separa as listas
    const nomesWhatsApp = nomesEmbaralhados.slice(0, 10);
    const nomesExtrasArray = nomesEmbaralhados.slice(10, 15);
    
    // Constrói os textos finais
    const listaWhatsApp = nomesWhatsApp.map((nome, index) => `${index + 1}. ${nome}`).join('\n');
    const nomesExtras = nomesExtrasArray.join('\n');

    // Seleciona um nome de cada grupo para verificar depois
    const nomeControlePrincipal = nomesWhatsApp[0];
    const nomeControleReserva = nomesExtrasArray[0];

    // 1. Acessa a aplicação
    cy.visit('/');

    // 2. Preenche as listas de forma cadenciada para você ver a digitação rolando
    cy.get('[data-cy="lista-principal"]').type(listaWhatsApp, { delay: 25 });
    cy.get('[data-cy="nomes-extras"]').type(nomesExtras, { delay: 25 });

    // 3. Clica no botão para organizar os nomes
    cy.get('[data-cy="btn-organizar"]').click();

    // 4. Verifica se os nomes de controle apareceram na tela seguinte
    cy.contains(nomeControlePrincipal).should('be.visible');
    cy.contains(nomeControleReserva).should('be.visible');
    
    // Verifica se a contagem total de jogadores está correta
    cy.contains('15').should('be.visible');
    
    // 5. Faz um scroll suave até o botão de sorteio
    cy.get('[data-cy="btn-sortear"]')
      .should('be.visible')
      .scrollIntoView({ duration: 2000 });

    // Pausa rápida para você conseguir ver o botão antes do clique
    cy.wait(500);

    // 6. Clica para realizar o sorteio
    cy.get('[data-cy="btn-sortear"]').click();

    // 7. Confirma que a tela de "Times definidos" apareceu
    cy.contains('Times definidos', { timeout: 5000 }).should('be.visible');

    // 8. Faz uma animação de scroll subindo até o topo para ver os primeiros times
    cy.scrollTo('top', { duration: 2000 });

    // Dá uma leve pausa no topo
    cy.wait(500);

    // 9. Depois desce até o final da tela para mostrar o resto da lista
    cy.scrollTo('bottom', { duration: 3000 });
  });
});
