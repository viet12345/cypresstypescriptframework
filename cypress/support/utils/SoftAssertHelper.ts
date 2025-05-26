

export class SoftAssertHelper {
    private errors: string[] = [];
  
    /**
     * Gọi để kiểm tra điều kiện mà không làm dừng test nếu fail.
     * Nếu `condition` là false, mô tả lỗi sẽ được lưu để xử lý sau.
     *
     * @param description - Mô tả điều kiện cần assert.
     * @param condition - Kết quả boolean (true = pass, false = fail).
     *
     * Ví dụ:
     * ```
     * cy.get('#firstName').then($el => {
      softAssert.assert('First name input should be visible', $el.is(':visible'));
    });
     * ```
     */
    public assert(description: string, condition: boolean): void {
      if (!condition) {
        this.errors.push(description);
      }
  
      Cypress.log({
        name: 'softAssert',
        displayName: 'softAssert',
        message: `${condition ? '✔' : '✘'} ${description}`,
        consoleProps: () => ({
          Description: description,
          Passed: condition,
        }),
      });
    }
  
    /**
     * Xoá tất cả lỗi đã lưu. Gọi trong `beforeEach()` để đảm bảo state sạch.
     *
     * Ví dụ:
     * ```
     * softAssert.reset();
     * ```
     */
    public reset(): void {
      this.errors.length = 0;
    }
  
    /**
     * Tổng kết tất cả các lỗi soft assert đã lưu.
     * Nếu có lỗi, sẽ chụp screenshot và throw lỗi để fail test.
     *
     * Gọi ở cuối test:
     * ```
     * cy.then(() => softAssert.assertAll());
     * ```
     */
    public assertAll(): void {
      if (this.errors.length > 0) {
        const message = this.errors.join('\n');
  
        Cypress.log({
          name: 'softAssertAll',
          displayName: 'softAssertAll',
          message,
          consoleProps: () => ({
            Failures: this.errors,
          }),
        });
  
        this.errors.length = 0;
        cy.screenshot('soft-assert-fail'); // chụp màn hình trước khi fail
        throw new Error(`Soft assertions failed:\n${message}`);
      } else {
        Cypress.log({
          name: 'softAssertAll',
          displayName: 'softAssertAll',
          message: 'All soft assertions passed.',
        });
      }
    }
  }
  