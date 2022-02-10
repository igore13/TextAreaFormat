![TextAreaFormat](https://user-images.githubusercontent.com/35968454/153468271-657d6d12-7b0a-4074-aa1c-8f6c94ae9736.png)

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
    - FONT AWESOME : https://kit.fontawesome.com/YOURCODEAPI.js
    - JQUERY : https://code.jquery.com/jquery-3.6.0.min.js
    - IRO5 : https://cdn.jsdelivr.net/npm/@jaames/iro@5

## HTML :
    - LINK JS : textAreaSupport.js
    - LINK CSS : textAreaSupport.css

## JS :
    - Without Optionnals :
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
    spl_autoload_register(function($sClassName) {
        $sFileName = str_replace('\\', '/', $sClassName) . '.php';
        require_once $sFileName;
    });

    require_once __DIR__ . '/appli/textAreaSupport.php';

    if (!empty($_POST) && isset($_POST['result'])) {
        $result = $TextAreaSupport->getFormatTextArea($_POST['textArea']);
    }

# Credits :
    - Kevin MORIER alias E404 - Not Found
