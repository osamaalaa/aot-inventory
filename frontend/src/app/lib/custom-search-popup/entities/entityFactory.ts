import { ItemEntity } from './Item.entity';
import { IEntity } from './interface/Entity';
import { ItemFromBalanceUnitsEntity } from './itemsFromItemBalanceUnits';

const ENTITIES = {
    ITEM:'item',
    ITEM_BALANCE:'item-balance'
}
export class EntityFactory{
    public static createEntity(entity:string,queryParams?):IEntity{
        switch(entity){
            case ENTITIES.ITEM : return new ItemEntity();
            case ENTITIES.ITEM_BALANCE:return new ItemFromBalanceUnitsEntity(queryParams)
            default:throw new Error("Entity is not defined. Please create one entity")
        }
    }
}