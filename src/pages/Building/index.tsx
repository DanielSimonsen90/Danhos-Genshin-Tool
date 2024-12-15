import './BuildingIndex.scss';
import BuildingIndex from './BuildingIndex';

export { default as PriorityList } from './PriorityList';
// export { default as FocusDay } from './FocusDay';
// export { default as Plan } from './Plan';

function BuildingPage() {
  return (
    <div className="page building-page">
      <BuildingIndex />
    </div>
  );
}

export { BuildingPage as BuildingIndex };