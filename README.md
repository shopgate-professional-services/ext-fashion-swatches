# Shopgate Connect - Fashion swatches

This extension adds color swatches to PLP and PDP. Configured attributes/characteristics are shown in a fashio optimized styling on PDP.

## Configuration
### swatchStyle (json)
CSS styling for swatches as glamor object. Can be any css properties and values.
- plp: styling for swatches on product lists
- pdp: styling for swatches on product detail page

Example:
```
swatchStyle: {
    "plp": {
      "border": "1px solid blue"
    },
    "pdp": {
      "borderRadius": "none",
      "border": "10px solid red"
    }
}
```

### propertyWithColors (string)
Name of the product property which contains all colors of children.
Value of the property should be an array as JSON string.

Example:
```
propertyWithColors: "hexCodes"
```

Example of the product property value:
```
["#000","#0f0","#aaa"]
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
