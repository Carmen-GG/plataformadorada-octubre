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
        id: "condiciones-voluntariado",
        heading: "Rechtliche Hinweise und Teilnahmebedingungen",
        intro: [
          "Die ehrenamtliche Mitarbeit bei Plataforma Dorada ist frei und freiwillig. Sie dient dazu, das Recht auf Unterstützung bei Pflegebedürftigkeit und auf Pflege zu verteidigen und den Staatspakt für Pflegebedürftigkeit und Pflege voranzubringen.",
          "Ehrenamtliche können sich je nach Verfügbarkeit und Fähigkeiten an der Verbreitung, Kommunikation und Sensibilisierung, an der Kontaktaufnahme mit Organisationen, an der Unterstützung von Kampagnen und an weiteren Aktivitäten beteiligen, die mit den Zielen der Plattform verbunden sind.",
          "Die Anmeldung über das Formular bedeutet keine automatische Aufnahme in das Ehrenamt und begründet für sich allein kein verbindliches Verhältnis zu Plataforma Dorada.",
          "Die Teilnehmenden verpflichten sich:",
        ],
        items: [
          "Die Grundsätze, Ziele und Werte von Plataforma Dorada zu respektieren.",
          "Die eigene Mitarbeit verantwortungsvoll, respektvoll und diskriminierungsfrei zu gestalten.",
          "Personenbezogene oder sensible Informationen, zu denen sie während ihrer Mitarbeit Zugang erhalten, vertraulich zu behandeln.",
          "Die zur Verfügung gestellten Materialien und Informationen ausschließlich für genehmigte Aktivitäten zu verwenden.",
          "Die Privatsphäre und die Rechte der Personen zu respektieren, mit denen sie in Kontakt treten.",
        ],
        paragraphs: [
          "Die Teilnahme ist freiwillig und kann jederzeit durch eine Mitteilung an die Koordinierungsgruppe der Plattform beendet werden.",
          "Plataforma Dorada kann für jede Kampagne oder Aktivität besondere Anweisungen festlegen, um eine koordinierte, sichere und mit ihren Zielen im Einklang stehende Zusammenarbeit zu gewährleisten.",
        ],
      },
      {
        heading: "Anwendbares Recht",
        paragraphs: ["Für diese Hinweise gilt spanisches Recht."],
      },
    ],
  },
  privacidad: {
    title: "Datenschutzerklärung für Ehrenamtliche",
    lead: "Plataforma Dorada verpflichtet sich, die Privatsphäre der Menschen zu schützen, die an unserer Initiative mitwirken möchten. Wir verarbeiten personenbezogene Daten verantwortungsvoll, transparent und im Einklang mit den geltenden Datenschutzvorschriften.",
    sections: [
      {
        heading: "Verantwortliche Stelle",
        items: [
          "Verantwortlich: Plataforma Dorada",
          "E-Mail: plataformadoradaes@gmail.com.",
        ],
      },
      {
        heading: "Welche Daten erheben wir?",
        paragraphs: [
          "Wir können Identifikations- und Kontaktdaten erheben, etwa Vor- und Nachname, E-Mail-Adresse, Telefonnummer und Wohnort, sowie Angaben zu Verfügbarkeit, Erfahrung, Kenntnissen und Interessen an einer Mitarbeit.",
          "Wir fragen nur die Daten ab, die zur Organisation und Koordination der ehrenamtlichen Aktivitäten erforderlich sind.",
        ],
      },
      {
        heading: "Wofür verwenden wir Ihre Daten?",
        intro: [
          "Die Daten werden verwendet, um:",
        ],
        items: [
          "Anfragen zur Aufnahme in das Ehrenamt zu bearbeiten.",
          "Mit interessierten Personen Kontakt aufzunehmen und ihre Mitwirkung zu koordinieren.",
          "Über Kampagnen, Aktivitäten und Aufgaben im Zusammenhang mit ihrer Mitarbeit zu informieren.",
          "Die Organisation und Begleitung der ehrenamtlichen Aktivitäten sicherzustellen.",
        ],
        paragraphs: [
          "Wir verwenden die Daten nicht für Zwecke, die mit den oben genannten unvereinbar sind, und nehmen sie nicht in kommerzielle Kampagnen auf, die nichts mit der Tätigkeit der Plattform zu tun haben.",
        ],
      },
      {
        heading: "Auf welcher Rechtsgrundlage verarbeiten wir die Daten?",
        paragraphs: [
          "Die Verarbeitung stützt sich auf die Bearbeitung der Anfrage zur Teilnahme und gegebenenfalls auf das ehrenamtliche Verhältnis sowie auf die Einwilligung für Verwendungen, die eine solche erfordern.",
          "Beruht eine Verarbeitung auf einer Einwilligung, kann diese jederzeit widerrufen werden, ohne dass die Rechtmäßigkeit der zuvor erfolgten Verarbeitung dadurch berührt wird.",
        ],
      },
      {
        heading: "Mit wem teilen wir Ihre Daten?",
        paragraphs: [
          "Die Daten werden weder verkauft noch zu kommerziellen Zwecken an Dritte weitergegeben. Sie dürfen nur übermittelt werden, wenn dies für die Organisation der Aktivitäten erforderlich ist, eine gültige Rechtsgrundlage besteht oder es gesetzlich vorgeschrieben ist.",
          "Werden externe Werkzeuge zur Verwaltung von Formularen, Kontaktlisten oder Mitteilungen eingesetzt, werden die entsprechenden Garantien und Schutzmaßnahmen getroffen.",
        ],
      },
      {
        heading: "Wie lange speichern wir Ihre Daten?",
        paragraphs: [
          "Die Daten werden so lange gespeichert, wie es für die Bearbeitung der Anfrage und die Mitwirkung im Ehrenamt erforderlich ist. Danach werden sie gegebenenfalls gelöscht oder gesperrt, sofern sie nicht aufgrund einer gesetzlichen Pflicht oder zur Klärung möglicher Haftungsfragen länger aufbewahrt werden müssen.",
        ],
      },
      {
        heading: "Welche Rechte haben Sie?",
        paragraphs: [
          "Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung, Widerspruch, Einschränkung der Verarbeitung und gegebenenfalls Datenübertragbarkeit ausüben.",
          "Schreiben Sie dazu an plataformadoradaes@gmail.com und geben Sie an, welches Recht Sie ausüben möchten.",
          "Sie können außerdem bei der spanischen Datenschutzbehörde (Agencia Española de Protección de Datos) Beschwerde einlegen, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten nicht den Vorschriften entspricht.",
        ],
      },
      {
        heading: "Sicherheit und Vertraulichkeit",
        paragraphs: [
          "Plataforma Dorada trifft geeignete technische und organisatorische Maßnahmen, um personenbezogene Daten vor unbefugtem Zugriff, Verlust, Veränderung oder unrechtmäßiger Offenlegung zu schützen.",
          "Die Informationen der Ehrenamtlichen werden ausschließlich für die angegebenen Zwecke verwendet; Zugriff haben nur die Personen, die sie zur Erfüllung ihrer Aufgaben benötigen.",
          "STAND: 13.10.2026",
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
