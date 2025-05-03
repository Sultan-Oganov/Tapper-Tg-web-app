"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useCardsStore } from "@/store/cardsStore";
import CardTabs from "./сardTabs";
import { useEffect, useState } from "react";
import { useCards } from "@/hooks/useCards";

export default function MainControllerTab() {
  const { menu } = useCardsStore();
  const { requestCards } = useCards();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    requestCards();
  }, []);

  return (
    <TabGroup
      className="info_taps_wrapper"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabList className="info_taps">
        {menu.map((category) => (
          <Tab key={category.id} className="info_taps_card py-[8px]">
            {category.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {menu.map((category) => (
          <TabPanel key={category.id}>
            <CardTabs
              cardType={Number(category.id)}
              variant={
                Number(category.id) < menu.length - 1 ? "compact" : "default"
              }
            />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
