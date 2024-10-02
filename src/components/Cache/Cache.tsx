import Select from "../Select";
import { useNavigate } from "react-router-dom";
import { useCacheItemMapped, useCacheStore } from "@/stores";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog('CacheComponent');
let renders = 0;
export default function Cache() {
  const navigate = useNavigate();
  const CacheStore = useCacheStore();
  const options = useCacheItemMapped('searchHistory', searchHistory => Object.values(searchHistory));
  const currentSearch = useCacheItemMapped('currentSearch', searchId => searchId
    ? CacheStore.get('searchHistory', '{}')[searchId]
    : undefined
  );

  debugLog(`Render ${++renders}`, { 
    options, 
    currentSearch, 
    currentSearchId: CacheStore.get('currentSearch', ''),
    hash: window.location.hash
  });

  return (
    <div className="cache">
      {currentSearch === CacheStore.get('searchHistory', '{}')[CacheStore.get('currentSearch', '')] 
        ? `Updated to be ${currentSearch?.title} using id ${CacheStore.get('currentSearch', '')}` 
        : 'Not updated'}
      {options.length > 0 && <Select name="search-history"
        defaultValue={currentSearch?.title}
        options={options.map(item => item.title)}
        placeholder="Previous searches"
        onChange={value => navigate(`/search/${options.find(item => item.title === value).id}`)}
      />}
      <button className='clear-cache danger secondary' onClick={() => confirm("You're about to clear the search cache.") && CacheStore.clear()}>Clear Cache</button>
    </div>
  );
}