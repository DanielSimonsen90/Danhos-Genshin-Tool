import { useNavigate, useParams } from "react-router-dom";
import Select from "@/components/Select";
import { useCacheItemMapped, useCacheStore } from "@/stores";
import { useEffect, useMemo } from "react";

export default function Cache() {
  const navigate = useNavigate();
  const { query } = useParams();
  const CacheStore = useCacheStore();
  const options = useCacheItemMapped('searchHistory', searchHistory => Object.values(searchHistory));
  const currentSearch = useMemo(() => query ? CacheStore.get('searchHistory', {})?.[query] : undefined, [query, CacheStore]);

  return (
    <div className="cache">
      {options?.length > 0 && <Select name="search-history"
        value={currentSearch?.title}
        options={options.map(item => item.title)}
        placeholder="Previous searches"
        onChange={value => {
          const searchId = options.find(item => item.title === value)?.id;
          navigate(`/search/${searchId}`);
        }}
      />}
      <button className='clear-cache danger secondary' onClick={() => confirm("You're about to clear the search cache.") && CacheStore.clear()}>Clear Cache</button>
    </div>
  );
}