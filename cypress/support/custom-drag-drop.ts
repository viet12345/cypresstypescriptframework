// Custom drag and drop functionality copied from @4tw/cypress-drag-drop
// You can freely modify this file without affecting the original library

const dataTransfer = new DataTransfer();

function omit(object: Record<string, any> = {}, keys: string[] = []): Record<string, any> {
  return Object.entries(object).reduce((accum, [key, value]) => (keys.includes(key) ? accum : { ...accum, [key]: value }), {});
}

export const DragSimulator = {
  MAX_TRIES: 5,
  DELAY_INTERVAL_MS: 10,
  counter: 0,
  targetElement: null as HTMLElement | null,
  source: undefined as HTMLElement | undefined,
  initialSourcePosition: undefined as DOMRect | undefined,
  options: undefined as any,
  rectsEqual(r1: DOMRect, r2: DOMRect): boolean {
    return r1.top === r2.top && r1.right === r2.right && r1.bottom === r2.bottom && r1.left === r2.left;
  },
  createDefaultOptions(options: any) {
    const commonOptions = omit(options, ['source', 'target']);
    const source = { ...commonOptions, ...options.source };
    const target = { ...commonOptions, ...options.target };
    return { source, target };
  },
  get dropped() {
    if (!this.source || !this.initialSourcePosition) return false;
    const currentSourcePosition = this.source.getBoundingClientRect();
    return !this.rectsEqual(this.initialSourcePosition, currentSourcePosition);
  },
  get hasTriesLeft() {
    return this.counter < this.MAX_TRIES;
  },
  set target(target: HTMLElement | null) {
    this.targetElement = target;
  },
  get target(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.wrap(this.targetElement as HTMLElement);
  },
  dragstart(clientPosition: any = {}) {
    return cy
      .wrap(this.source)
      .trigger('pointerdown', {
        which: 1,
        button: 0,
        ...clientPosition,
        eventConstructor: 'PointerEvent',
        ...this.options.source,
      })
      .trigger('mousedown', {
        which: 1,
        button: 0,
        ...clientPosition,
        eventConstructor: 'MouseEvent',
        ...this.options.source,
      })
      .trigger('dragstart', { dataTransfer, eventConstructor: 'DragEvent', ...this.options.source });
  },
  drop(clientPosition: any = {}) {
    return this.target
      .then(($el) => {
        return cy.wrap($el).trigger('drop', {
          dataTransfer,
          eventConstructor: 'DragEvent',
          ...this.options.target,
        });
      });
  },
  dragover(clientPosition: any = {}): any {
    if (!this.counter || (!this.dropped && this.hasTriesLeft)) {
      this.counter += 1;
      return this.target
        .then(($el) => {
          return cy.wrap($el)
            .trigger('dragover', {
              dataTransfer,
              eventConstructor: 'DragEvent',
              ...this.options.target,
            })
            .trigger('mousemove', {
              ...this.options.target,
              ...clientPosition,
              eventConstructor: 'MouseEvent',
            })
            .trigger('pointermove', {
              ...this.options.target,
              ...clientPosition,
              eventConstructor: 'PointerEvent',
            })
            .wait(this.DELAY_INTERVAL_MS);
        })
        .then(() => this.dragover(clientPosition));
    }
    if (!this.dropped) {
      console.error(`Exceeded maximum tries of: ${this.MAX_TRIES}, aborting`);
      return false;
    } else {
      return true;
    }
  },
  init(source: JQuery<HTMLElement>, target: string, options: any = {}) {
    this.options = this.createDefaultOptions(options);
    this.counter = 0;
    this.source = source.get(0);
    this.initialSourcePosition = this.source.getBoundingClientRect();
    return cy.get(target).then((targetWrapper) => {
      this.target = targetWrapper.get(0);
    });
  },
  drag(sourceWrapper: JQuery<HTMLElement>, targetSelector: string, options?: any) {
    return this.init(sourceWrapper, targetSelector, options)
      .then(() => this.dragstart())
      .then(() => this.dragover())
      .then((success: boolean) => {
        if (success) {
          return this.drop().then(() => true);
        } else {
          return false;
        }
      });
  }
};
