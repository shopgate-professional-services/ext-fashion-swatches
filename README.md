# Shopgate Connect - Fashion swatches

This extension adds color swatches and link swatches to PLP and PDP.
Configured attributes/characteristics are shown in a fashion optimized styling on PDP.

## Configuration

### swatchColorStyle (json)
CSS styling for swatches as glamor object. Can be any css properties and values.
- plp: styling for swatches on product lists
- pdp: styling for swatches on product detail page
    - default: default state
    - selected: selected state
    - disabled: disabled state (no available product, etc)
- pdpTablet: styling for swatches on product detail page for tablets
  - default: default state
  - selected: selected state
  - disabled: disabled state (no available product, etc)


### swatchSizeStyle (json)
CSS styling for swatches as glamor object. Can be any css properties and values.
- pdp: styling for swatches on product detail page
    - default: default state
    - selected: selected state
    - disabled: disabled state (no available product, etc)
- pdpTablet: styling for swatches on product detail page for tablets
  - default: default state
  - selected: selected state
  - disabled: disabled state (no available product, etc)

### swatchLinkStyle (json)
CSS styling for swatches as glamor object. Can be any css properties and values.
- pdp: styling for swatches on product detail page
    - default: default state
    - selected: selected state
    - disabled: disabled state (no available product, etc)
- pdpTablet: styling for swatches on product detail page for tablets
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

### maxSwatches (int)
Reduces shown swatches to the configured number (enables only for > 0). If the number is 0, all swatches will be shown.

### pdpSwatchesDisplayMode (string)
Swatches are shown with and headline or a lable-swatch (e.g. normal and headline).

### pdpSwatchesPosition (string)
Position of swatches on PDP. (e.g. sticky-buttons or variants).

### linkSwatchConfiguration (json)
Configuration for the link swatch
- `type` (string) Can be `color` to show a color-link-swatch or `image` to show an image-link-swatch.
- `property` (string) Property that contains the linkSwatch information (see dependencies).
- `showAdditionalText` (boolean) Shows an additional text underneath the link-swatch.
- `historyReplace` (boolean) Replaces the route history.

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
  "maxSwatches": 5,
  "pdpSwatchesDisplayMode": "normal",
  "pdpSwatchesPosition": "sticky-buttons",
  "swatchLinkStyle": {
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
  "linkSwatchConfiguration": {
    "type": "color",
    "property": "linkSwatch",
    "showAdditionalText": true,
    "historyReplace": false
  }
}
```

## Dependencies
- @shopgate-project/sticky-pdp-buttons
- @shopgate/products-add-properties
    - `addProperties` config. Add the product properties that are configured for this extension.
        - propertyWithColors
        - propertyWithColor
- Needs a property with the following values
  - ````{"linkSwatch":{"name":{"label":"","itemNumber":"","hexcode":"","additionalText":"","imgUrl":""},"name2":{"label2":"","itemNumber2":"","hexcode2":"","additionalText2":"","imgUrl2":""}}}````
    - `linkSwatch`: is the property name.
    - `name`: Is the name of an entry.
    - `label`: The label is shown inside the swatch.
    - `itemNumber`: The itemNumber - is needed for the redirect to the product.
    - `hexcode`: Is needed for the `swatchType`:`color`. The swatch will be shown with this background color. 
    - `additionalText`: Is shown underneath the swatch. 
    - `imgUrl`: Is needed for the `swatchType`:`image`. The swatch will show this image.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
