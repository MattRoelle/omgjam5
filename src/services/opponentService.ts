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

    if (difficulty >= 7) {
        const r = Math.random();
        if (r > 0.5) {
            items.push(itemService.ITEMS.GAS2);
        } else {
            items.push(itemService.ITEMS.WR2);
        }
    }

    if (difficulty >= 9) {
        const r = Math.random();
        if (r > 0.5) {
            items.push(itemService.ITEMS.GAS2);
        } else {
            items.push(itemService.ITEMS.ROCKET2);
        }
    }

    if (difficulty >= 10) {
        items.push(itemService.ITEMS.WR3);
    }

    if (difficulty >= 11) {
        items.push(itemService.ITEMS.JUMP1);
    }

    if (difficulty >= 13) {
        const r = Math.random();
        if (r > 0.5) {
            items.push(itemService.ITEMS.BUMPERS1);
        }
    }

    if (difficulty >= 16) {
        items.push(itemService.ITEMS.ROCKET3);
    }

    if (difficulty >= 19) {
        items.push(itemService.ITEMS.GAS3);
    }

    if (difficulty >= 23) {
        items.push(itemService.ITEMS.ROCKET3);
    }

    if (difficulty >= 25) {
        items.push(itemService.ITEMS.GAS4);
    }

    if (difficulty >= 28) {
        items.push(itemService.ITEMS.WR4);
    }

    return items;
}