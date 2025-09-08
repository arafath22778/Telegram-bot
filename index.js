// প্রয়োজনীয় লাইব্রেরি ইম্পোর্ট করা হচ্ছে
const { Telegraf, Markup } = require('telegraf');
require('dotenv').config(); // .env ফাইল থেকে ভ্যারিয়েবল লোড করার জন্য

// কনফিগারেশন ভ্যারিয়েবল
const BOT_TOKEN = process.env.BOT_TOKEN;
const JOIN_CHANNEL_USERNAME = '@NarutoAllSeasonDownload'; // ব্যবহারকারীকে যে চ্যানেলে জয়েন করতে হবে
const SOURCE_CHANNEL_USERNAME = '@movieDownload1212';   // যেখান থেকে ফাইল কপি করা হবে

// Python কোডের মতোই সকল সিনেমার এবং অ্যানিমের Message ID এখানে রাখা হয়েছে
const LINK_MOVIE_ANIME_IDS = {
    // Anime start from here
    "lookism_season_1":[858,859,860,861,862,863,864,865],
    "spy":[869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893],
    "naruto_shi_s1":[74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,103,104,105,106],
    "naruto_shi_s2":[125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145],
    "naruto_shi_s3":[41,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,62,63,64,65,66,67,68,69,70],
    "naruto_shi_s4":[209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225],
    "naruto_shi_s5":[184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207],
    "naruto_shi_s6":[238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268],
    "naruto_shi_s7":[228,229,230,231,232,233,234,235],
    "naruto_shi_s8":[294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,314,315,316,317],
    "naruto_shi_s9":[271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291],
    "naruto_s1":[625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650],
    "naruto_s2":[653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678],
    "naruto_s3":[684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711],
    "naruto_s4":[742],
    "naruto_s5":[713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740],
    "naruto_s6":[744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767],
    "naruto_s7":[805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830],
    "naruto_s8":[769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794],
    "naruto_s9":[796,797,798,799,800,801,802,803],
    "juju_s1":[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],
    "juju_s2":[159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181],
    "ato_s1":[381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405],
    "ato_s2":[411,412,413,414,145,416,417,418,419,420,421,422],
    "ato_s3":[425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,455],
    "ato_s4":[458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485],
    "db_s1":[488,489,490,491,492,493,494,495,496,497,498,499,500,501],
    "db_s2":[548,549,550,551,552,553,554,555,556,557,558,559,560],
    "db_s3":[527,528,529,530,531,532,533,534,535,536,537,538,339,540,541,542,543,544,545],
    "db_s4":[505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524],
    "db_s5":[563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617],
    "demon_s1":[343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368],
    "demon_s2":[323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340],
    "demon_s3":[],
    "demon_s4":[371,372,373,374,375,376,377,378],
    "solo_s1": [15],
    "solo_s2": [15],

    // movie start from here
    "screech": 123,
    "jujutsu": 621,
    "opred": 789,
    "rock":407,
    "animal": 897,
    "dragon":408,
    "fighter":504,
    "taare":895,
    "bor":623,
    "dangal":867,
    "sikandar":915,
    "ace": 916,
    "lop_nor_tomb": 918,
    "odela_railway_station": 991
};

// Telegraf বট অবজেক্ট তৈরি করা হচ্ছে
const bot = new Telegraf(BOT_TOKEN);

// --- Helper Functions ---

