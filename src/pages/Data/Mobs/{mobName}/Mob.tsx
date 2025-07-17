import { MobCard } from '@/components/domain/models/Mob';
import ItemPage from '@/pages/_Layout/ItemPage';

export default function Mob() {
  return <ItemPage itemKeys='Mobs' Card={({ item }) => <MobCard mob={item} className='main-mob-card'
    nameTag='h1'
    showDetails
    showRegion
    showDrops
    showRarity
    showRelations
    showResin
  />} />
}