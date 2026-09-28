# TND25

Demo code from a True North Dreamin' 2025 talk.

- Topic: Building Custom Tools to Boost Marketers' Productivity in Salesforce Marketing Cloud (SFMC)
- Presented by: Mathes K
- Slides: `Mathes-TND25 slide .pptx`

The repo holds three small, separate examples of extending SFMC: a custom content block, a custom Journey Builder activity, and a Chrome extension. They are teaching demos for SFMC developers, not production tools. There is no build step and no package manager. Each folder is plain HTML and JavaScript.

## 1. Simple custom content block ("1. Hello TND")

A custom content block for Content Builder. It shows a text box asking for a name. When the name changes, it sets the block's content to a bold welcome message that includes the name.

How it works:

- `index.html` loads Salesforce's Block SDK (`blocksdk.js`, BSD-3-Clause, included in the folder) and calls `sdk.setContent(html)` on the input's `change` event.
- `icon.png` and `dragIcon.png` are the icons for the block.

To try it:

1. Host the folder over HTTPS.
2. In SFMC Setup, create or open an installed package and add a Custom Content Block component that points at the hosted `index.html`.
3. In Content Builder, drag the block into an email and type a name.

## 2. Code Activity for Journey Builder ("2. Code Activity")

A custom Journey Builder activity whose configuration screen lets you write AMPscript or SSJS code in an editor, which is then saved on the activity.

How it works:

- `config.json` is the activity definition. It declares `"type": "CODE"`, the "message" category, and an `arguments.code` field. It also sets a 10 second `timeout`, JWT off, and `applicationExtensionKey` `jb-code-activity`.
- `index.html` is the configuration UI: a CodeMirror editor, loaded with RequireJS.
- `codeActivity.js` uses Postmonger to talk to Journey Builder. On `initActivity` it loads any saved code into the editor. It enables the Done button once the code is longer than 10 characters. On `clickedNext` it writes the code to `arguments.code`, marks the activity configured and calls `updateActivity`.
- `ssjs.txt` is a sample snippet: SSJS that inserts a row into a "Journey History" data extension using journey entry data (`{{Event.DEAudience-...}}`).
- `vendor/` has jQuery, RequireJS, Postmonger, Bootstrap, Fuel UX, Moment and CodeMirror.

This repo contains only the configuration side. There is no execute endpoint. Running the saved code depends on how Journey Builder handles the `CODE` activity type.

To try it:

1. Host the folder at the root of an HTTPS site. `index.html` and `requirejs.config.js` load scripts from `../../vendor/`, which only resolves to the folder's own `vendor/` when it is served from the site root.
2. Add a Journey Builder Activity component to an installed package, pointing at that URL.
3. Drag "Code Activity" onto a journey canvas, open it, and enter your code.

## 3. Chrome extension ("3. Chrome Extension")

A Manifest V3 Chrome extension named "Marketing Cloud User Monitor". Its popup shows a "Journey Summary" table: name, status, created date, last modified date, current population and cumulative population for each journey.

How it works:

- The popup (`popup.html`, `popup.js`) asks the background service worker for journey data.
- `background.js` calls the Journey Builder interactions endpoint on the SFMC web app domain, relying on the browser's logged-in SFMC session. It stores the result in `chrome.storage.local`, and the popup renders it.
- `manifest.json` requests the `storage` permission and host access to `*.exacttarget.com` and `*.marketingcloudapis.com`.
- `content.js` is fully commented out and is not registered in the manifest. It is an earlier idea for watching user API calls.

To try it:

1. Log in to SFMC in Chrome.
2. Open `chrome://extensions`, turn on Developer mode, click "Load unpacked" and select the "3. Chrome Extension" folder.
3. Click the extension icon.

## Project structure

```
1. Hello TND/            Custom content block (Block SDK)
2. Code Activity/        Custom Journey Builder activity (config + UI)
3. Chrome Extension/     MV3 extension showing a journey summary
Mathes-TND25 slide .pptx Talk slides
```

## Status and known limitations

These are demos written for a talk (April 2025). They are not maintained.

- Hello TND calls `sdk.setContent` twice with the same content. The name is inserted into the HTML without escaping.
- Code Activity: the "parse output as JSON" option is commented out and always saved as `false`. The `CODE` activity type and its execution are not documented in this repo. In `ssjs.txt`, both `id` and `email` are set from the email address field.
- Chrome extension: the SFMC stack is hardcoded in the fetch URL (`s12`), so it only works for accounts on that stack. It only shows the first page of journeys the endpoint returns. It depends on an internal web app endpoint, not a documented API. The popup builds table rows with `innerHTML` from API data. The extension name does not match what it does (it shows journeys, not users).
- No tests, no license file for the talk code itself.

## Ideas

- Make the Chrome extension detect the stack from the active tab.
- Add the execute side for the Code Activity, or document how the `CODE` type runs.
- Pull the vendored libraries from a CDN or a package manager.
