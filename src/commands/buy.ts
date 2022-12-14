import {
    Interaction,
    EmbedBuilder,
    CommandInteractionOptionResolver,
    Message,
    CommandInteraction,
    ApplicationCommand,
    SlashCommandBuilder,
    SlashCommandStringOption,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
  } from "discord.js";
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("buy")
      .setDescription("buys a stock"),
  
    async execute(interaction: CommandInteraction) {

        let results;

        var Robinhood = require('robinhood')(credentials, function(err: any, data: any){
            Robinhood.quote_data('V', function(err: any, response: any, body: any){
                if(err){
                    console.error(err);
                }else{
                    console.log("quote_data");
                    console.log(body);
                    {
                        results: [
                            {
                                ask_price: String, // Float number in a String, e.g. '735.7800'
                                ask_size: Number, // Integer
                                bid_price: String, // Float number in a String, e.g. '731.5000'
                                bid_size: Number, // Integer
                                last_trade_price: String, // Float number in a String, e.g. '726.3900'
                                last_extended_hours_trade_price: String, // Float number in a String, e.g. '735.7500'
                                previous_close: String, // Float number in a String, e.g. '743.6200'
                                adjusted_previous_close: String, // Float number in a String, e.g. '743.6200'
                                previous_close_date: String, // YYYY-MM-DD e.g. '2016-01-06'
                                symbol: String, // e.g. 'AAPL'
                                trading_halted: Boolean,
                                updated_at: String, // YYYY-MM-DDTHH:MM:SS e.g. '2016-01-07T21:00:00Z'
                            }
                        ]
                    }
                }
            })
        });


        const client = interaction.client;
        const cmd = await client.application?.commands.fetch();

    

      
    },
  };

function credentials(credentials: any, any: any, arg2: (err: any, data: any) => void) {
    throw new Error("Function not implemented.");
}
  