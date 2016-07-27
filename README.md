# Asterism Custom Select
An inuitive custom select element written in pure javascript.

### Usage:
```html
<link rel="stylesheet" href="dist/select.min.css">
<script type="text/javascript" src="dist/select.min.js"></script>
```

```javascript
// Instantiate with a DOM object...
var el     = document.querySelector('#movies');
var select = new Select(el, { /* settings */ });

// ... or a selector
var select2 = new Select('#music', { /* settings */ });
```

### Options:

* `filtered` *(mixed)* – Should the 'filter options' input be displayed? **Default**: `'auto'`
* `filter_threshold` *(int)* – When a select contains `x` options or more, display the filter input. **Default**: `8`
* `filter_placeholder` *(string)* – Placeholder text for the filter input. **Default**: `'Filter options...'`
