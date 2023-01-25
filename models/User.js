const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, "Please enter a valid e-mail address!"],
        },
        // Pulling thoughts from the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        // Friends are also Users
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create the virtual for 'friendCount'
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
