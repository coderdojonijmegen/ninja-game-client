# ninja-game-client
Client voor de ninja game server

Hieronder een korte uitleg over de flow van de applicatie.

Het opstarten gebeurt momenteel in de index.html, deze set een interval die de Update functie in de Game klasse aanroept.

Bij het maken van deze game klasse wordt er een API klasse meegegeven, deze klasse dient om de informatie op te halen van de server. Omdat 
deze klasse wordt meegegeven door middel van dependency injection is deze makkelijk uitwisselbaar.

De gameloop is onder te verdelen in twee losgekoppelde loops.

### De teken loop
De teken loop is heel simpel en tekent elke 10 miliseconden het scherm opnieuw. Dit gebeurt door middel van HTML elementen die absoluut
gepositioneerd zijn in het scherm, door de CSS properties left en top aan te passen worden deze van locatie veranderd.
Bij elke iteratie van deze loop wordt de functie GetPlayers() aangeroepen in de API klasse die een lijst teruggeeft met de spelers en live informatie.

De player klasse is verantwoordelijk voor het updaten van de weergave.

### De update loop
De server werkt met Socket IO. Dit betekent dat verandering live binnenkomen, hierom is er voor gekozen om het beeld niet elke keer te updaten
als er nieuwe informatie is.

Elke keer als er een verandering plaatsvind verstuurt de server een update. Elke keer als dit gebeurt wordt de interne lijst van spelers
bijgewerkt. Deze code is allemaal te vinden in de API klasse. 

![Plaatje](https://imgur.com/a/GPqKBsG)
