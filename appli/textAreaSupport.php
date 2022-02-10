<?php

// Instance of TextAreaSupport
use appli\Entity\TextAreaSupport;

// Load Object of TextAreaSupport
$TextAreaSupport = new TextAreaSupport();

// Utility for Preview Text Area Format
if (!empty($_POST) && isset($_POST['textAreaSupportPreview'])) {
    echo $TextAreaSupport->getFormatTextArea($_POST['textAreaSupportPreview']);
    exit();
}