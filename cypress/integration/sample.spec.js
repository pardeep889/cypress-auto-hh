describe("Open webpage", function () {
  it("should go to search page", function () {
    cy.visit("https://hh.ru/search/resume/advanced");
    cy.wait(15000); // You can add minutes here for choosing your advance search filters.
    cy.get(".bloko-button_large").click();
    let fileName = new Date().getTime(); // this will be the file name you can replace new Date().getTime(); by your own filename like 'links' but again never will be same.
    cy.get(
      ".bloko-gap.bloko-gap_top > div > span.pager-item-not-in-short-range > a"
    )
      .invoke("attr", "href")
      .then((href) => {
        let pageLength = parseInt(href.split("&page=")[1]);
        let pageUrl = `https://hh.ru${href.split("&page=")[0]}`;
        for(let i = 0; i <= pageLength; i++ ){
          let finalUrl = `${pageUrl}&page=${i}`;
          cy.wait(1500);
          cy.visit(finalUrl);
          exportCSV(fileName);
        }
        cy.log(
          "-------------*************---------Process Has been Ended Successfully--------------*************------------"
        );
      });
  });
});

function exportCSV(fileName) {
  // Save data to CSV
  cy.get(".resume-search-item__header > span > a").each((index, list) => {
    cy.get(index)
      .invoke("attr", "href")
      .then((href) => {
        let link = href;
        let data = `https://hh.ru${link},\n`;
        cy.writeFile(`data/${fileName}.csv`, data, { flag: "a+" });
      });
  });
  cy.log(
    "-------------*************---------Page ENDS Here--------------*************------------"
  );
}
