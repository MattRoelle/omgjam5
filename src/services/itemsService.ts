interface IItemEffect {
    weight?: number;
}

interface IItemOffset { x?: number; y?: number; }

interface IItem {
    name: string;
    description: string;
    price: number;
    spriteKey: string;
    effect: IItemEffect;
    priority: number;
    replacesBaseSprite: boolean;
    ignoreRotation: boolean;
    offset?: IItemOffset;
    origin?: IItemOffset;
}

interface IItemService {
    ITEMS: { [key: string]: IItem };
}

const itemService = {
    ITEMS: <{ [key: string]: IItem }>{
        WR1: {
            name: "Weight Reduction 1",
            description: "Carve out the center of your rock a bit.",
            price: 50,
            spriteKey: "rock2",
            effect: { weight: -5 },
            priority: 0,
            replacesBaseSprite: true,
            ignoreRotation: false
        },
        GAS1: {
            name: "Small Gas Tank",
            description: "A little goes a long way",
            price: 50,
            spriteKey: "tank1",
            effect: { gasTank: 5 },
            priority: 1,
            replacesBaseSprite: false,
            ignoreRotation: false,
            origin: { x: 0.5, y: 1 }
        },
        BUMPERS1: {
            name: "Bumpers",
            description: "Bouncy",
            price: 50,
            spriteKey: "bumpers1",
            effect: { bounce: 0.05 },
            priority: 5,
            replacesBaseSprite: false,
            ignoreRotation: false,
        }
    },
};

export {
    itemService,
    IItem
};