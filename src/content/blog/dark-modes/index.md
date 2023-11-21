---
title: "Dark Modes"
description: "A discussion about the dark modes"
date: 2023-11-22

# coverImage: "./test-social3.webp"
# coverAlt: "Some text for describing the cover image"
categories: ["sample"]
tags: ["design", "dev"]

hidden: true
---

The difficulties faced in making a dark mode.

I have a multitude of thoughts about theming, styling, modes etc, this post is about the difficulties usually encountered in implementing a dark mode.

# Is it needed?

Dark mode is cool and all but does it make sense in your situation?

The point of having modes and the ability to switch between them is directly dependent on the content that is being presented. Not everything needs to be switchable, between light and the dark.

Whether one should have a dark mode depends on what one wants to show, i.e. it depends on the content being shown.

The best place for a dark mode are commonly used applications that serve a variety of people, who may prefer one color scheme over the other. One such group is the developers.

Applications are opened more frequently and people spend more time with their interface than normal websites. Moreover, the usability trumps any branding specific design implementations. Websites, specifically websites of companies, brands etc are more targeted towards conveying a distinct and unique identity, where uniqueness can sometimes trump usability (in the sense of not following the standard layouts).

If you are a company/startup targeting a developer userbase or similar people that might prefer the dark mode, think whether it is necessary to have a light mode. How about just having the dark mode? 

Moreover, there are now extensions that will convert a well designed light mode to a dark mode. And the users that prefer dark mode would be usually using such extensions.

---

The reasons to implement a dark mode can be:

- The interface is complex or has to be viewed frequently (ex: Editor, Reader, Dashboard etc.)
- The people using the interface spend a long time on it and may depend on it for their work.
- ~~There is not much to do and there is a lot of free time at hand~~

---

# The culprits

Once you have reached the decision that a dark mode is indeed what you want, you can take a step back and think about what you are converting dark mode into. That is, the content.

One of the most common methods of converting a light mode to a dark mode is to simply switch the background and text colors. While this serves for basic text only content, there are various elements that don't directly translate into a usable dark mode. 

## The code block

What color mode should the code block be in?

Should light mode and dark mode both have different color schemes? What if your light mode already has a dark code highlighting? Does this mean we add a light code highlighting theme for dark mode?

## Contrasty designer

There are designs for software (websites, products) that use different modes (dark/light) in the same interface to distinguish a sidebar/navigation/sections of a page.

Ex: Sidebar with black back and white text beside a product dashboard, a website with dark and light sections in the landing page.

While this is effective to some degree. It is neither dark nor light. And the contrast is needless in most cases. Why would you use a different mode when a border or a slightly different shade of background could have achieved the same? Is it because of a "brand identity"? But even then, what kind of brand is both dark and light and that at the same time?

## Shady Shadows

Shadows become extremely hard to see in dark modes. More so if the background is completely black.

## Only prefers color scheme

1. Perhaps if you have managed to make the dark theme, tying it only to the prefers color scheme option feels kinda bad. Having the ability is cool, but the inability for the user to select the theme they want instead of forcing them to switch the theme for the entire system is kinda bad.


## The ugly gray

Yes I call all dark mode themes that are monochrome and use a grey background ugly. And I will die on this hill. Especially the ones of the old material design (pre v3) days.

https://m2.material.io/design/color/dark-theme.html#properties

https://m3.material.io/styles/color/choosing-a-scheme

And I think these gray themes are what have given the dark mode the aura of unsaturated monochromatic soulless interfaces. As if colors are meant to be reserved for the light mode.

---

# Some good things

## Colors that were lost

Some colors look bad on white background if used as text. Yellow is a prime example. But in the world of dark mode, yellow literally shines!

// Add example yellow calry website

## CSS variables for theming

When I dwelled in the world of react and styled components, I used their theme providers which functioned as:

```tsx
const Button = styled.button`
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// Define what props.theme will look like
const theme = {
  main: "mediumseagreen"
};

component(
  <div>
    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
  </div>
);
```

But when the themes changed, all the css was recalculated and generated again, which was suboptimal. Moreover this strategy stops working once you move out of the react ecosystem. The better way of theming is to use css variables.

We define the variables ones for each theme:

```css
:root {
  --primary: mediumseagreen;
}
.dark {
  --primary: skyblue;
}
```

And then we use those variables in the css styles:

```css
button {
  color: var(--primary);
}
```

We can add simple code to add a .dark class to our body/html element to toggle between the themes. None of the styles are recomputed, and this can be used across frameworks or even without any framework. Moreover you can always override the theme variables in smaller contexts:

```html
<div class="special">
  <button>Hello</button>
</div>

<style>
  .special {
    --primary: red;
  }
</style>
```

## A step further via objects

But these do not have type safety. When you write css and later refactor any of the theme variables, the older ones are left dangling. While fallbacks are nice, refactoring still requires manually scouring for the older ones are rewriting them again. Moreover these errors can not be found in the build step and will easily mess up your stylesheets. 

I have found a promising solution. Which has type safety when using css-in-js. But the basic structure remains same.

The way I organize the themes is to declare the variables as a js object.

```ts
const theme = {
}
```

---

# Resources


- https://tonsky.me/
  Cool dark mode with round light where the mouse is.
  Don't know about accessibility but emulates the torchlight under a quilt nicely.



