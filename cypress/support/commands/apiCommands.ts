import { AUTH_OTHER_PARTS } from "../../fixtures/apiParts";

Cypress.Commands.add('loginByApi', (username: string, password: string) => {
    const url = buildUrl(Cypress.env('apiUrl')!, '/login');
    cy.request({
        method: 'POST',
        url,
        body: {
            username,
            password
        }
    }).then((res) => {
        // 1. Xác nhận login thành công
        expect(res.status).to.eq(200);

        // 2. Thiết lập cookies từ server (nếu có)
        const cookies = res.headers['set-cookie'] as string[];
        if (cookies) {
            cookies.forEach((c: string) => {
                const [cookiePair] = c.split(';');
                const [name, value] = cookiePair.split('=');
                cy.setCookie(name.trim(), value.trim());
            });
        }

        // 3. Lưu authState vào localStorage trước khi app load
        cy.visit('/', {
            onBeforeLoad(win) {
                // This will be diffirent in other systems
                win.localStorage.setItem('authState', JSON.stringify({
                    value: 'authorized',
                    context: { user: res.body.user },
                    _event: {
                        "name": "done.invoke.authentication.loading:invocation[0]",
                        "data": {
                            "type": "done.invoke.authentication.loading:invocation[0]",
                            "data": { user: res.body.user }
                        },
                        "$$type": "scxml",
                        "type": "external",
                        "origin": "authentication.loading:invocation[0]"
                    },
                    event: {
                        "type": "done.invoke.authentication.loading:invocation[0]",
                        "data": { user: res.body.user }
                    },
                    OTHER_PARTS: AUTH_OTHER_PARTS,
                }
                ));
            }
        });
    });
});

Cypress.Commands.add('printLocalStorage', () => {
    cy.window().then(win => {
        const ls = win.localStorage;
        cy.log('LocalStorage:');
        Object.keys(ls).forEach(key => {
            cy.log(`${key} = ${ls.getItem(key)}`);
            // eslint-disable-next-line no-console
            console.log(`${key} = ${ls.getItem(key)}`);
        });
    });
});
