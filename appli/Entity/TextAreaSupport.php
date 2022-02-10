<?php

namespace appli\Entity;

final class TextAreaSupport {
    private bool $bProtectHtml = true;

    private array $aConfigTextArea = [
        'bold' => ['start' => '<b>', 'end' => '</b>', 'regex' => false],
        'italic' => ['start' => '<i>', 'end' => '</i>', 'regex' => false],
        'h1' => ['start' => '<h1>', 'end' => '</h1>', 'regex' => false],
        'h2' => ['start' => '<h2>', 'end' => '</h2>', 'regex' => false],
        'h3' => ['start' => '<h3>', 'end' => '</h3>', 'regex' => false],
        'paragraph' => ['start' => '<p>', 'end' => '</p>', 'regex' => false],
        'quote' => ['start' => '<blockquote>', 'end' => '</blockquote>', 'regex' => false],
        'center' => ['start' => '<center>', 'end' => '</center>', 'regex' => false],
        'image' => ['start' => '<img src="$1" alt="', 'end' => '">', 'regex' => '/\[image=(.*?)]/'],
        'color' => ['start' => '<span style="color:$1">', 'end' => '</span>', 'regex' => '/\[color=(.*?)]/'],
        'link' => ['start' => '<a href="$1" target=_blank>', 'end' => '</a>', 'regex' => '/\[link=(.*?)]/']
    ];

    private function getFormatHtmlWithRegex(string $sFormatText, string $sRegex, string $sReturnText): string {
        return preg_replace($sRegex, $sReturnText, $sFormatText);
    }

    private function getFormatHtml(string $sFormatText, string $sConfigSearch, array $aConfigSearch): string {
        if ($aConfigSearch['regex'] && $aConfigSearch['regex'] != '') {
            $sFormatText = $this->getFormatHtmlWithRegex($sFormatText, $aConfigSearch['regex'], $aConfigSearch['start']);
        } else {
            $sFormatText = str_replace('[' . $sConfigSearch . ']', $aConfigSearch['start'], $sFormatText);
        }

        if ($aConfigSearch['end'] && $aConfigSearch['end'] != '') {
            $sFormatText = str_replace('[/' . $sConfigSearch . ']', $aConfigSearch['end'], $sFormatText);
        }

        return $sFormatText;
    }

    public function getFormatTextArea(string $textAreaSupport) : string {
        $sFormatText = $textAreaSupport;

        if ($this->bProtectHtml) {
            $sFormatText = htmlspecialchars($textAreaSupport);
        }

        foreach ($this->aConfigTextArea as $sConfigSearch => $aConfigSearch) {
            $sFormatText = $this->getFormatHtml($sFormatText, $sConfigSearch, $aConfigSearch);
        }

        return nl2br($sFormatText);
    }
}