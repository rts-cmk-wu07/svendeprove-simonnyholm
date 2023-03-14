# Dokumentation for Appen

_Svendeprøve for Simon Nyholm Sørensen,  
Marts 2023_

## Denne app

Brug indholdet fra opgavebeskrivelsen. (hvad skal denne app kunne).

## Tech-stack

- **React.js** - React er et open source framework til at bygge interaktive web-apps.

  Jeg vælger at arbejde med et framework som React, fordi man nemt og effektivt kan bygge en web-app med en relativt lille mængde kode sammenlignet med vanilla Javascript. Det er fleksibelt og intuitivt at arbejde med som udvikler, og man kan nemt splitte og genbruge kode. Man arbejder relativt smidigt med hooks, props og contexts, når der skal udveksles data af ene eller anden type på tværs af komponenter. Arbejder man med React, kan man takket være det store community af React-udviklere med en målrettet søgning i de fleste tilfælde finde en pakke eller et bibliotek, som kan hjælpe én med hurtigt og effektivt at bygge brugervenlige løsninger, som er tjekket efter i sømmene af andre udviklere. Har man vanskeligheder, er dokumentationen for React omfattende, og støder man på problemer, som man har svært ved at løse på egen hånd, er der på grund at store antal React-brugere også stor sandsynhed for, at andre udviklere har haft lignende udfordringer, som de søgt løsninger på eksempelvis via Stack Overflow.

- **Tailwind.css** - Tailwind.css er et styling-framework, som ved hjælp af korte prædefinerede klassenavne muliggør en effektiv styling af de individuelle jsx-elementer i en React-app.

  Jeg vælger at style min applikation ved hjælp af Tailwind.css, fordi først og fremmest man under udviklingen hurtigt får et indtryk af, hvordan de enkelte elementer i web-app'en kommer til at fremstå, og på den måde kan kan hurtigt rette sin styling, indtil man opnår det ønskede resultat. Dernæst er der sammenlignet med almindelig css generelt en fordel ved dels at slippe for at navigere rundt mellem klassenavne i stylig-filer og andre filer, og dels en fordel ved at der er mulighed for at benytte en relativt standardiseret styling. Dette giver overblik, en mere forenklet arbejdsproces og i sidste ende en tidsbesparelse.

- **Axios** - Axios er en pakke, som forenkler arbejdet med asynkrone http-requests, og som griber fortolker de promises, som man forventer at modtage som respons til CRUD-requests.

  Jeg har vælgt at bruge Axios til min web-apps asynkrone http-requests, fordi jeg først og fremmest får en mere overskuelig og læsbar kode. Dette er en fordel over tid og i samarbejde med andre. Desuden er det i custom hooks forholdsvis enkelt at benytte variabler til at ændre på eksempelvis metode, url og headers i et request. Dernæst griber Axios éns respons og genkender datatypen.

## Perspektivering af mit stack i forhold til andre muligheder (de store ting i vores app)

saml m angular:
man sidder med typescript: mindre tilgængeligt og mere rigidt
i angular er alle valg truffet
angular kan være svært at opdatere - er i modsætning til react ikke bagud kompatobel

## Skalerbarhed

Hvad har gjort dig af tanker om din applikations skalerbarhed?
veldokumenteret
codesplitteing i componenter

ift deploy: skaberbare tjenester (netlyfy, render.com)
cloud-flare

## Kode-eksempler

Jeg vil vise denne jeiwjf kode

DEnne kode gør dejiuh:

```javascript
export default function Profile() {
  return <h1>Profile</h1>;
}
```

Forklaring afd kode den gør dette og dette for at gøre dettte

Endnu et kode eksempel (som jeg gerne vil tale om til den mundtloge eksamen):

```javascript
useEffect(() => {
  fetch("http://localhost:4000/api/v1/classes/" + id)
    .then((response) => {
      if (!response.ok) {
        throw Error("Vi kunne desværre ikke indlæse kursusinformationerne");
      }
      return response.json();
    })
    .then((data) => {
      setIsLoading(false);
      setClassDetail(data);
      setError(null);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
}, [setClassDetail, setIsLoading, setError, id]);
```
