//shuffles list in-place


function shuffle(list) {
    var i, j, t;
    for (i = 1; i < list.length; i++) {
        j = Math.floor(Math.random() * (1 + i)); // choose j in [0..i]
        if (j != i) {
            t = list[i]; // swap list[i] and list[j]
            list[i] = list[j];
            list[j] = t;
        }
    }
    return list;
}

words = {
    'dutch': ["Vrije cultuur", "Uitwisseling", "Delen", "Internet", "Digitale kunst", "Participatie", "Remix", "Ontwikkeling", "Design", "Media", "Buurt", "Toegankelijk", "Specialistisch", "Kruisbestuiving", "Open bronnen", "Experiment", "Generator"],
    'english': ["Free Culture", "Exchange", "Sharing", "Internet", "Digital Arts", "Participation", "Remix", "Development", "Design", "Media", "Neighbourhood", "Acessibility", "Specialisation", "Cross-Pollination", "Open sources", "Experiment", "Generator"],
    'french': ["La culture libre", "l'échange", "le partage", "l'internet", "l'art numérique", "la participation", "le remix", "le développement", "le design", "les médias", "le quartier", "accessibilité", "spécialisation", "la pollinisation croisée", "les sources libres", "l'expérimentation", "le générateur"]
}

function get_threewords() {
  var threewords;
  threewords = [];
  for (language in words) {
      threewords.push(words[language][Math.floor(Math.random() * (17))]);
      }
  return shuffle(threewords).join(' ');
}

$(function() {
    function update_text() {
    $("div#content").text(get_threewords());
   }
  setInterval(update_text, 1000);
})