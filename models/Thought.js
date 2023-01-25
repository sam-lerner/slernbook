
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const format_date = require("../utils/helpers");
// NEED TO FIGURE OUT THE DATE GETTER BIT.

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (timestamp) => format_date(timestamp)
          },
          username: {
            type: String,
            required: true,
          },
          reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;