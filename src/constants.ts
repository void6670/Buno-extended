import { readFileSync } from "fs";

import { config } from "./index.js";
import { Card, Config, UnoGameSettings } from "./types.js";

export const defaultConfig: Config = Object.freeze({
    prefix: "]",
    emoteless: true,
    status: undefined,
    developerIds: [],
    devPrefix: "]]",
    logChannel: undefined,
    title: undefined
});

export const colors = ["red", "yellow", "green", "blue",] as const;
export const colorEmotes: { [k in typeof colors[number] | "other"]: string } = {
    red: "🟥",
    yellow: "🟨",
    green: "🟩",
    blue: "🟦",
    other: "⬛"
} as const;

export const variants = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+2", "reverse", "block",] as const;
export const uniqueVariants = ["wild", "+4",] as const;

export const cards = colors
    .map(c => variants.map(v => `${c}-${v}`))
    .flat()
    .concat(uniqueVariants) as ReadonlyArray<Card>;

export let cardEmojis: { [k in Card]: string };
try {
    cardEmojis = Object.freeze(JSON.parse(readFileSync("./emotes.json", "utf8")));
} catch (e) {
    console.error("Failed to read emotes.json. This most likely means you forgot to rename emotes.json.example; please keep the file even if using emoteless mode");
    console.log(e);
    setTimeout(() => process.exit(1), 30_000);
}

export let cardEmotes: { [k in Card]: string };
// this has to be some of the most insane code i've written
setImmediate(() => cardEmotes = config.emoteless
    ? colors
        .map(c => variants.map(v => [`${c}-${v}`, colorEmotes[c]]))
        .concat([uniqueVariants.map(v => [v, colorEmotes.other])])
        .reduce((obj, val) => { val.forEach(([k, v]) => obj[k] = v); return obj; }, {}) as { [k in Card]: string }
    : cardEmojis
);

export const coloredUniqueCards: { [k in `${typeof colors[number]}-${typeof uniqueVariants[number]}`] } = {
    "red-wild": "<:Wr:1083073403197587476>",
    "red-+4": "<:4r:1083073363360108545>",
    "yellow-wild": "<:Wy:1083073405793873940>",
    "yellow-+4": "<:4y:1083073365641801849>",
    "green-wild": "<:Wg:1083073401469542460>",
    "green-+4": "<:4g:1083073361875325071>",
    "blue-wild": "<:Wb:1083073398374137917>",
    "blue-+4": "<:4b:1083073359404867716>"
};

export const rainbowColors = [
    0xf38ba8,
    0xfab387,
    0xf9e2af,
    0xa6e3a1,
    0x89b4fa,
    0xcba6f7,
    0xf5c2e7
] as const;
export const defaultColor = 0x6c7086;

export const defaultSettings: UnoGameSettings = {
    timeoutDuration: 150,
    kickOnTimeout: true,
    allowSkipping: false,
    antiSabotage: true,
    allowStacking: true,
    randomizePlayerList: true,
    resendGameMessage: true,
    canJoinMidgame: "temporarily",
    sevenAndZero: false
} as const;

export const maxRejoinableTurnCount = 30;

export const autoStartTimeout = 305;

// its "just" 25 days but i still doubt a game will go on for longer than that
export const veryLongTime = 2_147_483.647;

// do NOT use "__" in any id's
export const ButtonIDs = Object.freeze({
    JOIN_GAME: "join",
    LEAVE_GAME_BEFORE_START: "leave",
    EDIT_GAME_SETTINGS: "game-settings",
    DELETE_GAME: "delete-game",
    START_GAME: "start",
    VIEW_CARDS: "view-cards",
    PLAY_CARD: "play-game",
    LEAVE_GAME: "leave-game",
    JOIN_MID_GAME: "join-ongoing",
    LEAVE_GAME_CONFIRMATION_YES: "confirm-leave-game",
    LEAVE_GAME_CONFIRMATION_NO: "deny-leave-game",
    VIEW_GAME_SETTINGS: "view-settings",
    SHOUT_UNO: "shout-uno"
});

export const SelectIDs = Object.freeze({
    CHOOSE_CARD: "choose-card",
    CHOOSE_CARD_ABOVE_25: "choose-card-2",
    CHOOSE_COLOR: "choose-color",
    FORCEFUL_DRAW: "draw-or-stack",
    PLAYER_USER_SELECT: "select-player-user",
    EDIT_GAME_SETTINGS: "change-settings",
    EDIT_GAME_SETTINGS_RULES: "change-game-rules",
});

export const SettingsIDs = Object.freeze({
    TIMEOUT_DURATION: "timeout-duration-setting",
    KICK_ON_TIMEOUT: "kick-on-timeout",
    ANTI_SABOTAGE: "anti-sabotage",
    RANDOMIZE_PLAYER_LIST: "randomize-list",
    RESEND_GAME_MESSAGE: "resend-game-message",
    ALLOW_REJOINING: "can-rejoin",

    ALLOW_SKIPPING: "allow-skipping",
    ALLOW_CARD_STACKING: "allow-stacking",
    SEVEN_AND_ZERO: "7-and-0",

    TIMEOUT_DURATION_MODAL: "timeout-duration-modal",
    TIMEOUT_DURATION_MODAL_SETTING: "timeout-setting-field",
});
