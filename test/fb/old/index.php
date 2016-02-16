<?php
/*definizione di una classe e Information Hiding*/

//denominiamo la classe
class Animali 
{
  //regole di visibilità
  public $cane = "Il cane mangia il gatto.<br />\n";
  public $gatto = "Il gatto mangia il topo .<br />\n";
  private $topo = "Povero topo.<br />\n";

  //introduciamo una funzione
  function show() 
  {
    return $this->topo;
  }
}

//istanza dell'oggetto
$obj = new Animali();

//stampa a video
echo $obj->topo; 
?>