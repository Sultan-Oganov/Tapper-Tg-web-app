"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useCardsStore } from "@/store/cardsStore";
import CardTabs from "./сardTabs";
import { useEffect, useRef, useState } from "react";
import { useCards } from "@/hooks/useCards";

export default function MainControllerTab() {
  const { menu } = useCardsStore();
  const { requestCards } = useCards();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    requestCards();
  }, []);

  useEffect(() => {
    const selectedTab = tabRefs.current[selectedIndex];
    selectedTab?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedIndex]);

  return (
    <TabGroup
      className="info_taps_wrapper"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabList className="info_taps overflow-x-auto whitespace-nowrap no-scrollbar">
        {menu.map((category, index) => (
          <Tab
            key={category.id}
            className="info_taps_card py-[8px]"
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
          >
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
