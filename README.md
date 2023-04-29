# Discord Webhook Integration for YouTrack
YouTrack currently has no decent way of sending webhook notifications to Discord as of right now, so this project solves just that.

## Installation

### Method 1

1. Create a new workflow on YouTrack, name it something like `discord-webhook` or whatever.
2. In the YouTrack workflow scripting area that you're taken to, press the + button on your workflow and add a custom module for each JavaScript file in this project.
3. Paste and save the contents of each JavaScript file from this project into the custom modules.
4. Change the config file set up the integration.
5. Test if the integration works by creating a new issue on YouTrack.

### Method 2

1. Download the `discord_notification.zip` attached to the latest release
2. In YouTrack, browse to the workflow section
3. Hit `Import workflow` and select the previously downloaded ZIP-archive
4. Edit the workflows config 
5. Test if the integration works by creating a new issue or changing an already existing one

---

### Example

![image](https://user-images.githubusercontent.com/44273438/235290839-508cd3c9-951e-4199-bb24-098495fae8e8.png)
