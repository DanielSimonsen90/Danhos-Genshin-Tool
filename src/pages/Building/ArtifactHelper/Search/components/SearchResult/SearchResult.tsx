import { classNames } from '@/common/functions/strings';
import { AppSettings, useSettings, useSettingsStore } from '@/stores/SettingsStore';
import { SearchResult } from '@/services/SearchService/artifact';
import TabBar from '@/components/common/TabBar';
import { TabContent, Wrap, ShowAll, TabContentProps } from './components';

type Props = {
  result: SearchResult;
};

export const SearchResultComponent = ({
  result: { setName, ...props }
}: Props) => {
  const SettingsStore = useSettingsStore();
  const { wrap, preferredTabs, showAll } = useSettings('preferredTabs', 'showAll', 'wrap');

  const tabBarProps: Omit<TabContentProps, 'results'> = {
    setName,
    showAll: showAll.get(),
  };

  function handleTabChanged(tab: 'combined' | 'set' | 'stats') {
    if (preferredTabs.get().results === tab) return;
    SettingsStore.updateSettings(cur => ({ 
      preferredTabs: { 
        ...(cur.preferredTabs ?? {} as AppSettings['preferredTabs']), 
        results: tab 
      } 
    }));
  }

  return (
    <div className={classNames(
      "search-result",
      showAll.get() && "search-result--show-not-save",
      wrap.get() && 'search-result--wrap'
    )}>
      <TabBar tabs={[
        ['combined', {
          title: 'Combined',
          description: 'Scores from "By Stats" and "By Set" are added together. Characters who use this set rank higher because they benefit from both the set and the stats.',
          content: <TabContent results={props.combined} {...tabBarProps} />
        }],
        ['stats', {
          title: 'By Stats',
          description: 'Characters are ranked by how useful the main stat and substats are to them. The artifact set is not considered.',
          content: <TabContent results={props.byArtifact} {...tabBarProps} />
        }],
        ['set', {
          title: 'By Set',
          description: 'Only characters who have this set recommended, ranked by how well these stats match what they want.',
          content: <TabContent results={props.byCharacterRecommendation} {...tabBarProps} />
        }],
      ]}
        defaultTab={preferredTabs.get().results}
        onTabChange={tab => handleTabChanged(tab as 'combined' | 'set' | 'stats')}
      >
        <div className="search-result-options">
          <ShowAll {...{ ...props }} />
          <Wrap />
        </div>
      </TabBar>
    </div>
  );
};

export default SearchResultComponent;