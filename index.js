// প্রয়োজনীয় লাইব্রেরি ইম্পোর্ট করা হচ্ছে
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
require('dotenv').config(); // .env ফাইল থেকে ভ্যারিয়েবল লোড করার জন্য

// --- কনফিগারেশন ভ্যারিয়েবল ---
const BOT_TOKEN = process.env.BOT_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const JOIN_CHANNEL_USERNAME = '@NarutoAllSeasonDownload'; // ব্যবহারকারীকে যে চ্যানেলে জয়েন করতে হবে
const SOURCE_CHANNEL_USERNAME = '@movieDownload1212';   // যেখান থেকে ফাইল কপি/ডিটেক্ট করা হবে
const TARGET_CHANNEL_USERNAME = '@NarutoAllSeasonDownload'; // যেখানে নতুন পোস্ট তৈরি হবে

// আগের মতোই সকল সিনেমার এবং অ্যানিমের Message ID এখানে রাখা হয়েছে
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
    "solo_s1": [], // Empty array as per original code
    "solo_s2": [], // Empty array as per original code

    // movie start from here
    "screech": 123, "jujutsu": 621, "opred": 789, "rock":407, "animal": 897,
    "dragon":408, "fighter":504, "taare":895, "bor":623, "dangal":867,
    "sikandar":915, "ace": 916, "lop_nor_tomb": 918, "odela_railway_station": 991
};

// Telegraf বট অবজেক্ট তৈরি করা হচ্ছে
const bot = new Telegraf(BOT_TOKEN);

// --- Helper Functions (Manual Menu) ---

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

// --- Helper Functions (Automatic Posting) ---

const searchMovieData = async (movieName) => {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieName)}`;
        const response = await axios.get(url);
        if (response.data.results && response.data.results.length > 0) {
            return response.data.results[0]; // Return the first result
        }
        return null;
    } catch (error) {
        console.error("TMDB API Error:", error.message);
        return null;
    }
};

const createMovieCaption = (movieData, quality, audio) => {
    let caption = `▶ Name : 📽️ ${movieData.title}\n`;
    caption += `▶ Quality : ${quality}\n`;
    caption += `▶ Audio : ${audio}\n`;
    caption += `#official\n`;
    caption += `___________________\n\n`;
    caption += `Download Now:`;
    return caption;
};

