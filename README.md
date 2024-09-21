# PowerOn - a language grammer for the Jack Henry [Credit Union Core Platform](https://www.jackhenry.com/what-we-offer/operations/core-platforms/credit-union-core-platform)

## Usage
Simply include the Highligh.js library in your webpage or Node app, then load this module.

### Static website or simple usage
Simply load this module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/poweron.min.js"></script>
<script type="text/javascript">
  hljs.highlightAll();
</script>
```

- More info: <https://unpkg.com>

### With Node or another build system
If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsPowerOn = require('highlightjs-poweron');

hljs.registerLanguage('poweron', hljsPowerOn);
hljs.highlightAll();
```

## License
Highlight.js is released under the BSD 3-Clause License. See [LICENSE](https://github.com/highlightjs/highlight.js/blob/main/LICENSE) file for details.
Highlightjs-luau is released under the MIT License. See [LICENSE](/LICENSE.md) file for details.

## Author
Dylan Martinez <https://github.com/martinezdylan>

## Contribution
Feel free to create issues or (even better) pull requests.

## Links
- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>.
- Learn more about PowerOn: <https://jackhenry.dev/>
