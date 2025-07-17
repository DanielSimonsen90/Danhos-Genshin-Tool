import { MaterialCard } from '@/components/domain/models/Material';
import ItemPage from '@/pages/_Layout/ItemPage';

export default function Material() {
  return <ItemPage itemKeys='Materials' Card={({ item }) => <MaterialCard material={item} className='main-material-card'
    showDetails
    showRarity 
    showModelsUsing 
    showModelAquired 
  />} />
}