// --- Middleware for Force Join ---
const forceJoinMiddleware = async (ctx, next) => {
    try {
        const chatMember = await ctx.telegram.getChatMember(JOIN_CHANNEL_USERNAME, ctx.from.id);
        const validStatuses = ["member", "administrator", "creator"];
        if (validStatuses.includes(chatMember.status)) {
            return next();
        } else {
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

// --- Bot Event Listener for Automatic Posting ---

bot.on('channel_post', async (ctx) => {
    if (ctx.channelPost.chat.username === SOURCE_CHANNEL_USERNAME.substring(1)) {
        const post = ctx.channelPost;
        if (post.video || post.document) {
            const file = post.video || post.document;
            const messageId = post.message_id;

            let movieName = (file.file_name || "Untitled").split('.').slice(0, -1).join('.').replace(/[\._]/g, ' ');
            let quality = "720p";
            if (movieName.match(/1080p/i)) quality = "1080p";
            if (movieName.match(/480p/i)) quality = "480p";
            let audio = "Hindi";
            if (movieName.match(/english|eng/i)) audio = "English";
            
            movieName = movieName.replace(/(1080p|720p|480p|hindi|dual audio|bluray|hdrip|webrip)/ig, '').trim();
            console.log(`স্বয়ংক্রিয়ভাবে নতুন মুভি পাওয়া গেছে: ${movieName}`);

            const movieData = await searchMovieData(movieName);

            if (movieData && movieData.poster_path) {
                const posterUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
                const caption = createMovieCaption(movieData, quality, audio);
                const botUsername = (await ctx.telegram.getMe()).username;
                const deeplink = `https://t.me/${botUsername}?start=file_${messageId}`;

                try {
                    await ctx.telegram.sendPhoto(
                        TARGET_CHANNEL_USERNAME,
                        { url: posterUrl },
                        {
                            caption: caption,
                            ...Markup.inlineKeyboard([
                                [Markup.button.url('Click Here to Download', deeplink)]
                            ])
                        }
                    );
                    console.log(`"${movieData.title}" সফলভাবে ${TARGET_CHANNEL_USERNAME} চ্যানেলে পোস্ট করা হয়েছে।`);
                } catch (e) {
                    console.error("টার্গেট চ্যানেলে পোস্ট করতে ব্যর্থ:", e.message);
                }
            } else {
                console.log(`"${movieName}" এর জন্য TMDB-তে কোনো তথ্য পাওয়া যায়নি।`);
            }
        }
    }
});

// --- Bot Commands ---

bot.start(forceJoinMiddleware, async (ctx) => {
    const payload = ctx.startPayload;

    // নতুন স্বয়ংক্রিয় সিস্টেমের জন্য ডিপ-লিঙ্ক হ্যান্ডেল করা (`?start=file_123`)
    if (payload && payload.startsWith('file_')) {
        const messageId = parseInt(payload.split('_')[1], 10);
        if (!isNaN(messageId)) {
            await ctx.reply("⬇️ আপনার ফাইলটি পাঠানো হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।");
            try {
                // "Forwarded from" ছাড়া ফাইল পাঠানোর জন্য copyMessage ব্যবহার করা হচ্ছে
                await ctx.telegram.copyMessage(ctx.chat.id, SOURCE_CHANNEL_USERNAME, messageId);
                await ctx.reply("✅ ফাইল পাঠানো হয়েছে!");
            } catch (error) {
                console.error("ফাইল কপি করার সময় সমস্যা:", error.message);
                await ctx.reply("❌ ফাইলটি পাঠাতে একটি সমস্যা হয়েছে। এটি হয়তো মুছে ফেলা হয়েছে।");
            }
        }
        return;
    }

    // পুরোনো ম্যানুয়াল সিস্টেমের জন্য ডিপ-লিঙ্ক হ্যান্ডেল করা (`?start=naruto_s1`)
    if (payload && LINK_MOVIE_ANIME_IDS[payload]) {
        const ids = LINK_MOVIE_ANIME_IDS[payload];
        const name = payload.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        if (Array.isArray(ids)) {
            await sendEpisodes(ctx, ids, name);
        } else {
            await sendMovie(ctx, ids, name);
        }
        return;
    }
    
    // কোনো ডিপ-লিঙ্ক না থাকলে সাধারণ স্টার্ট মেনু দেখানো
    await ctx.reply("What do you want to download?", Markup.inlineKeyboard([
        [Markup.button.callback("🎬 Movie", "show_movie")],
        [Markup.button.callback("🍥 Anime", "show_anime")]
    ]));
});

// পুরোনো কোডের অন্যান্য কমান্ডগুলো অপরিবর্তিত থাকছে
bot.command('help', (ctx) => { ctx.reply("ℹ️ Bot Commands:\n/start - বট শুরু করুন\n/help - সাহায্য মেনু\n/about - বট সম্পর্কে\n/premium - প্রিমিয়াম ফিচার সম্পর্কে জানুন"); });
bot.command('about', (ctx) => { ctx.reply("🤖 এই বটটি টেলিগ্রাম চ্যানেল থেকে মুভি ও এনিমে ডাউনলোডের জন্য তৈরি।\n✅ উন্নত ফিচার, দ্রুত ডেলিভারি এবং ইউজার-ফ্রেন্ডলি ইন্টারফেস!"); });
bot.command('premium', (ctx) => { ctx.reply("💎 Premium ফিচার:\n- দ্রুত ডাউনলোড\n- Ad-free experience\n- Exclusive এনিমে/মুভি\nযোগাযোগ করুন: @YourSupportBot"); });

// --- Callback Query Handlers (Button Clicks) ---

bot.action('check_join', async (ctx) => {
    await ctx.answerCbQuery();
    try {
        const chatMember = await ctx.telegram.getChatMember(JOIN_CHANNEL_USERNAME, ctx.from.id);
        const validStatuses = ["member", "administrator", "creator"];
        if (validStatuses.includes(chatMember.status)) {
            await ctx.deleteMessage();
            await ctx.reply("✅ চ্যানেল জয়েন নিশ্চিত হয়েছে!");
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

// পুরোনো কোডের বাকি অংশ অপরিবর্তিত
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

const seasonMenus = {
    'anime_naruto_shi': { name: 'Naruto Shippuden', seasons: 9 }, 'anime_naruto': { name: 'Naruto', seasons: 9 },
    'anime_aot': { name: 'Attack on Titan', seasons: 4 }, 'anime_demonslayer': { name: 'Demon Slayer', seasons: 4, key: 'demon' },
    'anime_dbz': { name: 'Dragon Ball', seasons: 5, key: 'db' }, 'anime_solo': { name: 'Solo Leveling', seasons: 2, key: 'solo' },
    'anime_lookism': { name: 'Lookism', seasons: 1 }, 'anime_jujutsu': { name: 'Jujutsu Kaisen', seasons: 2, key: 'juju' },
};

for (const [action, config] of Object.entries(seasonMenus)) {
    bot.action(action, async (ctx) => {
        await ctx.answerCbQuery();
        const buttons = Array.from({ length: config.seasons }, (_, i) => {
            const key = config.key || action.split('_')[1];
            return Markup.button.callback(`${config.name} Season ${i + 1}`, `${key}_s${i + 1}`);
        });
        const keyboard = [];
        for (let i = 0; i < buttons.length; i += 2) {
            keyboard.push(buttons.slice(i, i + 2));
        }
        keyboard.push([Markup.button.callback("⬅️ Back to Anime List", "show_anime")]);
        await ctx.editMessageText(`📺 ${config.name}-এর একটি সিজন নির্বাচন করুন:`, Markup.inlineKeyboard(keyboard));
    });
}

bot.action(/^([a-z]+)_s(\d+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const key = ctx.match[0];
    const name = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (LINK_MOVIE_ANIME_IDS[key]) {
        await sendEpisodes(ctx, LINK_MOVIE_ANIME_IDS[key], name);
    } else {
        await ctx.reply("দুঃখিত, এই সিজনটি খুঁজে পাওয়া যায়নি।");
    }
});

bot.action(/^movie_([a-z]+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const key = ctx.match[1];
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

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
