import { BasePage } from "../pages/BasePage";
import { HomPageSelectors as S } from "../constants/pages/homePageConstants";

export class NavigationMenu extends BasePage {

    goToMyAccountSideBarMenu() {
        this.click(S.myAccountSideBarMenu);
    }

    goToBankAccountsSideBarMenu() {
        this.click(S.bankAccounts);
    }

    goToNotificationsSideBarMenu() {
        this.click(S.notifications);
    }
}

export const navigationMenu = new NavigationMenu();