import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema(

    {

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

      },

      chatId: String,

      title: String,

      userMessage: String,

      botReply: String,

      mood: String,

    },

    {

      timestamps: true,

    }

  );

const Message = mongoose.model(

  "Message",

  messageSchema

);

export default Message;