"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("buy")
        .setDescription("buys a stock"),
    async execute(interaction) {
        let results;
        var Robinhood = require('robinhood')(credentials, function (err, data) {
            Robinhood.quote_data('V', function (err, response, body) {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log("quote_data");
                    console.log(body);
                    {
                        results: [
                            {
                                ask_price: String,
                                ask_size: Number,
                                bid_price: String,
                                bid_size: Number,
                                last_trade_price: String,
                                last_extended_hours_trade_price: String,
                                previous_close: String,
                                adjusted_previous_close: String,
                                previous_close_date: String,
                                symbol: String,
                                trading_halted: Boolean,
                                updated_at: String, // YYYY-MM-DDTHH:MM:SS e.g. '2016-01-07T21:00:00Z'
                            }
                        ];
                    }
                }
            });
        });
        const client = interaction.client;
        const cmd = await client.application?.commands.fetch();
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(`#6bde36`)
            .setTitle(`${Robinhood.quote_data.results.symbol}`)
            .setDescription(`buy by by by buy`)
            .setThumbnail(client.user?.avatarURL({ forceStatic: false }));
        await interaction.reply({ embeds: [embed] });
    },
};
function credentials(credentials, any, arg2) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=buy.js.map