# Blitz eBook Tricks

A collection of CSS snippets to do progressive enhancement and achieve better typography, layout and UX in eBooks.

## Important Note

We’re in the process of sunsetting the entire Blitz Project, which means this repository will reach End of Life and be archived as read-only on July 1, 2020. Don’t worry, all current and future forks will continue to work after this date.

If you are interested in the sunsetting roadmap, or taking over this repository’s maintenance and development, please [check the related meta issue in Blitz](https://github.com/FriendsOfEpub/Blitz/issues/66).

## How-to

### Use

**If you’re using a mouse/touch:**

- click the “Expand/Collapse button” to toggle all details
- click the “Copy snippet” button to copy the code to your clipboard
- click “Details” to display more information

**If you’re using a keyboard:**

- press “tab” to navigate menu, “copy snippet” buttons, details, and links
- press “enter/spacebar” to copy the code snippet
- press “enter/spacebar” to display details (including toggle button)

### Install

If you’re on iOS/Android/Windows 8–10, you can actually install this web app. Just visit the page and “Add to homescreen”.

Thanks to service workers, it will even work offline on Android, Chrome, Opera or Firefox (appcache fallback for iOS).

## Summary

The Blitz eBook Tricks collection is part of the Blitz Project. It’s a progressive web app which aims is to help you do progressive enhancement.

It is currently in v.1.0.0 and available [on this page](https://friendsofepub.github.io/eBookTricks/).

## Details

This web app is just a glorified list of CSS snippets.

- We’re using JS to toggle details.
- We’re using Service Workers and appcache (fallback) to make it work offline.
- Keyboard features are implemented via JS when needed.

And that’s it. 

## License 

Blitz eBook Tricks, a Blitz tool to help you do progressive enhancement in eBooks

Copyright (C) 2017–present Jiminy Panoz

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License along with this program.  If not, see [http://www.gnu.org/licenses/](http://www.gnu.org/licenses/).

### What LGPL3 actually implies

You can fork this repo and make your own collection/web app. You can use it in commercial projets but your modifications to this specific part (consider this a library) should then be released with a LGPL3 license. Attribution is needed in any case.

### Why LGPL3 OMG it’s not MIT like the Blitz Framework!

The eBook dev ecosystem is a nightmare, we need eBook tools. And fast!

Very few people actually release those tools. Now it’s just a checklist so why would you want to keep this closed source, huh?
