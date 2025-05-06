import { BasePage } from "../pages/BasePage";
import { DatePickerSelectors as S } from "../constants/components/datePickerConstants";
import { FormatDateString, formatToMMMDDYYYY, getDateDiffNDays, toYYYYMMDD } from "../utils/dateHelper";


export class DatePicker extends BasePage {

    // ---------- Actions ----------

    selectDate(targetDate: string, nextDate?: string): Cypress.Chainable {
        const formattedTarget = new FormatDateString(targetDate).date;      
        const trySelect = (): Cypress.Chainable => {
          return cy.get(S.dateSelectingArea).should('exist').then(() => {
            return cy.get('.Cal__Day__enabled:visible').then(($els) => {
              const firstVisible = new FormatDateString($els[0].getAttribute('data-date')!).date;
              const lastVisible = new FormatDateString($els[$els.length - 1].getAttribute('data-date')!).date;
      
              // Nếu trong khoảng hiển thị → chọn ngày
              if (firstVisible <= formattedTarget && formattedTarget <= lastVisible) {
                return cy.get(`[data-date="${targetDate}"]`)
                  .should('be.visible')
                  .click({force: true})
                  .then(() => {
                    // Sau khi chọn startDate → chọn tiếp endDate nếu có
                    if (nextDate) {
                      return this.selectDate(nextDate);
                    }
                  });
              }
      
              // Nếu target nhỏ hơn vùng đang hiển thị → scroll lên
              if (formattedTarget < firstVisible) {
                const prevTarget = toYYYYMMDD(getDateDiffNDays(-30, firstVisible));
                return cy.get(`[data-date="${prevTarget}"]`)
                  .scrollIntoView({ duration: 300 })
                  .wait(300)
                  .then(() => trySelect());
              }
      
              // Nếu target lớn hơn vùng đang hiển thị → scroll xuống
              const nextTarget = toYYYYMMDD(getDateDiffNDays(30, lastVisible));
              return cy.get(`[data-date="${nextTarget}"]`)
                .scrollIntoView({ duration: 300 })
                .wait(300)
                .then(() => trySelect());
            });
          });
        };
      
        return trySelect();
      }

    openDatePicker() {
        this.click(S.openDatePickerBtn).should('be.visible');
    }

    // ---------- Verifications ----------

    verifyPickDateRange(startDate: string, endDate: string) {
        const formatStartDate = new FormatDateString(startDate).date;
        const displayStartDate = new Date(formatStartDate.setDate(formatStartDate.getDate() - 1));
        const formatEndDate = new FormatDateString(endDate).date;
        return cy.get(S.openDatePickerBtn).should('contain', `Date: ${formatToMMMDDYYYY(displayStartDate)} - ${formatToMMMDDYYYY(formatEndDate)}`)
    }
}

export const datePicker = new DatePicker();
