import { itemService, IItem } from "./itemsService";


export default function getOpponent(difficulty: number): IItem[] {
    const items = [
        itemService.ITEMS.AI_HANDICAP1,
    ]

    if (difficulty >= 1) {
        items.push(itemService.ITEMS.WR1);
    }

    if (difficulty >= 3) {
        items.push(itemService.ITEMS.GAS1);
        items.push(itemService.ITEMS.ROCKET1);
    }

    return items;
}