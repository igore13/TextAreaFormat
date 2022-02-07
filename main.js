let textAreaSupport = new TextAreaSupport({
    element: document.querySelector('textarea'),
    selectedIcons: {
        'Color': true,
        'Image': true,
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
