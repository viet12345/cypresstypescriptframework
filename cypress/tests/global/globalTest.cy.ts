import { ADMIN_URLS, GUEST_MODE_URLS, LOGGED_IN_URLS, PAGE_URLS } from '../../fixtures/urls';
import { SUB_USER, VALID_USER } from '../../fixtures/users';
import { homePage } from '../../support/pages/HomePage';
import { GLOBAL_SELECTOR } from '../../support/constants/pages/globalPage';

describe('Kiểm tra xác thực và ủy quyền', () => {
    //Tất cả các đường dẫn cần đăng nhập mới có thể truy cập, không sẽ hiện page 403
    describe('Kiểm tra nếu người dùng không đăng nhập có thể truy cập trang yêu cầu quyền không.', () => {
        Object.entries(LOGGED_IN_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name} page in guest mode`, () => {
                homePage.visit(url);
                cy.verifyUrl(PAGE_URLS.SIGNIN_PAGE); //Hiện tại vẫn work, nhưng có thể sẽ cần cơ chế wait để tránh lỗi.
                cy.contains('Sign in').should('be.visible');
            })
        })
    })

    
    //Tất cả các đường dẫn cần đăng nhập mới có thể truy cập, không sẽ hiện page 403
    describe('Kiểm tra nếu người dùng không đăng nhập có thể truy cập trang yêu cầu quyền không.', () => {
        
        beforeEach('redirect to the login page by api', () => {
            cy.signinByApi(SUB_USER.USER, SUB_USER.PASSWORD);
        })
        
        Object.entries(ADMIN_URLS).forEach(([site_name, url]) => {
            it(`Non-admin user cannot access admin ${site_name} endpoint (stubbed 403)`, () => {
                //apiUrl cần thay đổi theo từng môi trường test. Tìm file cypress.config.ts để thay đổi
                const apiUrl = Cypress.env('apiUrl') as string;
                cy.intercept(
                    'GET',
                    `${apiUrl}/admin/data`,
                    { statusCode: 403, body: { message: 'Forbidden' } }
                ).as('getAdminData');

                homePage.visit(url);
                cy.wait('@getAdminData');
                cy.contains('403').should('be.visible');
            });
        })
    })

})

describe('Kiểm tra các liên kết nội bộ (Internal Links) có hoạt động đúng không.', () => {
    //Chia ra 2 loại link cần authen và không authen, đảm bảo các link đều hiển thị với nội dung expected
    describe('Kiểm tra các link không cần authen', () => {
        Object.entries(GUEST_MODE_URLS).forEach(([site_name, url]) => {
            it(`Kiểm tra truy cập thành công page ${site_name} in guest mode`, () => {
                homePage.visit(url);
                cy.verifyUrl(url);
                cy.contains(site_name).should('be.visible');
            })
        })
    })
    
    describe('Kiểm tra các link cần authen', () => {
        beforeEach('redirect to the login page by api', () => {
            cy.signinByApi(VALID_USER.USER, VALID_USER.PASSWORD);
        })
        Object.entries(LOGGED_IN_URLS).forEach(([site_name, url]) => {
            it(`Kiểm tra truy cập thành công page ${site_name}`, () => {
                homePage.visit(url);
                cy.verifyUrl(url);
                cy.contains(site_name).should('be.visible');
            })
        })
    })
    
    describe('Kiểm tra các link cần authen khi chưa đăng nhập', () => {
        
        Object.entries(LOGGED_IN_URLS).forEach(([site_name, url]) => {
            it(`Kiểm tra hệ thống chuyển hướng người dùng đến trang mặc định nếu truy cập ${site_name} khi chưa đăng nhập`, () => {
                homePage.visit(url);
                cy.verifyUrl(PAGE_URLS.SIGNIN_PAGE);
                cy.contains('Sign in').should('be.visible');
            })
        })
    })
})

//Case này hiện tại chỉ áp dụng được cho từng page.
describe('Kiểm tra sau khi sử dụng Back button từ browser cần back về đúng màn trước đó', () => {

    beforeEach('redirect to the login page by api', () => {
        cy.signinByApi(VALID_USER.USER, VALID_USER.PASSWORD);
    })

    Object.entries(GLOBAL_SELECTOR).forEach(([tab_name, selector]) => {
        it.only(`Verify back action from ${tab_name} tab`, () => {
            Object.entries(selector).forEach(([value]) => {
                homePage.switchTab(value);
                cy.backActionFromBrowser();
                cy.verifyUrl(""); //Chỗ này có thể sử dụng url string luôn cho dễ hiểu
            })
        })
    })
})