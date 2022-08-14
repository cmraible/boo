var luxon = require('luxon');

module.exports = {
    formatDateRelative: function(date) {
        // Format a JS Date (from prisma or elsewhere) into a relative time (e.g. 5 minutes ago)
        var dateTime = luxon.DateTime.fromJSDate(date)
        return dateTime.toRelative()
    },
    userUpvoted: function(context, options) {
        // Block helper
        // Determines whether logged in user upvoted the given comment
        // Adds boolean value "upvote" to context
        console.log(context);
        const userUpvoted = context.upvotes.some(function(upvote) {
            return context.user === upvote.userId
        });
        return options.fn({upvoted: userUpvoted, ...context});
    }
}