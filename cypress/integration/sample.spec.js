var fs = require("fs");

describe("Open webpage", function () {
  // it("should load/login page", function() {
  //   cy.visit("https://hh.ru/account/login?backurl=%2F");
  //   cy.get(".HH-AuthForm-Login").type("marius@ms8.nl");
  //   cy.get(".HH-AuthForm-Password").type("EngelHH#003");
  //   cy.get(".bloko-button_primary").click();
  //   cy.wait(40000);
  //   cy.get(".bloko-button_primary").click();
  // });
  it("should go to search page", function () {
    cy.visit("https://hh.ru/search/resume/advanced");
    cy.wait(15000);
    cy.get(".bloko-button_large").click();
    let fileName = new Date().toISOString();
    cy.get(".resume-search-item__header > span > a").each((index, list) => {
      cy.get(index)
        .invoke("attr", "href")
        .then((href) => {
          let link = href;
          let data = `https://hh.ru${link},\n`;
          cy.writeFile(`data/${fileName}.csv`, data, { flag: "a+" });
        });

      cy.log(
        "-------------*************---------Process is Finished--------------*************------------"
      );
    });
  });
});
