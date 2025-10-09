import { getToday } from "../../support/utils/DateHelper";

function updateStateByDragDrop(sourceSelector:string, targetSelector:string, needShowForm?:boolean) {
    cy.visit('deals'); // Mở trang deals để thực hiện drag and drop
    cy.get(sourceSelector).then($dealItem => {
            cy.wrap($dealItem).find('.item__name').invoke('text').then($dealName => {
                const expectedDealName = $dealName.trim();
                // 1. Drag task sang Done (có xử lý animation delay)
                cy.dragAndDrop(sourceSelector, targetSelector)
        
                // 2. Verify modal xuất hiện
                cy.get('#popupConfirmMovingDealToNewStage > .modal-dialog > .modal-content').should('be.visible');
                cy.get('#buttonAcceptMovingDeal').click();

                if (needShowForm) {
                // 3. Nhập thông tin note và đính kèm file.
                cy.get('iframe[id="content_ifr"]').first().then($iframe => {
                    const body = $iframe.contents().find('body');
                    const currentTime = new Date().toLocaleTimeString();
                    cy.wrap(body).type('This is auto test for drag and drop action ' +  ' ' + getToday() + ' ' + currentTime);
                });
                cy.get('input[class="filepond--browser"]').first().attachFile(`DataTestingFiles/download.jpeg`); // Đính kèm file ảnh nếu required
                cy.get('button[class="milestone__button--save"]').contains('Save').click({ force: true });
                }
                
                // 4. Verify deal đã được cập nhật stage
                cy.reload();
                cy.get(targetSelector).then($target => {
                    cy.wrap($target).find('.item__name').first().should('contain.text', expectedDealName);
                });
            });
        })
}

describe('Check drag drop action', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    it(`Update deal Approach -> Engaged`, () => {
        const dealSourceSelector = '[data-stage-id="1"] > .deal__item--container:first';
        const dealTargetSelector = '#dealItemGridArea_2';
        updateStateByDragDrop(dealSourceSelector, dealTargetSelector, true);     
    });

    it(`Update deal Engaged -> Opportunity`, () => {
        const dealSourceSelector = '[data-stage-id="2"] > .deal__item--container:first';
        const dealTargetSelector = '#dealItemGridArea_3';

        updateStateByDragDrop(dealSourceSelector, dealTargetSelector, true);  
    });

    it(`Update deal Opportunity -> Proposal`, () => {
        const dealSourceSelector = '[data-stage-id="3"] > .deal__item--container:first';
        const dealTargetSelector = '#dealItemGridArea_4';

        updateStateByDragDrop(dealSourceSelector, dealTargetSelector, true);  
    });

    it(`Update deal Proposal -> Negotiation`, () => {
        const dealSourceSelector = '[data-stage-id="4"] > .deal__item--container:first';
        const dealTargetSelector = '#dealItemGridArea_5';

        updateStateByDragDrop(dealSourceSelector, dealTargetSelector,true);  

    });

    it(`Update deal Negotiation -> Contracting`, () => {
        const dealSourceSelector = '[data-stage-id="5"] > .deal__item--container:first';
        const dealTargetSelector = '#dealItemGridArea_6';

        updateStateByDragDrop(dealSourceSelector, dealTargetSelector);   
    });

    it(`Update deal Contracting -> Closed Won`, () => {
        const dealSourceSelector = '[data-stage-id="6"] > .deal__item--container:first';
        const dealTargetSelector = '#dealItemGridArea_7';

        updateStateByDragDrop(dealSourceSelector, dealTargetSelector,true);
    });

    it(`Update deal Closed Won -> Closed Lost`, () => {
        const dealSourceSelector = '[data-stage-id="7"] > .deal__item--container:first';
        const dealTargetSelector = '#dealItemGridArea_8';

        updateStateByDragDrop(dealSourceSelector, dealTargetSelector);
    });
})