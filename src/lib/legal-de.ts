// Textos legales en alemán. Mismo contenido, estructura y marcadores que las demás versiones.
// BORRADOR pendiente de revisión jurídica y de revisión por una persona germanohablante nativa.
// Los marcadores [EN MAYÚSCULAS] se mantienen en castellano para poder localizarlos.
import type { LegalDoc, LegalKey } from "./legal-content";

export const LEGAL_DE: Record<LegalKey, LegalDoc> = {
  aviso: {
    title: "Impressum und rechtliche Hinweise",
    lead: "Vorläufiger Text, die rechtliche Prüfung steht noch aus.",
    sections: [
      {
        heading: "Wer hinter dieser Website steht",
        paragraphs: [
          "Plataforma Dorada ist eine Bürgerbewegung, überparteilich und nicht gewinnorientiert. Sie ist noch nicht als Organisation gegründet und besitzt keine eigene Rechtspersönlichkeit. Diese Website wird privat von den Freiwilligen betrieben, die die Bewegung tragen.",
          "Verantwortlich für die Website: [RESPONSABLE].",
          "Postanschrift: [DOMICILIO].",
          "Kontakt per E-Mail: {email}.",
          "Sobald die Bewegung als Verein oder in anderer Form gegründet ist, aktualisieren wir diese Angaben um deren Identifikationsdaten.",
        ],
      },
      {
        heading: "Zweck der Website",
        paragraphs: [
          "Diese Website informiert über die Bewegung und ihre Forderung nach einem Staatspakt für Pflegebedürftigkeit und Pflege. Sie ermöglicht es, den Beitritt zu erklären, sich ehrenamtlich anzubieten, einen Erfahrungsbericht zu teilen und uns zu kontaktieren. Sie verkauft keine Produkte oder Dienstleistungen und verfolgt keinen kommerziellen Zweck.",
        ],
      },
      {
        heading: "Nutzungsbedingungen",
        paragraphs: [
          "Der Zugang ist frei und kostenlos. Wir bitten Sie, die Website respektvoll und rechtmäßig zu nutzen, nicht zu versuchen, sie zu beschädigen oder zu überlasten, und sich nicht unbefugt Zugang zu ihren Verwaltungssystemen zu verschaffen.",
        ],
      },
      {
        heading: "Geistiges Eigentum",
        paragraphs: [
          "Der Name, das Logo und die eigenen Inhalte von Plataforma Dorada sind durch das Recht des geistigen Eigentums geschützt. [CONDICIONES DE USO DE LOS MATERIALES].",
          "Bei Nachrichten aus anderen Medien zeigen wir nur die Überschrift, eine kurze Zusammenfassung und einen Link zur ursprünglichen Veröffentlichung an, deren Rechte bei den jeweiligen Autorinnen, Autoren und Medien liegen.",
        ],
      },
      {
        heading: "Links und Inhalte Dritter",
        paragraphs: [
          "Diese Website verlinkt auf Inhalte Dritter oder bettet sie ein (zum Beispiel Google Forms, Instagram, TikTok oder Spotify). Wenn Sie diese nutzen, verlassen Sie unsere Website, und es gelten die Nutzungsbedingungen und Datenschutzerklärungen dieser Dienste; für diese sind wir nicht verantwortlich.",
        ],
      },
      {
        heading: "Informativer Charakter",
        paragraphs: [
          "Die Informationen auf dieser Website dienen der allgemeinen Aufklärung. Sie stellen keine individuelle Rechts-, Gesundheits- oder Sozialberatung dar. Wir bemühen uns, die Quelle von Daten und Zahlen anzugeben und die Informationen korrekt zu halten, können aber nicht garantieren, dass keine Fehler oder Unterbrechungen des Dienstes auftreten.",
        ],
      },
      {
        heading: "Anwendbares Recht",
        paragraphs: ["Für diese Hinweise gilt spanisches Recht."],
      },
    ],
  },
  privacidad: {
    title: "Datenschutzerklärung",
    lead: "Vorläufiger Text, die rechtliche Prüfung steht noch aus.",
    sections: [
      {
        heading: "Wer der Verantwortliche ist",
        paragraphs: [
          "Plataforma Dorada ist eine Bürgerbewegung ohne eigene Rechtspersönlichkeit. Die von uns erhobenen personenbezogenen Daten werden von den Personen verarbeitet, die die Bewegung tragen und als Verantwortliche handeln: [RESPONSABLE].",
          "Anschrift: [DOMICILIO]. E-Mail: {email}.",
          "Sobald die Bewegung als Organisation gegründet ist, wird diese zur Verantwortlichen, und wir informieren Sie über die Änderung.",
        ],
      },
      {
        heading: "Welche Daten wir verarbeiten und wozu",
        items: [
          "Beitritt: die im Formular abgefragten Daten ([DATOS DEL FORMULARIO DE ADHESIÓN]). Wir verwenden sie, um die Unterstützung für die Bewegung zu zählen und aggregierte Zahlen anzuzeigen. Rechtsgrundlage: Ihre Einwilligung.",
          "Öffentliche Nennung (freiwillig): Nur wenn Sie im Formular ausdrücklich zustimmen, zeigen wir auf der Website Ihren Vornamen, den Anfangsbuchstaben Ihres ersten Nachnamens und Ihren Wohnort an. Dies ist eine gesonderte Einwilligung, getrennt von der für den Beitritt: Wenn Sie sie nicht erteilen, erscheinen Sie nicht.",
          "Ehrenamt: die Daten aus dem Formular ([DATOS DEL FORMULARIO DE VOLUNTARIADO]), um Sie zu kontaktieren und Ihre Mitarbeit zu koordinieren. Rechtsgrundlage: Ihre Einwilligung.",
          "Erfahrungsberichte: Ihr Bericht und Ihre Kontaktdaten. Ein Erfahrungsbericht kann Gesundheits- oder Pflegebedürftigkeitsdaten offenbaren, die besonders geschützt sind: Wir verarbeiten sie nur mit Ihrer ausdrücklichen Einwilligung. Es gibt zwei getrennte Einwilligungen: eine, um uns den Bericht zu senden, und eine weitere, freiwillige, um ihn zu veröffentlichen.",
          "Kontakt: Name, E-Mail-Adresse und Nachricht, die Sie uns senden, um Ihnen zu antworten. Rechtsgrundlage: Ihre Einwilligung beim Absenden des Formulars.",
          "Beigetretene Organisationen: Daten der Organisation, ihrer Kontaktperson und ihr Logo, um sie als beigetretene Organisation anzuzeigen. Rechtsgrundlage: Einwilligung.",
        ],
        paragraphs: [
          "Wir verkaufen Ihre Daten nicht, verwenden sie nicht für Werbung und treffen auf ihrer Grundlage keine automatisierten Entscheidungen.",
        ],
      },
      {
        heading: "Erfahrungsberichte, in denen andere Personen erwähnt werden",
        paragraphs: [
          "Wenn Sie die Situation einer anderen Person beschreiben (zum Beispiel eines pflegebedürftigen Angehörigen), tun Sie dies bitte ohne Angaben, die sie identifizieren könnten, oder stellen Sie sicher, dass Sie ihre Erlaubnis haben. Wir können einen Erfahrungsbericht ausblenden oder bearbeiten, um die Privatsphäre Dritter zu schützen.",
          "Bitte geben Sie im Kontaktformular keine Gesundheitsinformationen an: Dafür gibt es das Formular für Erfahrungsberichte.",
        ],
      },
      {
        heading: "An wen wir Daten weitergeben",
        paragraphs: [
          "Wir geben Ihre Daten nicht für deren eigene Zwecke an Dritte weiter. Für den Betrieb der Website nutzen wir Google-Dienste (Forms, Sheets, Drive, Apps Script und Gmail), die Daten in unserem Auftrag verarbeiten und Übermittlungen außerhalb des Europäischen Wirtschaftsraums mit den von der DSGVO vorgesehenen Garantien mit sich bringen können.",
          "Der Zugriff auf die Daten ist auf die Freiwilligen beschränkt, die die Bewegung dazu ermächtigt [CONFIRMAR ACCESO].",
          "Was Sie uns zu veröffentlichen erlauben (Beitritt oder Erfahrungsbericht), ist für jeden im Internet sichtbar.",
        ],
      },
      {
        heading: "Wie lange wir sie aufbewahren",
        paragraphs: [
          "Wir bewahren Ihre Daten auf, solange die Bewegung aktiv ist oder bis Sie Ihre Einwilligung widerrufen oder ihre Löschung verlangen. Kontaktnachrichten werden [PLAZO] aufbewahrt. Danach löschen wir sie oder, wenn das Gesetz uns zur Aufbewahrung verpflichtet, sperren wir sie.",
        ],
      },
      {
        heading: "Ihre Rechte",
        items: [
          "Auskunft über Ihre Daten und eine Kopie erhalten.",
          "Berichtigung, falls sie unrichtig sind.",
          "Löschung verlangen.",
          "Der Verarbeitung widersprechen oder ihre Einschränkung verlangen.",
          "Sie in einem wiederverwendbaren Format erhalten (Datenübertragbarkeit).",
          "Ihre Einwilligung jederzeit widerrufen, ohne dass dies das bereits Geschehene berührt.",
        ],
        paragraphs: [
          "Schreiben Sie an {email} und nennen Sie das Recht, das Sie ausüben möchten; wir antworten innerhalb von höchstens einem Monat. Wenn Sie Ihre Erlaubnis zur öffentlichen Nennung oder zur Veröffentlichung Ihres Erfahrungsberichts widerrufen, entfernen wir ihn von der Website.",
          "Wenn Sie der Ansicht sind, dass wir Ihre Daten nicht ordnungsgemäß behandelt haben, können Sie sich bei der spanischen Datenschutzbehörde (www.aepd.es) beschweren.",
        ],
      },
      {
        heading: "Minderjährige",
        paragraphs: [
          "Diese Website richtet sich nicht an Kinder unter 14 Jahren. Wenn Sie jünger sind, benötigen Sie die Erlaubnis Ihrer Eltern oder Ihres gesetzlichen Vertreters, um uns Ihre Daten mitzuteilen.",
        ],
      },
      {
        heading: "Sicherheit",
        paragraphs: [
          "Wir wenden angemessene Maßnahmen zum Schutz der Daten an: beschränkter Zugriff, Dienste mit Authentifizierung und die Veröffentlichung ausschließlich aggregierter oder ausdrücklich genehmigter Daten auf der Website. Keine Maßnahme ist unfehlbar; wenn Sie ein Problem bemerken, teilen Sie es uns unter {email} mit.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie-Richtlinie",
    lead: "Vorläufiger Text, die rechtliche Prüfung steht noch aus.",
    sections: [
      {
        heading: "Was Cookies sind",
        paragraphs: [
          "Das sind kleine Dateien oder Datenstücke, die eine Website in Ihrem Browser speichert. Hier meinen wir Cookies und gleichwertige Technologien, wie den lokalen Speicher des Browsers.",
        ],
      },
      {
        heading: "Was wir verwenden",
        items: [
          "Spracheinstellung (pd-locale): merkt sich die von Ihnen gewählte Sprache. Sie ist technisch notwendig und wird nur in Ihrem Browser gespeichert.",
          "Cookie-Einstellung (pd-cookie-consent): merkt sich Ihre Auswahl im Cookie-Hinweis. Sie ist technisch notwendig.",
          "Wir verwenden keine Analyse- oder Werbe-Cookies und keine Tracking-Werkzeuge.",
        ],
      },
      {
        heading: "Inhalte sozialer Netzwerke",
        paragraphs: [
          "Auf der Seite zu den sozialen Netzwerken können Instagram, TikTok und Spotify eigene Cookies setzen, wenn ihre Beiträge oder ihre Playlist angezeigt werden. Wir laden diese Inhalte nur, wenn Sie Cookies von Drittanbietern akzeptieren. Wenn Sie diese ablehnen, sehen Sie einen Link, um den Inhalt im Netzwerk oder Dienst selbst zu öffnen.",
          "Wenn Sie auf Links zu Google Forms oder anderen Websites klicken, verlassen Sie unsere Website, und es gelten die Richtlinien dieser Dienste.",
        ],
      },
      {
        heading: "Wie Sie Ihre Einstellungen verwalten",
        paragraphs: [
          "Im Cookie-Hinweis können Sie alle akzeptieren, ablehnen oder nur die notwendigen behalten. Um Ihre Auswahl zu ändern, nutzen Sie den Link „Cookie-Einstellungen ändern“ in der Fußzeile. Sie können Cookies auch in den Einstellungen Ihres Browsers löschen oder blockieren.",
          "Falls wir künftig Analyse- oder andere Werkzeuge hinzufügen, aktualisieren wir diese Richtlinie und holen zuvor Ihre Einwilligung ein.",
        ],
      },
    ],
  },
  accesibilidad: {
    title: "Erklärung zur Barrierefreiheit",
    lead: "Vorläufiger Text. Stand: in laufender Verbesserung.",
    sections: [
      {
        heading: "Unsere Verpflichtung",
        paragraphs: [
          "Wir möchten, dass jede Person diese Website nutzen kann, auch Menschen, die mit der Tastatur, einem Screenreader oder Textvergrößerung navigieren oder Leseschwierigkeiten haben. Unser Ziel ist es, die Richtlinien WCAG 2.1 der Stufe AA zu erfüllen.",
        ],
      },
      {
        heading: "Aktueller Stand",
        paragraphs: [
          "Eine vollständige, unabhängige Prüfung der Barrierefreiheit wurde noch nicht durchgeführt; daher erklären wir keine vollständige Konformität mit WCAG 2.1 AA. Wir überprüfen und verbessern die Website fortlaufend.",
        ],
      },
      {
        heading: "Maßnahmen, die wir anwenden",
        items: [
          "Struktur mit klar definierten Überschriften und Seitenbereichen.",
          "Vollständige Tastaturbedienung und sichtbarer Fokus.",
          "Link zum direkten Sprung zum Hauptinhalt.",
          "Ausreichender Kontrast und Alternativtexte für Bilder.",
          "Responsives Design, mit Zoom bis 200 %.",
          "Beachtung der Systemeinstellung zur Reduzierung von Animationen.",
          "Website verfügbar auf Spanisch, Katalanisch, Valencianisch, Baskisch, Galicisch, Englisch, Französisch und Deutsch.",
        ],
      },
      {
        heading: "Bekannte Einschränkungen",
        items: [
          "Eingebettete Inhalte von Instagram, TikTok und Spotify sowie Google-Formulare stammen von Dritten; ihre Barrierefreiheit hängt nicht von uns ab. Wir stellen stets einen alternativen Link bereit.",
          "Die Übersetzungen ins Baskische, Galicische, Valencianische, Französische und Deutsche warten noch auf die Prüfung durch Muttersprachlerinnen und Muttersprachler.",
          "Einige Teile, wie Diagramme, Karten oder herunterladbare Dokumente, sind möglicherweise noch nicht vollständig barrierefrei.",
        ],
      },
      {
        heading: "Wenn Sie auf eine Barriere stoßen",
        paragraphs: [
          "Schreiben Sie uns an {email} und nennen Sie die Seite und das Problem. Wir versuchen, so bald wie möglich zu antworten und es zu beheben.",
          "Letzte Überprüfung dieser Erklärung: [FECHA].",
        ],
      },
    ],
  },
};
