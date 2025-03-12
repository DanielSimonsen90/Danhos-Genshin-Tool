import Switch from "@/components/common/Switch";
import { useSetting } from "@/stores";

export const Wrap = () => {
  const wrap = useSetting('wrap');

  return (
    <div className="search-result__wrap-container">
      <Switch enabled={wrap.get()} onChange={wrap.set} />
      <label>Wrap</label>
    </div>
  )
}

export default Wrap;