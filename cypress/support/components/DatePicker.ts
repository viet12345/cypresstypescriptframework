import { BasePage } from "../pages/BasePage";
import { DatePickerSelectors as S } from "../constants/components/datePickerConstants";
import { FormatDateString, formatToMMMDDYYYY, getDateDiffNDays, toYYYYMMDD } from "../utils/DateHelper";


export class DatePicker extends BasePage {

  // ---------- Element Getters ----------
  getDate (date: string) {
    new FormatDateString(date);
    return cy.get(`[data-date="${date}"]`);
  }

  // ---------- Actions ----------

  selectDate(targetDate: string, nextDate?: string): Cypress.Chainable {
    const formattedTarget = new FormatDateString(targetDate).date;
    const trySelect = (): Cypress.Chainable => {
      return cy.get(S.dateSelectingArea).should('exist').then(() => {
        return cy.get(`${S.enabledDate}:visible`).then(($els) => {
          const firstVisible = new FormatDateString($els[0].getAttribute('data-date')!).date;
          const lastVisible = new FormatDateString($els[$els.length - 1].getAttribute('data-date')!).date;

          // Nếu trong khoảng hiển thị → chọn ngày
          if (firstVisible <= formattedTarget && formattedTarget <= lastVisible) {
            return this.getDate(targetDate)
              .should('be.visible')
              .click({ force: true })
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
            return this.getDate(prevTarget)
              .scrollIntoView({ duration: 300 })
              .wait(300)
              .then(() => trySelect());
          }

          // Nếu target lớn hơn vùng đang hiển thị → scroll xuống
          const nextTarget = toYYYYMMDD(getDateDiffNDays(30, lastVisible));
          return this.getDate(nextTarget)
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
    const formatedStartDate = new FormatDateString(startDate).date;
    const displayedStartDate = new Date(formatedStartDate.setDate(formatedStartDate.getDate() - 1));
    const formatedEndDate = new FormatDateString(endDate).date;
    return cy.get(S.openDatePickerBtn).should('contain', `Date: ${formatToMMMDDYYYY(displayedStartDate)} - ${formatToMMMDDYYYY(formatedEndDate)}`)
  }
}

export const datePicker = new DatePicker();
