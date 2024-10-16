# Lost in the Sand

# Índex

## Wikipedia
- **Descripció del Joc**
- **Jugabilitat**
  1. Objectiu del joc
  2. Tauler
  3. Com jugar
  4. Cronòmetre i temps límit
  5. Desar puntuacions
  6. Sistema de Puntuació
- **Característiques del Joc**
  - Tauler Aleatori
  - Validació de Posicions
  - Interfície d’Usuari Amigable
  - Desament de Puntuacions
  - Cronòmetre
- **Instal·lació i Configuració**
  1. Clonar el Repositori i instal·lar PHP

## Apartats tècnics:
- **Wireframes**
  - Index.php: Menú principal
  - Game.php: El Joc
    - Taula de joc
    - Taulell informatiu
  - Ranking.php
- **Look & Feel**


# Wikipedia

**Lost in the Sand** és un emocionant joc d’estratègia basat en el concepte clàssic d’Enfonsar la flota (Battleship). Els jugadors es troben en un vast desert on les ordes enemigues estan enterrades sota la sorra. El teu objectiu és trobar-los i destruir-los abans que s’acabi el temps. Amb cada tret, t’acostes més a descobrir la flota oculta, però compte: el rellotge no s’atura, i cada segon compta.

## Descripció del Joc

El joc presenta un tauler de 10x10 on s’amaguen diverses ordes de diferents mides. Utilitzant només els teus instints i una mica de sort, has de trobar i “disparar” a aquests vaixells abans que s’acabi el temps. “Lost in the Sand” està dissenyat per oferir una experiència emocionant, on la rapidesa i la precisió són claus per obtenir una puntuació alta.

## Jugabilitat

### 1. Objectiu del joc:
- Descobrir i eliminar totes les ordas ocultes al tauler abans que s’acabi el temps. La quantitat d’ordes i les seves posicions es generen aleatòriament a l’inici de cada partida, per la qual cosa cada sessió és única.

### 2. Tauler:
- El tauler és una quadrícula de 10x10 que representa una secció del desert. Cada cel·la pot amagar part d’una orda o estar buida.
- Les ordes varien en mida, amb longituds de 2, 3, 4 i 5 cel·les, i estan distribuïdes de manera aleatòria tant en horitzontal com en vertical.
- Les ordes no es toquen entre elles, cosa que permet als jugadors usar lògica deductiva per endevinar les posicions restants a mesura que avança el joc.

### 3. Com jugar:
- Fes clic en qualsevol cel·la del tauler per disparar. Si encertes i colpeges una orda, la cel·la canviarà de color, indicant un impacte. Si falles, la cel·la també canviarà de color per mostrar que has disparat en aquesta àrea.
- Has d’eliminar completament una orda perquè es consideri eliminada. Això vol dir descobrir totes les cel·les que ocupa.
- L’objectiu és eliminar totes les ordes tan ràpid com puguis per aconseguir la màxima puntuació.

### 4. Cronòmetre i temps límit:
- A la cantonada superior de la pantalla, veuràs un cronòmetre que compta el temps que portes has jugat. Tot i que no hi ha un límit estricte de temps, com més ràpid acabis la partida, més alta serà la teva puntuació final.
- El temps és un factor crucial: al final de la partida, la puntuació es calcularà en funció del temps total emprat.

### 5. Desar puntuacions:
- Després de cada partida, tindràs l’oportunitat de registrar el teu nom i puntuació en una finestra emergent.
- Les puntuacions es desen en un fitxer de text (`ranking.txt`) juntament amb la data i hora de la partida. Això permet als jugadors competir per aconseguir la puntuació més alta i comparar el seu rendiment en diferents sessions de joc.

## Característiques del Joc

- **Tauler Aleatori**: A cada partida, el tauler de 10x10 es genera aleatòriament amb vaixells de diferents mides. Els vaixells es poden col·locar tant en posicions horitzontals com verticals, cosa que augmenta el repte de trobar-los.
- **Validació de Posicions**: El joc garanteix que els vaixells mai es toquen, cosa que permet als jugadors utilitzar la lògica per deduir les posicions probables dels vaixells restants a mesura que avancen al joc.
- **Interfície d’Usuari Amigable**: La interfície ha estat dissenyada per ser clara i intuïtiva, amb botons que permeten interactuar fàcilment amb el tauler, així com un cronòmetre i marcador per monitora el progrés del jugador.
- **Desament de Puntuacions**: Els noms i puntuacions dels jugadors es desen en un fitxer `ranking.txt`, cosa que permet portar un registre de les millors puntuacions.
- **Cronòmetre**: El temps és un dels elements clau en el sistema de puntuació. El cronòmetre et pressiona a jugar de manera eficient, augmentant el repte del joc.

