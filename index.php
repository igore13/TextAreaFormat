<!-- 
    Made with <3 by Kevin MORIER Alias E404 - Not Found
    Created at 04/02/2022
-->

<?php
    // Autoloader for Instance TextAreaSupport
    spl_autoload_register(function($sClassName) {
        $sFileName = str_replace('\\', '/', $sClassName) . '.php';

        require_once $sFileName;
    });

    // Require TextAreaSupport
    require_once __DIR__ . '/appli/textAreaSupport.php';

    // Result send with Form Button (POST)
    if (!empty($_POST) && isset($_POST['result'])) {
        $result = $TextAreaSupport->getFormatTextArea($_POST['textArea']);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="textAreaSupport.css">
</head>
<body>
    <form action="" method="post" id="essai">
        <fieldset>
            <textarea name="textArea" id="textArea"></textarea>
        </fieldset>

        <button type="submit" name="result">Envoyer</button>
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

