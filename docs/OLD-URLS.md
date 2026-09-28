# Old site URLs → new pages

J's Wheels has **no previous website**, so there is nothing to redirect yet
and `public/_redirects` has no old-site lines.

If the owner turns out to have an old site (or a Facebook/Squarespace/Shopify
page with its own addresses that people have bookmarked or that Google has
indexed):

1. List every old address here, with the new page it should go to.
2. Add one line per address to `public/_redirects`, in the form
   `/old-address /new-page/ 301` (301 means "moved for good" — search engines
   carry the old page's standing over to the new one).
3. `/launch` checks each one after the switch.

| Old | New |
|---|---|
| (none) | |

The same rule applies to pages on this site: renaming a page or article slug
means adding a line to `public/_redirects` and to this table.
