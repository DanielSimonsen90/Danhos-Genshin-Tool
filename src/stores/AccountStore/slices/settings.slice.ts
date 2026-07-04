import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { AccountSettings } from "..";
import accountGetSlice from "./account.get.slice";
import * as ObjectUtils from '@/common/functions/object';

export default new StoreBuilder()
  .addSlice(accountGetSlice)
  .addApi(({ api }) => {
    function getAccountSettings(): AccountSettings {
      const accountName = api.selectedAccountName;
      const accountData = ObjectUtils.pick(
        api.selectedAccount, 
        'worldRegion', 'traveler'
      );

      return {
        ...accountData,
        // Select of all accounts
        selectedAccount: accountName,
        // Ability to modify account name
        selectedAccountName: accountName,
        accountCrud: true,
      }
    }

    return {
      get accountSettings() {
        return getAccountSettings();
      }
    }
  })