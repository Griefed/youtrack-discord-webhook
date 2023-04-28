
const entities = require("@jetbrains/youtrack-scripting-api/entities");

const CONFIG = require("./config");
const {Payload} = require("./payload");
const {Embed, Body, Author, Field, Footer} = require("./embed");

exports.rule = entities.Issue.onChange({
    title: "Discord Webhook",
    guard: (ctx) => {
        return ctx.issue.isReported;
    },
    action: (ctx) => {
        const issue = ctx.issue;

        if (issue.becomesReported) {
            const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
            const embed = new Embed();
            const body = new Body();

            body.title = "Issue " + issue.id + " Created";
            body.description = issue.description;
            body.url = issue.url;
            body.color = CONFIG.COLOR_NEGATIVE;
            body.setDateToNow();
            embed.body = body;

            const user = ctx.currentUser;
            embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

            embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

            payload.addEmbed(embed);
            payload.send(CONFIG.WEBHOOK_URL);

            return;
        }
        else if (issue.becomesResolved) {
            const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
            const embed = new Embed();
            const body = new Body();

            body.title = "Issue " + issue.id + " Resolved";
            body.description = issue.description;
            body.url = issue.url;
            body.color = CONFIG.COLOR_POSITIVE;
            body.setDateToNow();
            embed.body = body;

            const user = ctx.currentUser;
            embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

            embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

            payload.addEmbed(embed);
            payload.send(CONFIG.WEBHOOK_URL);

            return;
        }
        else if (issue.becomesUnresolved) {
            const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
            const embed = new Embed();
            const body = new Body();

            body.title = "Issue " + issue.id + " Unresolved";
            body.description = issue.description;
            body.url = issue.url;
            body.color = CONFIG.COLOR_NEGATIVE;
            body.setDateToNow();
            embed.body = body;

            const user = ctx.currentUser;
            embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

            embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

            payload.addEmbed(embed);
            payload.send(CONFIG.WEBHOOK_URL);

            return;
        }
        
    	const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
        const embed = new Embed();
        const body = new Body();

        body.title = "Issue " + issue.id + " " + issue.fields.State.name;
        body.description = issue.description;
        body.url = issue.url;
        body.color = CONFIG.COLOR_CHANGED;
        body.setDateToNow();
        embed.body = body;

        const user = ctx.currentUser;
        embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

        embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

        payload.addEmbed(embed);
        payload.send(CONFIG.WEBHOOK_URL);
    }
});
