interface IItemEffect {
    weight?: number;
    airFriction?: number;
    speed?: number;
    bounce?: number;
    fuel?: number;
    rocket?: number;
    jumpDelay?: number;
}

interface IItemOffset { x?: number; y?: number; }

interface IItem {
    id?: string;
    name: string;
    description: string;
    price: number;
    spriteKey?: string;
    effect: IItemEffect;
    priority: number;
    replacesBaseSprite?: boolean;
    ignoreRotation?: boolean;
    offset?: IItemOffset;
    origin?: IItemOffset;
    aiOnly?: boolean;
    requirements?: string[];
    category?: string;
}

interface IItemService {
    ITEMS: { [key: string]: IItem };
}

const itemService = {
    ITEMS: <{ [key: string]: IItem }>{
        AI_HANDICAP1: <IItem>{
            id: "ai1",
            name: "x",
            description: "x",
            price: 50,
            effect: { speed: 0.2 },
            priority: 0,
            aiOnly: true
        },
        WR1: <IItem> {
            id: "wr1",
            name: "Weight Reduction 1",
            description: "Carve out the center of your rock a bit.",
            price: 100,
            spriteKey: "rock2",
            effect: { speed: 0.1 },
            priority: 0,
            replacesBaseSprite: true,
            ignoreRotation: false
        },
        WR2: <IItem>{
            id: "wr2",
            requirements: ["wr1"],
            name: "Weight Reduction 2",
            description: "It loks like a deformed donut...",
            price: 250,
            spriteKey: "rock3",
            effect: { speed: 0.2 },
            priority: 0,
            replacesBaseSprite: true,
            ignoreRotation: false
        },
        WR3: <IItem>{
            id: "wr3",
            requirements: ["wr2"],
            name: "Weight Reduction 3",
            description: "Is that even legal?",
            price: 600,
            spriteKey: "rock4",
            effect: { speed: 0.3 },
            priority: 0,
            replacesBaseSprite: true,
            ignoreRotation: false
        },
        WR4: <IItem>{
            id: "wr4",
            requirements: ["wr3"],
            name: "Carbon Fiber",
            description: "That's not even a rock!",
            price: 1000,
            spriteKey: "rock5",
            effect: { speed: 0.4 },
            priority: 0,
            replacesBaseSprite: true,
            ignoreRotation: false
        },
        JUMP1: <IItem> {
            id: "jump1",
            category: "jump",
            name: "Jump Module 1",
            description: "Allows you to jump more frequently",
            price: 250,
            spriteKey: "jumpmod1",
            effect: { jumpDelay: -200 },
            priority: -10,
            replacesBaseSprite: false,
            ignoreRotation: false,
        },
        JUMP2: <IItem> {
            id: "jump2",
            requirements: ["jump1"],
            category: "jump",
            name: "Super Jump Module",
            description: "Allows you to jump more frequently",
            price: 500,
            spriteKey: "jumpmod2",
            effect: { jumpDelay: -200 },
            priority: -10,
            replacesBaseSprite: false,
            ignoreRotation: false,
        },
        GAS1: <IItem> {
            id: "gas1",
            category: "gas",
            name: "Small Gas Tank",
            description: "A little goes a long way",
            price: 100,
            spriteKey: "tank1",
            effect: { fuel: 25 },
            priority: -10,
            replacesBaseSprite: false,
            ignoreRotation: false,
            origin: { x: 0.5, y: 1 }
        },
        GAS2: <IItem> {
            id: "gas2",
            category: "gas",
            requirements: ["gas1"],
            name: "Medium Gas Tank",
            description: "Now we're cooking with gas.",
            price: 250,
            spriteKey: "tank2",
            effect: { fuel: 25 },
            priority: -10,
            replacesBaseSprite: false,
            ignoreRotation: false,
            origin: { x: 0.5, y: 1 }
        },
        GAS3: <IItem> {
            id: "gas3",
            category: "gas",
            requirements: ["gas2"],
            name: "Large Gas Tank",
            description: "Maximum Capacity!",
            price: 400,
            spriteKey: "tank3",
            effect: { fuel: 25 },
            priority: -10,
            replacesBaseSprite: false,
            ignoreRotation: false,
            origin: { x: 0.5, y: 1 }
        },
        GAS4: <IItem> {
            id: "gas4",
            category: "gas",
            requirements: ["gas3"],
            name: "Top Secret Tank",
            description: "Shhhhhhh...",
            price: 750,
            spriteKey: "tank4",
            effect: { fuel: 25 },
            priority: -10,
            replacesBaseSprite: false,
            ignoreRotation: false,
            origin: { x: 0.5, y: 1 }
        },
        BUMPERS1: {
            id: "b1",
            name: "Bumpers",
            description: "Put a rubber ring around your rock to help it's bounciness",
            price: 300,
            spriteKey: "bumpers1",
            effect: { bounce: 0.09 },
            priority: 5,
            replacesBaseSprite: false,
            ignoreRotation: false,
        },
        ROCKET1: {
            category: "rocket",
            id: "rocket1",
            name: "Rocket Mk 1",
            description: "Better than nothing.",
            price: 150,
            spriteKey: "rocket1",
            effect: { rocket: 1 },
            priority: -30,
            replacesBaseSprite: false,
            ignoreRotation: true,
        },
       ROCKET2: {
            category: "rocket",
            id: "rocket2",
            requirements: ["rocket1"],
            name: "Rocket Mk 2",
            description: "Now that's a real rocket.",
            price: 400,
            spriteKey: "rocket2",
            effect: { rocket: 0.6 },
            priority: -30,
            replacesBaseSprite: false,
            ignoreRotation: true,
        },
        ROCKET3: {
            category: "rocket",
            id: "rocket3",
            requirements: ["rocket2"],
            name: "Rocket Mk 3",
            description: "Did you steal this from NASA?",
            price: 700,
            spriteKey: "rocket3",
            effect: { rocket: 0.8 },
            priority: -30,
            replacesBaseSprite: false,
            ignoreRotation: true,
        } 
    },
};

let n = 0;
for(let k in itemService.ITEMS) n++;
console.log(n + " items");

export {
    itemService,
    IItem
};