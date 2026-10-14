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
    title: "Politique de confidentialité",
    lead: "Texte provisoire, en attente de relecture juridique.",
    sections: [
      {
        heading: "Qui est le responsable du traitement",
        paragraphs: [
          "Plataforma Dorada est un mouvement citoyen sans personnalité juridique propre. Les données personnelles que nous recueillons sont traitées par les personnes qui animent le mouvement, qui agissent en tant que responsables : [RESPONSABLE].",
          "Adresse : [DOMICILIO]. Courriel : {email}.",
          "Lorsque le mouvement sera constitué en organisation, celle-ci deviendra le responsable du traitement et nous vous informerons de ce changement.",
        ],
      },
      {
        heading: "Quelles données nous traitons et pourquoi",
        items: [
          "Adhésion : les données demandées dans le formulaire ([DATOS DEL FORMULARIO DE ADHESIÓN]). Nous les utilisons pour comptabiliser les soutiens au mouvement et afficher des chiffres agrégés. Base juridique : votre consentement.",
          "Apparition publique (facultative) : uniquement si vous l'autorisez expressément dans le formulaire, nous affichons sur le site votre prénom, l'initiale de votre premier nom de famille et votre ville. Il s'agit d'un consentement distinct de celui de l'adhésion : si vous ne le donnez pas, vous n'apparaissez pas.",
          "Bénévolat : les données du formulaire ([DATOS DEL FORMULARIO DE VOLUNTARIADO]), pour vous contacter et coordonner votre collaboration. Base juridique : votre consentement.",
          "Témoignages : votre témoignage et vos coordonnées. Un témoignage peut révéler des données de santé ou de dépendance, qui bénéficient d'une protection spéciale : nous ne les traitons qu'avec votre consentement explicite. Il y a deux consentements distincts : l'un pour nous envoyer le témoignage et l'autre, facultatif, pour le publier.",
          "Contact : le nom, l'adresse électronique et le message que vous nous envoyez, afin de vous répondre. Base juridique : votre consentement lors de l'envoi du formulaire.",
          "Organisations adhérentes : les données de l'organisation, de sa personne de contact et son logo, afin de l'afficher comme organisation adhérente. Base juridique : le consentement.",
        ],
        paragraphs: [
          "Nous ne vendons pas vos données, nous ne les utilisons pas à des fins publicitaires et nous ne prenons aucune décision automatisée à partir de celles-ci.",
        ],
      },
      {
        heading: "Témoignages mentionnant d'autres personnes",
        paragraphs: [
          "Si vous décrivez la situation d'une autre personne (par exemple un proche en situation de dépendance), faites-le sans détails permettant de l'identifier, ou assurez-vous d'avoir son autorisation. Nous pouvons masquer ou modifier un témoignage pour protéger la vie privée de tiers.",
          "N'incluez pas d'informations de santé dans le formulaire de contact : le formulaire de témoignage existe à cet effet.",
        ],
      },
      {
        heading: "Avec qui nous partageons les données",
        paragraphs: [
          "Nous ne cédons pas vos données à des tiers pour leurs propres finalités. Pour faire fonctionner le site, nous utilisons des services de Google (Forms, Sheets, Drive, Apps Script et Gmail), qui traitent les données pour notre compte et peuvent impliquer des transferts en dehors de l'Espace économique européen, avec les garanties prévues par le RGPD.",
          "L'accès aux données est limité aux bénévoles que le mouvement autorise [CONFIRMAR ACCESO].",
          "Ce que vous nous autorisez à publier (adhésion ou témoignage) est visible par toute personne sur Internet.",
        ],
      },
      {
        heading: "Combien de temps nous les conservons",
        paragraphs: [
          "Nous conservons vos données tant que le mouvement est actif ou jusqu'à ce que vous retiriez votre consentement ou demandiez leur suppression. Les messages de contact sont conservés [PLAZO]. Passé ce délai, nous les supprimons ou, si la loi nous oblige à les conserver, nous les bloquons.",
        ],
      },
      {
        heading: "Vos droits",
        items: [
          "Accéder à vos données et en obtenir une copie.",
          "Les faire rectifier si elles sont inexactes.",
          "Demander leur suppression.",
          "Vous opposer au traitement ou demander sa limitation.",
          "Les recevoir dans un format réutilisable (portabilité).",
          "Retirer votre consentement à tout moment, sans que cela affecte ce qui a déjà été fait.",
        ],
        paragraphs: [
          "Écrivez à {email} en indiquant le droit que vous souhaitez exercer ; nous vous répondrons dans un délai maximal d'un mois. Si vous retirez votre autorisation d'apparaître publiquement ou de publier votre témoignage, nous le retirerons du site.",
          "Si vous estimez que nous n'avons pas traité correctement vos données, vous pouvez déposer une réclamation auprès de l'Agence espagnole de protection des données (www.aepd.es).",
        ],
      },
      {
        heading: "Mineurs",
        paragraphs: [
          "Ce site ne s'adresse pas aux enfants de moins de 14 ans. Si vous avez moins de cet âge, vous avez besoin de l'autorisation de votre père, de votre mère ou de votre représentant légal pour nous communiquer vos données.",
        ],
      },
      {
        heading: "Sécurité",
        paragraphs: [
          "Nous appliquons des mesures raisonnables pour protéger les données : accès restreint, services avec authentification, et publication sur le site des seules données agrégées ou expressément autorisées. Aucune mesure n'est infaillible ; si vous constatez un problème, signalez-le-nous à {email}.",
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
