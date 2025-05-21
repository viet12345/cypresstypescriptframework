export abstract class BasePage {
    /**
     * Truy cập element theo selector
     */
    protected get(selector: string) {
        return cy.get(selector);
    }

    /**
     * Nhập dữ liệu vào field
     */
    protected type(selector: string, text: string) {
        return this.get(selector).clear().type(text);
    }

    /**
     * Clear field
     */
    protected clear(selector: string) {
        return this.get(selector).clear();
    }

    /**
     * Click vào element
     */
    protected click(selector: string) {
        return this.get(selector).click({ force: true });
    }

    /**
     * Reload current page and load
     */
    reloadCurrentPage() {
        cy.reload();
        cy.get('body').should('be.visible');
    }

    /**
     * Visit URL and wait until it loaded
     */
    visit(url: string) {
        cy.visit(url);
        cy.get('main').should('be.visible');
    }
}