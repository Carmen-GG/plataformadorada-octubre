// Textos legales en francés. Mismo contenido, estructura y marcadores que las demás versiones.
// BORRADOR pendiente de revisión jurídica y de revisión por una persona francófona nativa.
// Los marcadores [EN MAYÚSCULAS] se mantienen en castellano para poder localizarlos.
import type { LegalDoc, LegalKey } from "./legal-content";

export const LEGAL_FR: Record<LegalKey, LegalDoc> = {
  aviso: {
    title: "Mentions légales",
    lead: "Texte provisoire, en attente de relecture juridique.",
    sections: [
      {
        heading: "Qui est derrière ce site",
        paragraphs: [
          "Plataforma Dorada est un mouvement citoyen, non partisan et à but non lucratif. Il n'est pas encore constitué en organisation et n'a pas de personnalité juridique propre. Ce site est géré, à titre personnel, par les bénévoles qui animent le mouvement.",
          "Responsable du site : [RESPONSABLE].",
          "Adresse postale : [DOMICILIO].",
          "Adresse électronique de contact : {email}.",
          "Lorsque le mouvement sera constitué en association ou en une autre forme d'organisation, nous actualiserons ces mentions avec ses données d'identification.",
        ],
      },
      {
        heading: "Objet du site",
        paragraphs: [
          "Ce site présente le mouvement et sa demande d'un Pacte d'État pour la dépendance et les soins, et permet d'apporter son adhésion, de proposer son aide bénévole, de partager un témoignage et de nous contacter. Il ne vend aucun produit ni service et n'a aucune finalité commerciale.",
        ],
      },
      {
        heading: "Conditions d'utilisation",
        paragraphs: [
          "L'accès est libre et gratuit. Nous vous demandons d'utiliser le site de manière respectueuse et licite, de ne pas chercher à l'endommager ni à le surcharger, et de ne pas accéder sans autorisation à ses systèmes de gestion.",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "Le nom, le logo et les contenus propres de Plataforma Dorada sont protégés par le droit de la propriété intellectuelle. [CONDICIONES DE USO DE LOS MATERIALES].",
          "Pour les actualités provenant d'autres médias, nous n'affichons que le titre, un bref résumé et un lien vers la publication d'origine, dont les droits appartiennent à ses auteurs et à ses médias.",
        ],
      },
      {
        heading: "Liens et contenus de tiers",
        paragraphs: [
          "Ce site renvoie à des contenus de tiers ou les intègre (par exemple Google Forms, Instagram, TikTok ou Spotify). En les utilisant, vous quittez notre site et les conditions et politiques de confidentialité de ces services s'appliquent ; nous n'en sommes pas responsables.",
        ],
      },
      {
        heading: "Caractère informatif",
        paragraphs: [
          "Les informations de ce site ont une vocation de sensibilisation générale. Elles ne constituent pas un conseil juridique, de santé ou social individuel. Nous nous efforçons de citer la source des données et des chiffres et de maintenir des informations exactes, mais nous ne pouvons garantir l'absence d'erreurs ni d'interruptions du service.",
        ],
      },
      {
        id: "condiciones-voluntariado",
        heading: "Mentions légales et conditions de participation",
        intro: [
          "La participation au bénévolat de Plataforma Dorada est libre et volontaire. Elle a pour but de contribuer à la défense du droit à la prise en charge de la dépendance et aux soins, ainsi qu'à la promotion du Pacte d'État pour la dépendance et les soins.",
          "Les bénévoles pourront collaborer, selon leurs disponibilités et leurs compétences, à des tâches de diffusion, de communication et de sensibilisation, à la prise de contact avec des organisations, au soutien de campagnes et à d'autres activités liées aux objectifs de la plateforme.",
          "L'inscription au moyen du formulaire n'entraîne pas l'intégration automatique au bénévolat et ne crée pas, à elle seule, de lien contraignant avec Plataforma Dorada.",
          "Les participants et participantes s'engagent à :",
        ],
        items: [
          "Respecter les principes, les objectifs et les valeurs de Plataforma Dorada.",
          "Exercer leur collaboration de manière responsable, respectueuse et non discriminatoire.",
          "Préserver la confidentialité des informations personnelles ou sensibles auxquelles ils pourraient avoir accès au cours de leur collaboration.",
          "Utiliser le matériel et les informations fournis exclusivement pour les activités autorisées.",
          "Respecter la vie privée et les droits des personnes qu'ils contactent.",
        ],
        paragraphs: [
          "La participation est volontaire et peut prendre fin à tout moment, sur simple communication au groupe moteur de la plateforme.",
          "Plataforma Dorada pourra établir des consignes spécifiques pour chaque campagne ou activité afin de garantir une collaboration coordonnée, sûre et cohérente avec ses objectifs.",
        ],
      },
      {
        heading: "Droit applicable",
        paragraphs: ["Les présentes mentions sont régies par le droit espagnol."],
      },
    ],
  },
  privacidad: {
    title: "Politique de confidentialité du bénévolat",
    lead: "Chez Plataforma Dorada, nous nous engageons à protéger la vie privée des personnes qui souhaitent collaborer à notre initiative. Nous traitons les données personnelles de manière responsable, transparente et conformément à la réglementation en vigueur en matière de protection des données.",
    sections: [
      {
        heading: "Responsable du traitement",
        items: [
          "Responsable : Plataforma Dorada",
          "Adresse électronique : plataformadoradaes@gmail.com.",
        ],
      },
      {
        heading: "Quelles données collectons-nous ?",
        paragraphs: [
          "Nous pouvons collecter des données d'identification et de contact, telles que les nom et prénom, l'adresse électronique, le numéro de téléphone et la localité, ainsi que des informations sur les disponibilités, l'expérience, les connaissances et les centres d'intérêt en matière de collaboration.",
          "Nous ne demanderons que les données nécessaires à l'organisation et à la coordination des activités bénévoles.",
        ],
      },
      {
        heading: "À quoi servent vos données ?",
        intro: [
          "Les données seront utilisées pour :",
        ],
        items: [
          "Gérer les demandes d'intégration au bénévolat.",
          "Contacter les personnes intéressées et coordonner leur participation.",
          "Informer sur les campagnes, activités et tâches liées à leur collaboration.",
          "Assurer l'organisation et le suivi des activités bénévoles.",
        ],
        paragraphs: [
          "Nous n'utiliserons pas les données à des fins incompatibles avec celles mentionnées ci-dessus et ne les intégrerons pas à des campagnes commerciales étrangères à l'activité de la plateforme.",
        ],
      },
      {
        heading: "Quelle est la base juridique du traitement ?",
        paragraphs: [
          "Le traitement reposera sur la gestion de la demande de participation et, le cas échéant, de la relation de bénévolat, ainsi que sur le consentement pour les usages qui l'exigent.",
          "Lorsqu'un traitement repose sur le consentement, celui-ci peut être retiré à tout moment, sans que cela affecte la licéité du traitement effectué auparavant.",
        ],
      },
      {
        heading: "Avec qui partageons-nous vos données ?",
        paragraphs: [
          "Les données ne seront ni vendues ni cédées à des tiers à des fins commerciales. Elles ne pourront être communiquées que lorsque cela est nécessaire à l'organisation des activités, lorsqu'il existe une base juridique valable ou lorsque la loi l'exige.",
          "Si des outils externes sont utilisés pour gérer des formulaires, des listes de contacts ou des communications, les garanties et mesures de protection appropriées seront adoptées.",
        ],
      },
      {
        heading: "Combien de temps conservons-nous vos données ?",
        paragraphs: [
          "Les données seront conservées pendant la durée nécessaire à la gestion de la demande et de la participation au bénévolat. Elles seront ensuite supprimées ou bloquées le cas échéant, sauf si elles doivent être conservées plus longtemps en raison d'une obligation légale ou pour faire face à d'éventuelles responsabilités.",
        ],
      },
      {
        heading: "Quels sont vos droits ?",
        paragraphs: [
          "Vous pouvez exercer vos droits d'accès, de rectification, d'effacement, d'opposition, de limitation du traitement et, le cas échéant, de portabilité de vos données.",
          "Pour ce faire, écrivez à plataformadoradaes@gmail.com en indiquant le droit que vous souhaitez exercer.",
          "Vous pouvez également introduire une réclamation auprès de l'Agence espagnole de protection des données (Agencia Española de Protección de Datos) si vous estimez que le traitement de vos données n'est pas conforme à la réglementation.",
        ],
      },
      {
        heading: "Sécurité et confidentialité",
        paragraphs: [
          "Plataforma Dorada adoptera les mesures techniques et organisationnelles appropriées pour protéger les données personnelles contre tout accès non autorisé, perte, altération ou divulgation indue.",
          "Les informations concernant les bénévoles seront utilisées uniquement aux fins indiquées, et l'accès en sera limité aux personnes qui en ont besoin pour exercer leurs fonctions.",
          "DATE DE MISE À JOUR : 13/10/2026",
        ],
      },
    ],
  },
  cookies: {
    title: "Politique en matière de cookies",
    lead: "Texte provisoire, en attente de relecture juridique.",
    sections: [
      {
        heading: "Ce que sont les cookies",
        paragraphs: [
          "Ce sont de petits fichiers ou fragments de données qu'un site enregistre dans votre navigateur. Nous désignons ici les cookies et les technologies équivalentes, comme le stockage local du navigateur.",
        ],
      },
      {
        heading: "Ce que nous utilisons",
        items: [
          "Préférence de langue (pd-locale) : mémorise la langue que vous choisissez. Il est technique et n'est conservé que dans votre navigateur.",
          "Préférence relative aux cookies (pd-cookie-consent) : mémorise votre choix dans l'avis sur les cookies. Il est technique.",
          "Nous n'utilisons pas de cookies d'analyse ni de publicité, ni d'outils de suivi.",
        ],
      },
      {
        heading: "Contenus de réseaux sociaux",
        paragraphs: [
          "Sur la page des réseaux sociaux, Instagram, TikTok et Spotify peuvent déposer leurs propres cookies lors de l'affichage de leurs publications ou de leur liste de lecture. Nous ne chargeons ces contenus que si vous acceptez les cookies de tiers. Si vous les refusez, vous verrez un lien pour ouvrir le contenu sur le réseau ou le service lui-même.",
          "Lorsque vous cliquez sur des liens vers Google Forms ou d'autres sites, vous quittez notre site et les politiques de ces services s'appliquent.",
        ],
      },
      {
        heading: "Comment gérer vos préférences",
        paragraphs: [
          "Vous pouvez accepter, refuser ou ne conserver que les cookies essentiels dans l'avis sur les cookies. Pour modifier votre choix, utilisez le lien « Modifier les préférences de cookies » en bas de page. Vous pouvez aussi supprimer ou bloquer les cookies depuis les paramètres de votre navigateur.",
          "Si nous ajoutons à l'avenir des outils d'analyse ou autres, nous mettrons à jour cette politique et demanderons d'abord votre consentement.",
        ],
      },
    ],
  },
  accesibilidad: {
    title: "Déclaration d'accessibilité",
    lead: "Texte provisoire. État : en amélioration continue.",
    sections: [
      {
        heading: "Notre engagement",
        paragraphs: [
          "Nous voulons que chacun puisse utiliser ce site, y compris les personnes qui naviguent au clavier, avec un lecteur d'écran, avec un agrandissement du texte ou qui ont des difficultés de lecture. Notre objectif est de respecter les lignes directrices WCAG 2.1 de niveau AA.",
        ],
      },
      {
        heading: "État actuel",
        paragraphs: [
          "Un audit d'accessibilité complet et indépendant n'a pas encore été réalisé ; nous ne déclarons donc pas une conformité totale aux WCAG 2.1 AA. Nous continuons à examiner et à corriger le site.",
        ],
      },
      {
        heading: "Mesures appliquées",
        items: [
          "Structure avec des titres et des zones de page bien définis.",
          "Navigation complète au clavier et focus visible.",
          "Lien pour passer directement au contenu principal.",
          "Contraste suffisant et textes alternatifs pour les images.",
          "Conception adaptative, avec zoom jusqu'à 200 %.",
          "Respect de la préférence du système pour la réduction des animations.",
          "Site disponible en espagnol, catalan, valencien, basque, galicien, anglais, français et allemand.",
        ],
      },
      {
        heading: "Limites connues",
        items: [
          "Les contenus intégrés d'Instagram, TikTok et Spotify ainsi que les formulaires Google sont de tiers ; leur accessibilité ne dépend pas de nous. Nous fournissons toujours un lien alternatif.",
          "Les traductions en basque, galicien, valencien, français et allemand sont en attente de relecture par des locuteurs natifs.",
          "Certaines parties, comme les graphiques, les cartes ou les documents téléchargeables, ne sont peut-être pas encore pleinement accessibles.",
        ],
      },
      {
        heading: "Si vous rencontrez un obstacle",
        paragraphs: [
          "Écrivez-nous à {email} en indiquant la page et le problème. Nous essaierons de vous répondre dès que possible et de le corriger.",
          "Dernière révision de cette déclaration : [FECHA].",
        ],
      },
    ],
  },
};
