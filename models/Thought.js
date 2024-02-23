const { model, Schema } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, "enter your thought here"],
            minLength: [1, 'Your thought must be at least 1 character in length']
        },

        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    });

thoughtSchema.set('toJSON', {
    transform: (_, thought) => {
        delete thought.__v;
        return thought;
    }
});


//Reaction Schema
const reactionSchema = new Schema(
    //Est. custom ID
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 100
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
        }
    });

reactionSchema.set('toJSON', {
    transform: (_, reaction) => {
        delete reaction.__v;
        return reaction;
    }
});

//reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;