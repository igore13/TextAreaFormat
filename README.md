# TextAreaFormat :
    TextAreaFormat is used to convert text into HTML code.

    You can :
    - Add title with 3 levels.
    - Add color text.
    - Add bold text.
    - Add text in italics.
    - Add centered text.
    - Add external links.
    - Add pictures.
    - Add paragraphs.
    - Add Quotes.
    - Preview rendering.

# Installation :
## Dependencies :
- FONT AWESOME : <script src="https://kit.fontawesome.com/YOURCODEAPI.js"></script>
- JQUERY : <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
- IRO5 : <script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>

## HTML :
- LINK JS : <script src="textAreaSupport.js"></script>
- LINK CSS : <link rel="stylesheet" href="textAreaSupport.css">

## JS :
let textAreaSupport = new TextAreaSupport();

- With Optionnals :
let textAreaSupport = new TextAreaSupport({
    element: document.querySelector('textarea'),
    selectedIcons: {
        'Preview': false,
        'Color': false,
        'Image': false,
        'Link': false
    },
    hideIcons: {
        'Preview': false,
        'Bold': false,
        'Italic': false,
        'Paragraph': false,
        'Header1': false,
        'Header2': false,
        'Header3': false,
        'Center': false,
        'Quote': false,
        'Color': false,
        'Image': false,
        'Link': false
    },
    debug: false
});

## PHP :
// Autoloader for Instance TextAreaSupport
spl_autoload_register(function($sClassName) {
    $sFileName = str_replace('\\', '/', $sClassName) . '.php';
    require_once $sFileName;
});

// Require TextAreaSupport
require_once __DIR__ . '/appli/textAreaSupport.php';

# Credits :
- Kevin MORIER alias E404 - Not Found