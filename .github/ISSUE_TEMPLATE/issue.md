name: Inmortalizar frase
description: Proponer una frase para la web
title: "Frase: "
labels:
  - phrase-submission
body:
  - type: textarea
    id: phrase
    attributes:
      label: Frase
      description: Escribí la frase que querés inmortalizar.
      placeholder: La web también recuerda.
    validations:
      required: true

  - type: input
    id: author
    attributes:
      label: Autor
      description: Nombre, alias o anónimo.
      placeholder: Waldo
    validations:
      required: true
