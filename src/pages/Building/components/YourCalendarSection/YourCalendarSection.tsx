import { useMemo } from "react";
import TabBar, { Tab } from "@/components/common/TabBar";
import { useRegionStore } from "@/stores";
import FarmableTodaySection from "../FarmableTodaySection";

export default function YourCalendarSection() {
  const RegionStore = useRegionStore();
  const currentDay = useMemo(() => RegionStore.getGenshinServerDayName(RegionStore.currentRegion), [RegionStore, RegionStore.currentRegion]);
    const tabs = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => [
      day,
      {
        title: day,
        content: <FarmableTodaySection day={day} title="" />,
        className: day === currentDay ? 'current-day-tab' : undefined,
      } as Tab
    ] as const)
  }, [currentDay]);

  return (
    <section className="your-calendar-section" data-current-day={currentDay}>
      <h2>Weekly Calendar</h2>
      <TabBar tabs={tabs} lazyLoad={false} defaultTab={currentDay} />
    </section>
  );
}