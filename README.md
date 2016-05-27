# One-pager website app for Enonic XP

## Compatibility

| Version       | XP version |
| ------------- | ---------- |
| 1.0.0         | 6.5.3      |

## Features

This app demos some Enonic XP features including reusable and configurable parts and layout components. Use the page editor to add and remove components and move them around the page with drag and drop.
Upload your own images and add them to the gallery. Create content for the person list and scrolling banner. Configure menu sections with layouts and add text components where you like.

## Site configuration

The site cofig has a form for adding a site logo, location addresses, social media links, and a footer text message. The locations and social media links will appear in the footer unless the "Hide contact footer" 
box is checked in the page configuration.  

Edit the site content and click the pencil icon in the "One-pager" block under the "Applications" label. Upload a logo image. Optionally add one or more locations. Add social media links. Finally, add a footer 
text message with copyright information or whatever is preferred.

## Page configuration

The Default pge component has some configuration options. The menu offset  can be used to make the page content appear behind the menu. This adds a nice effect when the first part on the page is a full-width 
image or banner part. There are also inputs for meta keywords and description which will be read by search engines. The footer can be hidden with the "Hide contact footer" checkbox. 

To edit the page configuration, first edit the site content and then select the page in the page editor. It may be necessary to right-click on a component and click the "Select parent" option a few times to reach 
the page component.

## Layouts

There is one layout component which is used for making sections that can appear in the scroll menu. Edit the site content and drag a layout onto the page. Select the one column layout with the dropdown.
Set the section's background color with the radio buttons: light, dark or none. The "Full width" checkbox will make the section stretch across the page. The checkbox for "No padding top" is useful for 
controlling spacing when a layout is placed below another layout with the same background color. If you want a layout section to appear in the menu, check the "Menuitem" box and enter a menu name.

## Parts

The various part components (described below) can be placed directly into the main page region or into the center region of layouts. Parts not placed in layouts will stretch across the full width of the page 
and will not have any background color. It is recommended to place parts into layouts with the exception of the image carousel banner which looks nice at the top of the page.

### Banner

The banner is an image carousel that automatically displays a new image every few seconds. It will use parallax scrolling if it's at the top of the page.

Edit the site content and drag a `Part` component onto the page. Select the "Banner" part. Use the image selector to upload a new image or select a previously uploaded image from the site content. Add as 
many images as you like.

### Features part

The features part has a heading, a text block, and image icons with their own text blocks. 

Edit the site content. Drag a `Part` component onto the page. Select the "Features" part. Enter a heading and text. Click the "Add Feature" button and enter its header, text, and upload an icon image or 
select a previously uploaded image content. It is recommended to use PNG images with transparent backgrounds. Add as many feature icons as you like. Change the order of the feature items with drag and 
drop in the configuration form.

### Gallery

The gallery part has a heading and text and displays thumbnail images with a caption. A row of buttons above the images will filter them by category. Clicking on an image will open a larger version with 
navigation controls to see the next and previous image.

Images for the gallery are added in the part configuration. Upload images or select previously uploaded images. The buttons for filtering images are created from the image tags, so be sure to tag 
each image. Add a caption to each image content. 

### Header

This part displays a heading and a text block which can be set in the configuration.

### Person list

This part has a heading and text and it shows a list of "Person" contents. The list shows three at a time and can be scrolled with the navigation arrows.

The "Person" content must be created before it can be added to the list. Create a folder content for organizing the Person content. Create new Person items in the folder. Add a first name, last name, image 
and job title. Then add the person list part to the page. Add a heading and text in the configuration and select the person contents that will appear in the list. The order can be modified with drag and drop.

### Text components

Enonic XP has a built-in text component that can be added to the page. Text formatting options will appear at the top of the page when editing a text component.

### Image components

Enonic XP has a built-in image component that can be added ot the page. One the image component is placed on the page, an image content can be selected or a new image can be uploaded.

## Photos

All photos by Michael Lazell except for those in the "Person list" part. These photos are public domain and free to use without attribution. 

## Icons

The "features" part demo content contains icons by [Freepik](http://www.freepik.com) from [Flaticon](http://www.flaticon.com) which are leseased under the [Creative Commons BY 3.0 license](http://creativecommons.org/licenses/by/3.0/). 
