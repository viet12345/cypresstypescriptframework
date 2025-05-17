export const AUTH_OTHER_PARTS = {
    "actions": [
        {
            "type": "xstate.stop",
            "activity": {
                "src": {
                    "type": "performLogin"
                },
                "id": "authentication.loading:invocation[0]",
                "type": "xstate.invoke"
            }
        },
        {
            "type": "redirectHomeAfterLogin"
        }
    ],
    "activities": {
        "authentication.loading:invocation[0]": false
    },
    "meta": {},
    "events": [],
    "_sessionid": "x:0",
    "historyValue": {
        "current": "authorized",
        "states": {}
    },
    "history": {
        "actions": [
            {
                "type": "xstate.start",
                "activity": {
                    "src": {
                        "type": "performLogin"
                    },
                    "id": "authentication.loading:invocation[0]",
                    "type": "xstate.invoke"
                }
            }
        ],
        "activities": {
            "authentication.loading:invocation[0]": {
                "type": "xstate.start",
                "activity": {
                    "src": {
                        "type": "performLogin"
                    },
                    "id": "authentication.loading:invocation[0]",
                    "type": "xstate.invoke"
                }
            }
        },
        "meta": {},
        "events": [],
        "value": "loading",
        "context": {},
        "_event": {
            "name": "LOGIN",
            "data": {
                "type": "LOGIN",
                "username": "Heath93",
                "password": "s3cret"
            },
            "$$type": "scxml",
            "type": "external"
        },
        "_sessionid": "x:0",
        "event": {
            "type": "LOGIN",
            "username": "Heath93",
            "password": "s3cret"
        },
        "historyValue": {
            "current": "loading",
            "states": {}
        },
        "children": {},
        "done": false,
        "changed": true,
        "tags": []
    },
    "children": {},
    "done": false,
    "changed": true,
    "tags": []
}
