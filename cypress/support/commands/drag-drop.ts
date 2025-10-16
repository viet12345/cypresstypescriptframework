const dataTransfer = new DataTransfer()

function omit(object: any = {}, keys: any[] = []) {
    return Object.entries(object).reduce((accum, [key, value]) => (key in keys ? accum : { ...accum, [key]: value }), {})
}

function isAttached(element: any) {
    return !!element.closest('html')
}

const DragSimulator = {
    MAX_TRIES: 5,
    DELAY_INTERVAL_MS: 10,
    counter: 0,
    source: null as any,
    initialSourcePosition: null as any,
    options: null as any,
    targetElement: null as any,
    rectsEqual(r1: any, r2: any) {
        return r1.top === r2.top && r1.right === r2.right && r1.bottom === r2.bottom && r1.left === r2.left
    },
    createDefaultOptions(options: any) {
        const commonOptions = omit(options, ['source', 'target'])
        const source = { ...commonOptions, ...options.source }
        const target = { ...commonOptions, ...options.target }
        return { source, target }
    },
    get dropped() {
        const currentSourcePosition = this.source.getBoundingClientRect()
        return !this.rectsEqual(this.initialSourcePosition, currentSourcePosition)
    },
    get hasTriesLeft() {
        return this.counter < this.MAX_TRIES
    },
    set target(target: any) {
        this.targetElement = target
    },
    get target() {
        return cy.wrap(this.targetElement)
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
        .trigger('dragstart', { dataTransfer, eventConstructor: 'DragEvent', ...this.options.source })
    },
    drop(clientPosition: any = {}) {
        return this.target
        .trigger('drop', {
            dataTransfer,
            eventConstructor: 'DragEvent',
            ...this.options.target,
        })
        //Comment vì hệ thống demo hiện tại lúc drop đang trigger modal nên không thể thực hiện mouseup. 
        // .then(() => {
            //   if (isAttached(this.targetElement)) {
                //     this.target
                //       .trigger('mouseup', {
                    //         which: 1,
                    //         button: 0,
                    //         ...clientPosition,
                    //         eventConstructor: 'MouseEvent',
                    //         ...this.options.target,
                    //       })
                    //       .then(() => {
                        //         if (isAttached(this.targetElement)) {
                            //           this.target.trigger('pointerup', {
                                //             which: 1,
            //             button: 0,
            //             ...clientPosition,
            //             eventConstructor: 'PointerEvent',
            //             ...this.options.target,
            //           })
            //         }
            //       })
            //   }
            // })
        },
        dragover(clientPosition: any = {}) {
            if (!this.counter || (!this.dropped && this.hasTriesLeft)) {
                this.counter += 1
                return this.target
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
                .wait(this.DELAY_INTERVAL_MS)
                .then(() => this.dragover(clientPosition))
            }
            if (!this.dropped) {
            console.error(`Exceeded maximum tries of: ${this.MAX_TRIES}, aborting`)
            return false
        } else {
            return true
        }
    },
    init(source: any, target: any, options: any = {}) {
        this.options = this.createDefaultOptions(options)
        this.counter = 0
        this.source = source.get(0)
        this.initialSourcePosition = this.source.getBoundingClientRect()
        return cy.get(target).then((targetWrapper: any) => {
            this.target = targetWrapper.get(0)
        })
    },
    drag(sourceWrapper: any, targetSelector: any, options: any) {
        this.init(sourceWrapper, targetSelector, options)
            .then(() => this.dragstart())
            .then(() => this.dragover())
            .then((success: any) => {
                if (success) {
                    return this.drop().then(() => true)
                } else {
                    return false
                }
            })
    },
    move(sourceWrapper: any, options: any) {
        const { deltaX, deltaY } = options
        const { top, left } = sourceWrapper.offset()
        const finalCoords = { clientX: left + deltaX, clientY: top + deltaY }
        this.init(sourceWrapper, sourceWrapper, options)
            .then(() => this.dragstart({ clientX: left, clientY: top }))
            .then(() => this.dragover(finalCoords))
            .then(() => this.drop(finalCoords))
        },
}
    
function addChildCommand(name: any, command: any) {
    Cypress.Commands.add(name, { prevSubject: 'element' }, (...args: any[]) => command(...args))
}

// Sửa lại để bind đúng context và truyền đúng tham số cho drag
Cypress.Commands.add('dragAndDrop', { prevSubject: 'element' }, function(subject: any, targetSelector: any, options?: any) {
    // subject là phần tử nguồn, targetSelector là selector đích, options là tuỳ chọn
    return DragSimulator.drag.call(DragSimulator, subject, targetSelector, options);
});
// addChildCommand('dragAndDrop', DragSimulator.drag.bind(DragSimulator))
// addChildCommand('move_custom', DragSimulator.move.bind(DragSimulator))