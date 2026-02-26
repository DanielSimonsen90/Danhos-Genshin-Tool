import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { AccountData } from "..";
import accountsSlice from "./accounts.slice";

export default new StoreBuilder()
  .addSlice(accountsSlice)
  .addApi(({ get }) => {
    function getSelectedAccount(desire: 'name'): string;
    function getSelectedAccount(desire: 'data'): AccountData;
    function getSelectedAccount(desire: 'name' | 'data' = 'data') {
      const account = Object
        .entries(get())
        .find(([accountName, account]) => account?.selected);

      if (!account) return undefined;
      const [name, data] = account;
      
      switch (desire) {
        case 'name': return name;
        case 'data': return data;
      }
    }

    return {
      get selectedAccountName() {
        return getSelectedAccount('name');
      },
      get selectedAccount() {
        return getSelectedAccount('data');
      }
    }
  })