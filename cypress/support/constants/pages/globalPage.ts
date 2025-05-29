export const GLOBAL_SELECTOR = {
    'Homepage': {
        myAccountSideBarMenu: "[data-test='sidenav-user-settings']",
        bankAccounts: "[data-test='sidenav-bankaccounts']",
        notifications: "[data-test='sidenav-notifications']",
        contactsTab: "[data-test='nav-contacts-tab']",
        personalTab: "[data-test='nav-personal-tab']",
        newTransaction:"[data-test='nav-top-new-transaction']",
    }
}

export const SEARCH_SELECTOR = {
    'Transactions': {
        url: '/transaction/new',
        searchInput:"[data-test='user-list-search-input']",
        listOfSearchingData:"[data-test^='user-list-item']",
        apiGetSearchingData: '',
    },
    'Transactions 2': {
        url: '/transaction/new',
        searchInput:"[data-test='user-list-search-input1']",
        listOfSearchingData:"[data-test^='user-list-item1']",
        apiGetSearchingData: '',
    }
}