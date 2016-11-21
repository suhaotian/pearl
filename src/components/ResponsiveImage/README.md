# why

For example, we have many images with different width/height size.

But we want it show in the same ratio that make it looks great. How do it ?

# usage

Think we have a image https://xx.com/xx.png with 200/400 width

But the designer's sketch file's image ratio was 2/3 => 66.66%.

So we can do it like:

```jsx
import React from 'react'
import ResponsiveImage from 'components/ResponsiveImage'

const DemoApp = (props) => (
  <Responsive src={'https://xx.com/xx.png'} ratio={'66.66%'} />
)
```

Whatever the image's size. It will always be 2/3 ratio. and never be out of the shape.
