// Test Case: Search chuyến bay và book thành công

// ID: TC_FLIGHT_01

// Scenario: User tìm chuyến bay và thực hiện booking.

// Precondition: User đã đăng ký account.

// Steps:

// Login vào hệ thống với account hợp lệ.

// Vào module Flights.

// Nhập thông tin: From = Dubai, To = Istanbul, Depart = ngày trong tương lai.

// Click "Search".

// Chọn 1 chuyến bay từ danh sách kết quả.

// Điền thông tin hành khách.

// Thanh toán với Credit Card (demo).

// Expected Result: Booking thành công, hiển thị Booking ID.
function bookFlightAndVerify(flightType:string) {
    function inputSearch(flightType:string) {
        // Step 1: Nhập điểm đi và điểm đến
        cy.get('#onereturn > :nth-child(1) > .form-floating > .form-control').type('Dubai');
        cy.get('#onereturn > :nth-child(2) > .form-floating > .form-control').type('Istanbul');
       
        // Step 2: Chọn ngày đi (và về) (ví dụ 30 ngày sau)
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        const dateStr = futureDate.toISOString().split('T')[0];
        cy.get('#departure').clear().type(dateStr);

        if (flightType === 'Return') {
            // Chọn ngày về (ví dụ 37 ngày sau)
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 37);
            const returnDateStr = returnDate.toISOString().split('T')[0];
            cy.get('#return_date').clear().type(returnDateStr);
        }
       
        // Step 3: Search
        cy.get('button[type=submit]').click();
    }

    function inputGuestInfo(flightType:string) {
        // Step 1: Điền Personal Information (giả lập)
        cy.get('.form-box').eq(0).within(() => {    
            cy.get('#p-first-name').type('John');
            cy.get('#p-last-name').type('Doe');
            cy.get('#p-email').type('joe@gmail.com');
            cy.get('#p-phone').type('1234567890');
            cy.get('#p-address').type('123 Main St');
        });
       
        // Step 2: Điền Travellers Information (giả lập)
        cy.get('.form-box').eq(1).within(() => {    
            cy.get('#t-first-name-1').type('John');
            cy.get('#t-last-name-1').type('Doe');
            cy.get('#t-passport-1').type('A12345678');
            cy.get('#t-email-1').type('joe@gmail.com');
            cy.get('#t-phone-1').type('1234567890');
        });
    }

    function confirmBookingAndCheckout(flightType:string) {
        // Step 1: Confirm booking và checkout
        cy.get('#agreechb').check();
        cy.get('#booking').click();
       
        // Expected: Booking thành công
        cy.contains('Booking ID').should('be.visible');
    }
    
    // Step 1: Đi đến Flights
    cy.visit('https://phptravels.net/flights');

    if (flightType === 'One way') {
        // Step 2:
        inputSearch('One way');

        // Step 3: Chọn flight
        cy.get('div.text-black').first().should('be.visible').within(() => {
            cy.get('button').contains('Select Flight').click();
        });

        // Step 4: Điền thông tin hành khách
        inputGuestInfo('One way');
       
        // Step 5: Confirm booking và checkout
        confirmBookingAndCheckout('One way');
       
    }

    if (flightType === 'Return') {
        //Step 2: Đổi sang Return type
        cy.get('.flight_way').select('Return');

        // Step 3: Nhập thông tin và search
        inputSearch('Return');

        // Step 4: Chọn flight
        cy.get('div.text-black').first().should('be.visible').within(() => {
            cy.get('button').contains('Select Flight').click();
        });

        // Step 5: Điền thông tin hành khách
        inputGuestInfo('Return');
       
        // Step 6: Confirm booking và checkout
        confirmBookingAndCheckout('Return');
    }
    
}

describe('Flight Booking Flow', () => {
  it.only('should search and book a flight successfully (One way)', () => {
    bookFlightAndVerify('One way');
  });

  it('should search and book a flight successfully (Return)', () => {
    bookFlightAndVerify('Return');
  });
});
