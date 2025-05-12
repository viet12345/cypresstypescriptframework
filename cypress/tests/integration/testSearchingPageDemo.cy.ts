import { PAGE_URLS } from '../../fixtures/urls';
import { VALID_USER } from '../../fixtures/users';


describe('Searching Page Demo Tests', () => {
  
  beforeEach('Navigate to Searching Page', () => {
    cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
    //Điều hướng đến page tìm kiếm
    cy.visit(PAGE_URLS.SEARCHING_PAGE); //demo hiện tại không có link đến page này
  });

  it('Các page cần có GUI riêng cho việc hiển thị No data', () => {
    
  });
});