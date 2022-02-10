/*
*   Made with <3 by Kevin MORIER Alias E404 - Not Found
*   Created at 04/02/2022
*/

class TextAreaSupport{
    // Variables
    #selectedIcons = {
        'Preview': false,
        'Color': false,
        'Image': false,
        'Link': false
    };

    #hideIcons = {
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
    };

    #colorPicker = new iro.ColorPicker(".textAreaSupport-extra-colorpicker", {
        width: 170
    });

    #allElements = {};
    #element = null;
    #newTextArea = null;
    #debug = false;
    #preview = false;
    #textLastPreview = '';

    // Constructor
    constructor(config) {
        if (config.element)  {
            this.#element = config.element;
        } else {
            this.#element = document.querySelector('textarea');
        }

        if (this.#element != null && this.#element.form != null) {
            // Set textarea display none
                this.#element.style.display = 'none';
            
            // Create Element for TextAreaSupport
            this.#allElements.elementTextAreaSupport = this.#createElement(null, 'div', ['textAreaSupport'], '', false);
            this.#element.before(this.#allElements.elementTextAreaSupport);

            this.#allElements.elementTextAreaSupportBar = this.#createElement(this.#allElements.elementTextAreaSupport, 'div', ['textAreaSupport-bar'], '', false);
            
            
            this.#allElements.elementTextAreaSupportContent = this.#createElement(this.#allElements.elementTextAreaSupport, 'div', ['textAreaSupport-content'], this.#element.textContent, false);
            this.#allElements.elementTextAreaSupportContent.contentEditable = true;

            this.#allElements.elementTextAreaSupportExtra = this.#createElement(this.#allElements.elementTextAreaSupport, 'div', ['textAreaSupport-extra'], '', false);
            
            this.#allElements.elementTextAreaSupportFooter = this.#createElement(this.#allElements.elementTextAreaSupport, 'div', ['textAreaSupport-footer'], '<p>Lines : <span id="countLine">1</span> | Words : <span id="countLength">0</span> | <span id="positionLine">0</span>:<span id="positionCursor">0</span></p>', true);
            this.#allElements.elementTextAreaSupportPreview = this.#createElement(this.#allElements.elementTextAreaSupport, 'div', ['textAreaSupport-preview', 'textAreaSupport-hidden'], this.#element.textContent, false);
            

            this.#allElements.elementTextAreaSupportExtra_ColorPicker = this.#createElement(this.#allElements.elementTextAreaSupportExtra, 'div', ['textAreaSupport-extra-colorpicker', 'textAreaSupport-hidden'], '', false);
            this.#allElements.elementTextAreaSupportExtra_Link = this.#createElement(this.#allElements.elementTextAreaSupportExtra, 'div', ['textAreaSupport-extra-link', 'textAreaSupport-hidden'], '', false);
            this.#allElements.elementTextAreaSupportExtra_Image = this.#createElement(this.#allElements.elementTextAreaSupportExtra, 'div', ['textAreaSupport-extra-image', 'textAreaSupport-hidden'], '', false);

            // Previews
            this.#allElements.elementTextAreaSupportBar_Previews = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-eye"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Previews.title = "Previews";
            this.#allElements.elementTextAreaSupportBar_Previews.addEventListener('click', (e) => {
                e.preventDefault();
                const hasClass = this.#allElements.elementTextAreaSupportPreview.classList.toggle('textAreaSupport-hidden');
                e.currentTarget.classList.toggle('textAreaSupport-bar-button-active');
                this.#preview = !hasClass;
            })

            setInterval(() => {
                if (this.#preview && this.#textLastPreview != this.#newTextArea.innerText) {
                    this.#textLastPreview = this.#newTextArea.innerText;
                    const elementTextAreaSupportPreview = this.#allElements.elementTextAreaSupportPreview;
                    $.ajax({
                        type: 'post',
                        url: 'index.php',
                        data: {
                            textAreaSupport: 'previews',
                            previews: this.#newTextArea.innerText
                        },
                        success: function (response) {
                            elementTextAreaSupportPreview.innerHTML = response;
                        }
                    });
                }
            }, 1000);

            // Bold
            this.#allElements.elementTextAreaSupportBar_Bold = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-bold fa-lg"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Bold.title = "BOLD";
            this.#allElements.elementTextAreaSupportBar_Bold.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[bold]', '[/bold]');
            })

            // Italic
            this.#allElements.elementTextAreaSupportBar_Italic = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-italic"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Italic.title = "ITALIC";
            this.#allElements.elementTextAreaSupportBar_Italic.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[italic]', '[/italic]');
            })

            // Paragraphe
            this.#allElements.elementTextAreaSupportBar_Paragraph = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-paragraph"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Paragraph.title = "PARAGRAPH";
            this.#allElements.elementTextAreaSupportBar_Paragraph.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[paragraph]', '[/paragraph]');
            })

            // Title 1
            this.#allElements.elementTextAreaSupportBar_H1 = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-heading"></i>', true);
            this.#allElements.elementTextAreaSupportBar_H1.title = "TITLE 1";
            this.#allElements.elementTextAreaSupportBar_H1.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[h1]', '[/h1]');
            })

            // Title 2
            this.#allElements.elementTextAreaSupportBar_H2 = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-heading"></i>', true);
            this.#allElements.elementTextAreaSupportBar_H2.title = "TITLE 2";
            this.#allElements.elementTextAreaSupportBar_H2.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[h2]', '[/h2]');
            })

            // Title 3
            this.#allElements.elementTextAreaSupportBar_H3 = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-heading"></i>', true);
            this.#allElements.elementTextAreaSupportBar_H3.title = "TITLE 3";
            this.#allElements.elementTextAreaSupportBar_H3.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[h3]', '[/h3]');
            })

            // Center
            this.#allElements.elementTextAreaSupportBar_Center = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-align-center"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Center.title = "CENTER";
            this.#allElements.elementTextAreaSupportBar_Center.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[center]', '[/center]');
            })

            // Quote
            this.#allElements.elementTextAreaSupportBar_Quote = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button'], '<i class="fas fa-quote-right"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Quote.title = "QUOTE";
            this.#allElements.elementTextAreaSupportBar_Quote.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[quote]', '[/quote]');
            })

            // Color Picker
            this.#allElements.elementTextAreaSupportBar_Color = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button', 'textAreaSupport-bar-button-color'], '<i class="fas fa-palette"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Color.title = "COLOR";
            this.#allElements.elementTextAreaSupportBar_Color.addEventListener('click', (e) => {
                e.preventDefault();
                this.#allElements.elementTextAreaSupportExtra_ColorPicker.classList.toggle('textAreaSupport-hidden');
                e.currentTarget.classList.toggle('textAreaSupport-bar-button-active');
            })

            this.#allElements.elementTextAreaSupportExtra_ColorPicker_Valid = this.#createElement(this.#allElements.elementTextAreaSupportExtra_ColorPicker, 'button', ['textAreaSupport-extra-colorpicker-button'], 'Ajouter la couleur', false);
            this.#allElements.elementTextAreaSupportExtra_ColorPicker_Valid.addEventListener('click', (e) => {
                e.preventDefault();
                this.#addFormattedText('[color=' + this.#colorPicker.color.hexString.toUpperCase() + ']', '[/color]');
            })

            // Images
            this.#allElements.elementTextAreaSupportBar_Image = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button', 'textAreaSupport-bar-button-image'], '<i class="fas fa-image"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Image.title = "Image";
            this.#allElements.elementTextAreaSupportBar_Image.addEventListener('click', (e) => {
                e.preventDefault();
                this.#allElements.elementTextAreaSupportExtra_Image.classList.toggle('textAreaSupport-hidden');
                e.currentTarget.classList.toggle('textAreaSupport-bar-button-active');
            })

            this.#allElements.elementTextAreaSupportExtra_Image_Alt = this.#createElement(this.#allElements.elementTextAreaSupportExtra_Image, 'input', ['textAreaSupport-extra-image-alt'], '', false);
            this.#allElements.elementTextAreaSupportExtra_Image_Alt.placeholder = 'Texte Alternatif';

            this.#allElements.elementTextAreaSupportExtra_Image_Url = this.#createElement(this.#allElements.elementTextAreaSupportExtra_Image, 'input', ['textAreaSupport-extra-image-url'], '', false);
            this.#allElements.elementTextAreaSupportExtra_Image_Url.placeholder = 'Url de l\'image';

            this.#allElements.elementTextAreaSupportExtra_Image_Valid = this.#createElement(this.#allElements.elementTextAreaSupportExtra_Image, 'button', ['textAreaSupport-extra-image-button'], 'Ajouter l\'image', false);
            this.#allElements.elementTextAreaSupportExtra_Image_Valid.addEventListener('click', (e) => {
                e.preventDefault();
                const elementImageAlt = this.#allElements.elementTextAreaSupportExtra_Image_Alt;
                const elementImageUrl = this.#allElements.elementTextAreaSupportExtra_Image_Url;
                this.#addFormattedText('[image]src=\'' + elementImageUrl.value + '\' alt=\'' + elementImageAlt.value + '\'[/image]', '', true);
                elementImageAlt.value = '';
                elementImageUrl.value = '';
            })

            // Link
            this.#allElements.elementTextAreaSupportBar_Link = this.#createElement(this.#allElements.elementTextAreaSupportBar, 'button', ['textAreaSupport-bar-button', 'textAreaSupport-bar-button-link'], '<i class="fas fa-link"></i>', true);
            this.#allElements.elementTextAreaSupportBar_Link.title = "Link";
            this.#allElements.elementTextAreaSupportBar_Link.addEventListener('click', (e) => {
                e.preventDefault();
                this.#allElements.elementTextAreaSupportExtra_Link.classList.toggle('textAreaSupport-hidden');
                e.currentTarget.classList.toggle('textAreaSupport-bar-button-active');
            })

            this.#allElements.elementTextAreaSupportExtra_Link_Name = this.#createElement(this.#allElements.elementTextAreaSupportExtra_Link, 'input', ['textAreaSupport-extra-link-name'], '', false);
            this.#allElements.elementTextAreaSupportExtra_Link_Name.placeholder = 'Nom du lien';

            this.#allElements.elementTextAreaSupportExtra_Link_Url = this.#createElement(this.#allElements.elementTextAreaSupportExtra_Link, 'input', ['textAreaSupport-extra-link-url'], '', false);
            this.#allElements.elementTextAreaSupportExtra_Link_Url.placeholder = 'Url de lien';

            this.#allElements.elementTextAreaSupportExtra_Link_Valid = this.#createElement(this.#allElements.elementTextAreaSupportExtra_Link, 'button', ['textAreaSupport-extra-link-button'], 'Ajouter le lien', false);
            this.#allElements.elementTextAreaSupportExtra_Link_Valid.addEventListener('click', (e) => {
                e.preventDefault();
                const elementLinkName = this.#allElements.elementTextAreaSupportExtra_Link_Name;
                const elementLinkUrl = this.#allElements.elementTextAreaSupportExtra_Link_Url;
                this.#addFormattedText('[link=' + elementLinkUrl.value + ']' + elementLinkName.value + '[/link]', '', true);
                elementLinkName.value = '';
                elementLinkUrl.value = '';
            })

            this.#newTextArea = this.#allElements.elementTextAreaSupportContent;

            // AddEventHandler OnKeyUp
            // this.#element.form.addEventListener('keyup', (e) => {
            this.#newTextArea.addEventListener('keyup', (e) => {
                this.#element.textContent = this.#newTextArea.innerText;
                document.getElementById('countLength').innerText = this.#newTextArea.innerText.length - 1;
                document.getElementById('countLine').innerText = this.#countLines();
                this.#showPostionCursor();
            })

            // AddEventHandler Click
            this.#newTextArea.addEventListener('click', (e) => {
                this.#showPostionCursor();
            })

            this.setHideIcons(config);
            this.setSelectedIcons(config);
            this.setDebug(config)
        }
    };

    // Privates Functions
    #showPostionCursor() {
        let userSelection = document.getSelection();
        let posistionCursor = userSelection.getRangeAt(0).startOffset;
        let currentElement = userSelection.focusNode.parentElement

        if (currentElement == this.#newTextArea) {
            currentElement = userSelection.focusNode;
        }

        let lineCursor = [...this.#newTextArea.children].indexOf(currentElement);

        if (lineCursor < 0) {
            lineCursor = 0;
        }

        document.getElementById('positionLine').textContent = lineCursor;
        document.getElementById('positionCursor').textContent = posistionCursor;
    }

    #createElement(oElement = null, sBalise, aClass, sText, bHtml) {
        let element = document.createElement(sBalise);
        if (bHtml) {
            element.innerHTML = sText;
        } else {
            element.innerText = sText;
        }
        if (aClass.length > 0) {
            aClass.forEach(sClass => {
                element.classList.add(sClass);
            });
        }

        if (oElement) {
            oElement.appendChild(element);
        }

        return element;
    }

    #addTextPosition = function(index, text, textAdd) {
        let arrGivenString = [...text];
        arrGivenString.splice(index, 0, textAdd);
        
        let output = arrGivenString.join('');
        return output;
    }

    #addFormattedText = function(textStart, textEnd, allowEmpty = false) {
        let userSelection = window.getSelection();

        if (userSelection.toString() == '' && !allowEmpty) {
            return;
        }

        const positionAnchor = userSelection.anchorOffset;
        const positionOffset = userSelection.focusOffset;

        let positionStart = positionAnchor;
        let positionEnd = positionOffset;

        let formatStart = textStart;
        let formatEnd = textEnd;

        if (userSelection.anchorNode == userSelection.focusNode) {
            if ((userSelection.focusNode.textContent.length == 0 || userSelection.anchorNode.textContent.length == 0) && !allowEmpty) {
                return;
            }

            if (positionStart > positionEnd) {
                positionStart = userSelection.focusOffset;
                positionEnd = userSelection.anchorOffset;
            }

            positionEnd += formatStart.length;
        } else {
            if (userSelection.focusNode.textContent.length == 0 && userSelection.anchorNode.textContent.length == 0 && !allowEmpty) {
                return;
            }

            let indexStartNode = [...this.#newTextArea.children].indexOf(userSelection.anchorNode.parentNode);
            let indexEndNode = [...this.#newTextArea.children].indexOf(userSelection.focusNode.parentNode);

            if (indexStartNode > indexEndNode) {
                formatStart = textEnd;
                formatEnd = textStart;
            } else {
                positionEnd += formatStart.length;
            }
        }

        userSelection.anchorNode.textContent = this.#addTextPosition(positionStart, userSelection.anchorNode.textContent, formatStart);
        userSelection.focusNode.textContent = this.#addTextPosition(positionEnd, userSelection.focusNode.textContent, formatEnd);

        this.#element.textContent = this.#newTextArea.innerText;

        document.getElementById('countLength').innerText = this.#newTextArea.innerText.length - 1;
        document.getElementById('countLine').innerText = this.#countLines();

        document.getSelection().removeAllRanges();
    }

    #countLines = function() {
        try {
            return((this.#newTextArea.innerText.match(/[^\n]*\n[^\n]*/gi).length));
        } catch(e) {
            return 1;
        }
    }

    // Setters & Getters
    setHideIcon(icon, bool) {
        // ICON A HIDE
    }

    setHideIcons(config) {
        if (config.hideIcons && config.hideIcons.Preview) {
            this.#allElements.elementTextAreaSupportBar_Previews.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Preview = true;
        }
        if (config.hideIcons && config.hideIcons.Bold) {
            this.#allElements.elementTextAreaSupportBar_Bold.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Bold = true;
        }
        if (config.hideIcons && config.hideIcons.Italic) {
            this.#allElements.elementTextAreaSupportBar_Italic.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Italic = true;
        }
        if (config.hideIcons && config.hideIcons.Paragraph) {
            this.#allElements.elementTextAreaSupportBar_Paragraph.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Paragraph = true;
        }
        if (config.hideIcons && config.hideIcons.Header1) {
            this.#allElements.elementTextAreaSupportBar_H1.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Header1 = true;
        }
        if (config.hideIcons && config.hideIcons.Header2) {
            this.#allElements.elementTextAreaSupportBar_H2.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Header2 = true;
        }
        if (config.hideIcons && config.hideIcons.Header3) {
            this.#allElements.elementTextAreaSupportBar_H3.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Header3 = true;
        }
        if (config.hideIcons && config.hideIcons.Center) {
            this.#allElements.elementTextAreaSupportBar_Center.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Center = true;
        }
        if (config.hideIcons && config.hideIcons.Quote) {
            this.#allElements.elementTextAreaSupportBar_Quote.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Quote = true;
        }
        if (config.hideIcons && config.hideIcons.Color) {
            this.#allElements.elementTextAreaSupportBar_Color.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Color = true;
        }
        if (config.hideIcons && config.hideIcons.Image) {
            this.#allElements.elementTextAreaSupportBar_Image.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Image = true;
        }
        if (config.hideIcons && config.hideIcons.Link) {
            this.#allElements.elementTextAreaSupportBar_Link.classList.add('textAreaSupport-hidden');
            this.#hideIcons.Link = true;
        }
    }

    get getHideIcons() {
        return this.#hideIcons;
    }

    setSelectedIcon(icon, bool) {
        // ICON A SELECTED
    }

    setSelectedIcons(config) {
        if (config.selectedIcons && config.selectedIcons.Preview) {
            this.#allElements.elementTextAreaSupportPreview.classList.toggle('textAreaSupport-hidden');
            this.#allElements.elementTextAreaSupportBar_Previews.classList.toggle('textAreaSupport-bar-button-active');
            this.#selectedIcons.Preview = true;
        }
        if (config.selectedIcons && config.selectedIcons.Color) {
            this.#allElements.elementTextAreaSupportExtra_ColorPicker.classList.toggle('textAreaSupport-hidden');
            this.#allElements.elementTextAreaSupportBar_Color.classList.toggle('textAreaSupport-bar-button-active');
            this.#selectedIcons.Color = true;
        }
        if (config.selectedIcons && config.selectedIcons.Image) {
            this.#allElements.elementTextAreaSupportExtra_Image.classList.toggle('textAreaSupport-hidden');
            this.#allElements.elementTextAreaSupportBar_Image.classList.toggle('textAreaSupport-bar-button-active');
            this.#selectedIcons.Image = true;
        }
        if (config.selectedIcons && config.selectedIcons.Link) {
            this.#allElements.elementTextAreaSupportExtra_Link.classList.toggle('textAreaSupport-hidden');
            this.#allElements.elementTextAreaSupportBar_Link.classList.toggle('textAreaSupport-bar-button-active');
            this.#selectedIcons.Link = true;
        }
    }

    get getSelectedIcons() {
        return this.#selectedIcons;
    }

    setElement(element) {
        this.#element = element;
    }

    get getElement() {
        return this.#element;
    }

    setDebug(config) {
        if (config && config.debug) {
            this.#debug = true;
            this.#element.style.display = 'block';
        } else {
            this.#debug = false;
            this.#element.style.display = 'none';
        }
    }

    get getDebug() {
        return this.#debug;
    }
};
