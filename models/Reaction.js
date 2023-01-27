const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateHelper");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp)
        },
    }
);

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

// const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema;