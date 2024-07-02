# Shopgate Connect - Fashion swatches

This extension adds color swatches to PLP and PDP.
Configured attributes/characteristics are shown in a fashion optimized styling on PDP.

## Configuration

### swatchColorStyle (json)
CSS styling for swatches as glamor object. Can be any css properties and values.
- plp: styling for swatches on product lists
- pdp: styling for swatches on product detail page
    - default: default state
    - selected: selected state
    - disabled: disabled state (no available product, etc)

### swatchSizeStyle (json)
CSS styling for swatches as glamor object. Can be any css properties and values.
- pdp: styling for swatches on product detail page
    - default: default state
    - selected: selected state
    - disabled: disabled state (no available product, etc)

### propertyWithColors (string[])
Name of the parent product property which contains all colors of children.
Value of the property should be an array as JSON string.

### propertyWithColor (string)
Name of the child product property which contains hex color.

### colorAttribute (string[])
The csv of product attributes names which are used as color swatch (eg. Color,Shoe color,Farbe)

### sizeAttribute (string[])
The csv of product attributes names which are used as size swatch (eg. Size,Shoe size,Grosse)

### swatchLabels (json)
Swatches optional labels. A map of property name to custom label. See example.

- `enabled` (boolean) If labels should be shown
- `labels` (Object) Labels map. If mapped label equal `false`, the label will not be shown.

### swatchColorUnselectedValue (json)
Default value for unselected color (see example).

### swatchSizeUnselectedValue (json)
Default value for unselected size(s) (see example).

### numberOfShownSwatches (int)
Reduces shown swatches to the configured number (enables only for > 0). If the number is 0, all swatches will be shown.

#### Example of full config:
```json
{
  "swatchColorStyle": {
    "plp": {
      "border": "1px solid blue"
    },
    "pdp": {
      "default": null,
      "selected": {
        "border": "2px solid blue"
      },
      "disabled":  {
        "opacity": "0.5"
      }
    }
  },
  "swatchSizeStyle": {
    "pdp": {
      "default": null,
      "selected": {
        "border": "2px solid blue"
      },
      "disabled":  {
        "opacity": "0.5"
      }
    }
  },
  "propertyWithColors": "Colors",
  "propertyWithColor": "Hex color",
  "colorAttribute": ["Color", "Farbe", "Shoe color"],
  "sizeAttribute": ["Size", "Shoe width", "Grosse"],
  "swatchColorUnselectedValue": {
    "swatchLabel": "",
    "swatchColor": "radial-gradient(... )"
  },
  "swatchSizeUnselectedValue": {
    "Size": {
      "swatchLabel": "GR.",
      "swatchColor": "#fff"
    },
    "Shoe width": {
      "swatchLabel": "Wdh.",
      "swatchColor": "#fff"
    }
  },
  "swatchLabels": {
    "enabled": true,
    "labels": {
      "Color": false,
      "Shoe size": "Size"
    }
  },
  "numberOfShownSwatches": 5
}
```

## Dependencies
- @shopgate-project/sticky-pdp-buttons
- @shopgate/products-add-properties
    - `addProperties` config. Add the product properties that are configured for this extension.
        - propertyWithColors
        - propertyWithColor

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
