# tailwind-to-css
 Get ur HTML with [tailwindcss](https://tailwindcss.com/) and convert it to native css.
 
### Example
**in:**

*index.html*
```html
<header class="absolute inset-x-0 top-0 z-50"></header>
```
**out:**

*index.html*
```html
<header class="header-1">
```
*global.css*
```css
.header-1 {
    position:absolute;
    left:0px;
    right:0px;
    top:0px;
    z-index:50;
}
```

### 🔴🔴the repo was created in the agony of writing a page for homework from my teacher🔴🔴
