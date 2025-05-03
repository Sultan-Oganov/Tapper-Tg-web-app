import DepositTab from "@/components/finance/deposit";
import History from "@/components/finance/history";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import WithdrawTab from "@/components/finance/withdraw";
import { useTranslation } from "react-i18next";

export default function Finance() {
  const { t } = useTranslation();

  return (
    <div className={"p-[20px]"}>
      <TabGroup>
        <TabList className={"info_taps"}>
          <Tab className={"info_taps_card py-[8px]"}>
            {t("finance.tabs.deposit")}
          </Tab>
          <Tab className={"info_taps_card py-[8px]"}>
            {t("finance.tabs.withdraw")}
          </Tab>
          <Tab className={"info_taps_card py-[8px]"}>
            {t("finance.tabs.history")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DepositTab />
          </TabPanel>
          <TabPanel>
            <WithdrawTab />
          </TabPanel>
          <TabPanel>
            <History />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
