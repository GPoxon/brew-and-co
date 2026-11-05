---
name: optimize-image
description: Download an image from a URL, resize it for the Brew & Co. website, convert it to WebP and save it in public/ so the site serves it locally. Use this whenever a stock or external image is being added to or replaced on the site, including from Pexels, Unsplash, Pixabay or any other image URL, even if the request only says "add a photo of X" or "use this picture" and never mentions WebP or resizing. Do not hotlink external images or add remotePatterns; use this skill instead.
---

# Optimize Image

Stock images go through this skill so the site serves small, correctly sized WebP files from its own `public/` folder and makes no image requests to outside services.

## Workflow

1. **Get the direct image URL.** Stock photo pages return HTML, which the script rejects, so use the URL of the image file itself. See [Getting the URL](#getting-the-url).
2. **Check the licence** allows commercial website use, and note the photographer and photo page for the credits file.
3. **Run the script** from the project root:

   ```bash
   node .claude/skills/optimize-image/scripts/optimize-image.mjs \
     --url "https://images.pexels.com/photos/123/pexels-photo-123.jpeg" \
     --out images/menu/flat-white.webp \
     --preset menu \
     --source-url "https://www.pexels.com/photo/123/" \
     --photographer "Jane Doe" \
     --source "Pexels" \
     --licence "Pexels License (https://www.pexels.com/license/)" \
     --shows "Flat white in a pale cup"
   ```

4. **Look at the output file** to confirm the subject and crop work, especially for square crops, which cut from the centre. If the crop is poor, pick another photo or a size that suits it, then rerun with `--force`.
5. **Reference the image** using the `src`, `width` and `height` the script prints. Pass `src` to `next/image` as a root-relative path such as `/images/menu/flat-white.webp`, and use `width` and `height` unless the image uses `fill`.

Before pointing existing code at a new file, check how that code builds its path. `lib/menu.ts` derives menu image paths from the item name, and it has used a fixed extension.

## Choosing a size

Pick the smallest preset that covers how the image is displayed. Oversized files are the main thing this skill exists to avoid.

| Preset | Output | Use for |
| --- | --- | --- |
| `hero` | 2400px wide | Full-width banners |
| `section` | 1400px wide | About, events and other content images |
| `menu` | 640x640 square crop | Menu items and product cards |

For anything else, use `--width` and/or `--height`. Giving both crops to fill that shape. Images are never enlarged: if the script warns that the source is too small, look for a larger original.

## Naming files

Save under `images/<area>/` using a lowercase, hyphenated name that describes the content, for example `images/about/pour.webp`. A path with or without the leading `public/` both work, and it must end in `.webp`.

The script won't overwrite an existing file. Add `--force` only when replacing that image is intended.

## Options

| Flag | Purpose |
| --- | --- |
| `--url` | Direct image URL (required) |
| `--out` | Output path inside `public/`, ending in `.webp` (required) |
| `--preset` | `hero`, `section` or `menu` |
| `--width`, `--height` | Custom size, overriding the preset |
| `--quality` | WebP quality from 1 to 100. The default of 80 leaves room for `next/image` to re-encode it. |
| `--force` | Replace an existing file |
| `--source-url`, `--photographer`, `--source`, `--licence`, `--shows` | Credit details, given all together |

## Credits

Pass the credit flags for every stock image. The script adds a row to `docs/image-credits.csv`, or updates the row for that file on a rerun, which keeps a record of where each photo came from and under what terms. Use the photo's page for `--source-url`, not the image file URL. If the details aren't known, find them before running the script, or tell the user what's missing.

If you replace or stop using an older image, its old row and file stay in place. Mention them to the user rather than deleting them unasked.

## Getting the URL

- **Unsplash:** `https://unsplash.com/photos/<id>/download?force=true`, where `<id>` is the end of the photo page URL.
- **Pexels:** `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`, where `<id>` is the number at the end of the photo page URL.
- **Other sites:** use the URL behind the site's download button or the "copy image address" link.

If a site refuses the download (usually a 403), don't disguise the request to get past the block. Tell the user, and ask them to supply the file's URL or choose another photo.

## Accepted input

JPEG, PNG, WebP, AVIF, TIFF, GIF and HEIF, up to 50 MB. An animated GIF keeps only its first frame. SVG is rejected: it's already a scalable format and shouldn't be converted. Image metadata, including location data, is stripped from the output.
