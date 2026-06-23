import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "@/components/common/FormItems";
import { useCacheStore } from "@/stores";
import { useConfirm } from "@/providers/ConfirmProvider";
import { useSettingsStore } from "@/stores/SettingsStore";
import { ROUTES } from "@/common/constants/routes";

export default function Cache() {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { query } = useParams();

  const CacheStore = useCacheStore();
  const searchHistory = useCacheStore(store => store.get('searchHistory', {})) ?? {};
  const options = Object.values(searchHistory).filter(Boolean);
  const currentSearch = query ? searchHistory?.[query] : undefined;

  const cacheEvictionDays = useSettingsStore(s => s.getSetting('cacheEvictionDays') ?? 30);

  useEffect(() => {
    if (!CacheStore.has('searchHistory')) CacheStore.load('searchHistory', {});
    CacheStore.evictExpired(cacheEvictionDays);
  }, [CacheStore, cacheEvictionDays]);

  return (
    <div className="cache">
      {options.length > 0
        ? <Select name="search-history"
          value={currentSearch?.title}
          options={options.map(item => item.title)}
          placeholder="Previous searches"
          onChange={value => {
            const searchId = options.find(item => item.title === value)?.id ?? ':query';
            navigate(`/${ROUTES.building_artifact_helper_search_query.replace(':query', searchId)}`);
          }}
        />
      : <p>No search history yet.</p>}
      {options.length > 0 && (
        <button className='clear-cache danger secondary' onClick={async () => {
          if (await confirm({ 
            title: 'Clear search history', 
            message: "You're about to clear the search cache. This cannot be undone.", 
            destructive: true
          })) {
            CacheStore.clearCache();
          }
        }}>Clear Cache</button>
      )}
    </div>
  );
}