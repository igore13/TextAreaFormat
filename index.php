<!-- 
    Made with <3 by Kevin MORIER Alias E404 - Not Found
    Created at 04/02/2022
-->

<?php
    function formatTextAreaSupport(string $textAreaSupport): string {
        $sFormatText = htmlspecialchars($textAreaSupport);

        $sReplace = [
            'bold' => ['start' => '<b>', 'end' => '</b>'],
            'italic' => ['start' => '<i>', 'end' => '</i>'],
            'h1' => ['start' => '<h1>', 'end' => '</h1>'],
            'h2' => ['start' => '<h2>', 'end' => '</h2>'],
            'h3' => ['start' => '<h3>', 'end' => '</h3>'],
            'paragraph' => ['start' => '<p>', 'end' => '</p>'],
            'quote' => ['start' => '<blockquote>', 'end' => '</blockquote>'],
            'center' => ['start' => '<center>', 'end' => '</center>'],
            'image' => ['start' => '<img ', 'end' => '>'],
            'color' => [
                'start' => function($sFormatText) {
                    return $sFormatText = preg_replace_callback('/\[color=# *([a-zA-Z0-9]+) *([a-zA-Z0-9]+) *([a-zA-Z0-9]+) *([a-zA-Z0-9]+) *([a-zA-Z0-9]+) *([a-zA-Z0-9]+)\]/', function($aMatches) {
                        return sprintf('<span style="color:#%s%s%s%s%s%s">', $aMatches[1], $aMatches[2], $aMatches[3], $aMatches[4], $aMatches[5], $aMatches[6]);
                    },  $sFormatText);
                },
                'end' => '</span>'
            ],
            'link' => [
                'start' => function($sFormatText) {
                    return $sFormatText = preg_replace_callback('/\[link=(.*?)]/', function($aMatches) {
                        $sUrl = $aMatches[1];
                        if (substr($sUrl, 0, 4) != 'http') {
                            $sUrl = 'http://' . $aMatches[1];
                        }
                        return sprintf('<a href="%s" target=_blank>', $sUrl);
                    },  $sFormatText);
                },
                'end' => '</a>'
            ]
        ];

        foreach ($sReplace as $sSearchText => $sReplaceText) {
            if (is_callable($sReplaceText['start'])) {
                $sFormatText = $sReplaceText['start']($sFormatText);
            } else {
                $sFormatText = str_replace('[' . $sSearchText . ']', $sReplaceText['start'], $sFormatText);
            }

            if (is_callable($sReplaceText['end'])) {
                $sFormatText = $sReplaceText['end']($sFormatText);
            } else {
                $sFormatText = str_replace('[/' . $sSearchText . ']', $sReplaceText['end'], $sFormatText);
            }
        }

        return nl2br($sFormatText);
    }

    if (!empty($_POST) && isset($_POST['textAreaSupport'])) {
        switch ($_POST['textAreaSupport']) {
            case 'previews':
                echo formatTextAreaSupport($_POST['previews']);
                exit();
            break;

            case 'result':
                $result = formatTextAreaSupport($_POST['textArea']);
            break;
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <form action="" method="post" id="essai">
        <fieldset>
            <textarea name="textArea" id="textArea"></textarea>
        </fieldset>

        <button type="submit" name="textAreaSupport" value="result">Envoyer</button>
    </form>

    <?php if (isset($result)) { ?>
        <article>
            <h1>Resultats :</h1>
            <?php echo $result ?>
        </article>
    <?php } ?>

    <script src="https://kit.fontawesome.com/2d47ba03ce.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
    <script src="textAreaSupport.js"></script>
    <script src="main.js"></script>
</body>
</html>