// এই ফাংশনটি একটি নির্দিষ্ট সিজনের সকল পর্ব পাঠাবে
const sendEpisodes = async (ctx, episodeIds, seasonName) => {
    if (!episodeIds || episodeIds.length === 0) {
        return ctx.reply(` দুঃখিত, ${seasonName}-এর কোনো পর্ব এখন পর্যন্ত যোগ করা হয়নি।`);
    }

    await ctx.reply(`⬇️ ${seasonName} পাঠানো হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।`);
    try {
        for (const msg_id of episodeIds) {
            await ctx.telegram.copyMessage(ctx.chat.id, SOURCE_CHANNEL_USERNAME, msg_id);
        }
        await ctx.reply(`✅ ${seasonName}-এর সব এপিসোড পাঠানো হয়েছে!`);
    } catch (error) {
        console.error(`Error sending episodes for ${seasonName}:`, error);
        await ctx.reply('❌ এপিসোড পাঠাতে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
};

// এই ফাংশনটি একটি নির্দিষ্ট মুভি পাঠাবে
const sendMovie = async (ctx, movieId, movieName) => {
    await ctx.reply(`⬇️ ${movieName} মুভিটি পাঠানো হচ্ছে...`);
    try {
        await ctx.telegram.copyMessage(ctx.chat.id, SOURCE_CHANNEL_USERNAME, movieId);
        await ctx.reply(`✅ ${movieName} মুভিটি পাঠানো হয়েছে!`);
    } catch (error) {
        console.error(`Error sending movie ${movieName}:`, error);
        await ctx.reply('❌ মুভিটি পাঠাতে সমস্যা হয়েছে।');
    }
}


// --- Middleware for Force Join ---
// এই মিডলওয়্যারটি প্রতিটি কমান্ড বা মেসেজের আগে রান করবে এবং চেক করবে ইউজার চ্যানেলে জয়েন করেছে কিনা
const forceJoinMiddleware = async (ctx, next) => {
    try {
        const chatMember = await ctx.telegram.getChatMember(JOIN_CHANNEL_USERNAME, ctx.from.id);
        const validStatuses = ["member", "administrator", "creator"];
        if (validStatuses.includes(chatMember.status)) {
            return next(); // ইউজার জয়েন করা থাকলে পরবর্তী ধাপে যাবে
        } else {
            // জয়েন না করে থাকলে এই মেসেজটি দেখাবে
            await ctx.reply(
                "❗ বট ব্যবহারের আগে আমাদের চ্যানেলে জয়েন করুন। জয়েন করার পর নিচের ✅ I Have Joined বাটনে চাপুন।",
                Markup.inlineKeyboard([
                    [Markup.button.url('🔗 Join Channel', `https://t.me/${JOIN_CHANNEL_USERNAME.substring(1)}`)],
                    [Markup.button.callback('✅ I Have Joined', 'check_join')]
                ])
            );
        }
    } catch (error) {
        console.error("Force join check error:", error);
        await ctx.reply("চ্যানেল মেম্বারশিপ চেক করতে সমস্যা হচ্ছে। অনুগ্রহ করে নিশ্চিত করুন বটটি চ্যানেলের অ্যাডমিন হিসেবে আছে।");
    }
};


// --- Bot Commands ---

// /start কমান্ডের জন্য
bot.start(forceJoinMiddleware, async (ctx) => {
    // ডিপ-লিঙ্ক চেক করার জন্য (?start=...)
    const payload = ctx.startPayload;
    if (payload && LINK_MOVIE_ANIME_IDS[payload]) {
        const ids = LINK_MOVIE_ANIME_IDS[payload];
        const name = payload.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        if (Array.isArray(ids)) { // যদি এটি একটি অ্যানিমে সিজন হয়
            await sendEpisodes(ctx, ids, name);
        } else { // যদি এটি একটি মুভি হয়
            await sendMovie(ctx, ids, name);
        }
        return;
    }
    
    // কোনো ডিপ-লিঙ্ক না থাকলে সাধারণ স্টার্ট মেনু দেখাবে
    await ctx.reply("What do you want to download?", Markup.inlineKeyboard([
        [Markup.button.callback("🎬 Movie", "show_movie")],
        [Markup.button.callback("🍥 Anime", "show_anime")]
    ]));
});


// /help কমান্ড
bot.command('help', (ctx) => {
    ctx.reply(
        "ℹ️ Bot Commands:\n" +
        "/start - বট শুরু করুন\n" +
        "/help - সাহায্য মেনু\n" +
        "/about - বট সম্পর্কে\n" +
        "/premium - প্রিমিয়াম ফিচার সম্পর্কে জানুন"
    );
});

// /about কমান্ড
bot.command('about', (ctx) => {
    ctx.reply(
        "🤖 এই বটটি টেলিগ্রাম চ্যানেল থেকে মুভি ও এনিমে ডাউনলোডের জন্য তৈরি।\n" +
        "✅ উন্নত ফিচার, দ্রুত ডেলিভারি এবং ইউজার-ফ্রেন্ডলি ইন্টারফেস!"
    );
});

// /premium কমান্ড
bot.command('premium', (ctx) => {
    ctx.reply(
        "💎 Premium ফিচার:\n" +
        "- দ্রুত ডাউনলোড\n" +
        "- Ad-free experience\n" +
        "- Exclusive এনিমে/মুভি\n" +
        "যোগাযোগ করুন: @YourSupportBot"
    );
});


// --- Callback Query Handlers (Button Clicks) ---

// "check_join" বাটনের জন্য
bot.action('check_join', async (ctx) => {
    await ctx.answerCbQuery();
    try {
        const chatMember = await ctx.telegram.getChatMember(JOIN_CHANNEL_USERNAME, ctx.from.id);
        const validStatuses = ["member", "administrator", "creator"];
        if (validStatuses.includes(chatMember.status)) {
            await ctx.deleteMessage(); // আগের 'join' মেসেজটি ডিলিট করে দেবে
            await ctx.reply("✅ চ্যানেল জয়েন নিশ্চিত হয়েছে!");
            // স্টার্ট মেনু আবার দেখাবে
            await ctx.reply("What do you want to download?", Markup.inlineKeyboard([
                [Markup.button.callback("🎬 Movie", "show_movie")],
                [Markup.button.callback("🍥 Anime", "show_anime")]
            ]));
        } else {
            await ctx.reply("❌ আপনি এখনো চ্যানেলে জয়েন করেননি। অনুগ্রহ করে জয়েন করে আবার চেষ্টা করুন।");
        }
    } catch (e) {
        console.error(e);
        await ctx.reply("পুনরায় চেক করতে সমস্যা হচ্ছে।");
    }
});


// প্রধান মেনু বাটন
bot.action('show_movie', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText("📽️ একটি মুভি নির্বাচন করুন:", Markup.inlineKeyboard([
        [Markup.button.callback("🎬 Dragon", "movie_dragon"), Markup.button.callback("🎬 Rockstar", "movie_rock")],
        [Markup.button.callback("🎬 Fighter", "movie_fighter"), Markup.button.callback("🎬 Screech", "movie_screech")],
        [Markup.button.callback("🎬 Jujutsu Kaisen 0", "movie_jujutsu"), Markup.button.callback("🎬 One Piece Red", "movie_opred")],
        [Markup.button.callback("🎬 Dangal", "movie_dangal"), Markup.button.callback("🎬 Borbadd", "movie_bor")],
        [Markup.button.callback("⬅️ Back to Main Menu", "main_menu")]
    ]));
});

bot.action('show_anime', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText("🎌 একটি অ্যানিমে সিরিজ বাছুন:", Markup.inlineKeyboard([
        [Markup.button.callback("🍥 Naruto", "anime_naruto"), Markup.button.callback("🍥 Naruto Shippuden", "anime_naruto_shi")],
        [Markup.button.callback("🍥 Lookism", "anime_lookism"), Markup.button.callback("🍥 Jujutsu Kaisen", "anime_jujutsu")],
        [Markup.button.callback("⚔️ Attack on Titan", "anime_aot"), Markup.button.callback("🔥 Demon Slayer", "anime_demonslayer")],
        [Markup.button.callback("🐉 Dragon Ball", "anime_dbz"), Markup.button.callback("🍥 Solo Leveling", "anime_solo")],
        [Markup.button.callback("⬅️ Back to Main Menu", "main_menu")]
    ]));
});

