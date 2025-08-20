import { useMemo } from "react";
import TabBar, { Tab } from "@/components/common/TabBar";
import { useRegionStore } from "@/stores";
import FarmableTodaySection from "../FarmableTodaySection";

export default function YourCalendarSection() {
  const RegionStore = useRegionStore();
  
  const tabs = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => [
      day,
      {
        title: day,
        content: <FarmableTodaySection day={day} title="" />,
      } as Tab
    ] as const)
  }, [RegionStore, RegionStore.favorites]);

  return (
    <section className="your-calendar-section">
      <h2>Weekly Calendar</h2>
      <TabBar tabs={tabs} lazyLoad={false} />
    </section>
  );
}