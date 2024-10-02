import { useNavigate } from "react-router-dom";
import Select from "@/components/Select";
import { useCacheItemMapped, useCacheStore } from "@/stores";

export default function Cache() {
  const navigate = useNavigate();
  const CacheStore = useCacheStore();
  const options = useCacheItemMapped('searchHistory', searchHistory => Object.values(searchHistory));
  const currentSearch = useCacheItemMapped('currentSearch', searchId => searchId
    ? CacheStore.get('searchHistory', '{}')[searchId]
    : undefined
  );

  return (
    <div className="cache">
      {options.length > 0 && <Select name="search-history"
        value={currentSearch?.title}
        options={options.map(item => item.title)}
        placeholder="Previous searches"
        onChange={value => {
          const searchId = options.find(item => item.title === value)?.id;
          CacheStore.set('currentSearch', searchId);
          navigate(`/search/${searchId}`);
        }}
      />}
      <button className='clear-cache danger secondary' onClick={() => confirm("You're about to clear the search cache.") && CacheStore.clear()}>Clear Cache</button>
    </div>
  );
}