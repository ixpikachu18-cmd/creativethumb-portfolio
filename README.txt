PIXELCRAFT THUMBNAIL PORTFOLIO
==============================

HOW TO OPEN
1. Double-click index.html.
2. The website will open in your browser.

HOW TO CHANGE DETAILS
- Website name/title: edit index.html and search for "PixelCraft" or "Alex".
- Email: search for "hello@example.com".
- Instagram: replace https://www.instagram.com/ with your own profile link.
- About text: edit the text inside the About Me section.
- Colors: open style.css and change --accent, --bg, etc. at the top.

HOW TO ADD YOUR THUMBNAILS
Easy method:
1. Put your 16:9 thumbnail files inside the assets folder.
2. Name them thumb-01.jpg, thumb-02.jpg, etc.
3. In index.html, replace .svg with .jpg for the corresponding image.

You can also keep your own filenames and update the src="assets/filename.jpg" paths.

FREE HOSTING ON GITHUB PAGES
1. Create a new public GitHub repository.
2. Upload index.html, style.css, script.js and the assets folder.
3. Open repository Settings > Pages.
4. Select Deploy from a branch, choose main and /root, then Save.
5. GitHub will provide a live website link.

NOTE
The contact button uses mailto and does not need a backend. A real contact form would require a service such as Formspree or a custom backend.


--- CORRECTED VERSION NOTES ---
1. Open this extracted folder's index.html file.
2. Desktop portfolio now shows 3 wide 16:9 thumbnails per row.
3. Tablet shows 2 per row; mobile shows 1 per row.
4. Your current thumbnail links point to C:\Users\ixpik\OneDrive\Desktop\Thumbnails. They will work only on that same computer/path. Before GitHub hosting, copy those PNG files into the assets folder and change the image paths to assets/filename.png.
