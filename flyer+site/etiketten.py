# -*- coding: utf-8 -*-
import svgwrite
import codecs
import random
import math

# Define variables
grid = {'columns': 5, 'rows': 8, 'size': 9.5, 'innersize': 5, 'whitespace': 11, 'fontsize': 3.75}
circles = []
count = 0
texts = ["Free Culture", "Exchange", "Sharing", "Internet", "Digital Arts", "Participation", "Remix", "Development", "Design", "Media", "Neighbourhood", "Acessibility", "Specialisation", "Cross-Pollination", "Open sources", "Experiment", "Generator", "La culture libre", "l'échange", "le partage", "l'internet", "l'art numérique", "la participation", "le remix", "le développement", "le design", "les médias", "le quartier", "accessibilité", "spécialisation", "la pollinisation croisée", "les sources libres", "l'expérimentation", "générateur", "Vrije cultuur", "Uitwisseling", "Delen", "Internet", "Digitale kunst", "Participatie", "Remix", "Ontwikkeling", "Design", "Media", "Buurt", "Toegankelijk", "Specialistisch", "Kruisbestuiving", "Open bronnen", "Experiment", "Generator"]

def draw_circle(dwg, size = 2, innersize = 1, printtext = ''):
	#center = ((col + .5) * grid['whitespace'], (row + .5) * grid['whitespace'])
	
	center = (random.randrange(0 + math.ceil(size), 148 - math.ceil(size)), random.randrange(0 + math.ceil(size),210 - math.ceil(size)))

	dwg.add(dwg.circle (
					center = (center[0],center[1]),
					r = size,
					stroke_width = ".1",
					stroke = "black",
					fill = "none",
					style = "stroke-dasharray:1.2,1.2;"))
		
#	circle = dwg.add(dwg.circle (
#					center = (center[0],center[1]),
#					r = innersize,

#					stroke_width = "0",
#					stroke = "none",
#					fill = "none"))

#	text = dwg.text('',
#			(0,0),
#			font_family = 'Crickx',
#			font_weight = 'bold',
#			font_size = grid['fontsize'],
#			transform = 'rotate(' + str(random.randrange(0,180)) + ', ' + str(center[0]) + ', ' + str(center[1]) + ')')

#	text.add(dwg.textPath (
#			path = circle,
#			text = printtext,
#			startOffset = 0,
#			method = 'align',
#			))

#	dwg.add(text)

	return dwg


#dwg = svgwrite.Drawing(filename = resultfile, size = (str((grid['columns']) * grid['whitespace']), str((grid['rows']) * grid['whitespace'])))

for num in range(0,20):
	random.shuffle(texts)
	resultfile = "generated/flyer11-loop-" + str(num) + ".svg"
	
	dwg = svgwrite.Drawing(filename = resultfile, size = ("148mm", "210mm"), viewBox = "0 0 148 210")

	limit = random.randrange(0,len(texts))
	count = 0

	for text in texts:
		count += 1
		dwg = draw_circle (dwg = dwg, printtext = text, size = grid['size'], innersize = grid['innersize'])
		if count >= limit:
			break

	insert = (random.randrange(34,114), random.randrange(34,176))

	dwg.add(dwg.rect(insert = insert,
		size = (29.7, 63.5),
		stroke_width = ".1",
		stroke = "black",
		fill = "none",
		style = "stroke-dasharray:1.2,1.2;",
		transform = "rotate(" + str(random.randrange(0,45)) + "," + str(insert[0] + 17) + "," + str(insert[1] + 33.5) + ")"))

	insert = (random.randrange(34,114), random.randrange(34,176))	

	dwg.add(dwg.rect(insert = insert,
		size = (63.5, 29.6),
		stroke_width = ".1",
		stroke = "black",
		fill = "none",
		style = "stroke-dasharray:1.2,1.2",
		transform = "rotate(" + str(random.randrange(0,45)) + "," + str(insert[0] + 33.5) + "," + str(insert[1] + 17) + ")"))

	output = codecs.open(resultfile, "w", "UTF-8")
	output.write(dwg.tostring())
	output.close()
		
