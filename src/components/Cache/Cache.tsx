import Select from "../Select";
import CacheStore from '@/stores/CacheStore';
import { useNavigate } from "react-router-dom";
import { useStoreProperty } from "@/hooks/useStore";

export default function Cache() {
  const navigate = useNavigate();
  const options = useStoreProperty(CacheStore, (store => {
    const cached = store.get('searchHistory', '{}');
    return Object.values(cached);
  }));

  return (
    <div className="cache">
      {options.length > 1 && <Select name="search-history" 
        options={options.map(item => item.title)} 
        placeholder="Previous searches" 
        onChange={value => navigate(`/search/${options.find(item => item.title === value).id}`)} 
      />}
      <button className='clear-cache danger secondary' onClick={() => confirm("You're about to clear the search cache.") && CacheStore.clear()}>Clear Cache</button>
    </div>
  );
}