# Instal·lació i Configuració

### 1. Clonar el Repositori:
```bash
git clone https://github.com/tu-usuari/perduts-a-la-sorra.git
```
# 2. Configuració del Servidor Local:

### Instal·lar PHP:
És necessari instal·lar PHP i utilitzar el seu servidor web integrat. Ves a la pàgina oficial de PHP: [https://www.php.net/downloads.php](https://www.php.net/downloads.php) i descarrega la versió adequada per al teu sistema.

### Començar el servidor integrat:
Un cop PHP estigui instal·lat, obre una terminal i navega fins a la carpeta on hi ha el teu codi de PHP. Executa la següent comanda per iniciar el servidor:

```bash
php -S localhost:8000
```
Això començarà un servidor local al port 8000. Pots accedir al teu lloc web a [http://localhost:8000/](http://localhost:8000/).

Obre el teu navegador i navega a [http://localhost:8000/PHP/index](http://localhost:8000/PHP/index) per iniciar el joc.

## Crèdits

- **Desenvolupadors**: Pau Gracia, Jorge Cortes, William Sargisson.





# Look and Feel

La nostra intenció en desenvolupar aquest projecte era evocar una imatge que ens transportés a l'antic Egipte.  
Per aquest motiu, d'una banda hem utilitzat com a imatge de fons un paisatge on es poden veure diferents elements d'escultura egípcia com esfinxs.  
D'altra banda, també hem utilitzat una imatge, per al fons de la taula principal del joc, que imita la fusta.  
A nivell de colors, la intenció ha estat representar elements naturals d'aquella zona, com la terra del desert amb el marró clar o el marró fosc de la fusta.  
També destaquem l'ús dels tons grocs/daurats que fan referència a l'opulència de les joies o dels mateixos sarcòfags.  
Per al fons d'alguns contenidors hem fet servir negres amb una opacitat reduïda.  

Els colors utilitzats han estat:  
1. **#d4af37** – Or  
2. **#e5c18a** – Daurat clar  
3. **rgb(59, 36, 11)** – Marró fosc  
4. **#000000** – Negre  
5. **rgb(222, 222, 222)** – Gris clar  
6. **rgba(0, 0, 0, 0.7)** – Negre semitransparent (70% d'opacitat)  
7. **#ffffff** – Blanc  
8. **rgb(248, 206, 7)** – Groc  
9. **rgb(55, 166, 7)** – Verd  
10. **rgb(16, 31, 202)** – Blau  
11. **rgb(162, 32, 28)** – Vermell  

## Imatge de fons de pantalla:

-Per al fons de pantalla hem utilitzat una imatge amb escultures egípcies.

![fondoPagina](https://github.com/user-attachments/assets/3bf4e3c1-081e-481b-a353-7b4c870c9bd0)


-Per al fons de la taula de joc hem utilitzat un fons que imita la fusta:

![fondo-madera](https://github.com/user-attachments/assets/f2f9af71-58bd-4378-9cce-d898f26fb231)


-Els botons segueixen l'estètica de colors marrons i grisos:

<img width="192" alt="Captura de pantalla 2024-10-16 a las 6 08 07 p  m" src="https://github.com/user-attachments/assets/07cf5a83-472a-493a-8d61-9cc96c730c1f">


-Si el botó està desactivat, el color es torna gris:

<img width="149" alt="Captura de pantalla 2024-10-16 a las 6 11 31 p  m" src="https://github.com/user-attachments/assets/d93929d6-c8ea-4920-87a3-f7f7410db3b2">


-Per als fons dels marcs informatius hem utilitzat colors daurats:

<img width="783" alt="Captura de pantalla 2024-10-16 a las 6 08 27 p  m" src="https://github.com/user-attachments/assets/23df40c9-5abb-4bc2-8a1a-9572f07cdb20">


-Els botons que conformen la taula de joc tenen com a fons la imatge d'un jeroglífic.


<img width="75" alt="Captura de pantalla 2024-10-16 a las 6 07 47 p  m" src="https://github.com/user-attachments/assets/2f8b6f90-625e-4a6c-b0a8-b532b6db6138">


-Per a les cel·les que indiquen les files i els números hem posat una cenefa que també imita la fusta:

<img width="59" alt="Captura de pantalla 2024-10-16 a las 6 07 28 p  m" src="https://github.com/user-attachments/assets/be0c9732-d751-4bc9-a6f8-6b35c6f9e9ae">


-Per a les notificacions hem utilitzat els colors vermell, blau, verd i groc depenent del seu tipus (Error, advertència...).

<img width="379" alt="Captura de pantalla 2024-10-16 a las 6 17 49 p  m" src="https://github.com/user-attachments/assets/b30262fa-2452-4993-bbf6-9892687cc6ec">


