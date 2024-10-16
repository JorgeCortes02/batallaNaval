



# Lost in the Sand

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

# 2. Configuració del Servidor Local:

### Instal·lar PHP:
És necessari instal·lar PHP i utilitzar el seu servidor web integrat. Ves a la pàgina oficial de PHP: [https://www.php.net/downloads.php](https://www.php.net/downloads.php) i descarrega la versió adequada per al teu sistema.

### Començar el servidor integrat:
Un cop PHP estigui instal·lat, obre una terminal i navega fins a la carpeta on hi ha el teu codi de PHP. Executa la següent comanda per iniciar el servidor:

```bash
php -S localhost:8000

Això començarà un servidor local al port 8000. Pots accedir al teu lloc web a [http://localhost:8000/](http://localhost:8000/).

Obre el teu navegador i navega a [http://localhost:8000/PHP/index](http://localhost:8000/PHP/index) per iniciar el joc.

## Crèdits

- **Desenvolupadors**: Pau Gracia, Jorge Cortes, William Sargisson.
