
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

      const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
      const embed = new Embed();
      const body = new Body();

      try {
		    body.title = issue.fields.State.name + " " + issue.id;
      } catch (error) {
		    body.title = "Changed " + issue.id;
      }
      
      body.description = issue.description;
      body.url = issue.url;

      if (issue.becomesReported) {
        body.color = CONFIG.COLOR_REGULAR;
      }
      else if (issue.becomesResolved) {
        body.color = CONFIG.COLOR_POSITIVE;
      }
      else if (issue.becomesUnresolved) {
        body.color = CONFIG.COLOR_NEGATIVE;
      }
      else {
        body.color = CONFIG.COLOR_CHANGED;
      }
      
      body.setDateToNow();
      embed.body = body;

      const user = ctx.currentUser;
      embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

      embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

      payload.addEmbed(embed);
      payload.send(CONFIG.WEBHOOK_URL);
    }
});
