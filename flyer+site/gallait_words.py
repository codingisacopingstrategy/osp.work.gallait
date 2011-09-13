# -*- coding: utf-8 -*-

words = {
'dutch' : ["Vrije cultuur", "Uitwisseling", "Delen", "Internet", "Digitale kunst", "Participatie", "Remix", "Ontwikkeling", "Design", "Media", "Buurt", "Toegankelijk", "Specialistisch", "Kruisbestuiving", "Open bronnen", "Experiment", "Generator"],
'english' : ["Free Culture", "Exchange", "Sharing", "Internet", "Digital Arts", "Participation", "Remix", "Development", "Design", "Media", "Neighbourhood", "Acessibility", "Specialisation", "Cross-Pollination", "Open sources", "Experiment", "Generator"],
'french' : ["La culture libre", "l'échange", "le partage", "l'internet", "l'art numérique", "la participation", "le remix", "le développement", "le design", "les médias", "le quartier", "accessibilité", "spécialisation", "la pollinisation croisée", "les sources libres", "l'expérimentation", "le générateur"]
}

"""
for language, words in words.items():
    print language, len(words)
"""

"""
for i in range(17):
    print words['dutch'][i], words['english'][i], words['french'][i]
"""

import pygraphviz as pgv
G=pgv.AGraph()

allwords = words['dutch'] + words['english'] + words['french']
for word in allwords:
    G.add_node(word)

G.layout()
G.draw('gallait_words.svg')