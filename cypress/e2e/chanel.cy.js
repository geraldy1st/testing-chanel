describe("Tester Chanel", () => {
  beforeEach(() => {
    // 1- Visiter le site
    cy.visit("https://www.chanel.com/fr/");

    // 2- Accepter les cookies
    cy.get("#onetrust-accept-btn-handler").click();
  });

  it("Tester la page d'acceuil CHANEL", () => {
    // 3- Vérifier le titre CHANEL
    cy.get('svg[class="logo"]').should("be.visible"); // On a utilisé l'élement svg affiché
    cy.get('svg[class="logo"]').then(($element) => {
      expect($element).to.be.visible; // On a utilisé une assertion explicite : cypress a deux types d'assertions : implicite (should) et explicite : expect
      // nb: expect ne fonctionne que sur un objet jquery
      //nb: pour pouvoir cliquer sur l'objet jquery il faut passer par la fonction wrap : cy.wrap($element).click()
    });
  });

  it("Tester l'achat d'une montre", () => {
    // 4- Cliquer sur le menu
    cy.get('span[class="header__menu-label"]')
      .should("have.text", "Menu")
      .click();

    // 5- choisir les HORLOGERIE
    cy.get('span[data-test="lnkAxisCategory_watches"]')
      .should("have.text", "HORLOGERIE")
      .click();

    // 6- Cliquer sur Accueil Horlogerie
    cy.get('span[data-test="lnkAxisCategoryHomePage_Mobile"]')
      .contains("Accueil Horlogerie")
      .click({ force: true }); // Attention, il fallait faire un scroll ou un force true pour pouvoir cliquer sur lelement trouvé dans dom par cypress mais pas visible sur l'écran

    // 7- Vérifier l'url
    cy.url().should("eq", "https://www.chanel.com/fr/horlogerie/");

    // 8- Vérifier le titre Nouveautés
    cy.get("#_3cyuoqdvp_main span")
      .should("be.visible")
      .should("have.text", "Nouveautés");

    // 9- Vérifier le nombre de montres affichés
    cy.get("#_wk2llx9if_main")
      .children()
      .first()
      .children()
      .first()
      .children()
      .should("have.length", 7);

    // 10- faire uyn scroll
    cy.get("#_wk2llx9if_main").scrollIntoView({
      easing: "linear",
      duration: 5000,
    });

    // 11- Cliquer sur une montre
    cy.get("#product_H7989_link").click();
  });
});
