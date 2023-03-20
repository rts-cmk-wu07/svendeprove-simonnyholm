# Dokumentation for Appen

_Svendeprøve for Simon Nyholm Sørensen,  
Marts 2023_

## Landrup Dans

Formålet med denne applikation er som beskrevet i opgavebeskrivelsen at bane vejen for, at Landrup Dans kan få flere tilmeldinger til deres aktiviteter, så de kan få mulighed for at få deres virksomhed til at ekspanndere. Da det synes at være det umiddelbare formål med app'en at få flere tilmeldinger, har jeg valgt at fokusere på at gøre det lettest muligt for brugeren at konvertere og gøre brugerrejsen så smidig som muligt, også selvom alt måske ikke går som tiltænkt set fra brugerperspektivet.

## Tech-stack

- **React.js** - React er et open source framework til at bygge interaktive web-apps.

  Jeg vælger at arbejde med et framework som React, fordi man nemt og effektivt kan bygge en web-app med en relativt lille mængde kode sammenlignet med vanilla Javascript. Det er fleksibelt og intuitivt at arbejde med som udvikler, og man kan nemt splitte og genbruge kode. Man arbejder relativt smidigt med hooks, props og contexts, når der skal udveksles data af ene eller anden type på tværs af komponenter. Arbejder man med React, kan man takket være det store community af React-udviklere med en målrettet søgning i de fleste tilfælde finde en pakke eller et bibliotek, som kan hjælpe én med hurtigt og effektivt at bygge brugervenlige løsninger, som er tjekket efter i sømmene af andre udviklere. Har man vanskeligheder, er dokumentationen for React omfattende, og støder man på problemer, som man har svært ved at løse på egen hånd, er der på grund at store antal React-brugere også stor sandsynhed for, at andre udviklere har haft lignende udfordringer, som de søgt løsninger på eksempelvis via Stack Overflow.

- **Tailwind.css** - Tailwind.css er et styling-framework, som ved hjælp af korte prædefinerede klassenavne muliggør en effektiv styling af de individuelle jsx-elementer i en React-app.

  Jeg vælger at style min applikation ved hjælp af Tailwind.css, fordi først og fremmest man under udviklingen hurtigt får et indtryk af, hvordan de enkelte elementer i web-app'en kommer til at fremstå, og på den måde kan kan hurtigt rette sin styling, indtil man opnår det ønskede resultat. Dernæst er der sammenlignet med almindelig css generelt en fordel ved dels at slippe for at navigere rundt mellem klassenavne i stylig-filer og andre filer, og dels en fordel ved at der er mulighed for at benytte en relativt standardiseret styling. Dette giver overblik, en mere forenklet arbejdsproces og i sidste ende en tidsbesparelse.

- **Axios** - Axios er en pakke, som forenkler arbejdet med asynkrone http-requests, og som griber og fortolker de promises, som man forventer at modtage som respons til CRUD-requests.

  Jeg har vælgt at bruge Axios til min web-apps asynkrone http-requests, fordi jeg først og fremmest får en mere overskuelig og læsbar kode. Dette er en fordel over tid og i samarbejde med andre. Desuden er det i custom hooks forholdsvis enkelt at benytte variabler til at ændre på eksempelvis metode, url og headers i et request. Dernæst griber Axios éns respons og genkender datatypen.

- **React-use-cookie** - Hvad er react-use-cookie  
  Jeg vælger at bruge denne pakke til at håndtere cookies, da dokumentationen er meget overskuelig og pakken nem at bruge.

  - **Framer Motion** - Hvad er Framer Motion  
    Jeg vælger at bruge denne pakke til at håndtere cookies, da dokumentationen er meget overskuelig og pakken nem at bruge.

## Kode-eksempler

Mit første kode-eksempel kommer JoinBtn.jsx-komponentet.

Denne kode har til opgave at validere, om brugeren skal gives mulighed for at deltage i en givet aktivitet ud fra de kriterier, som er opstillet i kravsspecifikationen. Ved hjælp if- og else-statements valideres en for en alle krav ved at brugerens data sammenlignes med dem. Kan der ikke gives mulighed for deltagelse, sættes en setter-funktion til f.eks. at være true, således at en fejlbesked kan renderes til brugeren. Som man forhåbentlig kan se ud af produktet, er det i disse situationer tanken, at brugeren ikke smides på porten, så man mister en mulog konvertering, men at brugeren i stedet ledes videre til andre tilbud, som bedre kunne matche med vedkommende.

```javascript
function validateUser() {
  if (hasActivitySameWeekday.length >= 1) {
    setDayOccupied(true);
    setUserNotValid(true);
    return;
  } else {
    if (userData.age >= detail.minAge) {
      if (userData.age > detail.maxAge) {
        setTooOld(true);
        setUserNotValid(true);
        return;
      } else {
        if (detail.users.length >= detail.maxParticipants) {
          setActivityFull(true);
          setUserNotValid(true);
          return;
        } else {
          joinHandler();
        }
      }
    } else {
      setTooYoung(true);
      setUserNotValid(true);
      return;
    }
  }
}
```

Mit andet kode-eksempel er funktionen handleSearch fra Search.jsx-komponentet:

```javascript
function handleSearch(event) {
  const searchTermVar = event.target.value.toLowerCase();
  setSearchTerm(searchTermVar);
  setPatchStyling("unfill");
  setHasTyped(true);

  setSearchFeedback("typed");

  const result = allActivities?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTermVar) ||
      item.description.toLowerCase().includes(searchTermVar) ||
      item.weekday.toLowerCase().includes(searchTermVar)
  );

  setSearchResult(result);

  if (result.length < 1) {
    console.log("under1");
    setSearchFeedback("<1");
    setPatchStyling("fill");
  }

  if (result.length === 1) {
    setPatchStyling("fill");
  }

  if (result.length === 2) {
    setPatchStyling("unfill");
  }

  if (hasTyped === true) {
    if (event.target.value === "") {
      setSearchResult([]);
      setSearchFeedback("erased");
      setPatchStyling("fill");
    }
  }
}
```