bot.action('main_menu', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText("What do you want to download?", Markup.inlineKeyboard([
        [Markup.button.callback("🎬 Movie", "show_movie")],
        [Markup.button.callback("🍥 Anime", "show_anime")]
    ]));
});


// অ্যানিমে সিজন বাটন
const seasonMenus = {
    'anime_naruto_shi': { name: 'Naruto Shippuden', seasons: 9 },
    'anime_naruto': { name: 'Naruto', seasons: 9 },
    'anime_aot': { name: 'Attack on Titan', seasons: 4 },
    'anime_demonslayer': { name: 'Demon Slayer', seasons: 4, key: 'demon' },
    'anime_dbz': { name: 'Dragon Ball', seasons: 5, key: 'db' },
    'anime_solo': { name: 'Solo Leveling', seasons: 2, key: 'solo' },
    'anime_lookism': { name: 'Lookism', seasons: 1 },
    'anime_jujutsu': { name: 'Jujutsu Kaisen', seasons: 2, key: 'juju' },
};

// ডায়নামিকভাবে অ্যানিমের সিজন মেনু তৈরি করার জন্য
for (const [action, config] of Object.entries(seasonMenus)) {
    bot.action(action, async (ctx) => {
        await ctx.answerCbQuery();
        const buttons = [];
        for (let i = 1; i <= config.seasons; i++) {
            const key = config.key || action.split('_')[1];
            buttons.push(Markup.button.callback(`${config.name} Season ${i}`, `${key}_s${i}`));
        }
        
        // বাটনগুলোকে দুটি কলামে সাজানো হচ্ছে
        const keyboard = [];
        for (let i = 0; i < buttons.length; i += 2) {
            keyboard.push(buttons.slice(i, i + 2));
        }
        keyboard.push([Markup.button.callback("⬅️ Back to Anime List", "show_anime")]);

        await ctx.editMessageText(`📺 ${config.name}-এর একটি সিজন নির্বাচন করুন:`, Markup.inlineKeyboard(keyboard));
    });
}


// সকল অ্যানিমের সিজন এবং মুভির ফাইল পাঠানোর জন্য
bot.action(/^([a-z]+)_s(\d+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const key = ctx.match[0]; // যেমন: naruto_s1, juju_s2
    const name = key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (LINK_MOVIE_ANIME_IDS[key]) {
        await sendEpisodes(ctx, LINK_MOVIE_ANIME_IDS[key], name);
    } else {
        await ctx.reply("দুঃখিত, এই সিজনটি খুঁজে পাওয়া যায়নি।");
    }
});

bot.action(/^movie_([a-z]+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const key = ctx.match[1]; // যেমন: dragon, rock
    const name = key.charAt(0).toUpperCase() + key.slice(1);
    if (LINK_MOVIE_ANIME_IDS[key]) {
        await sendMovie(ctx, LINK_MOVIE_ANIME_IDS[key], name);
    } else {
        await ctx.reply("দুঃখিত, এই মুভিটি খুঁজে পাওয়া যায়নি।");
    }
});


// বট চালু করা হচ্ছে
bot.launch();
console.log('✅ Bot is running...');

// Ctrl+C দিয়ে বন্ধ করার সময় একটি সুন্দর মেসেজ দেখানোর জন্য
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));